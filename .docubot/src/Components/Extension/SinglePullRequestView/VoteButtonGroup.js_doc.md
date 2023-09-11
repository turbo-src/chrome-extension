File: VoteButtonGroup.js

This file constitutes a key component (VoteButtonGroup) in a Chrome extension which renders a group of two 'VoteButton' components for an interface dealing with single pull requests.

The exported function 'VoteButtonGroup' expects a set of properties to configure and enable voting functionality, these are:

- `disabled`: a boolean that determines if the voting buttons are enabled or disabled.
- `setDisabled`: a function to set the disabled state.
- `voted`: a boolean representing if the user has voted already.
- `chosenSide`: the side ('yes' or 'no') that was chosen by the user in the vote.
- `user`: the GitHub user who is voting.
- `repo`: the GitHub repository where the issue/pull request resides.
- `issueID`: the unique identifier for the issue/pull request.
- `contributorID`: the identifier of the contributor to the issue/pull request.
- `githubToken`: the token used for GitHub API authentication.
- `defaultHash`: the hash for the vote button initial state.
- `childDefaultHash`: the hash for the child component's initial state.
- `owner`: the owner of the GitHub repository where the issue/pull request is located.

The function returns a styled 'BtnGroupVote' div that displays two 'VoteButton' components, indicating 'yes' (approval for the action) and 'no' (disapproval for the action).