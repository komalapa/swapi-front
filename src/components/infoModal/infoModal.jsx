import React from 'react';
import PropTypes from 'prop-types';
import {Card} from 'antd';
import {filterByFilms,digListByLink2, getListByLink, SWAPI_LINK} from '../../swapiModule/swapiModule.js'
//components import
//end components import
import {Loading} from "../loading/loading"
import './infoModal.css'


//const CONST_ROBOT_NAME="Hercule"
//console.log(CONST_ROBOT_NAME)
export class InfoModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {data:null}
    }

    componentDidMount() {
        
        //console.log(link)
        digListByLink2(this.props.link)
        .then((data) => {
            this.setState(prevstate => ({
                ...prevstate,
                data:{...data},
            }))
        })
        .catch(()=> console.log("something wrong with request"));
    }
        
    render(){
        console.log("state",this.state.data )
        let prettyData ={}
        if (this.state.data){
            
            for (let key in this.state.data){
                console.log(typeof this.state.data[key])
                if (Array.isArray(this.state.data[key])){
                    console.log('array')
                    prettyData[key] = this.state.data[key].join(', ')
                }else{
                    prettyData[key] = this.state.data[key]
                }
            }
        }
        //console.log(this.state)
        //console.log(this.props.data)
        return(
            <>
                {!this.state.data && <Loading/>}
                {this.state.data &&
                    <Card title={this.state.data.name || this.props.state.title } >
                        <ul className="info-modal-ul" >
                            {Object.keys(prettyData).map((title,index) => {return <li key = {index}> <b>{title}</b>: {prettyData[title]}</li>})}
                        </ul>
                        <button className="info-modal-close" onClick={this.props.handleShowMore}>&#10007;close</button>
                    </Card>
                }
            </>
        )
        // <div className="info-modal" >      
        //     <button className="info-modal-close" onClick={this.props.handleShowMore}>&#10007;close</button>
        //     <ul className="info-modal-ul" >
        //         {this.props.data && Object.keys(this.props.data).map((title,index) => { return <li key = {index}> <b>{title}</b>: {this.props.data[title]}</li>})}
        //     </ul>
        // </div>    )
    }
}
    

InfoModal.propTypes ={
    data : PropTypes.object.isRequired,
    handleShowMore : PropTypes.func.isRequired,
}
