import { useState, useEffect } from 'react';
import { postGetVotes } from '../requests';
const useGetVotes = (user, repo, issueID, contributorID, side, socketEvents, clicked) => {
  const [prData, setPRData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let repo_id = user + '/' + repo;
        let getVotesRes = await postGetVotes(repo_id, issueID, contributorID);
        setPRData(getVotesRes);
        if (getVotesRes) {
          setLoading(false);
        }
      } catch (error) {
        console.error('useFetchVoteStatus error:', error);
      }
    };

    fetchData();
  }, [user, repo, issueID, contributorID, side, socketEvents, clicked]);
  return { prData, loading };
};

export default useGetVotes;
