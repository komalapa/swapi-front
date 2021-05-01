import React from 'react';
import PropTypes from 'prop-types';
import {NavTableRow} from "../navTableRow/navTableRow"
import {getListByLink, digListByLink} from '../../swapiModule/swapiModule.js'
//components import
//end components import
//import './table.css'


//const CONST_ROBOT_NAME="Hercule"
//console.log(CONST_ROBOT_NAME)
export class NavTable extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {loadedData: null};
    }
    
    componentDidMount() {
        
        getListByLink()
        .then((data) => {
            this.setState({
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
                        <tr>
                            <th>№</th>
                            <th>Название категории</th>
                            <th>Ссылка</th>
                            <th>В путь!</th>
                        </tr>
                            
                        
                            {
                                this.state.loadedData && Object.keys(this.state.loadedData).map((key, index) =>{
                                    return <NavTableRow key = {index} number = {index+1} title = {key} link = {this.state.loadedData[key]}/>
                                })
                            
                            }        
                            
                        
                    </tbody>
                    
                </table>
            </>)
    }
}
    

NavTable.propTypes ={
    title : PropTypes.string.isRequired,
}
