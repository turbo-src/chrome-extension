import { useState, useEffect } from 'react';
import { postGetRepoData } from '../requests';
import useCommas from './useCommas';
const useRepoData = (owner, repo, ethereumAddress) => {
  const [onTurboSrc, setOnTurboSrc] = useState(false);
  const [pullRequests, setPullRequests] = useState([]);
  const [votePowerAmount, setVotePowerAmount] = useState('');

    useEffect(() => {
        setTimeout(() => {
            const fetchRepoData = async () => {
            try {
                const response = await postGetRepoData(`${owner}/${repo}`, ethereumAddress);
                console.log("this is the response", response);  
                if (response != null || response != undefined) {
                setOnTurboSrc(true);
                }
                setPullRequests(response.pullRequests);
                let votePower = useCommas(response.contributor.votePower);
                setVotePowerAmount(votePower);
            } catch (error) {
                console.error('Error fetching repo data:', error);
            }
            };
            fetchRepoData();
        }, 500);
    }, [owner, repo, ethereumAddress]);
 
  return { onTurboSrc, pullRequests, votePowerAmount };
};

export default useRepoData;
