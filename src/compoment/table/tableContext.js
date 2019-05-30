
// import React from 'react'
// import { Table, Input, Popconfirm, Form } from 'antd';

// const EditableContext = React.createContext();

// const EditableRow = ({ form, index, ...props }) => (
//   <EditableContext.Provider value={form}>
//     <tr {...props} />
//   </EditableContext.Provider>
// );

// const EditableFormRow = Form.create()(EditableRow);

// class EditableCell extends React.Component {
//   state = {
//     editing: false,
//   };

//   toggleEdit = () => {
//     const editing = !this.state.editing;
//     this.setState({ editing }, () => {
//       if (editing) {
//         this.input.focus();
//       }
//     });
//   };

//   save = e => {
//     const { record, handleSave } = this.props;
//     this.form.validateFields((error, values) => {
//       if (error && error[e.currentTarget.id]) {
//         return;
//       }
//       this.toggleEdit();
//       handleSave({ ...record, ...values });
//     });
//   };

//   renderCell = form => {
//     this.form = form;
//     const { children, dataIndex, record, title } = this.props;
//     const { editing } = this.state;
//     return editing ? (
//       <Form.Item style={{ margin: 0 }}>
//         {form.getFieldDecorator(dataIndex, {
//           rules: [
//             {
//               required: true,
//               message: `${title} is required.`,
//             },
//           ],
//           initialValue: record[dataIndex],
//         })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
//       </Form.Item>
//     ) : (
//       <div
//         className="editable-cell-value-wrap"
//         style={{ paddingRight: 24 }}
//         onClick={this.toggleEdit}
//       >
//         {children}
//       </div>
//     );
//   };

//   render() {
//     const {
//       editable,
//       dataIndex,
//       title,
//       record,
//       index,
//       handleSave,
//       children,
//       ...restProps
//     } = this.props;
//     return (
//       <td {...restProps}>
//         {editable ? (
//           <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
//         ) : (
//           children
//         )}
//       </td>
//     );
//   }
// }

// class EditableTable extends React.Component {
//   constructor(props) {
//     super(props);
//     this.columns = [
//       {
//         title: 'name',
//         dataIndex: 'name',
//         width: '30%',
//         editable: true,
//       },
//       {
//         title: 'age',
//         dataIndex: 'age',
//       },
//       {
//         title: 'address',
//         dataIndex: 'address',
//       },
//       {
//         title: 'operation',
//         dataIndex: 'operation',
//         render: (text, record) =>
//           this.state.dataSource.length >= 1 ? (
//             <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
//               <a href="javascript:;">Delete</a>
//             </Popconfirm>
//           ) : null,
//       },
//     ];

//     this.state = {
//       dataSource: [
//         {
//           key: '0',
//           name: 'Edward King 0',
//           age: '32',
//           address: 'London, Park Lane no. 0',
//         },
//         {
//           key: '1',
//           name: 'Edward King 1',
//           age: '32',
//           address: 'London, Park Lane no. 1',
//         },
//       ],
//       count: 2,
//     };
//   }

//   handleDelete = key => {
//     const dataSource = [...this.state.dataSource];
//     this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
//   };

//   handleAdd = () => {
//     const { count, dataSource } = this.state;
//     const { createTableinfo } = this.props.createTableinfo;
//     console.log(createTableinfo)
//     const newData = {
//       key: count,
//       name: `Edward King ${count}`,
//       age: 32,
//       address: `London, Park Lane no. ${count}`,
//     };
//     this.setState({
//       dataSource: [...dataSource, newData],
//       count: count + 1,
//     });

//     // const { createTableinfo } = this.props.createTableinfo;
//     // const newData = {
//     // //   key: count,
//     //   name: createTableinfo.name,
//     //   age: createTableinfo,
//     //   address: createTableinfo,
//     // };
//     // this.setState({
//     //   dataSource: [...dataSource, newData],
//     //   count: count + 1,
//     // });
//   };

//   handleSave = row => {
//     const newData = [...this.state.dataSource];
//     const index = newData.findIndex(item => row.key === item.key);
//     const item = newData[index];
//     newData.splice(index, 1, {
//       ...item,
//       ...row,
//     });
//     this.setState({ dataSource: newData });
//   };


//   componentWillReceiveProps(nextProps, nextState){
//     // console.log(nextProps)
//     console.log(nextState)
//     console.log(this.state.dataSource)
//     let newDataSource = this.state.dataSource.push(nextState)
//     // nextState.dataSource.push(nextProps.createTableinfo)
//     this.setState({
//         dataSource: newDataSource
//     })

//   }

//   render() {
//     const { dataSource } = this.state;

//     const components = {
//       body: {
//         row: EditableFormRow,
//         cell: EditableCell,
//       },
//     };
//     const columns = this.columns.map(col => {
//       if (!col.editable) {
//         return col;
//       }
//       return {
//         ...col,
//         onCell: record => ({
//           record,
//           editable: col.editable,
//           dataIndex: col.dataIndex,
//           title: col.title,
//           handleSave: this.handleSave,
//         }),
//       };
//     });
//     return (
//       <div>
//         {/* <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
//           Add a row
//         </Button> */}
//         <Table
//           components={components}
//           rowClassName={() => 'editable-row'}
//           bordered
//           dataSource={dataSource}
//           columns={columns}
//         />
//       </div>
//     );
//   }
// }
// export default EditableTable

// // ReactDOM.render(<EditableTable />, mountNode);

import React from 'react'
import './baseIndex.css'
import AdvancedSearchForm from '../searchForm/searchForm'

import AddUserinfo from '../modal/addUserinfo'
import { PageHeader, Button, Icon } from 'antd';
// import { Row, Col } from 'antd';
import { Table } from 'antd';

const columns = [
  {
    title: '用户名称',
    width: 200,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: '头像',
    width: 100,
    dataIndex: 'age',
    key: 'age',
    fixed: 'left',
  },
  { title: '签名', dataIndex: 'address', key: '1' },
  { title: '状态', dataIndex: 'address', key: '2' },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 130,
    render: () => <div>
      <a href="javascript:;" style={{marginRight: "20px"}}><Icon type="edit" theme="twoTone" /></a>
      <a href="javascript:;"><Icon type="delete" theme="twoTone" /></a>

    </div>,
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 40,
    address: 'London Park',
  },
  {
    key: '3',
    name: 'hahaha',
    age: 32,
    address: 'New York Park',
  },
  {
    key: '4',
    name: 'jijiji',
    age: 40,
    address: 'London Park',
  },
  {
    key: '5',
    name: 'John Brown',
    age: 32,
    address: 'New York Park',
  },
  {
    key: '6',
    name: 'Jim Green',
    age: 40,
    address: 'London Park',
  },
  {
    key: '7',
    name: 'hahaha',
    age: 32,
    address: 'New York Park',
  },
  {
    key: '8',
    name: 'jijiji',
    age: 40,
    address: 'London Park',
  },

  
];

// const Search = Input.Search;

class MyChat extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      inputValue: '',
      visible: false,
      pageName: 'BaseDataConfig'
    }

    this.addUserinfo = this.addUserinfo.bind(this)

  }

  //控制modal框隐藏和显示
  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel =() => {
    this.setState({ visible: false });
  }
  handleCreate =() => {
    this.setState({ visible: false });
  }


  addUserinfo(e){
    console.log(e)
    // console.log(this.state.data)
    let newData = this.state.data.push(e)
    console.log(newData)
    // this.setState({
    //   // data: newData
    // }, ()=> {
    //   console.log(newData)
    // })
  }

  render() {
    return (
      <div>
        <PageHeader title="用户信息列表"/>
        <div>
          <AdvancedSearchForm pageName={this.state.pageName}></AdvancedSearchForm>
        </div>
        <div className="add_btn">
          <Button type="primary" onClick={this.showModal}>
            添加
          </Button>
          <AddUserinfo onUpdata={this.addUserinfo} visible={this.state.visible} cancelModal={this.handleCancel}></AddUserinfo>
        </div>
        <div>
          <Table columns={columns} dataSource={data} scroll={{ x: 1500, y: 300  }} />
        </div>
      </div>
      
    )
  }
}
export default MyChat


