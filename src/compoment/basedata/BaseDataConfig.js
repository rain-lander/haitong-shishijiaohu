import React from 'react'
import './baseIndex.css'
import AdvancedSearchForm from '../searchForm/searchForm'

import AddUserinfo from '../modal/addUserinfo'
import { PageHeader, Button, Icon } from 'antd';
// import { Row, Col } from 'antd';
import { Table } from 'antd';

const columns = [
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
    render: () => <div>
      <a href="javascript:;" style={{marginRight: "20px"}}><Icon type="edit" theme="twoTone" /></a>
      <a href="javascript:;"><Icon type="delete" theme="twoTone" /></a>

    </div>,
  },
];

const data = [
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

  
];

// const Search = Input.Search;

class MyChat extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      inputValue: '',
      visible: false,
      pageName: 'BaseDataConfig'
    }
  }

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

  render() {
    return (
      <div>
        <PageHeader title="用户信息列表"/>
        <div>
          <AdvancedSearchForm pageName={this.state.pageName}></AdvancedSearchForm>
        </div>
        <div className="add_btn">
          <Button type="primary" onClick={this.showModal}>
            添加
          </Button>
          <AddUserinfo visible={this.state.visible} cancelModal={this.handleCancel}></AddUserinfo>
        </div>
        <div>
          <Table columns={columns} dataSource={data} scroll={{ x: 1500, y: 300  }} />
        </div>
      </div>
      
    )
  }
}
export default MyChat


