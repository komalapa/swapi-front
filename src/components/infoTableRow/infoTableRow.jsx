import React from 'react';
import PropTypes from 'prop-types';
import {InfoModal} from '../infoModal/infoModal'
//components import
//end components import
//import './table.css'


//const CONST_ROBOT_NAME="Hercule"
//console.log(CONST_ROBOT_NAME)
export class InfoTableRow extends React.Component{
    constructor(props){
        super(props);
        this.state = {showModal: false}
        this.handleShowMore = this.handleShowMore.bind(this)
    }
    handleShowMore(){
        this.setState(prevstate => ({showModal:!prevstate.showModal}))
    }
    render()
    {
        //console.log(this.props)
        return(
            <tr>  
                
                <td>{this.props.item.name}</td>
                {this.props.item.gender && <td>{this.props.item.gender}</td>}
                <td>
                    {this.state.showModal && <InfoModal data = {this.props.item}/>}
                    <button onClick = {this.handleShowMore}>Show  {this.state.showModal? 'less...':'more...' }</button>
                </td>
            </tr>)
    }
}
    

InfoTableRow.propTypes ={
    item : PropTypes.object.isRequired,
}
