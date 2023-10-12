import React from 'react';
import styled from 'styled-components';
import VoteButton from './VoteButton';

const BtnGroupVote = styled.div`
  display: flex;
  width: 100%;
  height: 80px;
  justify-content: center;
  align-items: center;
  flex-direction: row; 

  &:after {
    content: '';
    clear: both;
    display: table;
  }
  &:not(:last-child) {
    border-right: none; 
  }
`;

export default function VoteButtonGroup({disabled, setDisabled, clickVoteHandler, setClickVoteHandler, setVoted, voted, setChosenSide, chosenSide, user, repo, repoID, issueID, contributorID, contributorName, voteTotals, githubUser, totalPercent, votePower, quorum}) {
  return (
    <BtnGroupVote>
      <VoteButton
        disabled={disabled}
        setDisabled={setDisabled}
        voted={voted}
        setVoted={setVoted}
        clickVoteHandler={clickVoteHandler}
        setClickVoteHandler={setClickVoteHandler}
        side={'yes'}
        chosenSide={chosenSide}
        setChosenSide={setChosenSide}
        user={user}
        repo={repo}
        repoID={repoID}
        issueID={issueID}
        contributorID={contributorID}
        contributerName={contributorName}
        githubUser={githubUser}
        totalPercent={totalPercent}
        votePower={votePower}
        quorum={quorum}
      ></VoteButton>
      <VoteButton
        disabled={disabled}
        setDisabled={setDisabled}
        voted={voted}
        setVoted={setVoted}
        clickVoteHandler={clickVoteHandler}
        setClickVoteHandler={setClickVoteHandler}
        side={'no'}
        chosenSide={chosenSide}
        setChosenSide={setChosenSide}
        user={user}
        repo={repo}
        repoID={repoID}
        issueID={issueID}
        contributorID={contributorID}
        contributerName={contributorName}
        githubUser={githubUser}
        totalPercent={totalPercent}
        votePower={votePower}
        quorum={quorum}
      ></VoteButton>
    </BtnGroupVote>
  );
}
