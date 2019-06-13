import React from 'react'
import ChatRoom from './chatRoom/chatRoom'
import NameList from './nameList/nameList'
import WritingBox from './writingBox/writingBox'
// const io = require('socket.io-client')
// const socket = io('ws://101.92.200.103:8099');
import {  Avatar } from 'antd';

var socket = null;
require('./index.css');

class Nav extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      nameList: [],
      contentList: [
        // { 
        //   type: '1', 
        //   name: '小明', 
        //   content: '沙发！！！'
        // },
        // { 
        //   type: '1', 
        //   name: '井柏然', 
        //   content: '小明，居然是你' 
        // },
        // //图片
        // { 
        //   type: '2',
        //   name: '范冰冰',
        //   img_name: "1.jpg",
        //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',

        //  },
        //  //文件
        //  { 
        //   type: '3',
        //   name: '范冰冰',
        //   file_name: "888.doc",
        //   url: './index.css',
        //  },
        //  //图片
        // { 
        //   type: '2',
        //   name: '范冰冰',
        //   img_name: "1.jpg",
        //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',

        //  },
        //  //文件
        //  { 
        //   type: '3',
        //   name: '范冰冰',
        //   file_name: "888.doc",
        //   url: './index.css',
        //  },
      ],
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
    this.websocketonopen = this.websocketonopen.bind(this)
    this.websocketonerror = this.websocketonerror.bind(this)
    this.websocketonmessage = this.websocketonmessage.bind(this)
    this.websocketclose = this.websocketclose.bind(this)

    this.getfriendsList = this.getfriendsList.bind(this)
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
    // if(socket.readyState===1){
      socket.send(JSON.stringify(sendInfo))
    // }
  }

  changeUserId(id, name, type){
    console.log(id, name)
    this.setState({
      mainUserId: id,
      mainUserName: name,
      mainUserType: type
    })
    this.initWebSocket(id,'G001')

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
  //初始化socket配置
  initWebSocket(userId, roomId) {
    // /websocket/{ro_user}
    // ro_user: userId|roomId 
    // wss://echo.websocket.org/
    // const wsuri = `wss://echo.websocket.org`; //ws地址

    const wsuri = `ws://101.92.192.99:8099/websocket/${userId}|${roomId}`; //ws地址
    socket = new WebSocket(wsuri);
    socket.onopen = this.websocketonopen();
    socket.onerror = this.websocketonerror();
    socket.onmessage = this.websocketonmessage();
    socket.onclose = this.websocketclose();
    
  }
  websocketonopen() {
    // socket.send("Hello WebSockets!")
    console.log("WebSocket连接成功");
    this.heartCheck.start();
    // console.log(this.heartCheck)
  }
  websocketonmessage(e) {
    // let msgJson = JSON.parse(e.data)
    console.log(e)
  }
  websocketonerror(e) {
    console.log(e)
    //错误
    console.log("WebSocket连接发生错误");
  }
  websocketclose() {
    console.log("连接已关闭")
    this.heartCheck.reset()
  }

  heartCheck = {
    timeout: 3000,
    timeoutObj: null,
    reset: function(){
        clearTimeout(this.timeoutObj);
        this.start();
        console.log('reset')
    },
    start: function(){
        this.timeoutObj = setTimeout(()=>{
          socket.send('HeartBeat')
          console.log('start')
        }, this.timeout)
    },
  }

  //获取用户好友列表
  getfriendsList(){
    // console.log(this.heartCheck)
    // this.heartCheck.reset()
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
  componentWillUpdate(){
    
  }
  componentDidMount() {
    this.getfriendsList()
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