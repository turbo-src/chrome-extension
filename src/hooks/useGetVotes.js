import { useState, useEffect } from 'react';
import { postGetPullRequest, postGetPRvoteYesTotals, postGetPRvoteNoTotals } from '../requests';

const useGetVotes = (user, repo, issueID, contributorID, side, socketEvents, clicked) => {
  const [tsrcPRStatus, setTsrcPRStatus] = useState({ state: 'vote', mergeableCodeHost: true });
  const [voteYesTotalState, setVoteYesTotalState] = useState(0.0);
  const [voteNoTotalState, setVoteNoTotalState] = useState(0.0);
  const [voteTotals, setVoteTotals] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tsrcPRStatusComponent = await postGetPullRequest(user, repo, issueID, contributorID, side);
        const voteYesTotal = await postGetPRvoteYesTotals(user, repo, issueID, contributorID, "");
        const voteNoTotal = await postGetPRvoteNoTotals(user, repo, issueID, contributorID, "");

        let quorum = 0.5;
        const totalVotes = voteYesTotal + voteNoTotal;
        const totalPossibleVotes = 1_000_000;
        const totalPercent = (totalVotes / totalPossibleVotes) * 100 * (1 / quorum);
        if (totalPercent !== null) {
          setVoteTotals(`${Math.round(totalPercent)}%`);
        }
        
        setVoteYesTotalState(voteYesTotal);
        setVoteNoTotalState(voteNoTotal);
        setTsrcPRStatus(tsrcPRStatusComponent);
      } catch (error) {
        console.error('useFetchVoteStatus error:', error);
      }
    };
    
    fetchData();
  }, [user, repo, issueID, contributorID, side, socketEvents, clicked]);
  return { tsrcPRStatus, voteTotals };
};

export default useGetVotes;