# Home Component

## Description

This React component is the home page for the TurboSrc extension. It interacts with a GitHub repository to fetch and display information about pull requests, allowing users to participate in an innovative voting system for these pull requests.

## Imports

- `React` (and hooks `useState`, `useEffect`)
- `useSelector` from `react-redux`
- `useNavigate` from `react-router-dom`
- `superagent` for making HTTP requests
- Custom requests, hooks, utility functions, and socket configurations from various relative paths
- Styled components for styling the elements

## State

- `user`, `repo`, `owner` fetched from Redux store
- Multiple pieces of state to handle pull requests data, modal visibility, loading status, and other UI states.

## Functions

- `handlePullRequestClick(pullRequest)`: 
    - Triggered when a pull request row is clicked. 
    - Sets various state variables to reflect the data of the clicked pull request.
    - Opens the modal that shows detailed data about a pull request.

- `getRepoDataHandler()`: 
    - Async function to fetch data about the current repository.
    - Sets `pullRequests` and `tokenAmount` state variables.

- `getVotes()`: 
    - Async function to get votes for a given pull request. 
    - Note: This function declaration seems to be incomplete in the code snippet provided.

## Socket Event

- Listens for a 'vote received' event on the socket.
- Calls `getRepoDataHandler()` if the event concerns the current `owner` and `repo`.

## Conditional Rendering

- If `oldVersion` is true, it prompts the user to update the TurboSrc version.
- If `owner` and `repo` are both 'none', it asks the user to visit a GitHub repo page.
- Based on `seeModal`, it either shows the list of pull requests or the detailed view of a selected pull request.

## Styles

- Uses `styled-components` for various styled elements like `VoteText`, `ArrowPic`, `TurbosrcNotice`, `CenteredWrapper`, `CreateRepo`, `BoldText`, `TopBar`, `OwnerRepo`, `OwnerText`, `SlashText`, `Data`, `Content`, `DataHeading`, `PullRequestHeading`, `RepoButton`, `GithubLink`, `CreateNotice`, `BtnSpan`, `Back`, `BackButton`.

## Dependencies

- This component assumes the existence of several other components and modules, like `SinglePullRequestView`, `PullRequestRow` and expects certain conditions and data shapes.

## Usage

This component is meant to be used as the home page of the TurboSrc extension, where users can interact with GitHub repositories and vote on pull requests.
