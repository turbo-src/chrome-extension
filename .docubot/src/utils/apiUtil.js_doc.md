# Documentation for /app/filebot-store-000/chrome-extension/src/utils/apiUtil.js

This file is a utility module that provides functionality for making network requests to the GitHub's repositories API.

The utility functions handle checking network response status, parsing the JSON data, and getting repository content.

Functions in `apiUtil.js`:

## `checkStatus(response)`
Checks the status of network response and ensures it lies between 200 and 299. If the code is out of this range, an error is thrown with a message containing the status code.

## `parseJSON(response)`
Parses the JSON object from the network response and returns it. Null is returned if the response is null.

## `getRepoContent(callback, contentPath, isRepoMetaData)`
Makes a network request to fetch repository content. 

- `callback`: Function called after the natural completion of the network request. 
- `contentPath`: Path of the content to be fetched. (This functionality seems to be commented out and not used in the current version).
- `isRepoMetaData`: Determines the specific use case of the network request. If `false`, the request is targeted towards fetching pulls from the repository.

The function first gets the username and repo name using the `getUsernameWithReponameFromGithubURL` utility method from the `commonUtil` utility module. If either the user or the repo is not found, the function returns.

It prepares the API headers for the `fetch` call including the authorization if a token is available.

The fetch method is called with the prepared header and outlook at pulling data as determined by the `isRepoMetaData` flag. On successful fetch, response is processed with `checkStatus` & `parseJSON` methods, and the `callback` function is called with the resulting data. If an error occurs at any point, the error is logged to console and the `callback` function is called with null.