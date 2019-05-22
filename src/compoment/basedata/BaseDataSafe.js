import React from 'react'
import './baseIndex.css'
import AdvancedSearchForm from '../searchForm/searchForm'

import AddNewData from '../modal/addNewData'
import { PageHeader, Button, Icon, Popconfirm } from 'antd';
// import { Row, Col } from 'antd';
import { Table } from 'antd';

// const Search = Input.Search;

class DataSafeguard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      inputValue: '',
      visible: false,
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
                        <a href="javascript:;" style={{marginRight: "20px"}}><Icon type="edit" theme="twoTone" /></a>
                        {/* <a href="javascript:;"><Icon type="delete" theme="twoTone" /></a> */}
                        {/* this.state.dataSource.length >= 1 ? ( */}
                <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                  <a href="javascript:;">{record.key}<Icon type="delete" theme="twoTone"/></a>
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



  }

  handleDelete = key => {
    // const dataSource = [...this.state.dataSource];
    console.log(key)
    // this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };
  //控制modal框隐藏和显示
  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel =() => {
    this.setState({ visible: false });
  }
  handleCreate =() => {
    this.setState({ visible: false });
  }

  editRow(i){
    console.log(i)
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
          <AddNewData visible={this.state.visible} cancelModal={this.handleCancel}></AddNewData>
        </div>
        <div>
          <Table pageName={this.state.pageName} columns={this.state.columns} dataSource={this.state.data} scroll={{ x: 1500, y: 300  }} />
        </div>
      </div>
      
    )
  }
}
export default DataSafeguard




