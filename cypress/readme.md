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

### Step 3: Bundle the extension
Open the terminal, navigate to the `chrome-extension` directory in your project, and execute the following command:

```bash
yarn devLocalTest
```

### Step 4: Run the Local Test Server *
In a new terminal window run

```
npm start
```
* only for testing the web extension, not needed to test the DOM/inject/GitHub integration


### Step 5: Run Cypress

In a new terminal window, run the following command:

```bash
npx cypress open
```

This will open the Cypress application.

## NB You will need to run steps 3, 4, and 5 to see changes you've made to your code between running tests. You can not just rerun the test after making a change, but will need to rebundle, restart server, and to stop and start Cypress each time

## Conclusion

You have successfully set up Cypress testing for your project. Your environment is now ready for executing test cases.

