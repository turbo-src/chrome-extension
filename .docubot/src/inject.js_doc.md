File: `/app/filebot-store-000/chrome-extension/src/inject.js`

Summary:
This JavaScript file appears to be part of a Chrome extension named Enhanced Github. The extension interacts with the GitHub website to offer additional features, potentially associated with the voting or tracking of issues and pull requests. Below are the key points found in the file:

- The script uses GraphQL over WebSockets for real-time data and leverages several libraries such as React and Redux, with some commented out lines referencing Redis and WebSocket.
- It requires multiple modules, likely distributed across files within the same extension, including utilities modules (messageListener, dom, storage, common, math), and components (various buttons, modal components).
- Data from GitHub (like issue ids or vote counts) and user-specific data (like user, repo ID) is stored within chrome's local storage and managed within the script.
- The script responds to various events like the 'click' event on buttons, 'connect' and 'disconnect' events on the socket, etc.
- There appears to be a series of checks performed to ensure that the script runs only when the 'document.readyState' is 'complete', the targeted GitHub repo is tokenized, and the contributor is authorized for the particular repository.
- The script implements OAuth to authorize GitHub users and interact with their profiles.
- It manipulates the DOM to create custom components (like modal windows for vote interaction), which are later rendered using ReactDOM's render method.
- It makes asynchronous requests to fetch and post data to an unspecified server, possibly for receiving and updating vote-related info for PRs and issues.
- There is a usage of sockets to listen to event 'vote received' which updates the voting statuses accordingly and re-renders the components.
