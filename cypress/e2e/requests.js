import createHTTPClient from './httpClient';

export const createRepoRequestBody = (repoName, contributorID, token) => {
  const reqBody = `createRepo(
        turboSrcID: "${Cypress.env('turboSrcID')}",
        owner: "",
        repo: "${repoName}",
        defaultHash: "",
        contributor_id: "${contributorID}",
        side: "",
        token: "${token}"
    )`;

  return createHTTPClient('createRepo', reqBody);
};

export const findOrCreateUserRequestBody = (
  contributorName,
  contributorID = 'none',
  contributorSignature = 'none',
  token
) => {
  const reqBody = `
    findOrCreateUser(
          turboSrcID: "${Cypress.env('turbosrcID')}",
          owner: "${Cypress.env('gitHubUsername')}",
          repo: "${Cypress.env('gitHubRepo')}",
          contributor_id: "${contributorID}",
          contributor_name: "${contributorName}",
          contributor_signature: "${contributorSignature}",
          token: "${token}"
    ) 
    {
    contributor_name, contributor_id, contributor_signature, token
    }
    `;
  return createHTTPClient('findOrCreateUser', reqBody);
};

export const transferVotePowerRequestBody = (repoID, from, to, amount) => {
  const reqBody = `
        transferTokens(
            turboSrcID: "${Cypress.env('turboSrcID')}",
            owner: "${Cypress.env('gitHubUsername')}",
            repo: "${repoID}",
            from: "${from}",
            to: "${to}",
            amount: ${amount},
            token: "${Cypress.env('gitHubToken')}"
        ) 
        { status }
      `;
  return createHTTPClient('transferTokens', reqBody);
};

export const setVoteRequestBody = (repoID, defaultHash, childDefaultHash, mergeable, contributor_id, side, token) => {
  const reqBody = `
              setVote(
                  turboSrcID: "${Cypress.env('turboSrcID')}",
                  owner: "",
                  repo: "${repoID}",
                  defaultHash: "${defaultHash}",
                  childDefaultHash: "${childDefaultHash}",
                  mergeable: ${mergeable},
                  contributor_id: "${contributor_id}",
                  side: "${side}",
                  token: "${token}"
              )
            `;
  return createHTTPClient('setVote', reqBodyÍ);
};

export const getVotesRequestBody = (repoID, defaultHash, contributorID) => {
  const reqBody = `
            getVotes(
                turboSrcID: "${Cypress.env('turboSrcID')}", 
                repo: "${repoID}", 
                defaultHash: "${defaultHash}", 
                contributor_id:"${contributorID}"
                )
      { status, 
        repo_id, 
        title, 
        head, 
        remoteURL, 
        baseBranch, 
        forkBranch, 
        childDefaultHash, 
        defaultHash, 
        mergeable, 
        state
        voteData {
          contributor {
            voted, side, votePower, createdAt, contributor_id
          },
          voteTotals {
            totalVotes, totalYesVotes, totalNoVotes, votesToQuorum, votesToMerge, votesToClose, totalVotePercent, yesPercent, noPercent, quorum
          },
          votes { 
            contributor_id, side, votePower, createdAt
          }
        },
       }`;
  return createHTTPClient('getRepoData', reqBody);
};
