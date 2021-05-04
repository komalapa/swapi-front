import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {Loading} from "../loading/loading"
import {getListByLink} from '../../swapiModule/swapiModule.js'
import { Table} from 'antd';

export class NavTable extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {loadedData: null};
    }
    
    componentDidMount() {
        
        getListByLink()
        .then((data) => {
            this.setState({
                loadedData: data
            })
        });
    }
      
    componentWillUnmount(){
      this.setState = (state,callback)=>{
          return;
      }
  }
    render()
    {
        const columns = [
            {
              title: '№',
              dataIndex: 'number',
              key: 'number',
            },
            {
              title: 'Title',
              dataIndex: 'title',
              key: 'title',
            },
            {
              title: 'Link',
              dataIndex: 'link',
              key: 'link',
            },
            {
              title: 'Action',
              key: 'action',
              dataIndex: 'action',
              render: key => (<Link to = {'/infotables/'+key}>Open page</Link>)
            },
          ];
          const data = []
          for (let key in this.state.loadedData){
              data.push({
                key: data.length,
                number: data.length+1,
                title: key,
                link: this.state.loadedData[key],
                action: key,
              })
          }  
          
        return(
            <>  
                {!this.state.loadedData && <Loading/>} 
                <h1>{this.props.title}</h1>
                <Table columns={columns} dataSource={data} pagination={false}/>
            </>)
    }
}
    

NavTable.propTypes ={
    title : PropTypes.string.isRequired,
}
