import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export class NavTableRow extends React.Component{
    
    render()
    {
        const path = this.props.link.split('/')
        const destination = path[path.length-2]
        return(
            <tr>  
                <td>{this.props.number}</td>
                <td>{this.props.title}</td>
                <td>{this.props.link}</td>
                <td><Link to = {`/infotables/${destination}`}>link</Link></td>
            </tr>)
    }
}
    

NavTableRow.propTypes ={
    number : PropTypes.number.isRequired,
    title : PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
}
