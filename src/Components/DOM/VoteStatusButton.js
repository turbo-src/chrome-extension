import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import useGetVotes from '../../hooks/useGetVotes.js';

export default function VoteStatusButton({user, repo, issueID, contributorID, side, clicked, toggleModal, socketEvents}) {
    const [voteStatusButton, setVoteStatusButton] = useState({ color: 'gray', text: '?' });
    
    const { tsrcPRStatus, voteTotals } = 
        useGetVotes(user, repo, issueID, contributorID, side, socketEvents, clicked);

    const buttonStyle = {
      vote: ['lightgreen', 'vote'],
      'pre-open': ['green', Math.round(voteTotals) + '%'],
      open: ['orchid', Math.round(voteTotals) + '%'],
      conflict: ['orange', 'conflict'],
      merge: ['darkorchid', 'merged'],
      close: ['red', 'closed']
    };

    useEffect(() => {
        if(!tsrcPRStatus) {
          return;
        }
        if(!tsrcPRStatus.mergeableCodeHost) {
          tsrcPRStatus.state = 'conflict';
        }
        const buttonColor = buttonStyle[tsrcPRStatus.state][0]
        const buttonText = buttonStyle[tsrcPRStatus.state][1]
        setVoteStatusButton({color: buttonColor, text: buttonText});
        if(voteTotals === 0) {
          setVoteStatusButton({color: 'lightgreen', text: 'vote'});
        } 
    }, [tsrcPRStatus, voteTotals]);


    const handleClick = (e) => {
        e.preventDefault();
        toggleModal(e)
    };

    return (
        <Button
        style={{ color: 'white', background: voteStatusButton.color }}
        onClick={(e) => handleClick(e)}
        >
        {voteStatusButton.text}
        </Button>
    );
};
