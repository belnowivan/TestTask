import React, { createElement } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import JournalOfTeacher from '../pages/journalOfTeacher/JournalOfTeacher';
import '@szhsin/react-menu/dist/index.css';
import routes from './routes';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path={routes.table()}>
          <JournalOfTeacher/>
        </Route>
      </Switch>
    </Router>
  );
};

render(createElement(App), document.getElementById('app'));