import React from 'react'
import { Icon } from 'antd';
import { Card } from 'antd';
const { Meta } = Card;
require('./index.css');

class MsgShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // uploadShow: true,

    }
  }

  componentDidMount(){
    this.refs.chatScrolldiv.scrollTop = this.refs.chatListdiv.scrollHeight;
  }

  componentDidUpdate() {
    this.refs.chatScrolldiv.scrollTop = this.refs.chatListdiv.scrollHeight;
  }
  
  render() {
    var {messageShow} = this.props;
    // console.log(messageShow)
    return (
      <div ref='myDiv' className='msg-show'>
        <h5>群聊</h5>
        <div ref='chatScrolldiv' className='chat_box'>
          <ul ref='chatListdiv'>
            {messageShow.map((item, index) => {
                if (item.msg !== ''&&item.type==='1'||item.type===undefined) {
                  return (
                    <li key={index}>
                          <span className="user_name">{item.name}:</span>
                          <div dangerouslySetInnerHTML={{
                      __html: item.content
                        }}>
                          </div>
                    </li>
                  )
                }
  
                if(item.msg !== ''&&item.type==='2'){
                  return (
                    <li key={index}>
                          <span className="user_name">{item.name}:</span>
                          <div className="message_load">
                            <a href={item.url} className="message_img">
                            <Card
                              hoverable
                              style={{ width: 180 }}
                              cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                            >
                              <Meta title={item.img_name} />
                            </Card>
                            </a>
                          </div>
                    </li>
                  )
                }
  
                if(item.msg !== ''&&item.type==='3'){
                  return (
                    <li key={index}>
                          <span>{item.name}:</span>
                          <div className="message_upload">
                            <div className="message_file">
                              {/* <div className="message_flex"> */}
                                <Icon style={{fontSize: 45,marginRight:18}} type="file-word" theme="twoTone" />
                              {/* </div> */}
                              <span className="user_name message_flex">{item.file_name}</span>
                              <a className="message_flex" href={item.url} style={{marginLeft:18, fontSize:20}} download='1.doc'>
                                {/* <Icon type="down-circle" theme="twoTone" /> */}
                                <Icon type="download" />
                              </a>
                            </div>
                          </div>
                    </li>
                  )
                }
             
            })}

          </ul>
        </div>
        
      </div>
    )
  }
}

export default MsgShow
