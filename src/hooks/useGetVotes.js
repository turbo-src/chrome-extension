import { useState, useEffect } from 'react';
import { postGetVotes } from '../requests';

const useGetVotes = (repoID, issueID, contributorID) => {
  const [prData, setPRData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log('use get votes called. Should only be called from here upon ')

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
  }, []);
  return { prData, loading };
};

export default useGetVotes;
