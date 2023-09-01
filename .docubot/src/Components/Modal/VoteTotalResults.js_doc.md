This is the JavaScript code for the "VoteTotalResults" component of a chrome-extension, which is located in the path `/app/filebot-store-000/chrome-extension/src/Components/Modal/`. The main function of this file is to visualize the voting results. 

It's a stateless, functional component written in React, which takes as its arguments a set of properties(`props`) including `yesPercent`, `noPercent`, `totalPercent`, `yesVotes`, `noVotes`, `totalVotes`, and `quorum`. 

The component returns a `Results`div that contains a `ProgressBar` component. The `ProgressBar` component is fed the various props, and it presumably visualizes the information in the form of a progress bar. 

The styled-components library has been used for writing CSS in JavaScript. `Results` is a styled `div` component which flexibly positions its child component in the center, with column as its flex-direction. 

In the context of its containing folder, this file likely serves as one of the many components that make up the entire chrome extension, this one specifically providing a view for total voting results in some form of modal view.