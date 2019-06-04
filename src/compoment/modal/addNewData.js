import React from 'react';
import 'antd/dist/antd.css';
import { Modal, Form, Input } from 'antd';
import { Row, Col, message } from 'antd';
// const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const ModifyCreateForm = Form.create({ name: 'form_in_modal' })(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form, } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="新增用户信息"
          okText="保存"
          cancelText="取消"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            {/* 配置信息维护 */}
              <Row>
                <Col span={18} offset={4}>
                  <Form.Item {...formItemLayout} label="代码">
                    {getFieldDecorator('code', {
                      rules: [{required:true, message: '请输入代码' }],
                    })(<Input />)}
                  </Form.Item>
                </Col>
                <Col span={18} offset={4}>
                  <Form.Item {...formItemLayout} label="名称">
                    {getFieldDecorator('name',{
                      rules: [{required:true, message: '请输入名称' }],
                    })(<Input type="input"/>)}
                  </Form.Item>
                </Col>
                <Col span={18} offset={4}>
                  <Form.Item {...formItemLayout} label="类型">
                    {getFieldDecorator('type', {
                      rules: [{required:true, message: '请输入类型' }],
                    })(<Input type="input"/>)}
                  </Form.Item>
                </Col>
                <Col span={18} offset={4}>
                <Form.Item {...formItemLayout} label="备注">
                    {getFieldDecorator('description')(<Input type="textarea"/>)}
                  </Form.Item>
                </Col>
            
              </Row>
            
          </Form>
        </Modal>
      );
    }
  },
);

class CollectionsPage extends React.Component {
    constructor(props){
      super(props)
      
      this.state = {
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
      console.log(values);
      event = values
      form.resetFields();
      // code: "002"
      // description: "jajajaja"
      // name: "opqa"
      // type: "001"
      let dataInfo = {
        name: values.name,
        code: values.code,
        type: values.type,
        remark: values.description,
      }
      fetch('/dic/save',{
        method: 'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(dataInfo)
      })
      .then( res => res.json())
      .then( res => {
        console.log(res)
        if(res.code === 200){
          message.success(res.msg)
          this.props.onUpdata(values);
        }else {
          message.warning(res.msg);
        }
      })
      .catch( res => {
        console.log(res)
      })

      this.props.cancelModal()
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    // console.log(this.props)
    return (
      <div>
        <ModifyCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.props.visible}
          onCancel={this.handleCancel}
          onCreate={(event)=>{this.handleCreate(event)}}
        />
      </div>
    );
  }
}

export default CollectionsPage
          