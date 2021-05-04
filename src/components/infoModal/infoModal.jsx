import React from 'react';
import PropTypes from 'prop-types';
import {Card, Modal,Button} from 'antd';
import {digListByLink} from '../../swapiModule/swapiModule.js'

import {Loading} from "../loading/loading"
import './infoModal.css'


export class InfoModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {data:null, isModalVisible: false}
        this.handleIsShowModal = this.handleIsShowModal.bind(this)
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
    handleIsShowModal(){
        this.setState(prevstate => ({isModalVisible:!prevstate.isModalVisible}))
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
        if (this.state.isModalVisible){
            return(
                <>  
                    <Button onClick = {this.handleIsShowModal}>Show  {this.state.isModalVisible ? 'less...':'more...' }</Button>
                    {!this.state.data && <Loading/>}
                    {this.state.data &&
                        <Modal 
                            title={this.state.data.name || this.props.state.title } 
                            visible={true}  
                            onCancel={this.handleIsShowModal} 
                            footer={[
                                <Button key="back" onClick={this.handleIsShowModal}> Close </Button>
                            ]}
                        >
                            <ul className="info-modal-ul" >
                                {Object.keys(prettyData).map((title,index) => {return <li key = {index}> <b>{title}</b>: {prettyData[title]}</li>})}
                            </ul>
                        </Modal>
                        
                    }
                </>)

        } else {
            return <Button onClick = {this.handleIsShowModal}>Show  {this.state.isModalVisible ? 'less...':'more...' }</Button>
        }
        
        
    }
}
    

InfoModal.propTypes ={
    link : PropTypes.string.isRequired,
    //handleShowMore : PropTypes.func.isRequired,
}
