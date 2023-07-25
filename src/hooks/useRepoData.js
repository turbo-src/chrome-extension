import { useState, useEffect } from 'react';
import { postGetRepoData } from '../requests';
import useCommas from './useCommas';
const useRepoData = (owner, repo, ethereumAddress) => {
  const [onTurboSrc, setOnTurboSrc] = useState(false);
  const [pullRequests, setPullRequests] = useState([]);
  const [votePowerAmount, setVotePowerAmount] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepoData = async () => {
      try {
        const response = await postGetRepoData(`${owner}/${repo}`, ethereumAddress);
        if (response != null || response != undefined) {
          setOnTurboSrc(true);
        }
        setPullRequests(response.pullRequests);
        let votePower = response.contributor.votePower;
        setVotePowerAmount(votePower);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching repo data:', error);
      }
    };
    fetchRepoData();
  }, [owner, repo, ethereumAddress]);

  return { onTurboSrc, pullRequests, votePowerAmount, loading };
};

export default useRepoData;
