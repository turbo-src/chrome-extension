File: `/app/filebot-store-000/chrome-extension/src/utils/mathUtil.js`

This JavaScript file exports an object `mathUtil` with the following function:

1. **votePercentToMergeInteger(voteYesTotal)**: Calculates the percentage of affirmative votes needed to merge a certain proposal.

    - It starts by defining some constants, including the quorum or minimum participation required (50%), majority required (50%), and total number of possible votes (1,000,000).

    - It then calculates the minimum number of affirmative votes required to approve a proposal and calculates the percentage that `voteYesTotal` represents of this minimum.

    - The function then decides how to display this percentage:
        - If the percentage is less than 10%, it is displayed with one decimal place.
        - If the percentage is greater than 99% but less than 100%, it is displayed with one decimal place to avoid incorrectly showing "100%" when it is still not fully met.
        - If the percentage is greater than 100%, this function returns 100.
        - And, if the percentage is exactly 100, it returns the percentage rounded to the nearest integer.

Please note, throughout this calculation, it assumes that the `voteYesTotal` input is a valid number. It also aims to provide a more nuanced representation of approval percentages, especially near full approval or far from it.