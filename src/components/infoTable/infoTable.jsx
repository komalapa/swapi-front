import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {InfoTableRow} from "../infoTableRow/infoTableRow"
import {Loading} from "../loading/loading"
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
        this.state = {loadedData: null, nextPage:null, prevPage:null, count: 0, title:null};
        this.handleNextPage = this.handleNextPage.bind(this)
        this.handlePrevPage = this.handlePrevPage.bind(this)
    }
    
    componentDidMount() {
        const path = this.props.location.pathname.split('/')
        let link =  SWAPI_LINK + path[path.length -1]
        //console.log(link)
        digListByLink(link)
        .then((data) => {
            this.setState(prevstate => ({
                ...prevstate,
                title: path[path.length -1],
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
                <table>
                    <tbody>
                        {this.state.loadedData && this.state.loadedData.map((item, index) => <InfoTableRow key = {index} item = {item}/>)}     
                    </tbody>
                    
                </table>
                
                {this.state.prevPage && <Button onClick={this.handlePrevPage}>prev</Button>}
                {this.state.nextPage && <Button onClick={this.handleNextPage}>next</Button>}
                <Link to="/main">Back</Link>
            </>)
    }
}
    

InfoTable.propTypes ={
    //link : PropTypes.string.isRequired,
    //title : PropTypes.string.isRequired,
    
}
