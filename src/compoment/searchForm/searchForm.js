
import React from 'react';
// import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
// import './index.css';
import { Form, Row, Col, Input, Button } from 'antd';
const formItemLayout = {
    labelCol: { span: 6},
    wrapperCol: { span: 18 },
  };
class AdvancedSearchForm extends React.Component {
  state = {
    expand: false,
  };

  // To generate mock Form.Item
  getFields() {
    const count = this.state.expand ? 10 : 6;
    const { getFieldDecorator } = this.props.form;
    const children = [];
    for (let i = 0; i < 1; i++) {
      children.push(
        <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
          <Form.Item {...formItemLayout} label={`Field ${i}`}>
            {getFieldDecorator(`field-${i}`, {
              rules: [
                {
                  message: 'Input something!',
                },
              ],
            })(<Input placeholder="placeholder" />)}
          </Form.Item>
        </Col>,
      );
    }
    return children;
  }

  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  };

  render() {
    // console.log(this.props)
    const { getFieldDecorator } = this.props.form;
    return (
      
      <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
        { this.props.pageName === "BaseDataSafe"?(null):(
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item {...formItemLayout} label={'用户名称'}>
                {getFieldDecorator(`username`, {
                  rules: [
                    {
                      message: '请输入要搜索的用户名',
                    },
                  ],
                })(<Input placeholder="请输入用户名" />)}
              </Form.Item>
            </Col>
          </Row>
        )}
        { this.props.pageName === "BaseDataConfig"?(null):(
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item {...formItemLayout} label={'名称'}>
                {getFieldDecorator(`basename`, {
                  rules: [
                    {
                      message: '请输入要搜索名称',
                    },
                  ],
                })(<Input placeholder="请输入要搜索名称" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item {...formItemLayout} label={'类型'}>
                {getFieldDecorator(`basetype`, {
                  rules: [
                    {
                      message: '请输入要搜索名称',
                    },
                  ],
                })(<Input placeholder="请输入要搜索名称" />)}
              </Form.Item>
            </Col>
          </Row>
          
        )}

        <Row>
          <Col span={28} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              清除
            </Button>
            
          </Col>
        </Row>
      </Form>
    );
  }
}

const WrappedAdvancedSearchForm = Form.create({ name: 'advanced_search' })(AdvancedSearchForm);

export default WrappedAdvancedSearchForm

          