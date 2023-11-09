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
import { useEffect, useState } from 'react';
import superagent from 'superagent';
import { postFindOrCreateUser} from './requests';
import styled from 'styled-components';
import CONFIG from './config';
import { getTurboSrcSystemInfo } from './requests';

const TurbosrcNotice = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300&display=swap');
  font-family: 'Roboto Mono', monospace;
  font-weight: 300;
  font-size: 14px;
  letter-spacing: 0.2px;
  text-align: center;
  position: relative;
  margin-top: 5rem;
`;

export default function Routes(props) {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
console.log('props:', props)
  useEffect(()=>{
    dispatch(setRepo(props.currentRepo))
    },[])

  //Same values:
  //ethereumAddress === contributor_id
  //ethereumKey === contributor_signature
  let [user, setUser] = useState('');
  useEffect(() => {
    if (auth.isLoggedIn) {
      return;
    }
    chrome.storage.local.get(['turbosrcUser'], data => setUser(data.turbosrcUser));
  });

  useEffect(() => {
    const findOrCreateUser = async function(owner, repo, contributor_id, contributor_name, contributor_signature, token) {
      return await postFindOrCreateUser(owner, repo, contributor_id, contributor_name, contributor_signature, token).then(res => res)
    }
    if (auth.isLoggedIn && auth.user.ethereumAddress !== 'none' && auth.user.ethereumKey !== 'none') {
      return;
    } else if (user) {
      let githubUser = JSON.parse(user);
      // Pass 'owner' and 'repo' if on a git repo page. If not, pass owner and repo as "7db9a" and "demo".
      console.log('current repo ', props.currentRepo.message)
      findOrCreateUser(
      props.currentRepo?.message === 'Not Found' ? 'reibase' : props.currentRepo.owner.login,
      props.currentRepo?.message === 'Not Found' ? 'marialis' : props.currentRepo.name,
      'none',
      githubUser.login,
      'none',
      githubUser.token
      )
      .then(res => {
        githubUser.ethereumAddress = res.contributor_id,
        githubUser.ethereumKey = res.contributor_signature});
        dispatch(setAuth(githubUser));
    }
  }, [user]);

    let [clientIsCompatibleWithRouter, setClientIsCompatibleWithRouter]= useState("yes")
    let [isCompatibleTurboSrcID, setIsCompatibleTurboSrcID] = useState("yes")
    let [repoPage, setRepoPage] = useState(false)
    let [message, setMessage] = useState("")

  const checkTurboSrcSystemHandler = async () => {
    try {
      if (props.currentRepo?.name === 'none') {
        setMessage('Please visit a GitHub repository page to use Turbosrc.');
        return;
      } else {
        setRepoPage(true);
      }
      const currentClientVersion = CONFIG.currentVersion || '';
      let owner = props.currentRepo?.owner?.login;
      let repo = props.currentRepo?.name;
      if(owner === 'none' && repo === 'none') {
        owner = 'reibase'
        repo = 'marialis'
      }
      const repoName = `${owner}/${repo}`;
      const res = await getTurboSrcSystemInfo(repoName, currentClientVersion);

      if (res.clientIsCompatibleWithRouter === 'yes') {
        setClientIsCompatibleWithRouter(true);
      } else if (res.clientIsCompatibleWithRouter === 'no') {
        setClientIsCompatibleWithRouter(false);
        setMessage(
          'Your version of Turbosrc is out of date and needs to be updated to continue to https://github.com/turbo-src/turbo-src'
        );
        return;
      }
      if (res.isCompatibleTurboSrcID === 'yes') {
        setIsCompatibleTurboSrcID(true);
      } else if (res.isCompatibleTurboSrcID === 'no') {
        setIsCompatibleTurboSrcID(false);
        setMessage(
          'The owner of the repo is using an out of date version of Turbosrc. Owner should follow instructions here to update https://github.com/turbo-src/turbo-src'
        );
      }
    } catch (error) {
      console.error('Error in checkTurboSrcSystemHandler:', error);
    }
  };
  
    useEffect(() => {
      checkTurboSrcSystemHandler();
    }, []);

  if (!clientIsCompatibleWithRouter || !isCompatibleTurboSrcID || !repoPage) {
    return auth.isLoggedIn ? (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Switch>
            <Route exact path="/popup.html" element={<TurbosrcNotice>{message}</TurbosrcNotice>} />
            <Route exact path="/home" element={<TurbosrcNotice>{message}</TurbosrcNotice>} />
            <Route exact path="/account" element={<Account />} />
          </Switch>
        </div>
        <Nav disabled={true} />
      </BrowserRouter>
    ) : (
      <BrowserRouter>
        <div className="container">
          <Switch>
            <Route exact path="/popup.html" element={<Auth />} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }

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