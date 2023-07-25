const React = require('react');
const { unmountComponentAtNode, render } = require('react-dom');
const commonUtil = require('./utils/commonUtil');
const createModal = require('./Components/Modal/createModal');
const createButtonHtml = require('./Components/DOM/createButtonHtml');
import VoteStatusButton from './Components/DOM/VoteStatusButton';
import ModalVote from './Components/Modal/ModalVote';
const { socket } = require('./socketConfig');

const { postGetRepoData, postGetVotes, getGitHubPullRequest } = require('./requests');

var modal;
var user;
var repo;
var repo_id;
var issue_id;
var contributor_id;
var contributor_name;
var voteTotals;

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
  .then(githubUser => chrome.storage.local.set({ githubUser: JSON.stringify(githubUser) }))
  .catch(error => {
    console.log(error);
  });
// End of OAuth Code

(async function() {
  const path = commonUtil.getUsernameWithReponameFromGithubURL();
  repo_id = `${path.user}/${path.repo}`;
  repo = path.repo;
  user = path.user;
  //Set Github Repo and User from browser window for chrome extension
  chrome.storage.local.set({ owner: user });
  chrome.storage.local.set({ repo: repo });

  //Function to get items from chrome storage set from Extension
  let getFromStorage = keys =>
    new Promise((resolve, reject) => chrome.storage.local.get([keys], result => resolve(result[keys])));
  //Values are set in Extension App, Components/Home.js on render
  contributor_name = await getFromStorage('contributor_name');
  contributor_id = await getFromStorage('contributor_id');
  const githubUser = await getFromStorage('githubUser').then(res => JSON.parse(res));

  // All relevant data for this repo can be found in this response:
  var repoData = await postGetRepoData(repo_id, contributor_id);
  // Is repo on turbosrc:
  const onTurboSrc = repoData?.status === 200 ? true : false;
  // Is current contributor is authorized for this repo:
  const isAuthorizedContributor = repoData?.contributor.contributor;

  if ((document.readyState === 'complete') & (onTurboSrc === true) & (isAuthorizedContributor === true)) {
    const ce = React.createElement;
    // Pull request row DOM nodes
    const containerItems = document.querySelectorAll('.js-issue-row');
    let startIndex = 0;
    const repoPath = commonUtil.getUsernameWithReponameFromGithubURL();

    // Only do below DOM logic if we are on the pull requests page
    if (window.location.pathname !== `/${repoPath.user}/${repoPath.repo}/pulls`) {
      return;
    }

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
    modal = document.getElementById('myModal');
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
        unmountComponentAtNode(document.getElementById('myModal'));
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
        const domContainerModal = document.getElementById('myModal');
        getVotesRes = await getVotes();
        render(
          ce(ModalVote, {
            user: user,
            repo: repo,
            issueID: issue_id,
            contributorID: contributor_id,
            contributorName: contributor_name,
            voteTotals: voteTotals,
            githubUser: githubUser,
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
        const domContainerModal = document.getElementById('myModal');
        render(
          ce(ModalVote, {
            user: user,
            repo: repo,
            issueID: issue_id,
            contributorID: contributor_id,
            contributorName: contributor_name,
            voteTotals: voteTotals,
            githubUser: githubUser,
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
        domContainerTurboSrcButton = document.querySelector(`#turbo-src-btn-${issue_id}`);
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
