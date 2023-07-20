import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postGetRepoData } from '../../../requests';
import useCommas from '../../../hooks/useCommas';
import styled from 'styled-components';
import PullRequestRow from './PullRequestRow.js';
import ArrowRight from '../../../../icons/arrowright.png';
import BackArrow from '../../../../icons/back.png';
import SkeletonModal from './SkeletonExt.js';
import SinglePullRequestView from '../SinglePullRequestView/SinglePullRequestView.js';
const { socket } = require('../../../socketConfig');

const VoteText = styled.span`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  font-family: 'Inter', sans-serif;
  color: black;
`;

const ArrowPic = styled.img`
  width: 13px;
  height: 13px;
`;

const VotePower = styled(VoteText)`
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 0px;
  color: #4a00ba;
  background: #e7f0ff;
  padding: 5px 8px;
  letter-spacing: 0.2px;
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

const BoldText = styled(VoteText)`
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 0px;
  white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width:120px;
`;

const TopBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const OwnerRepo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const OwnerText = styled(VoteText)`
  font-weight: 500;
  font-size: 18px;
  margin-bottom: 0px;
  white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width:120px;
`;

const SlashText = styled(OwnerText)`
  color: #6A6868;
  margin-left: -5px;
  margin-right: -5px;
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

  &:disabled{
    background-color: darkgrey;
    cursor: auto;
  }
`;

const GithubLink = styled.a`
  color: black;
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
  const [pullRequests, setPullRequests] = useState([]);
  const [onTurboSrc, setonTurboSrc] = useState(false);
  const [loading, setLoading] = useState(true);
  const [seeModal, setSeeModal] = useState(false);
  const [selectedPullRequest, setSelectedPullRequest] = useState({
    repo_id: null,
    votes: [],
    state: null,
    baseBranch: null,
    forkBranch: null,
    yesPercent: null,
    noPercent: null,
    createdAt: null,
    votePower: null,
    voted: null,
    title: null,
    chosenSide: null,
    defaultHash: null,
    childDefaultHash: null,
    issue_id: null,
    totalVotes: null,
});

  const navigate = useNavigate();
  let name = user?.name;
  let username = user?.login;

  let [tokenAmount, setTokenAmount] = useState('');

  let avatar = user?.avatar_url || null;

  useEffect(() => {
    //Set current logged in contributor/id to chrome storage for inject to verify user for voting
    chrome.storage.local.set({ contributor_name: user.login });
    chrome.storage.local.set({ contributor_id: user.ethereumAddress });
    setTimeout(() => setLoading(false), 1500);
    console.log('user', user, 'repo', repo, 'owner', owner);
  });

  const handlePullRequestClick = pullRequest => {
    setSelectedPullRequest({
      ...selectedPullRequest,
      repo_id: pullRequest.repo_id,
      votes: pullRequest.voteData.votes,
      state: pullRequest.state,
      baseBranch: pullRequest.baseBranch,
      forkBranch: pullRequest.forkBranch,
      yesPercent: pullRequest.voteData.voteTotals.yesPercent,
      noPercent: pullRequest.voteData.voteTotals.noPercent,
      createdAt: pullRequest.voteData.contributor.createdAt,
      votePower: pullRequest.voteData.contributor.votePower,
      voted: pullRequest.voteData.voted,
      title: pullRequest.title,
      chosenSide: pullRequest.voteData.contributor.side,
      defaultHash: pullRequest.defaultHash,
      childDefaultHash: pullRequest.childDefaultHash,
      issue_id: pullRequest.issue_id,
      totalVotes: pullRequest.voteData.voteTotals.totalVotes
    });
  setSeeModal(true);
  };

  const getRepoDataHandler = async () => {
    try {
      const response = await postGetRepoData(`${owner}/${repo}`, user.ethereumAddress).then(res => {
        if (res != null || res != undefined) {
          setonTurboSrc(true);
        }
        setPullRequests(res.pullRequests);
        let tokens = useCommas(res.contributor.votePower);
        setTokenAmount(tokens);
      });
    } catch (error) {
      console.error('Error fetching repo data:', error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getRepoDataHandler();
    }, 500);
    //setPullRequestsLoaded(false);
  }, [owner, repo]);

  socket.on('vote received', function(ownerFromServer, repoFromServer, issueIDFromServer) {
    if (owner === ownerFromServer && repo === repoFromServer) {
      getRepoDataHandler();
    }
  });

  if (oldVersion){
    return (
      <TurbosrcNotice>Your version of Turbosrc is out of date and needs to be updated to continue.</TurbosrcNotice>
    );
  } else if (owner === 'none' && repo === 'none') {
    return (
      <TurbosrcNotice>Please visit a Github repo page in your browser to use Turbosrc.</TurbosrcNotice>
    );
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
          <div className="home">
            <section>
              <TopBar>
                <OwnerRepo>
                  <OwnerText>
                    <GithubLink href={`https://github.com/${owner}`} target="_blank">
                      {owner}
                    </GithubLink>{' '}
                    
                  </OwnerText>
                  <SlashText>/</SlashText>
                  <BoldText>
                    <GithubLink href={`https://github.com/${owner}/${repo}`} target="_blank">
                      {repo}
                    </GithubLink>
                  </BoldText>
                </OwnerRepo>
                {onTurboSrc ? (
                  <VotePower>{tokenAmount === 0 ? '0 votepower' : `${tokenAmount} votepower`}</VotePower>
                ) : null}
              </TopBar>
            </section>
            {onTurboSrc && (
              <DataHeading>
                <PullRequestHeading>Status</PullRequestHeading>
                <PullRequestHeading>Pull Request</PullRequestHeading>
                <PullRequestHeading>Yes</PullRequestHeading>
                <PullRequestHeading>No</PullRequestHeading>
              </DataHeading>
            )}
            {onTurboSrc && (
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
                  <RepoButton type="button" disabled={owner === user.login ? false : true} onClick={() => navigate('/onboard')}>
                    <p>Continue</p> <ArrowPic src={ArrowRight} />
                  </RepoButton>
              </CenteredWrapper>
            )}
          </div>
        </Content>
      );
    default:
      return null;
  }
}
