Title: createButtonHtml.js

This JavaScript file is a module contained within the chrome-extension source components of the /app/filebot-store-000 directory.

Description:

The core function of this file, `createButtonHtml`, is responsible for generating HTML code for a `div` element. This function is exported for use in other modules. 

The function `createButtonHtml` receives three parameters: index, issue_id, and contributor_id. However, note that only issue_id is used within the returned HTML. The resulting `div` has an id attribute formed as 'turbo-src-btn-' joined with the issue_id. 

There are also commented out CSS selectors present for '#yes_vote_button', '#no_vote_button' and '.modal-center'. However, these remain unused in the current version of this file.

Example use:
This function would typically be used to dynamically add button-like elements to a webpage via JavaScript.