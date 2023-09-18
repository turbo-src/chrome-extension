import { useState, useEffect } from 'react';
import { postGetVotes } from '../requests';
const useGetVotes = (user, repo, issueID, contributorID, side, socketEvents, clicked) => {
  const [tsrcPRStatus, setTsrcPRStatus] = useState({ state: 'vote', mergeableCodeHost: true });
  const [voteTotals, setVoteTotals] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let repo_id = user + '/' + repo;
        const votes = await postGetVotes(repo_id, issueID, contributorID);
        console.log('votes:', votes);
        let quorum = 0.5;
        const totalVotes = votes.voteData.voteTotals.totalVotes
        const totalPossibleVotes = 1_000_000;
        const totalPercent = (totalVotes / totalPossibleVotes) * 100 * (1 / quorum);
        
        if (totalPercent !== null) {
          setTsrcPRStatus({state: votes.state, mergeableCodeHost: votes.mergeable});
          setVoteTotals(totalPercent);
        }
      } catch (error) {
        console.error('useFetchVoteStatus error:', error);
      }
    };
    
    fetchData();
  }, [user, repo, issueID, contributorID, side, socketEvents, clicked]);
  return { tsrcPRStatus, voteTotals };
};

export default useGetVotes;