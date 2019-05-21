import React from 'react'
import { Card } from 'antd';
import '../../css/moviecate.css'

const { Meta } = Card;
export default class MovieCategory extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      data: {},
      isloading: true
    }
  }

  //发送请求
  componentDidMount(){
    
  }
 
  render() {
    return ( 
      <Card
      hoverable
      cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
      >
        <Meta
          title="Europe Street beat"
          description="www.instagram.com"
        />
      </Card>
    )
  }
}