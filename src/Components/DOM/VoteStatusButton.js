import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import useGetVotes from '../../hooks/useGetVotes.js';
import Skeleton from '@mui/material/Skeleton';
import styled from 'styled-components';
import LockIcon from '../../../icons/Lock.png';

const ButtonVote = styled.button`
  color: white;
  width: 80px;
  height: 30px;
  border: 0px;
`;

const SpanVote = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LockImg = styled.img`
  width: 15px;
  height: 15px;
  
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
    color: 'lightgreen',
    text: 'vote'
  });

  const { prData, loading } = useGetVotes(user, repoID, issueID, contributorID, side, socketEvents, clicked);
  const totalYesVotes = prData?.voteData?.voteTotals?.totalYesVotes
  const totalNoVotes = prData?.voteData?.voteTotals?.totalNoVotes

  const buttonStyle = {
    vote: ['#61D25E', 'vote'],
    'pre-open': [
      totalYesVotes >= totalNoVotes ? '#61D25E' : '#FA4D57',
      prData?.voteData?.voteTotals?.totalVotePercent + '%'
    ],
    open: [
      totalYesVotes >= totalNoVotes ? '#09AE10' : '#E2222D',
      prData?.voteData?.voteTotals?.totalVotePercent + '%'
    ],
    frozen: [
      totalYesVotes >= totalNoVotes ? '#8ECA8C' : '#E2222D',
      prData?.voteData?.voteTotals?.totalVotePercent > 0 ? prData?.voteData?.voteTotals?.totalVotePercent + '%' : 'vote'
    ],
    conflict: ['orange', 'conflict'],
    merge: ['darkorchid', 'merged'],
    close: ['red', 'closed']
  };

  useEffect(() => {
    if (!loading) {
      const buttonColor = buttonStyle[prData.state][0];
      const buttonText = buttonStyle[prData.state][1];
      setVoteStatusButton({ color: buttonColor, text: buttonText });
    }
    console.log(voteStatusButton.text);
  }, [prData, loading, socketEvents]);

  const handleClick = e => {
    e.preventDefault();
    toggleModal(e);
  };

  if (loading) {
    return <Skeleton animation="wave" variant="rounded" width={80} height={30} />;
  }

  return (
    <ButtonVote style={{ background: voteStatusButton.color }} onClick={e => handleClick(e)}>
     <SpanVote>
      {prData.state === 'merge' ? <LockImg src={LockIcon}/> : null}{voteStatusButton.text}
      </SpanVote>
    </ButtonVote>
  );
}
