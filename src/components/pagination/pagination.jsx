import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import './pagination.css'

const PAGE_SIZE = 10 //fixed by swapi

export class Pagination extends React.Component{
    handleLoadPage = (link, index)=>() => {
        this.setState(prevstate => ({...prevstate, curPage: index+1}))
        this.props.loadAnyPage(link)
    }

    render()
    {
        let curPageInd = 0;
        if (this.props.prevPage){
            curPageInd = +this.props.prevPage.split('?page=')[1]
        }
        
        if (this.props.link.includes('?page')){console.log("PROBLEM")}
        let links = [this.props.link];
        for (let i = 11; i < this.props.numberOfItems ; i+=PAGE_SIZE){
            links.push(this.props.link+'?page='+(Math.floor(i/PAGE_SIZE)+1))
        }
        return(
            <div className="table-pagination">
                <Button className="table-pagination-button" onClick={this.handleLoadPage(this.props.prevPage)} disabled = {!this.props.prevPage}>prev</Button>
                {links.map((link, index)=><Button className="table-pagination-button" key = {index} onClick = {this.handleLoadPage(link, index)} disabled = {index===curPageInd}>{index+1}</Button> )}
                <Button className="table-pagination-button" onClick={this.handleLoadPage(this.props.nextPage)} disabled = {!this.props.nextPage}>next</Button>
            </div>
        )
    }
}
    

Pagination.propTypes ={
    link : PropTypes.string.isRequired,
    numberOfItems: PropTypes.number.isRequired,
    loadAnyPage:PropTypes.func.isRequired,
    prevPage: PropTypes.string,
    nextPage: PropTypes.string,
    
}
