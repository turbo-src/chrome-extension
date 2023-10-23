import React, { useState, useEffect } from 'react';
import useGetVotes from '../../hooks/useGetVotes.js';
import Skeleton from '@mui/material/Skeleton';
import styled from 'styled-components';
import ButtonProgress from './ButtonProgress.js';
const LockIcon = 'https://www.reibase.rs/lock.png';

const ButtonVote = styled.button`
  color: white;
  width: 80px;
  height: 30px;
  border: 0px;
  font-weight: 500;
  border-radius: 5px;
  filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.35));
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VoteButtonText = styled.span`
  position: relative;
  right: 7px;
`;

const IconImg = styled.img`
  width: 16px;
  height: 11px;
  position: relative;
  right: 15px;
`;

const Placeholder = styled.div`
  width: 16px;
  height: 11px;
`;

export default function VoteStatusButton({
  user,
  repoID,
  issueID,
  contributorID,
  side,
  clicked,
  toggleModal,
  socketEvents
}) {
  const [voteStatusButton, setVoteStatusButton] = useState({
    color: '#4AA0D5',
    text: 'Vote'
  });

  const { prData, loading } = useGetVotes(user, repoID, issueID, contributorID, side, socketEvents, clicked);
  const totalYesVotes = prData?.voteData?.voteTotals?.totalYesVotes;
  const totalNoVotes = prData?.voteData?.voteTotals?.totalNoVotes;

  const buttonStyle = {
    vote: ['#4AA0D5', 'Vote'],
    'pre-open': [
      totalYesVotes >= totalNoVotes ? '#4AA0D5' : '#4AA0D5',
      prData?.voteData?.voteTotals?.totalVotePercent + '%'
    ],
    open: [totalYesVotes >= totalNoVotes ? '#4AA0D5' : '#4AA0D5', 'Vote'],
    frozen: [totalYesVotes >= totalNoVotes ? '#919190' : '#919190', 'Vote'],
    conflict: ['#FC9A28', 'Conflict'],
    merge: ['#613E8E', 'Merged'],
    close: ['#DD4747', 'Closed']
  };

  useEffect(() => {
    if (!loading) {
      const buttonColor = buttonStyle[prData.state][0];
      const buttonText = buttonStyle[prData.state][1];
      setVoteStatusButton({ color: buttonColor, text: buttonText });
    }
    console.log(prData);
  }, [prData, loading, socketEvents]);

  const handleClick = e => {
    e.preventDefault();
    toggleModal(e);
  };

  if (loading) {
    return <Skeleton animation="wave" variant="rounded" width={80} height={30} />;
  }

  return (
    <>
      <ButtonVote style={{ background: voteStatusButton.color }} onClick={e => handleClick(e)}>
        {prData.state === 'frozen' || prData.state === 'conflict' ? (
          <IconImg src={LockIcon} alt={prData.state} />
        ) : (
          <Placeholder />
        )}
        <VoteButtonText>{voteStatusButton.text}</VoteButtonText>
      </ButtonVote>
      <ButtonProgress
        yesPercent={prData.voteData.voteTotals.yesPercent}
        noPercent={prData.voteData.voteTotals.noPercent}
        quorum={prData.voteData.voteTotals.quorum}
        totalVotes={prData.voteData.voteTotals.totalVotes}
      />
    </>
  );
}
