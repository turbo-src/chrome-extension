const React = require('react');
const { unmountComponentAtNode, render } = require('react-dom');
const commonUtil = require('./utils/commonUtil');
const createModal = require('./Components/Modal/createModal');
const createButtonHtml = require('./Components/DOM/createButtonHtml');
import VoteStatusButton from './Components/DOM/VoteStatusButton';
import ModalVote from './Components/Modal/ModalVote';
const { socket } = require('./socketConfig');
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

const testMode = window.location.pathname === '/__/' ? true : false;

socket.on('connect', () => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

socket.on('disconnect', () => {
  console.log(socket.id); // undefined
});

//OAuth Code: ***
//Github redirects to localhost:5000/authenticated?code=...
//Get Github code from url:
const newUrl = window.location.href.split('?code=');
const reqBody = { code: newUrl[1] };
//Clear code from browser url: (optional)
window.history.pushState({}, null, newUrl[0]);
//Send code from url which to Github API for an access token
//The access token is then exchanged for the user's profile. Done in server/index.js.
fetch('https://turbosrc-auth.fly.dev/authenticate', {
  method: 'POST',
  body: JSON.stringify(reqBody)
})
  //Response is Github profile - username, avatar url, repos etc.
  .then(response => response.json())
  //Set Github user information to Chrome Storage for the turbo-src extension to get it on load:
  .then(turbosrcUser => chrome.storage.local.set({ turbosrcUser: JSON.stringify(turbosrcUser) }))
  .catch(error => {
    console.log(error);
  });
//End of OAuth Code ****

// Function to get items from chrome storage set from extension
let getFromStorage = keys =>
  new Promise((resolve, reject) => chrome.storage.local.get([keys], result => resolve(result[keys])));

(async function() {
  if (testMode) {
    // Stub data here if running tests because they do not access chrome.storage or the URL bar the same way as in production:
    user = cypress.gitHubUsername;
    repo = cypress.gitHubRepo;
    contributor_id = cypress.contributorID;
  } else {
    // Get data from chrome.storage and the repo from the URL bar:
    // Owner would be a better variable name than user here because it is the repo owner, not current user.
    const path = commonUtil.getUsernameWithReponameFromGithubURL();
    repo = path.repo;
    user = path.user;
    contributor_name = await getFromStorage('contributor_name');
    contributor_id = await getFromStorage('contributor_id');
  }

  repo_id = `${user}/${repo}`;

  // Backend:
  // All relevant data for this repo can be found in this response:
  var repoData = await postGetRepoData(repo_id, contributor_id);
  // Is repo on turbosrc:
  const onTurboSrc = repoData?.status === 200 ? true : false;
  // Is current contributor is authorized for this repo:
  const isAuthorizedContributor = repoData?.contributor.contributor;

  // Alternate DOM selector for test environment:
  const testingDOM = document.getElementsByTagName('iframe')[0] || false;

  if (!contributor_id) {
    console.error(
      'contributor_id is not set correctly. Try logging out and logging back in to the Turbosrc web extension.'
    );
  }

  // Log key variables to debug:
  const keyVariables = {
    testMode: testMode,
    testingDOM: testingDOM,
    contributor_id: contributor_id
  };

  console.log('Key variables:', keyVariables);

  // A helper function to run querySelectorAll and find elements within the DOM and nested DOMs
  function querySelectorAllFrames(selector) {
    const elementsInMainDocument = document.querySelectorAll(selector);
    // Because our testing preview window is an iframe so this will get the element if it is in the testing preview window
    const elementsInFrames = [];

    // Function to search for elements in iframes recursively
    function searchInFrames(frames) {
      for (let i = 0; i < frames.length; i++) {
        try {
          const iframeDocument = frames[i].contentDocument;
          const elementsInFrame = iframeDocument.querySelectorAll(selector);
          elementsInFrames.push(...elementsInFrame);

          // Recursively search in nested iframes
          const nestedFrames = iframeDocument.querySelectorAll('iframe');
          if (nestedFrames.length > 0) {
            searchInFrames(nestedFrames);
          }
        } catch (error) {
          // Handle potential cross-origin iframe access issues
          console.error(`Error accessing iframe: ${error.message}`);
        }
      }
    }

    // Start searching for elements in iframes
    const iframes = document.querySelectorAll('iframe');
    searchInFrames(iframes);

    return [...elementsInMainDocument, ...elementsInFrames];
  }

  if (!testMode && document.readyState === 'complete') {
    injectDOM();
  }
  if (testingDOM) {
    testingDOM.onload = function() {
      injectDOM();
    };
  }

  function injectDOM() {
    // Only do below DOM logic if project is on turbosrc and we are a contributor
    if (!onTurboSrc || !isAuthorizedContributor) {
      return;
    }
    // Only do below DOM logic if we are on the pull requests page
    if (!testMode && window.location.pathname !== `/${user}/${repo}/pulls`) {
      return;
    }

    // The parent element of the VoteStatusButtons' container divs
    const containerItems = querySelectorAllFrames('.js-issue-row');

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
    const [myModalNode] = querySelectorAllFrames('#myModal');
    // Now that we have our PR data and DOM elements, we can render React components where needed and
    // update them when our socket tells us to
    // Declare variables we need:
    [modal] = querySelectorAllFrames('#myModal');
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
        unmountComponentAtNode(myModalNode);
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
        const domContainerModal = myModalNode;
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
        const domContainerModal = myModalNode;
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
        const [domContainerTurboSrcButton] = querySelectorAllFrames(`#turbo-src-btn-${issue_id}`);
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
      domContainerTurboSrcButton = querySelectorAllFrames(`#turbosrc-btn-${issue_id}`);
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
