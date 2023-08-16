import React from 'react';
import { Routes as Switch, BrowserRouter, Route } from 'react-router-dom';
import Header from './Components/Extension/Nav/Header';
import Auth from './Components/Extension/Auth';
import Transfer from './Components/Extension/Transfer/Transfer';
import Success from './Components/Extension/Create/Success';
import Nav from './Components/Extension/Nav/Nav';
import Account from './Components/Extension/Account/Account';
import Onboard from './Components/Extension/Create/CreateRepo';
import Home from './Components/Extension/Home/Home';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from './store/auth';
import { setRepo } from './store/repo';
import { useEffect } from 'react';
import useSetUser from './hooks/useSetUser';

export default function Routes({ currentRepo }) {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { user } = useSetUser();

  useEffect(() => {
    dispatch(setRepo(currentRepo));
  }, []);

  useEffect(() => {
    if (auth.isLoggedIn) {
      return;
    }
    // If the user object has an ID then it has been set and retrieved from chrome.storage succesfully, so log in the user:
    user?.contributor_id && dispatch(setAuth(user));
  }, [user]);

  return auth.isLoggedIn ? (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Switch>
          <Route exact path="/popup.html" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/settings" element={<Account />} />
          <Route exact path="/onboard" element={<Onboard />} />
          <Route exact path="/account" element={<Account />} />
          <Route exact path="/transfer" element={<Transfer />} />
          <Route exact path="/success" element={<Success />} />
        </Switch>
        <Nav />
      </div>
    </BrowserRouter>
  ) : (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Switch>
          <Route exact path="/popup.html" element={<Auth />} />
          <Route exact path="/home" element={<Auth />} />
          <Route exact path="/onboard" element={<Onboard />} />
          <Route exact path="/account" element={<Auth />} />
          <Route exact path="/transfer" element={<Transfer />} />
          <Route exact path="/success" element={<Success />} />
        </Switch>
        <Nav />
      </div>
    </BrowserRouter>
  );
}
