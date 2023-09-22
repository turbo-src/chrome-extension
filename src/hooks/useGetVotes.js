import { useState, useEffect } from 'react';
import { postGetVotes } from '../requests';
const useGetVotes = (user, repoID, issueID, contributorID, side, socketEvents, clicked) => {
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
  }, [user, repoID, issueID, contributorID, side, socketEvents, clicked]);
  return { prData, loading };
};

export default useGetVotes;
