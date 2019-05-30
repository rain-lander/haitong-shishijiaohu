import React from 'react'
import './baseIndex.css'
import AdvancedSearchForm from '../searchForm/searchForm'

import AddNewData from '../modal/addNewData'
import EditDatasafe from '../modal/editDatasafe'

import { PageHeader, Button, Icon, Popconfirm } from 'antd';
// import { Row, Col } from 'antd';
import { Table } from 'antd';

class DataSafeguard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      inputValue: '',
      visible: false,
      editVisible: false,
      pageName: 'BaseDataSafe',
      columns: [
      {
        title: '用户名称',
        width: 200,
        dataIndex: 'name',
        key: 'name',
        fixed: 'left',
      },
      {
        title: '头像',
        width: 100,
        dataIndex: 'age',
        key: 'age',
        fixed: 'left',
      },
      { title: '签名', dataIndex: 'address', key: '1' },
      { title: '状态', dataIndex: 'address', key: '2' },
      {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 130,
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

      data: [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York Park',
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 40,
        address: 'London Park',
      },
      {
        key: '3',
        name: 'hahaha',
        age: 32,
        address: 'New York Park',
      },
      {
        key: '4',
        name: 'jijiji',
        age: 40,
        address: 'London Park',
      },
      {
        key: '5',
        name: 'John Brown',
        age: 32,
        address: 'New York Park',
      },
      {
        key: '6',
        name: 'Jim Green',
        age: 40,
        address: 'London Park',
      },
      {
        key: '7',
        name: 'hahaha',
        age: 32,
        address: 'New York Park',
      },
      {
        key: '8',
        name: 'jijiji',
        age: 40,
        address: 'London Park',
      },
    ]
    };
    this.addUserinfo = this.addUserinfo.bind(this)
  }

  handleDelete = key => {
    // const dataSource = [...this.state.dataSource];
    console.log(key)
    // this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };
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
    let newData = this.state.data.push(e)
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

  render() {
    return (
      <div>
        <PageHeader title="配置信息列表"/>
        <div>
          <AdvancedSearchForm pageName={this.state.pageName}></AdvancedSearchForm>
        </div>
        <div className="add_btn">
          <Button type="primary" onClick={this.showModal}>
            添加
          </Button>
          <AddNewData onUpdata={this.addUserinfo} visible={this.state.visible} cancelModal={this.handleCancel}></AddNewData>
          <EditDatasafe onUpdata={this.editDataSafe} visible={this.state.editVisible} cancelModal={this.edithandleCancel}></EditDatasafe>
        </div>
        <div>
          <Table pageName={this.state.pageName} columns={this.state.columns} dataSource={this.state.data} scroll={{ x: 1500, y: 300  }} />
        </div>
      </div>
      
    )
  }
}
export default DataSafeguard




