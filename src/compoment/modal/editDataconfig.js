import React from 'react';
import 'antd/dist/antd.css';
import { Modal, Form, Input, message } from 'antd';
import { Row, Col, Button, Upload, Icon, Select} from 'antd';
const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const ModifySafeForm = Form.create({ name: 'form_in_modal' })(
  class extends React.Component {
    // static defaultProps = {
    //   likedText: '取消',
    // } 
    constructor(props){
      super(props)
      this.state = {
        selectDepart: [],
        formItem: '',
        formIndex: '',
        baseurl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        fileList: [{
          uid:'-1',
          name:'头像.png',
          key: '0',
          status: 'done',
          url: ''
        }],
        uploadPath: '',
        imgList: [],

      }
      // this.customRequest = this.customRequest.bind(this)
    }

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
      .catch( res => {
        console.log(res)
      })
    }

    // 拦截文件上传
    // beforeUpload=(file, fileList)=>{
    //   console.log(file)
    //   console.log(fileList)
    //   this.setState({
    //     fileList:[file]
    //   })
    //   // return false;
    // }

    // updateChange = ( info ) => {
    //   let fileList = [...info.fileList];
    //   console.log(info)
    //   fileList = fileList.slice(-1);
    //   fileList = fileList.map(file => {
    //     console.log(file)
    //     if (file.response) {
    //       console.log(file)
    //       file.url = file.response.data;
    //       if (file.response.code===200) {
    //         message.success(file.response.msg)
    //         this.setState({
    //           file: file.response.data,
    //         })
    //         this.props.onFile(file.response.data)
    //       }
    //     }
        
    //     return file;
    //   });
    //   console.log(fileList)
    //   this.setState({ fileList });
    // };

    customRequest = (file) => {
      console.log(file)
      if(this.state.fileList[0].uid === '1'){
        message.warning('头像已上传，请不要重复上传～');
        return false
      }
      const formData = new FormData();
      formData.append('file', file.file);
      fetch('/user/import', {
          method: 'POST',
          body: formData
      })
      .then( res => res.json())
      .then(res => {
        console.log(res)
        if(res.code === 200){
          this.setState({
            fileList: [{
              uid:'1',
              name:'新头像.png',
              key: '1',
              status: 'done',
              url: res.data
            }]
          })
          message.success(res.msg)
          this.props.onFile(res.data)

        }else {
          message.warning(res.msg);
        }
      })
      .catch(res => {
        console.log(res)
      })
    }

    // removeFile = (file) => {
    //   console.log(file)
    // }

    componentDidMount(){
      this.fetchDepartment()
    }

    componentWillReceiveProps(o){
      console.log(o)
      if(o.showEditModal){
        this.setState({
          formItem: o.showEditModal.item,
          formIndex: o.showEditModal.index,
        })
        if(this.state.fileList.uid === '-1'){
          this.setState({
            fileList:[{
              uid:'-1',
              name:'头像.png',
              key: '0',
              status: 'done',
              url: o.showEditModal.item.avatar
            }]
          })
        }

      }
    }
   

    render() {
      const { visible, onCancel, onCreate, form, showEditModal, showUpload} = this.props;
      const { getFieldDecorator } = form;
      console.log(this.state)
      // beforeUpload={this.beforeUpload} onChange={this.updateChange} fileList={this.state.fileList}  listType="picture"
      const props = {
        // action: '/user/import',
        // beforeUpload: this.beforeUpload,
        // onChange: this.updateChange,
        fileList: this.state.fileList,
        listType:"picture",
        customRequest: this.customRequest,
        // onRemove: this.removeFile
      }
      
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
            {/* 用户信息设置 */}
              <Row>
                <Col span={18} offset={4}>
                  <Form.Item {...formItemLayout} label="用户名">
                    {getFieldDecorator('showEditModal.userName', {
                      rules: [{required:true, message: '请输入用户名' }],
                      initialValue: showEditModal.item.userName
                    })(<Input />)}
                  </Form.Item>
                </Col>
                <Col span={18} offset={4}>
                  <Form.Item {...formItemLayout} label="在线状态">
                    {getFieldDecorator('status', {
                      rules: [{required:true, message: '请输入在线状态' }],
                      initialValue: showEditModal.item.status==1?'是':'否'
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
                      initialValue: showEditModal.item.sign
                    })(<Input type="textarea" />)}
                  </Form.Item>
                </Col>
                <Col span={18} offset={4}>
                  <Form.Item {...formItemLayout} label="所属部门" hasFeedback>
                    {getFieldDecorator('code',{initialValue: showEditModal.item.groupCode})(
                      
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
                  <Form.Item labelCol={{span:6}} wrapperCol={{span:14}} label='头像'>
                      {getFieldDecorator('file')(
                          <Upload {...props} >
                              <Button><Icon type='upload' />上传文件</Button>
                          </Upload>
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

class editPage extends React.Component {
    constructor(props){
      super(props)
      
      this.state = {
        fileList: [],
        file: '',
        showUpload: '0',
        formItem: '',
        formIndex: '',
        receivedValues: {}
      }

      this.onFile = this.onFile.bind(this)

    }

  handleCancel = () => {
    this.props.cancelModal()
  };

  onFile(e){
    console.log(e)
    this.setState({
      showUpload: '0',
      file: e
    })
    
  }

  handleCreate = (event) => {
    const form = this.formRef.props.form;
    this.setState({
      showUpload: '1'
    })
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log(values);
      event = values

      console.log(this.state)
      let userInfo = {
        userName: values.showEditModal.userName,
        groupCode: values.code,
        sign: values.sign,
        status: values.status==="是"?"1":"0",
        avatar: this.state.file,
        id: this.state.formItem.id
      }
      fetch('/user/update',{
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
          this.props.onUpdataEdit(event);
          
        }else {
          message.warning(res.msg);
        }
        form.resetFields();
      })
      .catch( res => {
        console.log(res)
      })
      this.props.cancelModal()

    // }

    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  }

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
          onCreate={(event)=>{this.handleCreate(event)}}
          showEditModal={showEditModal}
          onFile={this.onFile}
          showUpload={this.state.showUpload}

        />
      </div>
    );
  }
}

export default editPage