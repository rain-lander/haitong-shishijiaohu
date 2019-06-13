import React from 'react'
import { Collapse, Avatar, Badge } from 'antd';
const Panel = Collapse.Panel;
require('./index.css');

class NameList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      friendList:[]
    }
    this.changeUser = this.changeUser.bind(this)
  }
  changeUser(id, name, type){
    this.props.changeUserId(id, name, type)
  }

  callback=(key)=> {
    console.log(key);
  }
  
  componentDidUpdate(){
    // console.log(this.state)
  }

  componentWillReceiveProps(props){
    // console.log(props)
    this.setState({
      friendList: props.nameList
    })
  }
  render() {
    // console.log(this.props)
    const {nameList} = this.props
    // console.log(nameList)
    return (
      <div className="name-list">
        <Collapse bordered={false} defaultActiveKey={['1']} onChange={this.callback}>
          <Panel header="我的群聊" key="1">
            {(nameList.group||[]).map((item, index) => (
              <div style={{paddingTop: 5,paddingBottom: 5,}} onClick={()=>{this.changeUser(item.id, item.groupname, 2)}} key={index}>
                  <Badge size="small">
                      <Avatar shape="square" icon="user" />
                  </Badge>
                  {item.groupname}
              </div>
            ))}
          </Panel>
          <Collapse bordered={false} defaultActiveKey="2">
            <Panel header="我的好友" key="3">
              {(nameList.friend||[]).map((item, index) => (
                <Collapse bordered={false} defaultActiveKey='4' key={index}>
                  <Panel header={item.groupname} key="5">
                    {(item.list||[]).map((item, index) => (
                    <p onClick={()=>{this.changeUser(item.id, item.username, 1)}} key={index}>
                      <Badge size="small">
                      <Avatar shape="square" icon="user" />
                      </Badge>
                      {item.username}
                    </p>
                    ))}
                  </Panel>
                </Collapse>
              ))}
            </Panel>
          </Collapse>
        </Collapse>
      </div>
      
    )
  }
}


export default NameList
