import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import useGetVotes from '../../hooks/useGetVotes.js';
import { merge } from 'superagent';

export default function VoteStatusButton({user, repo, issueID, contributorID, side, clicked, toggleModal, socketEvents}) {
    const [voteStatusButton, setVoteStatusButton] = useState({ color: 'gray', text: '?', state: 'vote', mergeableCodeHost: true });
    const [voteTotals, setVoteTotals] = useState(0);

    const { votes } = 
        useGetVotes(user, repo, issueID, contributorID, side, socketEvents, clicked);

    const buttonStyle = {
      'vote': ['lightgreen', 'vote'],
      'pre-open': ['green', Math.round(voteTotals) + '%'],
      'open': ['orchid', Math.round(voteTotals) + '%'],
      'conflict': ['orange', 'conflict'],
      'merge': ['darkorchid', 'merged'],
      'close': ['red', 'closed']
    };

    useEffect(() => {
        console.log('votes', votes);
        let quorum = 0.5;
        const totalVotes = votes.voteData.voteTotals.totalVotes;
        const totalPossibleVotes = 1_000_000;
        const voteTotals = (totalVotes / totalPossibleVotes) * 100 * (1 / quorum);
        setVoteTotals(voteTotals);

        let newState = {
          color: 'lightgreen',
          text: 'vote',
          state: votes.state,
          mergeableCodeHost: votes.mergeable
        };
  
        if (!votes.mergeable) {
          newState.state = 'conflict';
        } else if (voteTotals === 0) {
          newState.state = 'vote';
          newState.color = 'lightgreen';
          newState.text = 'vote';
          newState.mergeableCodeHost = true;
        } else {
          const buttonColor = buttonStyle[votes.state][0];
          const buttonText = buttonStyle[votes.state][1];
          newState.color = buttonColor;
          newState.text = buttonText;
          newState.voteTotals = Math.round(voteTotals);
        }

        setVoteStatusButton(newState);
    }, [votes]);
  
    const handleClick = (e) => {
        e.preventDefault();
        toggleModal(e)
    };

    return (
        <Button
        style={{ color: 'white', background: voteStatusButton.color }}
        onClick={(e) => handleClick(e)}
        >
        {voteStatusButton.voteTotals < 100 ? voteStatusButton.voteTotals + '%' : voteStatusButton.text}
        </Button>
    );
};
