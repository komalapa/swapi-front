import React from 'react';
import './loading.css'
import deathstar from '../../imgs/death_star.svg'

export class Loading extends React.Component{

    render()
    {
        return <img src={deathstar} alt="" className="loading"/>
    }
}
    


