import React from 'react';
import 'antd/dist/antd.css';
import { Modal, Form, Input } from 'antd';
import { Row, Col } from 'antd';
// const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const ModifyCreateForm = Form.create({ name: 'form_in_modal' })(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form, pageName } = this.props;
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
                    {getFieldDecorator('title', {
                      rules: [{ message: '请输入用户名' }],
                    })(<Input />)}
                  </Form.Item>
                </Col>
                <Col span={18} offset={4}>
                  <Form.Item {...formItemLayout} label="名称">
                    {getFieldDecorator('description')(<Input type="input" readOnly="readOnly"/>)}
                  </Form.Item>
                </Col>
                <Col span={18} offset={4}>
                  <Form.Item {...formItemLayout} label="类型">
                    {getFieldDecorator('description')(<Input type="input" readOnly="readOnly"/>)}
                  </Form.Item>
                </Col>
                <Col span={18} offset={4}>
                <Form.Item {...formItemLayout} label="备注">
                    {getFieldDecorator('description')(<Input type="textarea" />)}
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
        a: false
      }
  
    }

  handleCancel = () => {
    this.props.cancelModal()
  };

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);
      form.resetFields();
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
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default CollectionsPage
          