import React from 'react';
import PropTypes from 'prop-types';
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
    componentDidMount(){
        
        for (let key in this.props.data){
            if (typeof this.props.data[key] == 'string'&&/^http*/.test(this.props.data[key])){
                this.setState( prevstate => ({
                    ...prevstate, 
                    ...prevstate.info, 
                        key:this.fetchMoreInfo(this.props.data[key])
                    
                }))
            } else if (typeof this.props.data[key] == 'array'){
                let array = this.props.data[key]
                for (let i=0; i< array.length; i++){
                    if (typeof array[i] == 'string' && /^http*/.test(array[i]) ) {
                        array[i] = 'this.fetchMoreInfo(this.props.data[key][i])'
                    }
                }
                    this.setState( prevstate => ({
                        ...prevstate, 
                        ...prevstate.info, 
                            key:array
                    
                    }))
                }
            }
        }
    
    fetchMoreInfo(link){
        fetch(link)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data && data.name){
                //console.log(data.name)
                return data.name
            }
        });
    }
    render(){
        console.log(this.state)
        console.log(this.props.data)
        return(
              
            <ul class="info-modal">
                {this.props.data && Object.keys(this.props.data).map((title,index) => { return <li key = {index}> <b>{title}</b>: {this.props.data[title]}</li>})}
            </ul>
            )
    }
}
    

InfoModal.propTypes ={
    data : PropTypes.object.isRequired,
    
}
