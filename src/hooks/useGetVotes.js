import { useState, useEffect } from 'react';
import { postGetVotes } from '../requests';
const useGetVotes = (repoID, issueID, contributorID, socketEvents) => {
  const [prData, setPRData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let getVotesRes = await postGetVotes(repoID, issueID, contributorID);
        setPRData(getVotesRes);
        if (getVotesRes) {
          setLoading(false);
        }
      } catch (error) {
        console.error('useFetchVoteStatus error:', error);
      }
    };

    fetchData();
  }, [socketEvents]);
  return { prData, loading };
};

export default useGetVotes;
