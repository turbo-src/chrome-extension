import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import useGetVotes from '../../hooks/useGetVotes.js';
import Skeleton from '@mui/material/Skeleton';

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

  const buttonStyle = {
    vote: ['lightgreen', 'vote'],
    'pre-open': ['green', prData?.voteData?.voteTotals?.totalVotePercent + '%'],
    open: ['orchid', prData?.voteData?.voteTotals?.totalVotePercent + '%'],
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
  }, [prData, loading, socketEvents]);

  const handleClick = e => {
    e.preventDefault();
    toggleModal(e);
  };

  if (loading) {
    return <Skeleton animation="wave" variant="rounded" width={80} height={30} />;
  }

  return (
    <Button style={{ color: 'white', background: voteStatusButton.color, width: '80px' }} onClick={e => handleClick(e)}>
      {voteStatusButton.text}
    </Button>
  );
}
