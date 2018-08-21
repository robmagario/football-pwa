import React from "react";

import { Switch, Route } from 'react-router-dom';
import Home from './Home/Home';
import EventDetailsAdmin from "./EventDetailsAdmin/EventDetailsAdmin";
import EventListAdmin from "./EventListAdmin/EventListAdmin"
import HelloWorld from "./HelloWorld/HelloWorld";
import Login from "./Login";




const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/helloworld" component={HelloWorld}/>
      <Route path="/members/login" component={Login}/>
      <Route path="/events" component={EventListAdmin}/>
      <Route path="/" component={EventDetailsAdmin}/>

    </Switch>
  </main>
)

export default Main;
