const React = require('react');
const { unmountComponentAtNode, render } = require('react-dom');
const commonUtil = require('./utils/commonUtil');
const createModal = require('./Components/Modal/createModal');
const createButtonHtml = require('./Components/DOM/createButtonHtml');
import VoteStatusButton from './Components/DOM/VoteStatusButton';
import ModalVote from './Components/Modal/ModalVote';
const { socket } = require('./socketConfig');
const store = require('./store/store');
const { postGetRepoData, postGetVotes, postFindOrCreateUser } = require('./requests');
let cypress = {};
try {
  cypress = require('../cypress.env.json');
} catch (error) {
  console.warn('No cypress.env.json file in root directory. To run tests, follow the readme in /cypress');
}

var modal;
var user;
var repo;
var repo_id;
var issue_id;
var contributor_id;
var contributor_name;
var voteTotals;
var githubUserObject;
//Pull request row DOM nodes:
let containerItems;

socket.on('connect', () => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

socket.on('disconnect', () => {
  console.log(socket.id); // undefined
});

// OAuth Code
// Github redirects to <turbosrc-auth url>/authenticated?code=...
// Get Github code from url:
const newUrl = window.location.href.split('?code=');
const reqBody = { code: newUrl[1] };
// Clear code from browser url: (optional)
window.history.pushState({}, null, newUrl[0]);
// Send code from url which to Github API for an access token
// The access token is then exchanged for the user's profile. Done on the server of the turbosrc-auth app
fetch('https://turbosrc-auth.fly.dev/authenticate', {
  method: 'POST',
  body: JSON.stringify(reqBody)
})
  // Response is Github profile - username, avatar url, repos etc.
  .then(response => response.json())
  // Set Github user information to Chrome Storage for the turbo-src extension to get it on load:
  .then(githubUser => {
    user = githubUser.login;
    githubUserObject = githubUser;
    return githubUser;
  })
  .then(githubUser => {
    return postFindOrCreateUser(
      user || 'reibase',
      repo || 'marialis',
      'none',
      githubUser.login,
      'none',
      githubUser.token
    );
  })
  .then(currentUser => {
    contributor_id = currentUser.contributor_id;
    currentUser.ethereumAddress = contributor_id;
    currentUser.ethereumKey = currentUser.contributor_signature;
    let turbosrcUser = { ...currentUser, ...githubUserObject };
    chrome.storage.local.set({ turbosrcUser: JSON.stringify(turbosrcUser) });
  })
  .catch(error => {
    console.log(error);
  });
// End of OAuth Code

// Function to get items from chrome storage set from extension
let getFromStorage = keys =>
  new Promise((resolve, reject) => chrome.storage.local.get([keys], result => resolve(result[keys])));

(async function() {
  let turbosrcUserFromStorage = await getFromStorage('turbosrcUser');
  let turbosrcUserObj = turbosrcUserFromStorage && JSON.parse(turbosrcUserFromStorage);
  contributor_id = turbosrcUserObj?.contributor_id;
  // Current repo page and current user information:
  if (process.env.NODE_ENV === 'test') {
    user = cypress.gitHubUsername;
    repo = cypress.gitHubRepo;
    let curUser = await postFindOrCreateUser(
      user || 'reibase',
      repo || 'marialis',
      'none',
      cypress.gitHubUsername,
      'none',
      cypress.gitHubToken
    );
    contributor_id = curUser.contributor_id;
  } else {
    const path = commonUtil.getUsernameWithReponameFromGithubURL();
    repo = path.repo;
    user = path.user;
  }

  repo_id = `${user}/${repo}`;
  // Backend:
  // All relevant data for this repo can be found in this response:
  var repoData = await postGetRepoData(repo_id, contributor_id);
  // Is repo on turbosrc:
  const onTurboSrc = repoData?.status === 200 ? true : false;
  // Is current contributor is authorized for this repo:
  const isAuthorizedContributor = repoData?.contributor.contributor;

  // Alternate DOM selectors for test and dev/production environments:
  const cypressIframeDOM = process.env.NODE_ENV === 'test' && document.getElementsByTagName('iframe')[0];

  console.log(
    'process.env.NODE_ENV is currently:',
    `"${process.env.NODE_ENV}".`,
    '<= This should be "test" when you run yarnDevLocalTest and "development" when yarnDevLocal'
  );
  console.log(
    'cypressIframeDOM is currently:',
    `"${cypressIframeDOM}."`,
    '<= This should be an iframe node element in "test" mode and "null", "undefined" or false in "development" mode'
  );
  console.log('contributor_id is currently:', `"${contributor_id}."`, '<= This should be a valid id in either mode.');

  if (process.env.NODE_ENV === 'test') {
    console.warn('Node environment is test. Are you sure it should not be "development"?');
  }
  if (process.env.NODE_ENV === 'test' && !cypressIframeDOM) {
    console.warn(
      'Node environment and cypressIframeDOM selectors are out of sync for development and test contexts. If you are switching between  test and development Node environments, try rebundling the extension, removing it from the Chrome extension manager, loading it again, and logging out/in again from the turbosrc web extension.'
    );
  }
  if (!contributor_id) {
    console.warn('contributor_id is not set correctly.');
  }

  if (process.env.NODE_ENV !== 'test' && document.readyState === 'complete') {
    injectDOM();
  }
  if (DOM) {
    DOM.onload = function() {
      injectDOM();
    };
  }

  function injectDOM() {
    // Only do below DOM logic if project is on turbosrc and we are a contributor
    if (!onTurboSrc || !isAuthorizedContributor) {
      return;
    }
    // Only do below DOM logic if we are on the pull requests page
    // if (process.env.NODE_ENV !== 'test' && window.location.pathname !== `/${user}/${repo}/pulls`) {
    //   return;
    // }
    // Pull request row DOM nodes
    containerItems =
      process.env.NODE_ENV === 'test'
        ? cypressIframeDOM.contentDocument.querySelectorAll('.js-issue-row')
        : document.querySelectorAll('.js-issue-row');
    const ce = React.createElement;
    let startIndex = 0;

    // Map div element with id turbo-src-btn-<issue_id> to its relevant DOM node
    var html;
    for (var i = startIndex; i < containerItems.length; i++) {
      issue_id = containerItems[i].getAttribute('id');
      var btnHtml = createButtonHtml(i, issue_id); //only need issue_id
      var modalHtml = createModal();
      if (i < 1) {
        html = btnHtml + modalHtml;
      } else {
        html = btnHtml;
      }
      containerItems[i].querySelector('.flex-shrink-0').insertAdjacentHTML('beforeEnd', html);
    }

    // Now that we have our PR data and DOM elements, we can render React components where needed and
    // update them when our socket tells us to
    // Declare variables we need:
    modal =
      process.env.NODE_ENV === 'test'
        ? cypressIframeDOM.contentDocument.getElementById('myModal')
        : document.getElementById('myModal');
    var domContainerTurboSrcButton;
    let socketEvents = 0;
    let getVotesRes;
    let getVotes = async () => await postGetVotes(repo_id, issue_id, contributor_id);
    const clickedState = {
      clicked: false
    };

    // Modal functionality below:
    const toggleModal = async event => {
      if (event.target.id === 'myModal' || event.target.id === 'closeModal') {
        modal.style.display = 'none';
        unmountComponentAtNode(
          process.env.NODE_ENV === 'test'
            ? cypressIframeDOM.contentDocument.getElementById('myModal')
            : document.getElementById('myModal')
        );
      }

      // Get issue ID from click
      const divHTML = event.target.parentElement;
      var idName = divHTML.id;
      const idBtnSplit = idName.split('turbo-src-btn');

      // Render the modal with the relevant PR data using the issue ID
      if (idBtnSplit.length > 1) {
        const idNameSplit = idName.split('-');
        issue_id = idNameSplit[3];
        modal.style.display = 'block';
        const domContainerModal =
          process.env.NODE_ENV === 'test'
            ? cypressIframeDOM.contentDocument.getElementById('myModal')
            : document.getElementById('myModal');
        getVotesRes = await getVotes();
        render(
          ce(ModalVote, {
            user: user,
            repo: repo,
            issueID: issue_id,
            contributorID: contributor_id,
            contributorName: contributor_name,
            voteTotals: voteTotals,
            githubUser: githubUserObject,
            voteRes: getVotesRes,
            getVotes: getVotes,
            toggleModal: toggleModal,
            socketEvents: socketEvents
          }),
          domContainerModal
        );
      }
    };

    // Modal closes and opens depending on where a user clicks in the DOM
    document.addEventListener('click', function(event) {
      toggleModal(event);
    });

    // Update modal (if open) if its associated PR has been voted upon
    const updateModalVotesTable = async issueID => {
      if (issueID === issue_id && modal.style.display === 'block') {
        const domContainerModal =
          process.env.NODE_ENV === 'test'
            ? cypressIframeDOM.contentDocument.getElementById('myModal')
            : document.getElementById('myModal');
        render(
          ce(ModalVote, {
            user: user,
            repo: repo,
            issueID: issue_id,
            contributorID: contributor_id,
            contributorName: contributor_name,
            voteTotals: voteTotals,
            githubUser: githubUserObject,
            voteRes: getVotesRes,
            getVotes: getVotes,
            toggleModal: toggleModal,
            socketEvents: socketEvents
          }),
          domContainerModal
        );
      }
    };

    // Vote status buttons:
    // Render vote status buttons according to their issue ID
    const renderVoteButtons = async () => {
      for (var i = startIndex; i < containerItems.length; i++) {
        issue_id = containerItems[i].getAttribute('id');
        domContainerTurboSrcButton =
          process.env.NODE_ENV === 'test'
            ? cypressIframeDOM.contentDocument.querySelector(`#turbo-src-btn-${issue_id}`)
            : document.querySelector(`#turbo-src-btn-${issue_id}`);
        render(
          ce(VoteStatusButton, {
            socketEvents: socketEvents,
            user: user,
            repo: repo,
            issueID: issue_id,
            contributorName: contributor_name,
            contributorID: contributor_id,
            clicked: clickedState.clicked,
            toggleModal: toggleModal
          }),
          domContainerTurboSrcButton
        );
      }
    };

    //Call function to render the first time
    renderVoteButtons();

    // Update a voteStatusButton if our socket tells us its associated PR has been voted upon
    const updateVoteStatusButton = async issueID => {
      issue_id = issueID;
      domContainerTurboSrcButton = document.querySelector(`#turbo-src-btn-${issue_id}`);
      render(
        ce(VoteStatusButton, {
          user: user,
          repo: repo,
          issueID: issue_id,
          contributorName: contributor_name,
          contributorID: contributor_id,
          repoData: repoData,
          clicked: clickedState.clicked,
          toggleModal: toggleModal,
          socketEvents: socketEvents
        }),
        domContainerTurboSrcButton
      );
    };

    // Socket listener for above actions. Every time a user votes our socket will check if it's for the current repo and update
    socket.on('vote received', function(ownerFromServer, repoFromServer, issueIDFromServer) {
      if (user === ownerFromServer && repo === repoFromServer) {
        /* To update the correct VoteStatusButton & VotesTable we need to both update the socketEvents variable 
          and call the React render function for them. */
        socketEvents += 1;
        updateVoteStatusButton(issueIDFromServer);
        updateModalVotesTable(issueIDFromServer);
      }
    });
  }
})();
