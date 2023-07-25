import React from 'react';
import styled from 'styled-components';
import TopInfoBar from '../Home/TopInfoBar';
import useCommas from '../../../hooks/useCommas';

const Heading = styled.div`
  height: 80px;
  display: flex;
  flex-direction: column;
`;
const VoteText = styled.p`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  font-family: 'Inter', sans-serif;
  color: black;
`;

const PullRequestTitle = styled(VoteText)`
  font-weight: 600;
  letter-spacing: 0.1px;
  color: #656565;
  font-size: 12px;
  text-align: left;
  margin-bottom: 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 380px;
  margin-top: 5px;
`;

const VoteTopicText = styled(VoteText)`
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300&display=swap');
  font-family: 'Roboto Mono', monospace;
  font-weight: 300;
  font-size: 12px;
  line-height: 20px;
  text-align: left;
  color: #0500ff;
  display: flex;
  flex-direction: row;
  gap: 5px;
  letter-spacing: 0.2px;
`;

const VoteTopicNormalText = styled.span`
  color: #6a6868;
`;


function VoteTotal(props) {
  const { owner, repo, title, baseBranch, forkBranch, votePower, onTurboSrc } = props;
  return (
    <Heading>
      <TopInfoBar owner={owner} repo={repo} votePowerAmount={useCommas(votePower)} onTurboSrc={onTurboSrc} />
      <PullRequestTitle>{title}</PullRequestTitle>
      <VoteTopicText>
        {forkBranch} <VoteTopicNormalText>into</VoteTopicNormalText> {baseBranch}
      </VoteTopicText>
    </Heading>
  );
}

export default VoteTotal;
