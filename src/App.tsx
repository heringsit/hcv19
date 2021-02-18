import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import Login from './screens/login';
import Main from './screens/main';
import Main2 from './screens/main2';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route path="/main" component={Main} />
        <Route path="/main2" component={Main2} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
