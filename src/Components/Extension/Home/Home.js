import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PullRequestRow from './PullRequestRow.js';
import ArrowRight from '../../../../icons/arrowright.png';
import BackArrow from '../../../../icons/back.png';
import SkeletonModal from './SkeletonExt.js';
import SinglePullRequestView from '../SinglePullRequestView/SinglePullRequestView.js';
import TopInfoBar from './TopInfoBar';
import useRepoData from '../../../hooks/useRepoData';

const { socket } = require('../../../socketConfig');

const ArrowPic = styled.img`
  width: 13px;
  height: 13px;
`;

const TurbosrcNotice = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300&display=swap');
  font-family: 'Roboto Mono', monospace;
  font-weight: 300;
  font-size: 14px;
  letter-spacing: 0.2px;
  text-align: center;
  position: relative;
  top: 150px;
`;

const CenteredWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  margin: 30px auto;
  gap: 50px;
  flex-direction: column;
`;

const CreateRepo = styled.span`
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300&display=swap');
  font-family: 'Roboto Mono', monospace;
  font-weight: 300;
  font-size: 14px;
  color: #001aff;
  background-color: #e5eefd;
`;

const Data = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

const Content = styled.div`
  height: 27rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0.5rem;
`;

const DataHeading = styled.div`
  display: grid;
  grid-template-columns: 20% 60% 10% 10%;
  padding: 10px 0 5px 0;
`;

const PullRequestHeading = styled.p`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  color: black;
`;

const RepoButton = styled.button`
  background-color: #313131;
  color: white;
  width: 200px;
  height: 50px;
  border: none;
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  &:disabled {
    background-color: darkgrey;
    cursor: auto;
  }
`;

const CreateNotice = styled.span`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: black;
  text-align: center;
  margin: 1rem auto;
  line-height: 1.8;
`;

const Back = styled(PullRequestHeading)`
  font-weight: 500;
`;

const BackButton = styled.span`
  position: relative;
  top: 85px;
  left: 10px;
  margin-top: -20px;
  display: flex;
  align-items: center;
  gap: 3px;
  cursor: pointer;
`;

export default function Home() {
  const user = useSelector(state => state.auth.user);
  const repo = useSelector(state => state.repo.name);
  const owner = useSelector(state => state.repo.owner.login);
  const oldVersion = false;
  const [loading, setLoading] = useState(true);
  const [seeModal, setSeeModal] = useState(false);
  const [selectedPullRequest, setSelectedPullRequest] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    //Set current logged in contributor/id to chrome storage for inject to verify user for voting
    chrome.storage.local.set({ contributor_name: user.login });
    chrome.storage.local.set({ contributor_id: user.ethereumAddress });
    setTimeout(() => setLoading(false), 1500);
  });

  const handlePullRequestClick = pullRequest => {
    setSelectedPullRequest({ ...pullRequest });
    setSeeModal(true);
  };

  const { onTurboSrc, pullRequests, votePowerAmount } = useRepoData(owner, repo, user.ethereumAddress);

  socket.on('vote received', function(ownerFromServer, repoFromServer, issueIDFromServer) {
    if (owner === ownerFromServer && repo === repoFromServer) {
      const { onTurboSrc, pullRequests, votePowerAmount } = useRepoData(owner, repo, ethereumAddress);
    }
  }); 

  if (oldVersion) {
    return (
      <TurbosrcNotice>Your version of Turbosrc is out of date and needs to be updated to continue.</TurbosrcNotice>
    );
  } else if (owner === 'none' && repo === 'none') {
    return <TurbosrcNotice>Please visit a Github repo page in your browser to use Turbosrc.</TurbosrcNotice>;
  }
  switch (seeModal) {
    case true:
      return (
        <>
          <BackButton onClick={() => setSeeModal(false)}>
            <img src={BackArrow} alt="back arrow" />
            <Back>Back to all</Back>
          </BackButton>
          <SinglePullRequestView
            selectedPullRequest={selectedPullRequest}
            user={user}
            repo={repo}
            githubToken={user.token}
            owner={owner}
            contributorID={user.ethereumAddress}
          />

        </>
      );
    case false:
      return (
        <Content>
          <TopInfoBar owner={owner} repo={repo} votePowerAmount={votePowerAmount} onTurboSrc={onTurboSrc} />
          {onTurboSrc && (
            <>
              <DataHeading>
                <PullRequestHeading>Status</PullRequestHeading>
                <PullRequestHeading>Pull Request</PullRequestHeading>
                <PullRequestHeading>Yes</PullRequestHeading>
                <PullRequestHeading>No</PullRequestHeading>
              </DataHeading>
              <Data>
                {pullRequests.map((pr, index) => (
                  <div onClick={() => handlePullRequestClick(pr)}>
                    <PullRequestRow
                      issue_id={pr.issue_id}
                      title={pr.title}
                      state={pr.state}
                      yes={pr.voteData.voteTotals.yesPercent}
                      no={pr.voteData.voteTotals.noPercent}
                      forkBranch={pr.forkBranch}
                      key={pr.forkBranch}
                      index={index}
                      role="button" // Add role="button" to make it clickable
                      tabIndex={0}
                    />
                  </div>
                ))}
              </Data>
            </>
          )}
          {onTurboSrc ? null : loading ? (
            <SkeletonModal />
          ) : (
            <CenteredWrapper>
              <CreateNotice>
                If you are the maintainer of{' '}
                <CreateRepo>
                  {owner}/{repo}
                </CreateRepo>{' '}
                you can add it to Turbosrc
              </CreateNotice>
              <RepoButton
                type="button"
                disabled={owner === user.login ? false : true}
                onClick={() => navigate('/onboard')}
              >
                <p>Continue</p> <ArrowPic src={ArrowRight} />
              </RepoButton>
            </CenteredWrapper>
          )}
        </Content>
      );
    default:
      return null;
  }
}
