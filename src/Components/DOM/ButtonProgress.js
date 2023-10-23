import React from 'react';
import styled from 'styled-components';

const YesBar = styled.div`
  background-color: #038800;
  height: 3px;
  flex-basis: ${props => props.flexBasis}%;
  border-radius: ${props => props.roundedCorners || '0px'};
`;

const NoBar = styled(YesBar)`
  background-color: #d33131;
  flex-basis: ${props => props.flexBasis}%;
`;

const RemainingBar = styled(YesBar)`
  background-color: #d9d9d9;
  flex-basis: ${props => props.flexBasis}%;
`;

const VoteBar = styled.div`
  display: flex;
  height: 5px;
  width: 100%;
  margin-bottom: 4px;
  margin-top: 5px;
  filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.35));
`;

const ButtonProgress = ({ yesPercent, noPercent, quorum, totalVotes }) => {
  const difference = 1 / quorum;
  const yesWidth = yesPercent * 100 * difference;
  const noWidth = noPercent * 100 * difference;
  const remainingVotesPercent = 100 - (yesWidth + noWidth);
  const yesRoundedCorners = remainingVotesPercent > 0 ? '0px' : '0px 2px 2px 0px';
  const noRoundedCorners = remainingVotesPercent > 0 ? '0px' : '2px 0px 0px 2px';
  const remainingRoundedCorners = '2px 0px 0px 2px';
  if (totalVotes > 0) {
    return (
    <>
        <VoteBar>
        {yesPercent >= noPercent ? (
            <>
            <NoBar flexBasis={noWidth} roundedCorners={noRoundedCorners} />
            <YesBar flexBasis={yesWidth} roundedCorners={yesRoundedCorners} />
            </>
        ) : (
            <>
            <YesBar flexBasis={yesWidth} roundedCorners={yesRoundedCorners} />
            <NoBar flexBasis={noWidth} roundedCorners={noRoundedCorners} />
            </>
        )}
        {remainingVotesPercent > 0 && <RemainingBar flexBasis={remainingVotesPercent} roundedCorners={remainingRoundedCorners} />}
        </VoteBar>
    </>
    );

  } else {
    return null;
  }
};
export default ButtonProgress;
