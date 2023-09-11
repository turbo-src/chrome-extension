This JavaScript file is a React component for a Modal window used in a voting system. It is part of a Chrome extension, located in the "/Components/Modal" directory.

Functionalities include:
- The component represents a modal window for voting. It accepts props for user data, repository data, issue ID, contributor ID, contributor name, vote totals, GitHub user data, socket events, a method to toggle the modal, and a getVotes method.
- Inside the modal, different information is displayed about voting, including total votes, voting buttons, vote percentages, and a table that lists all votes.
- The useState hook is used to manage local state for several aspects such as loading state, vote details, etc.
- The useEffect hooks are used to handle side effects. An initial set up for loading and updating information every time the available votes change.
- The updateVotesHandler function is used to get and update the vote details.
- The file uses styled-components for styling the "ModalContent" component.

Components imported in this file:
- VoteTotalMain: This component shows the total number of votes.
- VotesTable: This component presents all the votes in a table.
- VoteTotalResults: This component shows the results of the voting.
- VoteButtonGroup: This component represents the group of voting buttons.
- VoteText: This component represents the text displayed in the voting modal.
- SkeletonModal: This component represents a loading state for the voting modal.

This file exports a default functional ModalVote component which displays this voting modal.