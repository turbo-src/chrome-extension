This file defines a `ProgressBar` component for a Google Chrome extension in JavaScript using the React library and styled-components for CSS-in-JS.

The `ProgressBar` is used to visually represent voting results with different colors and percentage based widths. The `ProgressBar` component takes `yesPercent`, `yesVotes`, `noPercent`, `noVotes`, `totalPercent`, and `quorum` as props. The percentage of "yes," "no," and "remaining" votes is calculated and displayed as bars.

There are different styled-components created for different parts of the ProgressBar:

- `YesBar` & `NoBar` represent the percentage of affirmative and negative votes respectively, in green and red.
- `YesTotals` & `NoTotals` are for displaying the total yes and no votes. They share the same styles but different colors.
- `RemainingBar` shows the percentage of votes yet to be cast, in gray.
- `VoteBar` is the container for both the total vote counts and vote percentage bars.

The component sorts the bars based on whether yes percent is greater than or equal to no percent, displaying the greater value first. The `RemainingBar` will always be displayed last. It also only displays the number of votes if they are equal to or greater than 1.