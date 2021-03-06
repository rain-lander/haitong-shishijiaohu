import React from 'react'
import ChatRoom from './chatRoom/chatRoom'
import NameList from './nameList/nameList'
import WritingBox from './writingBox/writingBox'
// const io = require('socket.io-client')
// const socket = io('ws://101.92.200.103:8099');
import {  Avatar } from 'antd';

var ws = null;
require('./index.css');

class Nav extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      nameList: [],
      contentList: [],
      mainUserId: 0,
      mainUserName: "",
      mainUserType: 1,
      //临时id
      userid: 37,
      emojiHide: false,
      // mineInfo: ''
    }
    this.messageReceive = this.messageReceive.bind(this)
    this.changeUserId = this.changeUserId.bind(this)

    this.initWebSocket = this.initWebSocket.bind(this)

    this.getfriendsList = this.getfriendsList.bind(this)
    this.getContentList = this.getContentList.bind(this)
    this.messageFile = this.messageFile.bind(this)
    this.emojiHide = this.emojiHide.bind(this)
    this.emojiShow = this.emojiShow.bind(this)
  }
 

  messageReceive({value}){
    console.log(this.state)
    let newList = this.state.contentList.concat([{name: this.state.nameList.mine.username, content: value}])
    this.setState({
      contentList: newList
    })
    let sendInfo = [{
      type: this.state.mainUserType, 
      toUser: this.state.mainUserId,
      fromUser: this.state.nameList.mine.id,
      msg: value,
      roomId: 'G001'
    }]
    console.log(sendInfo)
    ws.send(JSON.stringify(sendInfo))
  }

  changeUserId(id, name, type){
    console.log(id, name, type)
    this.setState({
      mainUserId: id,
      mainUserName: name,
      mainUserType: type
    },()=> {
      this.getContentList()

    })
    // this.initWebSocket(id,'G001')

  }

  messageFile(e){
    console.log(e)
    const formData = new FormData()
    const file = e.target.files[0]
    e.target.value = ''
    formData.append('file', file)
    fetch('url',{ 
      method :"POST",
      body: formData,
      headers:{
          "Content-Type": "multipart/form-data"
      } 
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
  }

  // heartCheck = {
  //   timeout: 3000,
  //   timeoutObj: null,
  //   reset: function(){
  //       clearTimeout(this.timeoutObj);
  //       this.start();
  //       console.log('reset')
  //   },
  //   start: function(){
  //       this.timeoutObj = setTimeout(()=>{
  //         socket.send('HeartBeat')
  //         console.log('start')
  //       }, this.timeout)
  //   },
  // }

  //获取用户好友列表
  getfriendsList(){
    fetch(`/chat/${this.state.userid}/init.json`)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      if(res.code === 200){
        this.setState({
          nameList: res.data
        }, ()=> {
          console.log(this.state)
          this.initWebSocket(res.data.mine.id,'G001')
        })
      }
    })
    .catch(res => {
      console.log(res)
    })
  }

  getContentList(){
    let friendInfo = {
      sender: this.state.nameList.mine.id,
      receiver: this.state.mainUserId,
      chatType: this.state.mainUserType
    }
    console.log(friendInfo)
    
    fetch('/content/getContentList',{
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(friendInfo)
    })
    .then( res => res.json())
    .then( res => {
      console.log(res)
      if(res.code === 200){
        this.setState({
          contentList: res.data
        })
      }
    })
    
  }
  
  emojiHide(e){
    this.setState({
      emojiHide: false,
    })
  }
  emojiShow(e){
    this.setState({
      emojiHide: e.emojiShow
    })
  }

  initWebSocket(userId, roomId){
    // ws = new WebSocket("wss://echo.websocket.org");
    ws = new WebSocket(`ws://101.92.192.99:8099/websocket/${userId}|${roomId}`);

    ws.onopen = function(evt) { 
      console.log("Connection open ..."); 
      ws.send("Hello!");
    };

    ws.onmessage = function(evt) {
      console.log( "收到了: " + evt.data);
      // ws.close();
    };
    ws.onerror = function(event) {
      console.log(event)
    };
    ws.onclose = function(evt) {
      // console.log(evt)
      console.log("连接关闭");
    };
  }

  componentDidMount() {
    this.getfriendsList()
    // this.initWebSocket()
  }
  render(){
    return (
      <div className="main-box clearfix">
        <div className="onlinechat_box">
          <div className="nav">
            {
              !this.state.nameList.mine ? (null) : (
              <div className="my_icon" style={{width: 226,}}>
                <Avatar icon="user"/>
                <span>{this.state.nameList.mine.username}</span>
              </div>
              )
            }
            <div style={{paddingLeft: 30,}}>{this.state.mainUserName}</div>
          </div>
          <div className='chat-wrap'>
            <div className='message-wrap'>
              <NameList changeUserId={this.changeUserId} nameList={this.state.nameList}></NameList>
              <div className='typein-wrap' style={{position:'relative'}}>
                <ChatRoom emojiHide={this.emojiHide} messageShow={this.state.contentList}></ChatRoom>
                <WritingBox emojiShow={this.emojiShow} emojiHide={this.state.emojiHide} messageFile={this.messageFile} messageReceive={this.messageReceive}></WritingBox>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default Nav