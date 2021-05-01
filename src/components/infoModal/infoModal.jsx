import React from 'react';
import PropTypes from 'prop-types';
import {getListByLink, digListByLink, SWAPI_LINK} from '../../swapiModule/swapiModule.js'
//components import
//end components import
import './infoModal.css'


//const CONST_ROBOT_NAME="Hercule"
//console.log(CONST_ROBOT_NAME)
export class InfoModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {info:this.props.data}
    }
        
    render(){
        console.log(this.state)
        console.log(this.props.data)
        return(
        <div className="info-modal" >      
            <button className="info-modal-close" onClick={this.props.handleShowMore}>&#10007;close</button>
            <ul className="info-modal-ul" >
                {this.props.data && Object.keys(this.props.data).map((title,index) => { return <li key = {index}> <b>{title}</b>: {this.props.data[title]}</li>})}
            </ul>
        </div>    )
    }
}
    

InfoModal.propTypes ={
    data : PropTypes.object.isRequired,
    handleShowMore : PropTypes.func.isRequired,
}
