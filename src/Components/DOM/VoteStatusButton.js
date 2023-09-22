import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import useGetVotes from '../../hooks/useGetVotes.js';
import Skeleton from '@mui/material/Skeleton';

export default function VoteStatusButton({
  user,
  repo,
  repoID,
  issueID,
  contributorID,
  side,
  clicked,
  toggleModal,
  socketEvents
}) {
  const [voteStatusButton, setVoteStatusButton] = useState({
    color: 'gray',
    text: '?',
    state: 'vote',
    mergeableCodeHost: true
  });
  const [voteTotals, setVoteTotals] = useState(0);

  const { prData, loading } = useGetVotes(user, repoID, issueID, contributorID, side, socketEvents, clicked);
  
  const buttonStyle = {
    vote: ['lightgreen', 'vote'],
    'pre-open': ['green', Math.floor(voteTotals) + '%'],
    open: ['orchid', Math.floor(voteTotals) + '%'],
    conflict: ['orange', 'conflict'],
    merge: ['darkorchid', 'merged'],
    close: ['red', 'closed']
  };

  useEffect(() => {
    if (!loading) {
      let quorum = prData.voteData.voteTotals.quorum;
      const totalVotes = prData.voteData.voteTotals.totalVotes;
      const totalPossibleVotes = 1_000_000;
      const voteTotals = (totalVotes / totalPossibleVotes) * 100 * (1 / quorum);
      setVoteTotals(voteTotals);

      let newState = {
        color: 'lightgreen',
        text: 'vote',
        state: prData.state,
        mergeableCodeHost: prData.mergeable
      };

      if (!prData.mergeable) {
        newState.state = 'conflict';
      } else if (voteTotals === 0) {
        newState.state = 'vote';
        newState.color = 'lightgreen';
        newState.text = 'vote';
        newState.mergeableCodeHost = true;
      } else {
        const buttonColor = buttonStyle[prData.state][0];
        const buttonText = buttonStyle[prData.state][1];
        newState.color = buttonColor;
        newState.text = buttonText;
        newState.voteTotals = Math.floor(voteTotals);
      }

      setVoteStatusButton(newState);
    }
  }, [prData, loading]);

  const handleClick = e => {
    e.preventDefault();
    toggleModal(e);
  };

  if (loading) {
    return <Skeleton animation="wave" variant="rounded" width={80} height={30} />;
  }

  return (
    <Button style={{ color: 'white', background: voteStatusButton.color, width: '80px' }} onClick={e => handleClick(e)}>
      {voteStatusButton.voteTotals < 100 ? voteStatusButton.voteTotals + '%' : voteStatusButton.text}
    </Button>
  );
}
