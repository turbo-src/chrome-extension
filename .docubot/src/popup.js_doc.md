File: /app/filebot-store-000/chrome-extension/src/popup.js

This JavaScript file is used by a Chrome extension that interacts with GitHub. When run, it gains the active tab and splits the URL into its component parts to retrieve the 'user' and 'repo'. It then sends these details to GitHub API endpoint to fetch repository data.

Key Functions:
- `chrome.tabs.query`: Queries the Chrome browser to return details about the current active tab in the last focused window.
- `fetch`: Sends a GET request to the GitHub API to obtain details about a specific repository owned by a specified user.

If the requested repository is not found, it sets dummy values for owner and repository name. After obtaining the repository information, it uses ReactDOM to render a React app (imported from 'App.js') within a dom container with id 'rootcontainer', passing the repository information as a prop.

Dependencies:
- React: A JavaScript Library for building user interfaces.
- ReactDOM: The DOM-specific methods for React.
- App.js: A Javascript module representing a React application.