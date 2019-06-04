import React from 'react'
import './baseIndex.css'
import AdvancedSearchForm from '../searchForm/searchForm'

import AddUserinfo from '../modal/addUserinfo'
import EditDataconfig from '../modal/editDataconfig'

import { PageHeader, Button, Icon, Popconfirm } from 'antd';
// import { Row, Col } from 'antd';
import { Table, message } from 'antd';

class DataSafeguard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      inputValue: '',
      visible: false,
      editVisible: false,
      uploadBtn: 0,
      pageName: 'BaseDataConfig',
      columns: [
      {
        title: '用户名称',
        width: 100,
        dataIndex: 'userName',
        key: 'userName',
        fixed: 'left',
      },
      {
        title: '头像',
        width: 600,
        dataIndex: 'avatar',
        key: 'avatar',
        textWrap: 'word-break',
      },
      {
        title: '签名',
        width: 300,
        dataIndex: 'sign',
        key: 'sign',
        textWrap: 'word-break',
      },
      {
        title: '状态',
        width: 100,
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: '部门',
        width: 200,
        dataIndex: 'groupCode',
        key: 'groupCode',
      },
      {
        
      },
     
      {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 150,
        render: (text, record) =>  <div>
                        <span onClick={()=>this.showEditModal(record, record.key)} style={{marginRight: "20px"}}><Icon type="edit" theme="twoTone" /></span>
                        {/* <a href="javascript:;"><Icon type="delete" theme="twoTone" /></a> */}
                        {/* this.state.dataSource.length >= 1 ? ( */}
                <Popconfirm cancelText="取消" okText="确认" title="确认删除?" onConfirm={() => this.handleDelete(record.key, record.id)}>
                  <span><Icon type="delete" theme="twoTone"/></span>
                </Popconfirm>
              {/* ) : null, */}
                      </div>,
      },
    ],
    data: [],

      // data: [{
			// 	"id": 41,
			// 	"userName": "EE",
			// 	"avatar": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
			// 	"sign": "customer",
			// 	"status": "1 ",
			// 	"delFlg": false,
			// 	"createTime": 1558591578000,
			// 	"updateTime": 1558591578000,
      //   "operator": null,
      //   "key": '1'
			// }, {
			// 	"id": 38,
			// 	"userName": "YY",
			// 	"avatar": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
			// 	"sign": "勤勤奋奋",
			// 	"status": "1 ",
			// 	"delFlg": false,
			// 	"createTime": 1558590030000,
			// 	"updateTime": 1558590030000,
      //   "operator": null,
      //   "key": '2'
        
			// }],
      editInfo:{
        item: '',
        index: ''
      }
    };
    this.addUserinfo = this.addUserinfo.bind(this)
    this.searchBtn = this.searchBtn.bind(this)
    this.fetchUserInfo = this.fetchUserInfo.bind(this)
    this.editDataSafe = this.editDataSafe.bind(this)
  }

  handleDelete(key, id) {
    console.log(key, id)
    fetch(`/user/delete/${id}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if(data.code === 200){
        message.success(data.msg)
        this.fetchUserInfo()
      }
    })
  };

  //控制新增数据modal框隐藏和显示
  showModal = () => {
    this.setState({ visible: true, uploadBtn: 1});
  };

  //控制编辑数据modal框隐藏和显示
  showEditModal = (item, index) => {
    console.log(item)
    console.log(index)
    
    this.setState({ 
      editVisible: true,
      editInfo:{
        item: item,
        index: index
      }
     });

  };

  handleCancel =() => {
    this.setState({ visible: false });
  }

  edithandleCancel=() => {
    this.setState({ editVisible: false });
  }

  handleCreate =() => {
    this.setState({ visible: false });
  }
  addUserinfo(ele){
    this.fetchUserInfo()
  }

  // shouldComponentUpdate(old){
  //   console.log(old)
  //   return true
  // }
  editDataSafe(e){
    console.log(e)
    this.fetchUserInfo()
  }

  edithandleCancel =() => {
    this.setState({ editVisible: false });
  }

  searchBtn(e){
    let temp = {};
    temp.userName = e.username;
    fetch('/user/search',{
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(temp),
    })
    .then( res => res.json())
    .then( res => {
      console.log(res.data.data)
      if(res.code === 200){
        res.data.data.map((e, i) => {
          return (
            e.key = `${i++}`
          )
        })
        this.setState ({
          data: res.data.data
        })
      }
    })
    .catch( res => {
      console.log(res)
    })
  }

  fetchUserInfo(){
    let temp = {};
    fetch('/user/search', {
      method: 'POST',
      headers:{
        'Content-Type':'application/json;'
      },
      body: JSON.stringify(temp),
    })
    .then( res => res.json())
    .then( res => {
      console.log(res)
      if(res.code === 200){
        res.data.map((e, i) => {
          return (
            e.key = `${i++}`
          )
        })
        this.setState ({
          data: res.data
        })
      }
    })
    .catch( res => {
      console.log(res)
    })
  
  }

  componentDidMount(){
    this.fetchUserInfo()
  }

  render() {
    return (
      <div>
        <PageHeader title="用户信息列表"/>
        <div>
          <AdvancedSearchForm searchBtn={this.searchBtn} pageName={this.state.pageName}></AdvancedSearchForm>
        </div>
        <div className="add_btn">
          <Button type="primary" onClick={this.showModal}>
            添加
          </Button>
          <AddUserinfo onUpdata={this.addUserinfo} visible={this.state.visible} cancelModal={this.handleCancel}></AddUserinfo>
          <EditDataconfig showEditModal={this.state.editInfo} onUpdataEdit={this.editDataSafe} visible={this.state.editVisible} cancelModal={this.edithandleCancel}></EditDataconfig>
        </div>
        <div>
          <Table pagination={{ pageSize: 10 }} pageName={this.state.pageName} columns={this.state.columns} dataSource={this.state.data} scroll={{ x: 1500, y: 300  }} />
        </div>
      </div>
      
    )
  }
}
export default DataSafeguard




