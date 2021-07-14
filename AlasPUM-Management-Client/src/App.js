import React from 'react';
import 'antd/dist/antd.dark.css';
// import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import SignInPage from './components/pages/SignInPage';
import HomePage from './components/pages/HomePage';
import PageLayout from './components/PageLayout';
import PlanesPage from './components/pages/PlanesPage';
import FlightsPage from './components/pages/FlightsPage';
import PurchasesPage from './components/pages/PurchasesPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          {sessionStorage.getItem('token') ? <PageLayout defaultSelectedKeys='dashboard'><HomePage /></PageLayout> : <Redirect to='/signin' />}
        </Route>
        <Route path="/planes" exact>
          {sessionStorage.getItem('token') ? <PageLayout defaultSelectedKeys='planes'><PlanesPage /></PageLayout> : <Redirect to='/signin' />}
        </Route>
        <Route path="/flights" exact>
          {sessionStorage.getItem('token') ? <PageLayout defaultSelectedKeys='flights'><FlightsPage /></PageLayout> : <Redirect to='/signin' />}
        </Route>
        <Route path="/purchases" exact>
          {sessionStorage.getItem('token') ? <PageLayout defaultSelectedKeys='purchases'><PurchasesPage /></PageLayout> : <Redirect to='/signin' />}
        </Route>
        <Route path="/signin">
          <SignInPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
