# Cypress Testing Setup Instructions

This guide will assist you in setting up Cypress for testing your project. Please follow these instructions.

## Pre-requisites

Ensure that you have the latest version of Google Chrome installed on your system. This is essential for Cypress to function properly.

## Instructions

### Step 1: Create the Cypress Environment File

1. Create a new file named `cypress.env.json` in your project root directory.

2. Paste the following JSON object into the `cypress.env.json` file:

    ```json
    {
        "turboSrcID": "0x9e81be64b30a850e038cb5a85241f58528010016",
        "gitHubUsername": "YourUsernameHere",
        "gitHubPassword": "YourPasswordHere",
        "gitHubToken": "githubTokenHashHere",
        "gitHubRepo": "YourRepoNameHere"
    }
    ```

3. Replace the placeholders with your actual information:

    - `YourUsernameHere`: Replace with your GitHub username.
    - `YourPasswordHere`: Replace with your GitHub password.
    - `githubTokenHashHere`: Replace with your GitHub token hash.
    - `YourRepoNameHere`: Replace with your GitHub repository name.

> Note: Ensure all replaced items are formatted as strings.

### Step 2: Update the config.js File

1. Navigate to your `config.js` file.

2. Edit the `CONFIG` object to add in a `path` property and the path to your Chrome extension to test. Here's an example:

    ```javascript
    const CONFIG = {
        "url":"http://localhost:4000/graphql", 
        "path":"/Path/to/chrome-extension"
    };
    ```

Replace `/Path/to/chrome-extension` with the actual path to your Chrome extension.

### Step 3: Run the Local Test Server

Open the terminal, navigate to the `chrome-extension` directory in your project, and execute the following command:

```bash
yarn devLocalTest
```

### Step 4: Run Cypress

In a new terminal window, run the following command:

```bash
npx cypress open
```

This will open the Cypress application.

## Conclusion

You have successfully set up Cypress testing for your project. Your environment is now ready for executing test cases.