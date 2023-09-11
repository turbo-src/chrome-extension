# inject.js Documentation

## Overview

`inject.js` is a critical part of the TurboSrc extension. It is injected into the user's active GitHub pull request page. It handles the communication with the server, interacts with the DOM, and manages the user's actions on the pull request page.

## Key Functions and Variables

### Constants

- `React`, `useState` : Imported from React to build components.
- `url` : The server's URL, loaded from `config.js`.
- `socket` : A WebSocket connection for real-time communication between the client and the server.

### Variables

- `isRepoTurboSrcToken` : A flag indicating whether the current repository is tokenized or not.
- `modal` : A reference to the modal dialog element.
- `user`, `repo`, `repo_id`, `issue_id` : GitHub related information extracted from the page URL.

### Functions

- `async function() { ... }` : An IIFE (Immediately Invoked Function Expression) that contains the core logic for interacting with GitHub’s pull request page.
- `setStorageData(data)` : A promise-based function to set data in Chrome’s storage.
- `getFromStorage(keys)` : A promise-based function to retrieve values from Chrome’s storage.
- `toggleModal(event)` : Opens or closes the modal based on user interactions.
- `renderVoteButtons()` : Renders the buttons for voting in the pull request list.
- `handleRefresh()` : Refreshes the state of the rendered vote buttons.
- `updateVoteStatusButton(issueID)` : Updates the status of the vote button for a specific issue.
- `updateModalVotesTable(issueID)` : Updates the modal's vote table for a specific issue.

### WebSocket Events

- `socket.on("connect", ...)` : Logs the socket ID when the WebSocket connection is established.
- `socket.on("disconnect", ...)` : Logs the socket ID when the WebSocket connection is disconnected.
- `socket.on('vote received', ...)` : Listens for a 'vote received' event and updates the UI accordingly.

## OAuth Handling

- A part of the script handles the OAuth2 authentication with GitHub. It retrieves the code from the redirected URL, sends it to a server to exchange for an access token, and then saves the user's profile information in Chrome’s local storage.

## React Components

- `VoteStatusButton` : React component to render the voting status button.
- `RefreshButton` : React component to render the refresh button.
- `ModalVote` : React component to render the voting modal.

## Miscellaneous

- A `setInterval` checks the readiness of the document and other conditions and initializes the TurboSrc actions when they are met.

## Dependencies

- `react`, `react-dom`, `react-redux`, `graphql-ws`, `react-bootstrap`, `superagent`, various utilities and configurations.

## Security Considerations

- Ensure safe and secure handling of OAuth2, especially when dealing with tokens.

Please note that this documentation assumes a certain level of familiarity with React, Chrome Extensions, and GitHub's OAuth2 implementation.
