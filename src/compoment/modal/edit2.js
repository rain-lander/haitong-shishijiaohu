import React from 'react';
import 'antd/dist/antd.css';
import { Modal, Form, Input, message } from 'antd';
import { Row, Col, Button, Upload, Icon, Select} from 'antd';
const { Option } = Select;
class editPage extends React.Component {
  state = {
    fileList: [
      {
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: 'http://www.baidu.com/xxx.png',
      },
    ],
  };

  handleChange = info => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1);
    fileList = fileList.map(file => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });

    this.setState({ fileList });
  };

  render() {
    const props = {
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      onChange: this.handleChange,
      multiple: true,
    };
    return (
      <Upload {...props} fileList={this.state.fileList}>
        <Button>
          <Icon type="upload" />更换图片
        </Button>
      </Upload>
      
    );
  }
}

                {/* {this.state.fileList.length > 0 && showUpload!=='1'? (null):(
                  <div className="jia_filepic">
                    <div className="filepic clearfix">
                      <div className="fl left_img">
                        <div className="img_box">
                          <img alt="example" src={showEditModal.item.avatar} />
                        </div>
                      </div>
                      <span className="fr right_txt">
                        touxiang.png
                      </span>

                    </div> 
                  </div> 
                          
                )} */}
                       
export default editPage

// ReactDOM.render(<MyUpload />, mountNode);