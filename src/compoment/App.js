import React, { Component } from 'react';

import {
  Layout, Menu, Icon,
} from 'antd';

import '../App.css';
// 导入 路由组件
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import BaseDataConfig from './basedata/BaseDataConfig';
import BaseDataSafe from './basedata/BaseDataSafe';

import OnlineCustomers from './online/OnlineCustomers'
import ChatMessage from './chatmessage/ChatMessage'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class App extends Component {
  render() {
    return (
      <Router>
        <Layout style={{ height: '100%'}}>
        <Header className="header" style={{ background: '#fff' }}>
          <div className="logo"/><span className="tit_hed">在线客服系统</span>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu key="sub1" title={<span><Icon type="user" />基本数据维护</span>}>
                <Menu.Item key="1"><Link to="/">用户信息设置</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/BaseDataSafe">配置信息维护</Link></Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title={<span><Icon type="laptop" />在线客服</span>}>
                <Menu.Item key="3"><Link to="/online/OnlineCustomers">小明</Link></Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" title={<span><Icon type="notification" />聊天信息</span>}>
                <Menu.Item key="4"><Link to="/chatmessage/ChatMessage">信息详情</Link></Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0px' }}>
            <Content style={{ background: '#fff', padding: 24, margin: 0, height: '100%', }}>
              <div style={{width: '100%', height: '100%'}}>
                <Route path="/" exact component={ BaseDataConfig }></Route>
                <Route path="/BaseDataSafe" component={ BaseDataSafe }></Route>
                <Route path="/online/OnlineCustomers" component={ OnlineCustomers }></Route>
                <Route path="/chatmessage/ChatMessage" component={ ChatMessage }></Route>
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>
    );
  }
}

