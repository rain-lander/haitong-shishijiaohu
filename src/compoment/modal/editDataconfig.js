import React from 'react';
import 'antd/dist/antd.css';
import { Modal, Form, Input } from 'antd';
import { Row, Col } from 'antd';
// const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const ModifySafeForm = Form.create({ name: 'form_in_modal' })(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form, } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="修改用户信息"
          okText="保存"
          cancelText="取消"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            {/* 配置信息维护 */}
              <Row>
                <Col span={18} offset={4}>
                  <Form.Item {...formItemLayout} label="ID">
                    {getFieldDecorator('id', {
                      rules: [{ message: '请输入用户ID' }],
                    })(<Input />)}
                  </Form.Item>
                </Col>  
                <Col span={18} offset={4}>
                  <Form.Item {...formItemLayout} label="代码">
                    {getFieldDecorator('code', {
                      rules: [{ message: '请输入用户名' }],
                    })(<Input />)}
                  </Form.Item>
                </Col>
                <Col span={18} offset={4}>
                  <Form.Item {...formItemLayout} label="名称">
                    {getFieldDecorator('name')(<Input type="input"/>)}
                  </Form.Item>
                </Col>
                <Col span={18} offset={4}>
                  <Form.Item {...formItemLayout} label="类型">
                    {getFieldDecorator('type')(<Input type="input"/>)}
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

class editPage extends React.Component {
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
      values['key'] = 9
      event = values
      form.resetFields();
      this.props.cancelModal()
      this.props.onUpdata(event);
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    // console.log(this.props)
    return (
      <div>
        <ModifySafeForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.props.visible}
          onCancel={this.handleCancel}
          onCreate={(event)=>{this.handleCreate(event)}}
        />
      </div>
    );
  }
}

export default editPage
          