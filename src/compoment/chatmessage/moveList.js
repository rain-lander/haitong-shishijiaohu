import React from 'react'

import {
  Route,
  Link,
  Switch
} from 'react-router-dom'

import MovieCategory from './movieCategory'
// import MovieDetail from './movieDetail'

import {
  Layout, Menu,
} from 'antd';

const { Content, Sider } = Layout;

export default class MovieList extends React.Component{
  render(){
    return (
    <Layout>
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key="1"><Link to="/movielist/in_theaters">正在热映</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/movielist/coming_soon">即将上映</Link></Menu.Item>
          <Menu.Item key="3"><Link to="/movielist/top250">top250</Link></Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ background: '#fff', margin: 0, minHeight: 380 }}>

        <Switch>
          {/* 小写component！！！！！！ */}
            {/* <Route path="/movielist/detail/:id" component={MovieDetail}></Route> */}
          <Route path="/movielist/:movieType" component={MovieCategory}></Route>
        </Switch>

        </Content>
      </Layout>
    </Layout>
 
    )
  }
  // return (
  //   <div>
  //     <h1>这是电影liebiao，很好看哦~</h1>
  //   </div>
  // )
}