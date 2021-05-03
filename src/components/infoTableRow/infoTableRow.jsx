import React from 'react';
import PropTypes from 'prop-types';
import {InfoModal} from '../infoModal/infoModal'
import { Button } from 'antd';

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
        return(
            <tr>  
                
                <td>{this.props.item.name || this.props.item.title}</td>
                {this.props.item.gender && this.props.item.gender === "male" ? <td className="gender-icon">&#9794;</td> : this.props.item.gender === "female" ? <td className="gender-icon">&#9792;</td> : <td></td>}
                <td>
                    {this.state.showModal && <InfoModal handleShowMore={this.handleShowMore} data = {this.props.item} link = {this.props.item.url}/>}
                    <Button onClick = {this.handleShowMore}>Show  {this.state.showModal? 'less...':'more...' }</Button>
                </td>
            </tr>)
    }
}
    

InfoTableRow.propTypes ={
    item : PropTypes.object.isRequired,
}
