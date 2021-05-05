import React from 'react';
import { Link } from 'react-router-dom';

import {InfoTableRow} from "../infoTableRow/infoTableRow"
import {Loading} from "../loading/loading"
import {Pagination} from "../pagination/pagination"
import {Filter} from "../filter/filter"

import {getListByLink, SWAPI_LINK} from '../../swapiModule/swapiModule.js'

import './infoTable.css'

export class InfoTable extends React.Component{    
    constructor(props) {
        super(props);
        const path = props.location.pathname.split('/')
        let link =  SWAPI_LINK + path[path.length -1]
        this.state = {loadedData: null, nextPage:null, prevPage:null, count: 0, title:path[path.length -1], link: link};
        this.handleAnyPage = this.handleAnyPage.bind(this)
    }
    
    componentDidMount() {
        getListByLink(this.state.link)
        .then((data) => {
            this.setState(prevstate => ({
                ...prevstate,
                loadedData: data.results,
                nextPage: data.next,
                prevPage:data.previous,
                count: data.count
            }))
        })
        .catch(()=> console.log("something wrong with request"));
    }

    handleAnyPage(link){
        this.setState(prevstate => ({
            ...prevstate,
            loadedData: null,
        }))
    
        getListByLink(link)
        .then((data) => {
            this.setState(prevstate => ({
                ...prevstate,
                loadedData: data.results,
                nextPage: data.next,
                prevPage:data.previous,
            }))
        })
        .catch(()=> console.log("something wrong with request")); 
    }

    componentWillUnmount(){
        this.setState = (state,callback)=>{
            return;
        }
    }

    render(){
        return(
            <> 
            {!this.state.loadedData && <Loading/>} 
                <h1>{this.state.title}</h1>
                <div className="header-controls-wrp">
                    <Link to="/main" className="back-to-main starwars-font">Back to the main list</Link>
                    {this.state.title!=="films" && <Filter filterLink = {SWAPI_LINK+'films'} link = {this.state.link}/>}
                </div>
                
                <table className="info-table">
                    <tbody>
                        {this.state.loadedData && this.state.loadedData.map((item, index) => <InfoTableRow key = {index} item = {item}/>)}     
                    </tbody>
                    
                </table>
                {this.state.loadedData && 
                    <div className="page-controls">
                        {this.state.count>10 && <Pagination  link = {this.state.link} numberOfItems = {this.state.count} loadAnyPage={this.handleAnyPage} nextPage={this.state.nextPage} prevPage={this.state.prevPage}/>}
                    </div>
                } 
            </>)
    }
}
    


