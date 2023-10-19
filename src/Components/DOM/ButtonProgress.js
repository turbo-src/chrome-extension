import React from 'react';
import styled from 'styled-components';

const YesBar = styled.div`
  height: 5px;
  background-color: #038800;
  flex-basis: ${props => props.flexBasis}%;
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
`;

const ButtonProgress = ({ yesPercent, noPercent }) => {
  const difference = 1 / 2; //need quorum?
  const yesWidth = yesPercent * 100 * difference;
  const noWidth = noPercent * 100 * difference;
  const remainingVotesPercent = 100 - (yesWidth + noWidth);

  return (
    <>
      <VoteBar>
        {yesPercent >= noPercent ? (
          <>
            <NoBar flexBasis={noWidth} />
            <YesBar flexBasis={yesWidth} />
          </>
        ) : (
          <>
            <YesBar flexBasis={yesWidth} />
            <NoBar flexBasis={noWidth} />
          </>
        )}
        <RemainingBar flexBasis={remainingVotesPercent} />
      </VoteBar>
    </>
  );
};

export default ButtonProgress;
