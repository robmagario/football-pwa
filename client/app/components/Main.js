import React from "react";

import { Switch, Route } from 'react-router-dom';
import Home from './Home/Home';
import EventDetailsAdmin from "./EventDetailsAdmin/EventDetailsAdmin";
import EventListAdmin from "./EventListAdmin/EventListAdmin";
import HelloWorld from "./HelloWorld/HelloWorld";
import ProfilePage from "./ProfilePage/ProfilePage";
import Login from "./Login";
import AdminDepositRequest from "./AdminDepositRequest/AdminDepositRequest";
import DepositRequest from './DepositRequest/DepositRequest';




const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/helloworld" component={HelloWorld}/>
      <Route path="/members/login" component={Login}/>
      <Route path="/events" component={EventListAdmin}/>
      <Route path="/profile" component={ProfilePage}/>
      <Route path="/admindeposit" component={AdminDepositRequest}/>
      <Route path="/depositrequest" component={DepositRequest}/>


    </Switch>
  </main>
)

export default Main;
