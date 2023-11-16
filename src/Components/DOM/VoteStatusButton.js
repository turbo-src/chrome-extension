import React, { useState, useEffect } from 'react';
import useGetVotes from '../../hooks/useGetVotes.js';
import Skeleton from '@mui/material/Skeleton';
import styled from 'styled-components';
import ButtonProgress from './ButtonProgress.js';
import { postGetVotes } from '../../requests.js';
const LockIcon = 'https://www.reibase.rs/lock.png';

const ButtonVote = styled.button`
  color: white;
  width: 80px;
  height: 30px;
  border: none;
  font-weight: 500;
  border-radius: 5px;
  filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.35));
  display: flex;
  justify-content: space-around; 
  align-items: center;
  background-color: var(--button-color);
  transition: background-color 0.3s ease;
  margin-bottom: ${props => (props.zeroVotes ? '14px' : '0')};
  &:hover {
    background-color: var(--button-dark-color);
  }
`;

const VoteButtonText = styled.span`
  flex: 1;
  text-align: center;
  pointer-events: none;
  margin-right: 10px;
`;

const IconImg = styled.img`
  width: 16px;
  height: 11px;
  margin-right: auto;
  pointer-events: none;
`;

const Placeholder = styled.div`
  width: 16px;
  height: 11px;
  pointer-events: none;
`;

export default function VoteStatusButton({ repoID, issueID, contributorID, toggleModal, prDataFromInject }) {
  const [voteStatusButton, setVoteStatusButton] = useState({
    color: '#4AA0D5',
    text: 'Vote'
  });
  const [state, setState] = useState({ prData: false, loading: true });
  const { loading, prData } = state;

  const getVotesHandler = async () => {
    await postGetVotes(repoID, issueID, contributorID).then(res => setState({ prData: res, loading: false }));
  };

  const buttonStyle = {
    vote: ['#4AA0D5', 'Vote'],
    'pre-open': ['#4AA0D5', 'Vote'],
    open: ['#4AA0D5', 'Vote'],
    frozen: ['#919190', 'Vote'],
    conflict: ['#FC9A28', 'Conflict'],
    merge: ['#794D9A', 'Merged'],
    close: ['#DD4747', 'Closed']
  };

  const transitionColors = {
    '#4AA0D5': '#2391D6',
    '#919190': '#82827E',
    '#794D9A': '#66358B',
    '#DD4747': '#C32424',
    '#FC9A28': '#F1880C'
  };

  // Set prData and loading either from props or from API if new PR:
  useEffect(() => {
    if (prDataFromInject.prData) {
      setState(prDataFromInject);
    } else {
      getVotesHandler();
    }
  }, [prDataFromInject.prData]);

  // Style button based on the PR's state:
  useEffect(() => {
    if (!loading) {
      const buttonColor = buttonStyle[prData.state][0];
      const buttonText = buttonStyle[prData.state][1];
      setVoteStatusButton({ color: buttonColor, text: buttonText });
    }
  }, [loading, prData]);

  const handleClick = e => {
    e.preventDefault();
    toggleModal(e);
  };

  if (loading) {
    return <Skeleton animation="wave" variant="rounded" width={80} height={30} />;
  }

  return (
    <>
      <ButtonVote
        zeroVotes={prData.voteData.voteTotals.totalVotes === 0}
        style={{
          '--button-color': voteStatusButton.color,
          '--button-dark-color': transitionColors[voteStatusButton.color] || voteStatusButton.color
        }}
        onClick={e => handleClick(e)}
      >
        {prData.state === 'conflict' || prData.state === 'frozen' ? (
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
