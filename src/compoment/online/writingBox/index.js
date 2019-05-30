import React from 'react'
import { Icon } from 'antd';
import EmojiPicker from 'emoji-picker-react';

import JSEMOJI from 'emoji-js';

const jsemoji = new JSEMOJI();

require('./index.css');

class TypeIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      emojiShow: false,
      
    };
    this.messageSend = this.messageSend.bind(this);
    this.messageType = this.messageType.bind(this);
    this.handleDown = this.handleDown.bind(this);
    this.handleUp = this.handleUp.bind(this);
    this.handlePress = this.handlePress.bind(this);

    this.changeEmojiShow = this.changeEmojiShow.bind(this)
    this.emojiEdit = this.emojiEdit.bind(this)
    this.hideEmoji = this.hideEmoji.bind(this)

    this.changeUploadShow = this.changeUploadShow.bind(this)

  }
  messageType(e) {
    this.setState({
      text: e.target.value
    });
  }
  messageSend(e) {
    this.setState({
      text: ''
    });
    let value = this.refs.myInput.value;
    // console.log(value)
    this.props.messageReceive({value})
    this.setState({
      emojiShow: false

    })
  }
  handleDown(e) {
    if (e.keyCode === 13) {
      if (!e.ctrlKey) {
        e.preventDefault();
        this.refs.myButton.click();
      } else {
        this.setState((prevState) => {
          return {
            text: prevState.text + '\n'
          }
        });
      }
    }
  }
  handleUp(e) {
    if (e.keyCode === 13 && !e.ctrlKey) {
      e.preventDefault();
    }
    let scrollTop = this.refs.myInput.scrollHeight - this.refs.myInput.offsetHeight;
    this.refs.myInput.scrollTop = scrollTop;
  }
  handlePress(e) {
    if (e.keyCode === 13 && !e.ctrlKey) {
      e.preventDefault();
    }
  }

  changeEmojiShow(){
    this.setState({
      emojiShow: !this.state.emojiShow
    })

  }
  emojiEdit(o, e){
    let emoji_icon = jsemoji.replace_colons(`:${e.name}:`);
    this.setState({
      text: this.state.text+emoji_icon
    })
  }

  hideEmoji(){
    this.setState({
      emojiShow: false
    })
  }

  changeUploadShow(){
    this.setState({
      uploadShow: !this.state.emojiShow
    })
  }
  
  render() {
    return (
      <div className="text-box">
        <div className="emoji_btn">
          <span className="emoji_icon" onClick={this.changeEmojiShow}>
            <Icon type="smile" theme="twoTone" />
          </span>
          <span className="file_icon" onClick={this.changeUploadShow}>
            <Icon type="folder" theme="twoTone" />
          </span>
        </div>
        {/* 是否展示emoji盒子 */}
        {
          !this.state.emojiShow ? (null) : (
              <EmojiPicker onEmojiClick={this.emojiEdit}/>
          )
        }
        
        <div className='type-in'  onClick={this.hideEmoji}>
          <textarea ref="myInput" onKeyUp={this.handleUp} onChange={this.messageType} onKeyDown={this.handleDown} value={this.state.text} onKeyPress={this.handlePress}>
          </textarea>
          <button onClick={this.messageSend} ref="myButton">
            {/* <img src="../../../images/send.svg"/> */}
            
          </button>
        </div>
      </div>

    )
  }
}

export default TypeIn
