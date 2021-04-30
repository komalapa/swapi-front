import React from 'react';
import PropTypes from 'prop-types';
import {InfoTableRow} from "../infoTableRow/infoTableRow"
import {getListByLink, digListByLink} from '../../swapiModule/swapiModule.js'
//components import
//end components import
//import './table.css'


//const CONST_ROBOT_NAME="Hercule"
//console.log(CONST_ROBOT_NAME)
export class InfoTable extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {loadedData: null};
    }
    
    componentDidMount() {
        
        digListByLink(this.props.link)
        .then((data) => {
            this.setState({
                ...this.state,
                loadedData: data
            })
            //console.log(data);
        });
    }
      

    render()
    {
        //console.log(this.state.loadedData)
        return(
            <>  
                <h2>{this.props.title}</h2>
                <table>
                    <tbody>
                        {this.state.loadedData && this.state.loadedData.map(item => <InfoTableRow item = {item}/>)} 
                            
                        
                    </tbody>
                    
                </table>
            </>)
    }
}
    

InfoTable.propTypes ={
    link : PropTypes.string.isRequired,
    title : PropTypes.string.isRequired,
    
}
