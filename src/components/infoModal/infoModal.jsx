import React from 'react';
import PropTypes from 'prop-types';
import {Card} from 'antd';
import {digListByLink} from '../../swapiModule/swapiModule.js'

import {Loading} from "../loading/loading"
import './infoModal.css'


export class InfoModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {data:null}
    }

    componentDidMount() {
        digListByLink(this.props.link)
        .then((data) => {
            this.setState(prevstate => ({
                ...prevstate,
                data:{...data},
            }))
        })
        .catch(()=> console.log("something wrong with request"));
    }
        
    render(){
        let prettyData ={}
        if (this.state.data){
            
            for (let key in this.state.data){
                if (Array.isArray(this.state.data[key])){
                    prettyData[key] = this.state.data[key].join(', ')
                }else{
                    prettyData[key] = this.state.data[key]
                }
            }
        }
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
    }
}
    

InfoModal.propTypes ={
    link : PropTypes.string.isRequired,
    handleShowMore : PropTypes.func.isRequired,
}
