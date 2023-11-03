import React, { useState, useEffect } from 'react';
import VoteTotalMain from './VoteTotalMain';
import styled from 'styled-components';
import VotesTable from './VotesTable';
import VoteTotalResults from './VoteTotalResults';
import VoteButtonGroup from './VoteButtonGroup';
import VoteText from './VoteText';
import SkeletonModal from './SkeletonModal';
const ModalContent = styled.div`
  background-color: #fff;
  margin: auto;
  padding: 20px;
  height: 720px;
  width: 620px;
  text-align: center;
  box-shadow: 0px 12px 20px -1px rgba(0, 0, 0, 0.18);
`;

const ModalVote = props => {
  let user = props.user;
  let repo = props.repo;
  let repoID = props.repoID
  let issue_id = props.issueID;
  let contributor_id = props.contributorID;
  let contributor_name = props.contributorName;
  let vote_totals = props.voteTotals;
  let githubUser = props.githubUser;
  let prDataFromInject = props.prDataFromInject;
  console.log('prDataFromInject in modal vote', prDataFromInject);
  const [loading, setLoading] = useState(true);
  let toggleModal = props.toggleModal;
  const [disabled, setDisabled] = useState(false);
  const [quorum, setQuorum] = useState(0.5);
  const voteableStates = new Set(['vote', 'pre-open', 'open']);
  const notVoteableStates = new Set(['conflict', 'merge', 'close', 'frozen']);
  const [clickVoteHandler, setClickVoteHandler] = useState(false);
  const socketEvents = props.socketEvents
  const [voted, setVoted] = useState(props.prDataFromInject.prData.voteData.contributor.voted); // really dont need these
  const [chosenSide, setChosenSide] = useState(props.prDataFromInject.prData.voteData.contributor.side);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
    setLoading(true);
    if (voteableStates.has(props.voteRes.state)) {
      setDisabled(false);
    } else if (notVoteableStates.has(props.voteRes.state)) {
      setDisabled(true);
    }
  }, [props.voteRes]);

  
  return (
    <ModalContent>
      {loading ? (
        <>
          <SkeletonModal />
        </>
      ) : (
        <>
          <VoteTotalMain
            user={user}
            repo={repo}
            issueID={issue_id}
            contributorID={contributor_id}
            contributorName={contributor_name}
            voteTotals={vote_totals}
            githubUser={githubUser}
            title={props.prDataFromInject.prData.title}
            forkBranch={props.prDataFromInject.prData.forkBranch}
            yesVotes={props.prDataFromInject.prData.voteData.voteTotals.totalYesVotes}
            noVotes={props.prDataFromInject.prData.voteData.voteTotals.totalNoVotesotes}
            votePower={props.prDataFromInject.prData.voteData.contributor.votePower}
            baseBranch={props.prDataFromInject.prData.baseBranch}
            toggleModal={toggleModal}
            id="vote-total-main"
          >
            <h2>Vote Total</h2>
          </VoteTotalMain>
          <VoteText disabled={disabled} voted={props.prDataFromInject.prData.voteData.contributor.voted} chosenSide={props.prDataFromInject.prData.voteData.contributor.side} userVotedAt={props.prDataFromInject.prData.voteData.contributor.createdAt} />
          <VoteButtonGroup
            disabled={disabled}
            setDisabled={setDisabled}
            voted={props.prDataFromInject.prData.voteData.contributor.voted}
            setVoted={setVoted}
            clickVoteHandler={clickVoteHandler}
            setClickVoteHandler={setClickVoteHandler}
            chosenSide={props.prDataFromInject.prData.voteData.contributor.side}
            setChosenSide={setChosenSide}
            user={user}
            repo={repo}
            repoID={repoID}
            issueID={issue_id}
            contributorID={contributor_id}
            contributorName={contributor_name}
            voteTotals={vote_totals}
            githubUser={githubUser}
            totalPercent={props.prDataFromInject.prData.voteData.voteTotals.totalVotePercent}
            votePower={props.prDataFromInject.prData.voteData.contributor.votePower}
            quorum={quorum}
          />
          <VoteTotalResults
            totalPercent={props.prDataFromInject.prData.voteData.voteTotals.totalVotePercent}
            yesPercent={props.prDataFromInject.prData.voteData.voteTotals.yesPercent}
            noPercent={props.prDataFromInject.prData.voteData.voteTotals.noPercent}
            yesVotes={props.prDataFromInject.prData.voteData.voteTotals.totalYesVotes}
            noVotes={props.prDataFromInject.prData.voteData.voteTotals.totalNoVotes}
            totalVotes={props.prDataFromInject.prData.voteData.voteTotals.totalVotes}
            quorum={quorum}
            id="vote-total-results"
          />
          <VotesTable allVotes={props.prDataFromInject.prData.voteData.votes} />
        </>
      )}
    </ModalContent>
  );
};

export default ModalVote;
