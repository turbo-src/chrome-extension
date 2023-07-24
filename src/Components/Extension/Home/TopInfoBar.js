import React from 'react';
import styled from 'styled-components';

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

const VoteText = styled.p`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  font-family: 'Inter', sans-serif;
  color: black;
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

const BoldText = styled(VoteText)`
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 0px;
  white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width:120px;
`;

const GithubLink = styled.a`
  color: black;
`;

const VotePower = styled.span`
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 0px;
  color: #4a00ba;
  background: #e7f0ff;
  padding: 5px 8px;
  letter-spacing: 0.2px;
`;

export default function TopInfoBar({owner, repo, votePowerAmount, onTurboSrc}){

    return (
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
            <VotePower>{votePowerAmount === 0 ? '0 votepower' : `${votePowerAmount} votepower`}</VotePower>
            ) : null}
        </TopBar>
    )
}