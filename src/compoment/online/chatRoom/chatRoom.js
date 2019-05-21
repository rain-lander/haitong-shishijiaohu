import React from 'react'

require('./index.css');

class MsgShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentDidUpdate() {
   
  }
  render() {
    var {messageShow} = this.props;
    console.log(messageShow)
    return (
      <div ref='myDiv' className='msg-show'>
        <h5>群聊</h5>
        <div className='chat_box'>
          <ul>
            {messageShow.map((item, index) => {
              if (item.msg !== '') {
                return (
                  <li key={index}>
                        <span>{item.name}:</span>
                        <div dangerouslySetInnerHTML={{
                    __html: item.content
                  }}/>
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
