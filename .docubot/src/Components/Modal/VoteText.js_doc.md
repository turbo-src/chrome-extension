**File Location:** /app/filebot-store-000/chrome-extension/src/Components/Modal/VoteText.js

**File Summary:**
This JavaScript file is part of a Chrome extension and defines the `VoteText` functional component using React. This component is used for handling the voting system within the application, particularly displaying voting information to users. 

The `VoteText` component uses state and effects to control and format the display based on if a user has voted, the side they chose, and whether the vote is currently disabled.

There are four main text types that can be displayed. Each text type corresponds to a possible state of the voting process and is managed by a `switch` statement in the code:
1. `Decision`: Instructs the user to vote 'yes' to merge or 'no' to close.
2. `Yes`: Indicates the user has voted 'yes' to merge and displays the date of voting.
3. `No`: Indicates the user has voted 'no' to close and displays the date of voting.
4. `None`: Message displays if the pull request is not voteable.

The file also includes a utility function `formatDate(inputDate)` for formatting date display inside the component.

**Components:**
- `Decision`: A styled div component for displaying the voting information.
- `YesGreen` and `NoRed`: Styled span components used to display 'yes' or 'no' in different color codes.
- `VoteText`: A functional component using React hooks which conditionally displays the voting statements.