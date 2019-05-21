import React from 'react';
import 'antd/dist/antd.css';
import { Modal, Form, Input } from 'antd';
import { Row, Col, Select,Button, Upload, Icon } from 'antd';
const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  class extends React.Component {
    render() {
      console.log(this.props)
      const { visible, onCancel, onCreate, form } = this.props;
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
            {/* 用户信息设置 */}
              <Row>
                <Col span={18} offset={4}>
                  <Form.Item {...formItemLayout} label="用户名">
                    {getFieldDecorator('title', {
                      rules: [{ message: '请输入用户名' }],
                    })(<Input />)}
                  </Form.Item>
                </Col>
                <Col span={18} offset={4}>
                  <Form.Item {...formItemLayout} label="在线时间">
                    {getFieldDecorator('description')(<Input type="input" readOnly="readOnly"/>)}
                  </Form.Item>
                </Col>
                <Col span={18} offset={4}>
                  <Form.Item {...formItemLayout} label="个性签名">
                    {getFieldDecorator('description')(<Input type="textarea" />)}
                  </Form.Item>
                </Col>
                <Col span={18} offset={4}>
                  <Form.Item {...formItemLayout} label="所属部门" hasFeedback>
                    {getFieldDecorator('select', {
                      rules: [{ message: '请选择所属部门' }],
                    })(
                      <Select placeholder="请选择所属部门y">
                        <Option value="china">China</Option>
                        <Option value="usa">U.S.A</Option>
                      </Select>,
                    )}
                  </Form.Item>
                </Col>
                <Col span={18} offset={4}>
                  <Form.Item {...formItemLayout} label="头像" extra="long">
                    {getFieldDecorator('upload', {
                      valuePropName: 'fileList',
                      getValueFromEvent: this.normFile,
                    })(
                      <Upload name="logo" action="/upload.do" listType="picture">
                        <Button>
                          <Icon type="upload" />上传头像
                        </Button>
                      </Upload>,
                    )}
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
        <CollectionCreateForm
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
          