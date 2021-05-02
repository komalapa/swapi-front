import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {InfoTableRow} from "../infoTableRow/infoTableRow"
import {Loading} from "../loading/loading"
import {Pagination} from "../pagination/pagination"
import {filterByFilms,digListByLink, SWAPI_LINK} from '../../swapiModule/swapiModule.js'

import { Button } from 'antd';

import './infoTable.css'

//components import
//end components import
//import './table.css'


//const CONST_ROBOT_NAME="Hercule"
//console.log(CONST_ROBOT_NAME)
export class InfoTable extends React.Component{
    
    constructor(props) {
        super(props);
        const path = props.location.pathname.split('/')
        let link =  SWAPI_LINK + path[path.length -1]
        this.state = {loadedData: null, nextPage:null, prevPage:null, count: 0, title:path[path.length -1], link: link};
        this.handleNextPage = this.handleNextPage.bind(this)
        this.handlePrevPage = this.handlePrevPage.bind(this)
        this.handleAnyPage = this.handleAnyPage.bind(this)
    }
    
    componentDidMount() {
        
        //console.log(link)
        digListByLink(this.state.link)
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
        digListByLink(link)
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
    handleNextPage(){
        this.setState(prevstate => ({
            ...prevstate,
            loadedData: null,
        }))
        digListByLink(this.state.nextPage)
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
    handlePrevPage(){
        this.setState(prevstate => ({
            ...prevstate,
            loadedData: null,
        }))
        digListByLink(this.state.prevPage)
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
    // handletest(){
    //     filterByFilms()
    // }
    render()
    {
        
        //console.log(this.state)
        return(
            <> 
            {!this.state.loadedData && <Loading/>} 
            {/* <button onClick={this.handletest}>test</button> */}
                <h1>{this.state.title}</h1>
                <Link to="/main" className="back-to-main starwars-font">Back to the main list</Link>

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
    

InfoTable.propTypes ={
    //link : PropTypes.string.isRequired,
    //title : PropTypes.string.isRequired,
    
}
