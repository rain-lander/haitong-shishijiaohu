import React from 'react'
import ChatRoom from './chatRoom/chatRoom'
import NameList from './nameList/index'
import WritingBox from './writingBox/index'

require('./index.css');

class Nav extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      nameList: [
        {id: 0, name: '小明'},
        {id: 1, name: '井柏然'},
        {id: 2, name: '范冰冰'},
        {id: 3, name: '王五'},
        {id: 4, name: '康熙'},
        {id: 5, name: '鹿晗'},
        {id: 6, name: '尔康'},

      ],
      contentList: [
        { name: '小明', content: '沙发！！！' },
        { name: '井柏然', content: '小明，居然是你' },
        { name: '范冰冰', content: '小明，放学你别走！！！' },
      ],
      mainUserId: 0,
      mainUserName: "",

    }
    this.messageReceive = this.messageReceive.bind(this)
    this.changeUserId = this.changeUserId.bind(this)
  }
 

  messageReceive({value}){
    this.state.contentList.push({name: this.state.mainUserName, content: value})
    // console.log(this.state.contentList)
    this.setState({
    })
  }

  changeUserId(id, name){
    this.setState({
      mainUserId: id,
      mainUserName: name
    })
  }

  componentWillMount(){
    if(this.state.mainUserName===''){
      this.state.mainUserName = this.state.nameList[0].name
    }
  }
  render(){
    return (
      <div className="main-box">
        <div className="nav">
          <span>Welcome, {this.state.mainUserName}！</span>
        </div>
        <div className='chat-wrap'>
          <div className='message-wrap'>
            <NameList changeUserId={this.changeUserId} nameList={this.state.nameList}></NameList>
            <div className='typein-wrap'>
              <ChatRoom messageShow={this.state.contentList}></ChatRoom>

              {/* {emojify('Easy! :wink: 😸 :D  ^__^')} */}
              <WritingBox messageReceive={ this.messageReceive }></WritingBox>
            </div>
          </div>
        </div>
      </div>
      
    )
  }
}
// Nav.defaultProps={
//   mainUserId: 0,
//   mainUserName: "小明",
// };

export default Nav