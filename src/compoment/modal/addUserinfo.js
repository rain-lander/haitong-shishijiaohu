import React from 'react';
import 'antd/dist/antd.css';
import { Modal, Form, Input, message } from 'antd';
import { Row, Col, Select,Button, Upload, Icon } from 'antd';
const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  class extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        selectDepart: [],
        file: []
      }
    }    
    normFile = e => {
      this.props.onFile(e.fileList)
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    };

    fetchDepartment(){
      fetch('/user/getDepartment ')
      .then( res => res.json() )
      .then( res => {
        if(res.code === 200){
         this.setState({
           selectDepart: res.data
         })
        }
      })
    }

    componentDidMount(){
      this.fetchDepartment()
    }

    render() {
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
                    {getFieldDecorator('userName', {
                      rules: [{required:true, message: '请输入用户名' }],
                    })(<Input />)}
                  </Form.Item>
                </Col>
                <Col span={18} offset={4}>
                  <Form.Item {...formItemLayout} label="在线状态">
                    {getFieldDecorator('status', {
                      rules: [{required:true, message: '请输入在线状态' }],
                    })(
                      <Select placeholder="请选择在线状态">
                        <Option value="1">是</Option>
                        <Option value="0">否</Option>
                      </Select>,
                    )}
                  </Form.Item>
                </Col>
                <Col span={18} offset={4}>
                  <Form.Item {...formItemLayout} label="个性签名">
                    {getFieldDecorator('sign', {
                      rules: [{required:true, message: '请输入个性签名' }],
                    })(<Input type="textarea" />)}
                  </Form.Item>
                </Col>
                <Col span={18} offset={4}>
                  <Form.Item {...formItemLayout} label="所属部门" hasFeedback>
                    {getFieldDecorator('code')(
                      <Select placeholder="请选择所属部门">
                        {this.state.selectDepart.map((item, index) => {
                          return (
                            <Option key={item.id} value={item.code}>{item.name}</Option>
                          )
                        })}
                      </Select>,
                    )}
                  </Form.Item>
                </Col>
                <Col span={18} offset={4}>
                  <Form.Item {...formItemLayout} label="头像" extra="long">
                    {getFieldDecorator('file', {
                      valuePropName: 'fileList',
                      getValueFromEvent: this.normFile,
                    })(
                      <Upload name="file" action="/user/import" listType="picture">
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
        fileList: [],
        file: ''
      }
      this.onFile = this.onFile.bind(this)
    }

  handleCancel = () => {
    this.props.cancelModal()
  };

  onFile(e){
    let result = e[0]
    if(result.status === "done"){
      let fileRes = result.response
      if(fileRes.code === 200){
        console.log(fileRes)
        this.setState({
          file: fileRes.data
        })
      }
    }
  }

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('Received', values);
      form.resetFields();
      this.props.cancelModal()
      this.props.onUpdata(values);
      console.log(values.file[0].response.data)
      //判断是否上传完成
      if(values.file[0].status === "done"){
        // 新增用户
        let userInfo = {
          userName: values.userName,
          code: values.code,
          sign: values.sign,
          status: values.status,
          avatar: values.file[0].response.data
        }
        fetch('/user/save',{
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
          }else {
            message.warning(res.msg);
          }
        })
        .catch( res => {
          console.log(res)
        })
      }
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
          onFile={this.onFile}
        />
      </div>
    );
  }
}

export default CollectionsPage
          