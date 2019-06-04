import React from 'react'
import './baseIndex.css'
import AdvancedSearchForm from '../searchForm/searchForm'

import AddNewData from '../modal/addNewData'
import EditDatasafe from '../modal/editDatasafe'

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
      pageName: 'BaseDataSafe',
      editInfo: {
        item: '',
        index: '',
      },
      columns: [
        {
          title: '字典代码',
          width: 100,
          dataIndex: 'code',
          key: 'code',
          fixed: 'left',
        },
        {
          title: '字典名称',
          width: 150,
          dataIndex: 'name',
          key: 'name',
          // fixed: 'left',
        },
        {
          title: '种类',
          width: 150,
          dataIndex: 'type',
          key: 'type',
          textWrap: 'word-break',
        },
        {
          title: '备注',
          width: 300,
          dataIndex: 'remark',
          key: 'remark',
        },
        {
          
        },
        {
          title: '操作',
          key: 'operation',
          fixed: 'right',
          width: 130,
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
      data: []
    };
    this.addUserinfo = this.addUserinfo.bind(this)
    this.fetchUserInfo = this.fetchUserInfo.bind(this)
    this.searchBtn = this.searchBtn.bind(this)

  }



  handleDelete(key, id) {
    console.log(key, id)
    fetch(`/dic/delete/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if(data.code === 200){
          message.success(data.msg)
          this.fetchUserInfo()
        } else {
          message.warning(data.msg);
        }
      })
  };


  //控制新增数据modal框隐藏和显示
  showModal = () => {
    this.setState({ visible: true });
  };

  //控制编辑数据modal框隐藏和显示
  showEditModal(item,index){
    console.log(item,index)
    this.setState({ 
      editVisible: true,
      editInfo:{
        item: item,
        index: index,
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
  addUserinfo(e){
    console.log(e)
    this.fetchUserInfo()
    
  }

  fetchUserInfo(){
    let temp = {};
    fetch('/dic/search', {
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

  searchBtn(e){
    // console.log(e)
    let temp = {
      name: e.basename, 
      type: e.basetype
    };
    fetch('/dic/search',{
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(temp),
    })
    .then( res => res.json())
    .then( res => {
      // console.log(res.data.data)
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
  editDataSafe(e){
    console.log(e)
    this.fetchUserInfo()
  }

  edithandleCancel =() => {
    this.setState({ editVisible: false });
  }


  componentDidMount(){
    this.fetchUserInfo()
  }

  render() {
    return (
      <div>
        <PageHeader title="配置信息列表"/>
        <div>
          <AdvancedSearchForm searchBtn={this.searchBtn} pageName={this.state.pageName}></AdvancedSearchForm>
        </div>
        <div className="add_btn">
          <Button type="primary" onClick={this.showModal}>
            添加
          </Button>
          <AddNewData onUpdata={this.addUserinfo} visible={this.state.visible} cancelModal={this.handleCancel}></AddNewData>
          <EditDatasafe showEditModal={this.state.editInfo} onUpdata={this.editDataSafe} visible={this.state.editVisible} cancelModal={this.edithandleCancel}></EditDatasafe>
        </div>
        <div>
          <Table pageName={this.state.pageName} columns={this.state.columns} dataSource={this.state.data} scroll={{ x: 1500, y: 300  }} />
        </div>
      </div>
      
    )
  }
}
export default DataSafeguard




