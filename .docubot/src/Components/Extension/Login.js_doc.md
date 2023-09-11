# Login.js Documentation

This file defines the Login function component using React. This component composes the login page view for the chrome extension.

## Functionality

The Login component allows users to authenticate via their Github accounts. When the user clicks on the 'Continue with Github' button, a new link is opened in a new browser tab which takes the user to Github's OAuth login page. The OAuth scope is obtained from the environment variable 'GITHUB_CLIENT_ID', and it requests access to the user's Github email.

## Component layout

- **Div**: The root element of the Login component. It has no specific styling classes.
- **a**: Anchor element behaving as a button. It builds the href URL for authorization with a GitHub account. It opens the Github authorization URL in a new tab, allowing users to authenticate themselves.
- **span**: This span contains both the Github login icon and the login prompt text 'Continue with Github'.
  
  - The icon is imported from the relative path "../icons/github.png".
  - 'Continue with Github' is the text that prompts users to initiate the Github authorization process.

## Environmental Variables

- `GITHUB_CLIENT_ID`: This environment variable should hold the OAuth Client ID of your GitHub app. This is used to authenticate the user with Github.