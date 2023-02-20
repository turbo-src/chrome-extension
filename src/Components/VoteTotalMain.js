class VoteTotalMain extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        user: user,
        repo: repo,
        issueID: issue_id,
        contributorID: contributor_id,
        contributorName: contributor_name,
        votes: ['0.0', '0.0']
      };
    }

    componentDidMount() {
      setTimeout(() => {
        (async () => {
          var voteTotalsReact = await postGetPRvoteTotals(
            this.state.user,
            this.state.repo,
            this.state.issueID,
            this.state.contributorID,
            this.state.side
          );
          var voteYesTotals = await postGetPRvoteYesTotals(
            this.state.user,
            this.state.repo,
            this.state.issueID,
            this.state.contributorID,
            this.state.side
          );
          var voteNoTotals = await postGetPRvoteNoTotals(
            this.state.user,
            this.state.repo,
            this.state.issueID,
            this.state.contributorID,
            this.state.side
          );

          voteTotalsReact = (Number(voteTotalsReact) * 100).toFixed(1).toString();
          if (voteYesTotals && voteNoTotals) {
            voteYesTotals = Number(voteYesTotals);
            voteNoTotals = Number(voteNoTotals);
            voteYesTotals = ((voteYesTotals / (voteYesTotals + voteNoTotals)) * 100).toFixed(1);
            voteNoTotals = (100 - voteYesTotals).toFixed(1);
            //this.setState({voteTotals: voteTotalsReact})
            const voteArray = [voteYesTotals.toString(), voteNoTotals.toString(), voteTotalsReact];
            this.setState({ votes: voteArray });
            //this.setState({voteNoTotals: voteNoTotals})
          } else {
            //this.setState({voteTotals: "0.0"})
            this.setState({ votes: ['0.0', '0.0'] });
            //this.setState({voteNoTotals: "0.0"})
          }
          console.log('status CDMV: ' + voteTotalsReact);
        })();
        //this.setState({background: "yellow"})
      });
    }

    componentDidUpdate() {
      setTimeout(() => {
        //(async () => {
        //  var voteTotalsReact = await postGetPRvoteTotals(
        //    this.state.user,
        //    this.state.repo,
        //    this.state.issueID,
        //    this.state.contributorID,
        //    this.state.side
        //  );
        //  var voteYesTotals = await postGetPRvoteYesTotals(
        //    this.state.user,
        //    this.state.repo,
        //    this.state.issueID,
        //    this.state.contributorID,
        //    this.state.side
        //  );
        //  var voteNoTotals = await postGetPRvoteNoTotals(
        //    this.state.user,
        //    this.state.repo,
        //    this.state.issueID,
        //    this.state.contributorID,
        //    this.state.side
        //  );

        //  voteTotalsReact = (Number(voteTotalsReact) * 100).toFixed(1).toString();
        //  if (voteYesTotals && voteNoTotals) {
        //    voteYesTotals = Number(voteYesTotals);
        //    voteNoTotals = Number(voteNoTotals);
        //    voteYesTotals = ((voteYesTotals / (voteYesTotals + voteNoTotals)) * 100).toFixed(1);
        //    voteNoTotals = (100 - voteYesTotals).toFixed(1);
        //    //this.setState({voteTotals: voteTotalsReact})
        //    const voteArray = [voteYesTotals.toString(), voteNoTotals.toString(), voteTotalsReact];
        //    this.setState({ votes: voteArray });
        //    //this.setState({voteNoTotals: voteNoTotals})
        //  } else {
        //    //this.setState({voteTotals: "0.0"})
        //    this.setState({ votes: ['0.0', '0.0'] });
        //    //this.setState({voteNoTotals: "0.0"})
        //  }
        //  //console.log('status CDUV: ' + voteTotalsReact)
        //})();
      }, 5000);
    }
    render() {
      const handleClick = e => {
        //console.log('handleClick')
        //modal.style.display = "none";
      };
      return (
        <div>
          <p>
            Yes {this.state.votes[0]}% | No {this.state.votes[1]}%{' '}
          </p>
          <p>Total Voted {this.state.votes[2]}%</p>
        </div>
      );
    }
  }