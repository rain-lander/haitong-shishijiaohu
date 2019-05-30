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
        
      },
     
      {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 150,
        render: (text, record) =>  <div>
                        <span onClick={()=>this.showEditModal(record.key)} style={{marginRight: "20px"}}><Icon type="edit" theme="twoTone" /></span>
                        {/* <a href="javascript:;"><Icon type="delete" theme="twoTone" /></a> */}
                        {/* this.state.dataSource.length >= 1 ? ( */}
                <Popconfirm cancelText="取消" okText="确认" title="确认删除?" onConfirm={() => this.handleDelete(record.key)}>
                  <span><Icon type="delete" theme="twoTone"/></span>
                </Popconfirm>
              {/* ) : null, */}
                      </div>,
      },
    ],

      data: []
    };
    this.addUserinfo = this.addUserinfo.bind(this)
    this.searchBtn = this.searchBtn.bind(this)
    this.fetchDelData = this.fetchDelData.bind(this)
  }

  handleDelete = key => {
    const dataSource = [...this.state.data];
    console.log(key)
    this.fetchDelData(dataSource, dataSource[key].id)
    
  };

  fetchDelData(dataSource, id) {
    console.log(id)
    fetch(`/user/delete/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if(data.code === 200){
          message.success(data.msg)
          this.setState({ 
            dataSource: dataSource.filter(item => item.id !== id ) 
          });
        }
      })
      console.log(this.state.data)
  }
  //控制新增数据modal框隐藏和显示
  showModal = () => {
    this.setState({ visible: true });
  };

  //控制编辑数据modal框隐藏和显示
  showEditModal = (i) => {
    console.log(i)
    this.setState({ editVisible: true });
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
  addUserinfo(e){
    console.log(e)
    // console.log(this.state.data)
    // e.key = this.state.data.length+1
    let newData = this.state.data.concat([e])
    console.log(newData)
    // this.setState({
    //   // data: newData
    // }, ()=> {
    //   console.log(newData)
    // })
  }
  editDataSafe(e){
    console.log(e)
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
      // console.log(res)
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
    // fetch('/user/search')
    // .then( res => res.json() )
    // .then( res => {
    //   console.log(res)
    //   if(res.code === 200){
    //     res.data.data.map((e, i) => {
    //       return (
    //         e.key = `${i++}`
    //       )
    //     })
    //     this.setState ({
    //       data: res.data.data
    //     })
    //   }
    // })
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
          <EditDataconfig onUpdata={this.editDataSafe} visible={this.state.editVisible} cancelModal={this.edithandleCancel}></EditDataconfig>
        </div>
        <div>
          <Table pageName={this.state.pageName} columns={this.state.columns} dataSource={this.state.data} scroll={{ x: 1500, y: 300  }} />
        </div>
      </div>
      
    )
  }
}
export default DataSafeguard




