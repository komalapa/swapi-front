import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
// import { createBrowserHistory } from 'history';


import { InfoTable } from '../components/infoTable/infoTable';
import {NavTable} from '../components/navTable/navTable'
import {NotFound} from '../components/notFound/notFound'

// const history = createBrowserHistory();
//console.log(history)
//let location = history.location;
// console.log(location)
export const Main = () => 
    
    <BrowserRouter>
        {/* <Header/> */}
            <Switch>
                <Route path = '/' exact><Redirect to="/main" /></Route>
                <Route path = '/main' >
                    <NavTable title = "Main List"/>
                </Route>
                <Route path = '/infotables/:theme' exact component={InfoTable}></Route>
                {/* <Route path = '/about' component={About}/>    
                <Route path = '/contacts'>contacts page</Route>*/}
                <Route path = '/' component={NotFound}/> 
            </Switch>
    </BrowserRouter>
    
