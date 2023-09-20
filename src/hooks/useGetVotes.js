import { useState, useEffect } from 'react';
import { postGetVotes } from '../requests';
const useGetVotes = (user, repo, issueID, contributorID, side, socketEvents, clicked) => {
  const [votes, setVotes] = useState({ state: 'vote', voteData: { voteTotals: { totalVotes: 0 } } });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        let repo_id = user + '/' + repo;
        let getVotes = await postGetVotes(repo_id, issueID, contributorID);
        setVotes(getVotes);
        
      } catch (error) {
        console.error('useFetchVoteStatus error:', error);
      }
    };
    
    fetchData();
  }, [user, repo, issueID, contributorID, side, socketEvents, clicked]);
  return { votes };
};

export default useGetVotes;