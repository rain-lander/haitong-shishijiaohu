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
        { 
          type: '1', 
          name: '小明', 
          content: '沙发！！！'
        },
        { 
          type: '1', 
          name: '井柏然', 
          content: '小明，居然是你' 
        },
        //图片
        { 
          type: '2',
          name: '范冰冰',
          img_name: "1.jpg",
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',

         },
         //文件
         { 
          type: '3',
          name: '范冰冰',
          file_name: "888.doc",
          url: './index.css',
         },
         //图片
        { 
          type: '2',
          name: '范冰冰',
          img_name: "1.jpg",
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',

         },
         //文件
         { 
          type: '3',
          name: '范冰冰',
          file_name: "888.doc",
          url: './index.css',
         },
      ],
      mainUserId: 0,
      mainUserName: "",

    }
    this.messageReceive = this.messageReceive.bind(this)
    this.changeUserId = this.changeUserId.bind(this)
  }
 

  messageReceive({value}){
    let newList = this.state.contentList.concat([{name: this.state.mainUserName, content: value}])
    this.setState({
      contentList: newList
    })
  }

  changeUserId(id, name){
    this.setState({
      mainUserId: id,
      mainUserName: name
    })
  }

  uploadFile(e){
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
    // if(file) dispatch({ type:'upload', file })
}

  componentWillMount(){
    if(this.state.mainUserName===''){
      // this.state.mainUserName = this.state.nameList[0].name
      this.setState({
        mainUserName: this.state.nameList[0].name
      })
    }
  }
  render(){
    // console.log(fetch)
    return (
      <div className="main-box">
        <div className="nav">
          <span>Welcome, {this.state.mainUserName}！</span>
        </div>
        <div className='chat-wrap'>
          <div className='message-wrap'>
            <NameList changeUserId={this.changeUserId} nameList={this.state.nameList}></NameList>
            <div className='typein-wrap' style={{position:'relative'}}>
              <ChatRoom messageShow={this.state.contentList}></ChatRoom>
              <input type="file" name="file" className="upload_input" onChange={this.uploadFile} ref={this.inputRef}/>
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