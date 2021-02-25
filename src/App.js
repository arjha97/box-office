import React from 'react';
import Navs from './components/Navs';
import Home from './pages/Home';
import Starred from './pages/Starred';
import { Switch, Route } from 'react-router-dom';

const App = () => {
  return (

   <div>
     <Navs/>
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
   </div>    
  )
}

export default App

