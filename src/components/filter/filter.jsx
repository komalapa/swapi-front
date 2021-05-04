import React from 'react';
import PropTypes from 'prop-types';

import {Loading} from "../loading/loading"

import {getListByLink, getAllItemsByLink} from '../../swapiModule/swapiModule.js'

import { Select } from 'antd';

const { Option } = Select;


export class Filter extends React.Component{
    constructor(props){
        super(props);
        this.state = {filterData:null, list: null, filtredList: null}
        this.handleChange = this.handleChange.bind(this)
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
        getAllItemsByLink()
        .then((data) => {
            this.setState(prevstate => ({
                ...prevstate,
                list:data.data,
            }))
        })
        .catch(()=> console.log("something wrong with request"));
    }

    handleChange(value) {
        console.log(`selected ${value}`);
        console.log(this.state.list)
        if (!value){
            this.setState(prevstate => ({
                ...prevstate,
                filtredList: prevstate.list,
          }))
        } else {
        this.setState(prevstate => ({
            ...prevstate,
            filtredList: prevstate.list.filter((item) => (item.films.indexOf(value)!==-1)),
      }))
    }
    }
        
    render(){
        
        console.log(this.state)
        return ( 
            <>
                {!this.state.filterData && <Loading/>}
                {this.state.filterData &&
                    <Select defaultValue={null} style={{ width: 120 }} onChange={this.handleChange}>
                        <Option value={null}>all</Option>
                        {this.state.filterData.map((item, index)=><Option key = {index} value={item.url}>{item.title || item.name}</Option>)}
                    </Select>
                }
            </>
        )
    }
}
    

Filter.propTypes ={
    filterLink : PropTypes.string.isRequired,
    //handleShowMore : PropTypes.func.isRequired,
}
