import React from 'react'

require('./index.css');

class NameList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: ''
    }
    this.changeUser = this.changeUser.bind(this)
  }
  changeUser(id, name){
    // this.setState({
    //   userId: id
    // })
    this.props.changeUserId(id, name)
  }
  // shouldComponentUpdate(prev, next){
  //   console.log(prev.userId,'----', next.userId)
  //   return next.userId === 2
  // }
  componentDidUpdate(){
    // console.log(this.state)
  }
  render() {
    var {nameList} = this.props;
    // console.log(nameList)
    return (
      <ul className='name-list'>
        <li className='name-list-title'>在线用户:</li>
        {nameList.map((item, index) => (
          <li onClick={()=>{this.changeUser(item.id, item.name)}} key={index}>{item.name}</li>
        ))}
      </ul>
    )
  }
}


export default NameList
