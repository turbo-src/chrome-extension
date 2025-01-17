import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import superagent from 'superagent';
import { getTurboSrcSystemInfo, postGetRepoData } from '../../../requests';
import useCommas from '../../../hooks/useCommas';
import styled from 'styled-components';
import PullRequestRow from './PullRequestRow.js';
import ArrowRight from '../../../../icons/arrowright.png';
import BackArrow from '../../../../icons/back.png';
import SkeletonModal from './SkeletonExt.js';
import SinglePullRequestView from '../SinglePullRequestView/SinglePullRequestView.js';
import { set } from '../../../utils/storageUtil';
const { socket } = require('../../../socketConfig');
const { postGetVotes, getNameSpaceRepo } = require('../../../requests');
import { setRepo } from '../../../store/repo';
import CONFIG from '../../../config';

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
  max-width: 120px;
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
  max-width: 120px;
`;

const SlashText = styled(OwnerText)`
  color: #6a6868;
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

  &:disabled {
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

const BtnSpan = styled.span`
  text-align: center;
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
  const currentRepo = useSelector(state => state.repo);
  const dispatch = useDispatch()

  const oldVersion = false;
  const [pullRequests, setPullRequests] = useState([]);
  const [tokenized, setTokenized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [seeModal, setSeeModal] = useState(false);
  const [pullRequestsLoaded, setPullRequestsLoaded] = useState(false);
  const [selectedPullRequest, setSelectedPullRequest] = useState(null);
  const [selectedPullRequestID, setSelectedPullRequestID] = useState('');
  const [selectedPullRequestVotesArray, setSelectedPullRequestVotesArray] = useState([]);
  const [selectedPullRequestState, setSelectedPullRequestState] = useState('');
  const [selectedPullRequestYesPercent, setSelectedPullRequestYesPercent] = useState(0);
  const [selectedPullRequestNoPercent, setSelectedPullRequestNoPercent] = useState(0);
  const [selectedPullRequestBaseBranch, setSelectedPullRequestBaseBranch] = useState('');
  const [selectedPullRequestForkBranch, setSelectedPullRequestForkBranch] = useState('');
  const [selectedPullRequestCreatedAt, setSelectedPullRequestCreatedAt] = useState('');
  const [selectedPullRequestVotePower, setSelectedPullRequestVotePower] = useState(0);
  const [selectedPullRequestVoted, setSelectedPullRequestVoted] = useState(false);
  const [selectedPullRequestTitle, setSelectedPullRequestTitle] = useState('');
  const [selectedPullRequestChosenSide, setSelectedPullRequestChosenSide] = useState('');
  const [selectedPullRequestDefaultHash, setSelectedPullRequestDefaultHash] = useState('');
  const [selectedPullRequestChildDefaultHash, setSelectedPullRequestChildDefaultHash] = useState('');
  const [selectedPullRequestIssueID, setSelectedPullRequestIssueID] = useState('');
  const [selectedPullRequestTotalVotes, setSelectedPullRequestTotalVotes] = useState('');
  const [repoID, setRepoID] = useState('');
  const navigate = useNavigate();
  let name = user?.name;
  let username = user?.login;
  let [tokenAmount, setTokenAmount] = useState('');

  //const clientVersion = CONFIG.clientVersion

  let [clientIsCompatilbleWithRouter, setClientIsCompatibleWithRouter]= useState("yes")
  let [isCompatibleTurboSrcID, setIsCompatibleTurboSrcID] = useState("yes")
  let [message, setMessage] =useState("https://github.com/turbo-src/turbo-src") /*= getTurboSrcSystemInfo(repoName="7db9a", clientVersion "xb7da")*/

  clientIsCompatilbleWithRouter = clientIsCompatilbleWithRouter === "yes" ? true : false;
  isCompatibleTurboSrcID = isCompatibleTurboSrcID === "yes" ? true : false;

const checkTurboSrcSystemHandler = async () => {
  try {
    const currentClientVersion = CONFIG.currentVersion
    const res = await getTurboSrcSystemInfo(`"${owner}"/"${repo}"`, currentClientVersion);
    console.log('getTurboSrcSystemInfo 237');
    console.log(JSON.stringify(res));

    setClientIsCompatibleWithRouter(res.clientIsCompatibleWithRouter)
    setIsCompatibleTurboSrcID(res.isCompatibleTurboSrcID)
    setMessage(res.message)
  } catch (error) {
    console.error('Error in checkTurboSrcSystemHandler:', error);
  }
};

  useEffect(() => {
checkTurboSrcSystemHandler()
  }, []);

  let avatar = user?.avatar_url || null;

  useEffect(() => {

    //Set current logged in contributor/id to chrome storage for inject to verify user for voting
    chrome.storage.local.set({ contributor_name: user.login });
    chrome.storage.local.set({ contributor_id: user.ethereumAddress });
    setTimeout(() => setLoading(false), 1500);
    console.log('user', user, 'repo', repo, 'owner', owner);
  });
  const handlePullRequestClick = pullRequest => {
    setSelectedPullRequest(pullRequest);
    setSelectedPullRequestID(pullRequest.repo_id);
    setSelectedPullRequestVotesArray(pullRequest.voteData.votes);
    setSelectedPullRequestState(pullRequest.state);
    setSelectedPullRequestBaseBranch(pullRequest.baseBranch);
    setSelectedPullRequestForkBranch(pullRequest.forkBranch);
    setSelectedPullRequestYesPercent(pullRequest.voteData.voteTotals.yesPercent);
    setSelectedPullRequestNoPercent(pullRequest.voteData.voteTotals.noPercent);
    setSelectedPullRequestCreatedAt(pullRequest.voteData.contributor.createdAt);
    setSelectedPullRequestVotePower(pullRequest.voteData.contributor.votePower);
    setSelectedPullRequestVoted(pullRequest.voteData.voted);
    setSelectedPullRequestTitle(pullRequest.title);
    setSelectedPullRequestChosenSide(pullRequest.voteData.contributor.side);
    setSelectedPullRequestDefaultHash(pullRequest.defaultHash);
    setSelectedPullRequestChildDefaultHash(pullRequest.childDefaultHash);
    setSelectedPullRequestIssueID(pullRequest.issue_id);
    setSeeModal(true);
    setSelectedPullRequestVoted(pullRequest.voteData.contributor.voted);
    setSelectedPullRequestTotalVotes(pullRequest.voteData.voteTotals.totalVotes);
  };
  console.log('home component');

  const getRepoIDHandler = async () => {
    try {
      const response = await getNameSpaceRepo(`${owner}/${repo}`).then(res => {
        console.log('getRepoIDHandler repoID: ' + res.repoID)
        setRepoID(res.repoID);
      });
    } catch (error) {
      console.error('Error fetching repo id:', error);
    }
  };

  const getRepoDataHandler = async () => {
    try {
      console.log('getRepoDataHandler repoID: ' + repoID)
      const response = await postGetRepoData(repoID, user.ethereumAddress).then(res => {
        if (res != null || res != undefined) {
          setTokenized(true);
        }
        setPullRequests(res.pullRequests);
        let tokens = useCommas(res.contributor.votePower);
        setTokenAmount(tokens);
        dispatch(setRepo({...currentRepo, repoID: res.repo_id}))
      });
    } catch (error) {
      console.error('Error fetching repo data:', error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getRepoIDHandler();
    }, 500);
    setPullRequestsLoaded(false);
  }, [owner, repo]);

  useEffect(() => {
    getRepoDataHandler();
    setPullRequestsLoaded(false);
  }, [repoID]);

  //socket.on('vote received', function(ownerFromServer, repoFromServer, issueIDFromServer) {
  //  if (owner === ownerFromServer && repo === repoFromServer) {
  //    getRepoDataHandler();
  //  }
  //});

  let getVotes = async () => await postGetVotes(repo_id, issue_id, contributor_id);

  if (!clientIsCompatilbleWithRouter){
    return (
      <TurbosrcNotice>Your version of Turbosrc is out of date and needs to be updated to continue to {message}.</TurbosrcNotice>
    );
  } if (!isCompatibleTurboSrcID) {
    return (
      <TurbosrcNotice>The owner of the repo is using an out of date version of Turbosrc. Owner should follow instructions here to update {message}.</TurbosrcNotice>
    );
  }
    else if (owner === 'none' && repo === 'none') {
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
            pullRequests={selectedPullRequest}
            repo_id={selectedPullRequestID}
            repoID={selectedPullRequestID}
            title={selectedPullRequestTitle}
            votesArray={selectedPullRequestVotesArray}
            state={selectedPullRequestState}
            baseBranch={selectedPullRequestBaseBranch}
            forkBranch={selectedPullRequestForkBranch}
            yesPercent={selectedPullRequestYesPercent}
            noPercent={selectedPullRequestNoPercent}
            createdAt={selectedPullRequestCreatedAt}
            votePower={selectedPullRequestVotePower}
            alreadyVoted={selectedPullRequestVoted}
            chosenSide={selectedPullRequestChosenSide}
            user={user}
            repo={repo}
            githubToken={user.token}
            defaultHash={selectedPullRequestDefaultHash}
            childDefaultHash={selectedPullRequestChildDefaultHash}
            contributorID={user.ethereumAddress}
            owner={owner}
            issueID={selectedPullRequestIssueID}
            totalVotes={selectedPullRequestTotalVotes}
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
                {tokenized ? (
                  <VotePower>{tokenAmount === 0 ? '0 votepower' : `${tokenAmount} votepower`}</VotePower>
                ) : null}
              </TopBar>
            </section>
            {tokenized && (
              <DataHeading>
                <PullRequestHeading>Status</PullRequestHeading>
                <PullRequestHeading>Pull Request</PullRequestHeading>
                <PullRequestHeading>Yes</PullRequestHeading>
                <PullRequestHeading>No</PullRequestHeading>
              </DataHeading>
            )}
            {tokenized && (
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
            {tokenized ? null : loading ? (
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
                  onClick={() => navigate('/onboard')}
                >
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
