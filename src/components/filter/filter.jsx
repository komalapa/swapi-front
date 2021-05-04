import React from 'react';
import PropTypes from 'prop-types';

import {Loading} from "../loading/loading"
import {InfoModal} from '../infoModal/infoModal'

import {getListByLink, getAllItemsByLink} from '../../swapiModule/swapiModule.js'

import { Select, Table, Button } from 'antd';

import './filter.css'

const { Option } = Select;


export class Filter extends React.Component{
    constructor(props){
        super(props);
        this.state = {filterData:null, list: null, filtredList: null, showModal: false}
        this.handleChange = this.handleChange.bind(this);
        this.handleShowMore = this.handleShowMore.bind(this)
    }

    componentDidMount() {
        getListByLink(this.props.filterLink)
        .then((data) => {
            this.setState(prevstate => ({
                ...prevstate,
                filterData:data.results,
            }))
        })
        .catch(()=> console.log("something wrong with request"));
        getAllItemsByLink(this.props.link)
        .then((data) => {
            this.setState(prevstate => ({
                ...prevstate,
                list:data.data,
            }))
        })
        .catch(()=> console.log("something wrong with request"));
    }

    handleChange(value) {
        //console.log(`selected ${value}`);
        //console.log(this.state.list)
        if (!value){
            this.setState(prevstate => ({
                ...prevstate,
                filtredList: null,
          }))
        } else {
        this.setState(prevstate => ({
            ...prevstate,
            filtredList: prevstate.list.filter((item) => (item.films.indexOf(value)!==-1)),
      }))
    }
    }
    handleShowMore(){
        this.setState(prevstate => ({showModal:!prevstate.showModal}))
    }
        
    render(){
        const columns = [
            {
              title: '№',
              dataIndex: 'number',
              key: 'number',
            },
            {
              title: 'Name',
              dataIndex: 'title',
              key: 'title',
            },
            {
              title: 'Action',
              key: 'action',
              dataIndex: 'action',
              render: key => { return(<InfoModal handleShowMore={this.handleShowMore} link = {key}/>)}
            },
          ];
          const data = []
        if (this.state.filtredList){
              this.state.filtredList.map((item, index) => {
                  data.push({
                    key: index,
                    number: index+1,
                    title: item.name || item.title,
                    action: item.url,
                  })
                  return item
              }  )
        }
        
        return ( 
            <>
                {/* {(!this.state.filterData || !this.state.list) && <Loading/>} */}
                {this.state.filterData && this.state.list &&
                <>
                    <Select className="filter" id="film-select" defaultValue={null}  onChange={this.handleChange}>
                        <Option className="filter-item" value={null}>--Films--</Option>
                        {this.state.filterData.map((item, index)=><Option className="filter-item" key = {index} value={item.url}>{item.title || item.name}</Option>)}
                    </Select>
                </>
                }
                {this.state.filtredList && <Table className ="filtred-table" columns={columns} dataSource={data}/>}
            </>
        )
    }
}
    

Filter.propTypes ={
    filterLink : PropTypes.string.isRequired,
    link : PropTypes.string.isRequired,
    //handleShowMore : PropTypes.func.isRequired,
}
