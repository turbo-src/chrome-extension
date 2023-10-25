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
  modalOpen,
  toggleModal,
  socketEvents,
  prDataFromInject
}) {
  const [voteStatusButton, setVoteStatusButton] = useState({
    color: 'lightgreen',
    text: 'vote'
  });

  /* We need to do the following: 
   - if it is the first ever render on a created repo page, use useGetVotes to get PR data
   - all future renders should just inherit it from inject (getRepoData)
   - if socket events are updated, then call useGetVotes

   Currently only the first two of these goals are being acheived with the following:
   */

  // If new repo or cached repo:
  let { prData, loading } = prDataFromInject.prData.state
    ? prDataFromInject
    : useGetVotes(repoID, issueID, contributorID, socketEvents);
  console.log('prDaataFromInject', prDataFromInject);
  
  // if Socket events:
  // let useGetVotesRes = useGetVotes(repoID, issueID, contributorID, socketEvents)
  // prData = useGetVotesRes.prData
  // loading = useGetVotesRes.loading

  const buttonStyle = {
    vote: ['lightgreen', 'vote'],
    'pre-open': ['green', prData?.voteData?.voteTotals?.totalVotePercent + '%'],
    open: ['orchid', prData?.voteData?.voteTotals?.totalVotePercent + '%'],
    frozen: [
      '#BFD4F2',
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
