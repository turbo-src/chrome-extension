# Cypress Testing Setup Instructions

This guide will assist you in setting up Cypress for testing your project. Please follow these instructions.

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
## NB If you encounter a two step log in process thru GitHub, please click Authorize in the testing window, and rerun the tests. GitHub on occaison has an additional prompt for authenticating and Cypress tests are not conditional by design.

## NB You will need to run step 3 to see changes you've made to your code between running tests.

## Conclusion

You have successfully set up Cypress testing for your project. Your environment is now ready for executing test cases.

