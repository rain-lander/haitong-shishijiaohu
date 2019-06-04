import React from 'react';
import 'antd/dist/antd.css';
import { Modal, Form, Input, message } from 'antd';
import { Row, Col, Button, Upload, Icon, Card, Select} from 'antd';
const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const ModifySafeForm = Form.create({ name: 'form_in_modal' })(
  class extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        selectDepart: [],
        formItem: '',
        formIndex: '',
        fileList: [],
        uploadPath: ''
      }
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

    normFile = e => {
      console.log('Upload event:', e);
      // let fileArr = []
      // fileArr.push(e)
      if(e.fileList[0].status === "done"){
        let fileRes = e.fileList[0].response
        // console.log(fileRes)
        if(fileRes.code === 200){
          message.success('头像上传成功～')
          this.setState({
            file: fileRes.data,
          })
          this.props.onFile(fileRes)
          // console.log(fileRes)
        }
      }
      return e && e.fileList;
    };

  updateChange = ({ fileList }) => {
    // console.log(fileList)
    this.setState({ fileList })
  };

    componentDidMount(){
      this.fetchDepartment()
    
    }

    componentWillReceiveProps(o){
      console.log(o)
      if(o.showEditModal){
        this.setState({
          formItem: o.showEditModal.item,
          formIndex: o.showEditModal.index
        })
      }
    }
    

    render() {
      const { visible, onCancel, onCreate, form, showEditModal, showUpload} = this.props;
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
                  <Form.Item {...formItemLayout} label="头像">
                    {getFieldDecorator('file', {
                      rules: [{required:true, message: '请上传头像' }],
                      valuePropName: 'fileList',
                      getValueFromEvent: this.normFile,
                      initialValue: this.state.fileList,
                      // initialValue: [{uid: '-1',name: '头像.png',url: showEditModal.item.avatar}],
                    })(
                      <Upload name="file"  beforeUpload={this.beforeUpload}  onChange={this.updateChange}  action="/user/import" listType="picture">
                        {this.state.fileList.length > 0 && showUpload!=='1'? (null):(
                          <Button>
                            <Icon type="upload" />更换图片
                          </Button>
                          
                        )}
                      </Upload>,
                    )}
                  </Form.Item>
                </Col>

                {this.state.fileList.length > 0 && showUpload!=='1'? (null):(
                    //    <Card
                    //    bordered={false}
                    //    hoverable
                    //    style={{ width: 60 }}
                    //    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    //  >
                    //  </Card> 
                  <div className="jia_filepic">
                    <div className="filepic clearfix">
                      <div className="fl left_img">
                        <div className="img_box">
                          <img alt="example" src={showEditModal.item.avatar} />
                        </div>
                      </div>
                      <span className="fr right_txt">
                        touxiang.png
                      </span>

                    </div> 
                  </div> 
                          
                )}
                         
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
      values['key'] = 9
      event = values
      form.resetFields();
      this.props.cancelModal()
      // console.log(this.state.formItem)
      let userInfo = {
        userName: values.showEditModal.userName,
        groupCode: values.code,
        sign: values.sign,
        status: values.status==="是"?"1":"0",
        avatar: this.state.file.data,
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
      })
      .catch( res => {
        console.log(res)
      })
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