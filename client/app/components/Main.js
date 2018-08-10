import React from "react";

import { Switch, Route } from 'react-router-dom';
import Home from './Home/Home';
import EventDetailsAdmin from "./EventDetailsAdmin/EventDetailsAdmin";
import HelloWorld from "./HelloWorld/HelloWorld";



const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/helloworld" component={HelloWorld}/>
      <Route component={EventDetailsAdmin}/>
    </Switch>
  </main>
)

export default Main;
