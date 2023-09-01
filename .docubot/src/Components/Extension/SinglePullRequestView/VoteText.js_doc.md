**Name:**
VoteText.js

**Summary:**
This file is a React component used for representing the voting status of a pull request within a Chrome extension. It creates a styled `Decision` component that shows different text based on the voting situation (`disabled`, `voted`, `chosenSide`, `userVotedAt`) of the current user.

**Key Components:**

1. _Import Statements_: The import statements include React (with useEffect and useState hooks), styled-components for building CSS-in-JS components.

2. _Styled Components_: `Decision`, `YesGreen` and `NoRed` are styled-components.

3. _Function- formatDate(inputDate)_: Formats the input date to the format month/day/year. Uses JavaScript's Date object methods.

4. _Component- VoteText_: Main component in this file. Based on the props, it changes its state 'textType' which finally decides the output of the component.

**Props:**

- `disabled`: A boolean indicating if voting is disabled.
- `voted`: A boolean indicating whether a vote has been cast.
- `chosenSide`: A string indicating the side the vote went ('yes', 'no')
- `userVotedAt`: A string denoting at what date the user voted.

**Output:**
It renders styled text indicating if the user had voted yes or no, a prompt asking to vote or notice that pull request is not voteable. The exact text depends on the state 'textType' which acts based on the props given to this component. The action taken date is formatted with the `formatDate` function.

**Effects:**
When `disabled`, `voted` or `chosenSide` prop changes, it runs an effect updating its local state `textType` accordingly.