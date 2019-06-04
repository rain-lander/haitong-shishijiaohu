import React from 'react';
import 'antd/dist/antd.css';
import { Modal, Form, Input } from 'antd';
import { Row, Col, message } from 'antd';
// const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const ModifySafeForm = Form.create({ name: 'form_in_modal' })(
  class extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        formItem: '',
        formIndex: '',
      }

    }

    componentWillReceiveProps(o){
      // console.log(o)
      if(o.showEditModal){
        this.setState({
          formItem: o.showEditModal.item,
          formIndex: o.showEditModal.index
        })
        
      }
    }

    render() {
      const { visible, onCancel, onCreate, form, showEditModal } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="修改字典数据"
          okText="保存"
          cancelText="取消"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            {/* 配置信息维护 */}
              <Row>
                {/* <Col span={18} offset={4}>
                  <Form.Item {...formItemLayout} label="ID">
                    {getFieldDecorator('id', {
                      rules: [{ message: '请输入用户ID' }],
                      initialValue: showEditModal.item.id
                    })(<Input />)}
                  </Form.Item>
                </Col>   */}
                <Col span={18} offset={4}>
                  <Form.Item {...formItemLayout} label="代码">
                    {getFieldDecorator('code', {
                      rules: [{ message: '请输入用户名' }],
                      initialValue: showEditModal.item.code
                    })(<Input />)}
                  </Form.Item>
                </Col>
                <Col span={18} offset={4}>
                  <Form.Item {...formItemLayout} label="名称">
                    {getFieldDecorator('name',{
                      initialValue: showEditModal.item.name
                    })(<Input type="input"/>)}
                  </Form.Item>
                </Col>
                <Col span={18} offset={4}>
                  <Form.Item {...formItemLayout} label="类型">
                    {getFieldDecorator('type', {
                      initialValue: showEditModal.item.type
                    })(<Input type="input"/>)}
                  </Form.Item>
                </Col>
                <Col span={18} offset={4}>
                <Form.Item {...formItemLayout} label="备注">
                    {getFieldDecorator('description', {
                      initialValue: showEditModal.item.remark
                    })(<Input type="textarea"/>)}
                  </Form.Item>
                </Col>
            
              </Row>
            
          </Form>
        </Modal>
      );
    }
  },
);

class editPage extends React.Component {
    constructor(props){
      super(props)
      
      this.state = {
        formItem: '',
        formIndex: '',
        receivedValues: {}
      }
      
    }

  handleCancel = () => {
    this.props.cancelModal()
  };

  handleCreate = (event) => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      // console.log(values);
      // console.log(this.state.formItem.id)
      event = values
      form.resetFields();
      let userInfo = {
        id: this.state.formItem.id,
        name: values.name,
        code: values.code,
        type: values.type,
        remark: values.description,
      }
      fetch('/dic/update',{
        method: 'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(userInfo)
      })
      .then( res => res.json())
      .then( res => {
        console.log(res)
        if(res.code === 200){
          message.success(res.msg)
          this.props.onUpdata(event);
        }else {
          message.warning(res.msg);
        }
      })
      .catch( res => {
        console.log(res)
      })

      this.props.cancelModal()
      // this.props.onUpdata(event);
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  componentWillReceiveProps(o){
    if(o.showEditModal){
      this.setState({
        formItem: o.showEditModal.item,
        formIndex: o.showEditModal.index
      })
      
    }
  }

  render() {
    // console.log(this.props)
    const {showEditModal} = this.props
    return (
      <div>
        <ModifySafeForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.props.visible}
          onCancel={this.handleCancel}
          showEditModal={showEditModal}

          onCreate={(event)=>{this.handleCreate(event)}}
        />
      </div>
    );
  }
}

export default editPage
          