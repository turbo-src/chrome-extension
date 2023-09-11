File: ProgressBar.js

Summary:

This JavaScript file is a React component for a progress bar visual that is used in the Filebot Chrome extension. The progress bar represents the proportion of 'yes' and 'no' votes. The bar has three components: 'YesBar', 'NoBar' and 'RemainingBar', which are rendered side by side. 

Functionality:

1. The ProgressBar component receives three props: 'yesPercent', 'noPercent', and 'quorum'. 'yesPercent' and 'noPercent' represent the percentage of votes that are positive and negative respectively, while 'quorum' is used to calculate the difference for setting the width of the bars.

2. It calculates the width for the YesBar and NoBar based on 'yesPercent' and 'noPercent' respectively. The width of RemainingBar is calculated as the remaining percentage after subtracting the sum of 'yesPercent' and 'noPercent' from 100.

3. Depending on whether the 'yesPercent' is higher or lower than the 'noPercent', the render order of YesBar and NoBar is decided.

4. The progress bar is always 100% in width and consists of YesBar, NoBar and RemainingBar (in the respective order based on vote percentages). 

Components:

1. YesBar: A styled div representing the 'Yes' votes in green (#038800).
2. NoBar: A styled div representing the 'No' votes in red (#d33131).
3. RemainingBar: A styled div representing the remaining votes in grey (#d9d9d9).
4. VoteBar: A styled div that wraps YesBar, NoBar and RemainingBar. It is displayed flex and has certain margins and paddings.
