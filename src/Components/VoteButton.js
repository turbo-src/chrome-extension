const React = require('react');
const render = require('react-dom');
const { postSetVote,
      } = require('./../requests')

export class VoteButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { voted: '', lastIssueId: '', side: sideText };
  }

  render() {
    if (this.state.voted === 'pull' && issue_id === this.state.lastIssueId) {
      return 'Verifying. This may take a few a couple minutes...';
    }
    if (this.state.voted === 'problem' && issue_id === this.state.lastIssueId) {
      return 'Something went wrong';
    }
    if (this.state.voted === 'notOnGithub' && issue_id === this.state.lastIssueId) {
      return "Pull request isn't valid on github (path to fork doesn't exist).";
    }
    if (this.state.voted === 'done' && issue_id === this.state.lastIssueId) {
      //const voteData = votes.closest("[data-index]")
      //console.log(JSON.parse(voteJSON).issue_id)

      //return turboBtnData['turbo-btn-data']['issue_id']

      return (
        <div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          user: {user} <br />
          repo: {repo} <br />
          issue_id: {issue_id} <br />
          contributor: {contributor_name} <br />
          side: {this.state.side} <br />
        </div>
      );
    }

    return ce(
      'button',
      {
        onClick: () => {
          (async () => {

            this.setState({ voted: 'valid', lastIssueId: issue_id, side: this.state.side });

            await postSetVote(user, repo, issue_id, issue_id, false, contributor_id, this.state.side, githubUser.token);
            this.setState({ voted: 'done', lastIssueId: issue_id, side: this.state.side });
            //var forkStatus = await postGetPRforkStatus(user, repo, issue_id, contributor_id);
            //console.log('fork status');
            //console.log(forkStatus);
            //if (forkStatus === 'notOnGithub') {
            //  console.log('notOnGithub');
            //  this.setState({ voted: 'notOnGithub', lastIssueId: issue_id, side: this.state.side });
            //} else if (forkStatus === 'valid') {
            //  console.log('valid', user, repo, issue_id, contributor_id, this.state.side);
            //  await postSetVote(user, repo, issue_id, contributor_id, this.state.side);
            //  this.setState({ voted: 'done', lastIssueId: issue_id, side: this.state.side });
            //} else if (forkStatus === 'pull') {
            //  console.log('i 200');
            //  this.setState({ voted: 'pull', lastIssueId: issue_id, side: this.state.side });
            //  console.log('i 202');
            //  console.log(user);
            //  console.log(repo);
            //  console.log(issue_id);
            //  console.log(contributor_id);
            //  console.log(this.state.side);
            //  console.log('i 208');
            //  await postPullFork(user, repo, issue_id, contributor_id, this.state.side);
            //  console.log('i 210');
            //  forkStatus = await postGetPRforkStatus(user, repo, issue_id, contributor_id, this.state.side);
            //  console.log('i 212');
            //  if (forkStatus === 'valid') {
            //    this.setState({ voted: 'valid', lastIssueId: issue_id, side: this.state.side });
            //    await postSetVote(user, repo, issue_id, contributor_id, this.state.side);
            //    this.setState({ voted: 'done', lastIssueId: issue_id, side: this.state.side });
            //  } else {
            //    this.setState({ voted: 'problem', lastIssueId: issue_id, side: this.state.side });
            //  }
            //} else {
            //  this.setState({ voted: 'problem', lastIssueId: issue_id, side: this.state.side });
            //}
          })();
        }
      },
      sideText
    );
  }
}