import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import useGetVotes from '../../hooks/useGetVotes.js';

export default function VoteStatusButton(props){

    const [user, setUser] = useState(props.user);
    const [repo, setRepo] = useState(props.repo);
    const [issueID, setIssueID] = useState(props.issueID);
    const [contributorID, setContributorID] = useState(props.contributorID);
    const [voteStatusButton, setVoteStatusButton] = useState({ color: 'gray', text: '?' });
    const [side, setSide] = useState(props.side);
    const [clicked, setClicked] = useState(props.clicked);
    
    
    const { tsrcPRStatus, voteTotals } = 
        useGetVotes(user, repo, issueID, contributorID, side, props.socketEvents, clicked);
      
    const buttonStyle = {
      vote: ['lightgreen', 'vote'],
      'pre-open': ['green', voteTotals],
      open: ['orchid', voteTotals],
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
    }, [tsrcPRStatus]);


    const handleClick = (e) => {
        e.preventDefault();
        props.toggleModal(e)
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
