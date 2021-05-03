import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import { InfoTable } from '../components/infoTable/infoTable';
import {NavTable} from '../components/navTable/navTable'
import {NotFound} from '../components/notFound/notFound'

export const Main = () => 
    
    <BrowserRouter>
        {/* <Header/> */}
            <Switch>
                <Route path = '/' exact><Redirect to="/main" /></Route>
                <Route path = '/main' >
                    <NavTable title = "Main List"/>
                </Route>
                <Route path = '/infotables/:theme' exact component={InfoTable}></Route>
                <Route path = '/' component={NotFound}/> 
            </Switch>
    </BrowserRouter>
    
