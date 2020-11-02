import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import ShowPeoplePage from './pages/ShowPeoplePage'

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path={'/'} component={ShowPeoplePage}/>
        </Switch>
    </Router>
)

export default Routes