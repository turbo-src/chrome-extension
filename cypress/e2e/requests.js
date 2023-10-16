export const createRepoRequestBody = (repoName, contributorID, token) => {
  return {
    method: 'POST',
    url: 'http://localhost:4000/graphql',
    body: {
      operationName: 'createRepo',
      query: `
          query createRepo {
            createRepo(
                turboSrcID: "${Cypress.env('turboSrcID')}",
                owner: "",
                repo: "${repoName}",
                defaultHash: "",
                contributor_id: "${contributorID}",
                side: "",
                token: "${token}"
            ) 
          }
          `
    }
  };
};

export const findOrCreateUserRequestBody = (
  contributorName,
  contributorID = 'none',
  contributorSignature = 'none',
  token
) => {
  return {
    method: 'POST',
    url: 'http://localhost:4000/graphql',
    body: {
      operationName: 'findOrCreateUser',
      query: `
      query findOrCreateUser {
        findOrCreateUser(
          turboSrcID: "${Cypress.env('turbosrcID')}",
          owner: "${Cypress.env('gitHubUsername')}",
          repo: "${Cypress.env('gitHubRepo')}",
          contributor_id: "${contributorID}",
          contributor_name: "${contributorName}",
          contributor_signature: "${contributorSignature}",
          token: "${token}"
    ) 
    { contributor_name, contributor_id, contributor_signature, token }
      }
      `
    }
  };
};

export const transferVotePowerRequestBody = (repoID, from, to, amount) => {
  return {
    method: 'POST',
    url: 'http://localhost:4000/graphql',
    body: {
      operationName: 'transferTokens',
      query: `
      query transferTokens {
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
      }
      `
    }
  };
};

export const setVoteRequestBody = (repoID, defaultHash, childDefaultHash, mergeable, contributor_id, side, token) => {
  return {
    method: 'POST',
    url: 'http://localhost:4000/graphql',
    body: {
      operationName: 'setVote',
      query: `
            query setVote {
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
            }
            `
    }
  };
};

export const getVotesRequestBody = (repoID, defaultHash, contributorID) => {
  return {
    method: 'POST',
    url: 'http://localhost:4000/graphql',
    body: {
      operationName: 'getVotes',
      query: `
          query getVotes { 
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
          votes { contributor_id, side, votePower, createdAt }
          },
        }
    }
          `
    }
  };
};
