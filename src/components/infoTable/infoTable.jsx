import React from 'react';
import PropTypes from 'prop-types';
import {InfoTableRow} from "../infoTableRow/infoTableRow"
import {getListByLink, digListByLink, SWAPI_LINK} from '../../swapiModule/swapiModule.js'

import './infoTable.css'

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
        const path = this.props.location.pathname.split('/')
        let link =  SWAPI_LINK + path[path.length -1]
        //console.log(link)
        digListByLink(link)
        .then((data) => {
            this.setState(prevstate => ({
                ...prevstate,
                loadedData: data
            }))
            //console.log(data);
        })
        .catch(()=> console.log("something wrong with request"));
    }
      

    render()
    {
        
        
        return(
            <>  
                <h2>{this.props.title}</h2>
                <table>
                    <tbody>
                        {this.state.loadedData && this.state.loadedData.map((item, index) => <InfoTableRow key = {index} item = {item}/>)}     
                    </tbody>
                    
                </table>
            </>)
    }
}
    

InfoTable.propTypes ={
    //link : PropTypes.string.isRequired,
    //title : PropTypes.string.isRequired,
    
}
