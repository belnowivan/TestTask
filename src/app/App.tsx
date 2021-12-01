import React, { createElement } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes from './routes';
import Header from '../components/header/Header';
import Contacts from '../pages/contacts/Contacts';
import Info from '../pages/info/Info';
import FlightRegistration from '../pages/flightRegistration/FlightRegistration';
import RegistrationEnd from '../pages/registrationEnd/RegistrationEnd';

const App = () => {
  return (
    <Router>
      <Header/>
      <Switch>
        <Route path={routes.flightRegistration(':uuid')}>
          <FlightRegistration/>
        </Route>
        <Route path={routes.contacts()}>
          <Contacts/>
        </Route>
        <Route path={routes.info()}>
          <Info/>
        </Route>
        <Route path={routes.registrationEnd(':uuid')}>
          <RegistrationEnd/>
        </Route>
      </Switch>
    </Router>
  );
};

render(createElement(App), document.getElementById('app'));