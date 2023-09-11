This JavaScript file (`VoteTotalMain.js`) contains the primary logic for a voting interface displayed within a modal for a Chrome browser extension. The file employs the React.js JavaScript library to create multiple styled components for the modal. It also utilizes the `styled-components` library to manage CSS in JS.

Key functionalities include:

1. `addCommas(num)` function: Adds commas to numbers to make them more readable.
2. `VoteTotalMain(props)`: A React function component for the primary voting interface on the modal. 

The component uses multiple properties (props) such as:

    - `user`: distinguishing the user.
    - `repo`: identifying the source code repository.
    - `issueID`: for referencing the issue ID.
    - `contributorID`: for identifying who made contributions.
    - `contributorName`: for identifying the person who made contributions.
    - `side`: Not clear from the present code, might be used for determining an option for voting.
    - `title`: for supplying the pull request title.
    - `baseBranch`: identifies the base git branch.
    - `forkBranch`: identifies the forked git branch.
    - `votePower`: quantifies the amount of influence the user's vote carries.

The rendered modal interface consists of styled text blocks displaying essential information about the pull request and the voting process. It also includes two interactive images in the top bar, one leading to the TurboSrc website when clicked, and the other (presumably) closes the modal.