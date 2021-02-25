import React from 'react';
import Home from './pages/Home';
import Starred from './pages/Starred';
import { Switch, Route } from 'react-router-dom';

const App = () => {
  return (
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>

        <Route exact path="/starred">
          <Starred/>
        </Route>

        <Route>
          Not Found
        </Route>
      </Switch>   
  )
}

export default App

