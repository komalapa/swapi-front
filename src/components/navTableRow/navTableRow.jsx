import React from 'react';
import PropTypes from 'prop-types';
//components import
//end components import
//import './table.css'


//const CONST_ROBOT_NAME="Hercule"
//console.log(CONST_ROBOT_NAME)
export class NavTableRow extends React.Component{
    
    render()
    {
        //console.log(this.props)
        return(
            <tr>  
                <td>{this.props.number}</td>
                <td>{this.props.title}</td>
                <td>{this.props.link}</td>
                <td><a href="#">link</a></td>
            </tr>)
    }
}
    

NavTableRow.propTypes ={
    number : PropTypes.number.isRequired,
    title : PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
}
