import React from 'react';
import './notFound.css'
import r2d2 from '../../imgs/r2d2.svg'

export class NotFound extends React.Component{

    render(){
        return(
            <>  
                <div className="not-found">
                    <h1 className="not-found-header">This is not the page you're looking for</h1>
                    <img src={r2d2} alt="" className="r2d2"/>
                </div>
                
            </>
        )
    }
}
    


