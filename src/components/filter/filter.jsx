import React from 'react';
import PropTypes from 'prop-types';
import { Select, Table, Button, Modal } from 'antd';

import {InfoModal} from '../infoModal/infoModal'
import {getListByLink, getAllItemsByLink} from '../../swapiModule/swapiModule.js'

import './filter.css'

const { Option } = Select;

export class Filter extends React.Component{
    constructor(props){
        super(props);
        this.state = {filterData:null, list: null, filtredList: null, showModal: false, filterValue:null}
        this.handleChange = this.handleChange.bind(this);
        this.handleShowMore = this.handleShowMore.bind(this);
        this.handleHideTable = this.handleHideTable.bind(this)
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
        if (!value){
            this.setState(prevstate => ({
                ...prevstate,
                filtredList: null,
                filterValue:null,
            }))
        } else {
            this.setState(prevstate => ({
                ...prevstate,
                filtredList: prevstate.list.filter((item) => (item.films.indexOf(value)!==-1)),
                filterValue: value,
            }))
        }
    }

    handleShowMore() {
        this.setState(prevstate => ({
            ...prevstate,
            showModal:!prevstate.showModal
        }))
    }

    handleHideTable(){
        this.setState(prevstate => ({
            ...prevstate,
            filtredList: null,
            filterValue:null,
        }))
    }

    componentWillUnmount(){
        this.setState = (state,callback)=>{
            return;
        }
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
            })
        }
        
        return ( 
            <div className = "filter-wrp">
                {/* {(!this.state.filterData || !this.state.list) && <Loading/>} */}
                {this.state.filterData &&
                <>
                    <Select className="filter" id="film-select" aria-label = "select film for filter"  defaultValue={null} value = {this.state.filterValue} onChange={this.handleChange} disabled = {!this.state.list}>
                        <Option className="filter-item" value={null} aria-label = "all films">--Films--</Option>
                        {this.state.filterData.map((item, index)=><Option className="filter-item" key = {index} value={item.url} aria-label = {item.title}>{item.title || item.name} </Option>)}
                    </Select>
                </>
                }
                {this.state.filtredList &&
                    <Modal 
                            title={this.state.filterData.find((item => (item.url === this.state.filterValue))).title} 
                            visible={true}  
                            onCancel={this.handleHideTable} 
                            footer={[
                                <Button key="back" onClick={this.handleHideTable}> Close </Button>
                            ]}
                        >
                            <Table className ="filtred-table" columns={columns} dataSource={data} showHeader={false}/> 
                    </Modal>
                }
            </div>
        )
    }
}
    

Filter.propTypes ={
    filterLink : PropTypes.string.isRequired,
    link : PropTypes.string.isRequired,
    //handleShowMore : PropTypes.func.isRequired,
}
