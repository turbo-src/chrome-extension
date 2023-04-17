import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { postGetPullRequest, postGetPRvoteYesTotals, postGetPRvoteNoTotals } from '../requests';
import commonUtil from '../utils/commonUtil';
import mathUtil from '../utils/mathUtil';
import { Button } from 'react-bootstrap';

export default function VoteStatusButton(props){

    const [user, setUser] = useState(props.user);
    const [repo, setRepo] = useState(props.repo);
    const [issueID, setIssueID] = useState(props.issueID);
    const [contributorName, setContributorName] = useState(props.contributorName);
    const [contributorID, setContributorID] = useState(props.contributorID);
    const [background, setBackground] = useState('white');
    const [statusButton, setstatusButton] = useState({ color: 'gray', text: '?' });
    const [tsrcPRstatus, setTsrcPRstatus] = useState(props.tsrcPRstatus);
    const [voteYesTotalState, setVoteYesTotalState] = useState(0.0);
    const [voteNoTotalState, setVoteNoTotalState] = useState(0.0);
    const [voteTotals, setVoteTotals] = useState(0);
    const [side, setSide] = useState(props.side);
    const [clicked, setClicked] = useState(props.clicked);
    const buttonStyle = {
      vote: ['lightgreen', 'vote'],
      preOpen: ['green', voteTotals],
      open: ['orchid', voteTotals],
      conflict: ['orange', 'conflict'],
      merge: ['darkorchid', 'merged'],
      closed: ['red', 'closed']
    };
    
    useEffect(() => {
        const fetchData = async () => {
        
      let tsrcPRstatusComponent = tsrcPRstatus;
      let textMath = statusButton.textMath;
      try {
        const voteYesTotal = await postGetPRvoteYesTotals(
          user,
          repo,
          issueID,
          contributorID,
          ""
        );
        const voteNoTotal = await postGetPRvoteNoTotals(
          user,
          repo,
          issueID,
          contributorID,
          ""
        );
        const resYes = mathUtil.votePercentToMergeInteger(voteYesTotal);
        const resNo = mathUtil.votePercentToMergeInteger(voteNoTotal);
        if (resYes !== null && resNo !== null) {
          textMath = resYes / 2 + resNo / 2;
        }
        setVoteYesTotalState(voteYesTotal);
        setVoteNoTotalState(voteNoTotal);

      } catch (error) {
        textMath = "";
      }
      console.log("tsrcPRstatusComponent: ", tsrcPRstatusComponent);
      
      setTsrcPRstatus(tsrcPRstatusComponent);
      
      const statusProblemComponent = tsrcPRstatusComponent === null || tsrcPRstatusComponent === undefined;
      if (statusProblemComponent) {
        tsrcPRstatusComponent = {};
        tsrcPRstatusComponent.mergeableCodeHost = true;
        tsrcPRstatusComponent.status = 404;
        tsrcPRstatusComponent.state = "";
      }
      
      const statusPreOpenComponent =
        tsrcPRstatusComponent.status === 200 && tsrcPRstatusComponent.state === "pre-open";
      const statusOpenComponent =
        tsrcPRstatusComponent.status === 200 && tsrcPRstatusComponent.state === "open";
      const statusClosedComponent =
        tsrcPRstatusComponent.status === 200 && tsrcPRstatusComponent.state === "close";
      const statusMergedComponent =
        tsrcPRstatusComponent.status === 200 && tsrcPRstatusComponent.state === "merge";
      const checkstatusButtonPreOpen = commonUtil.isObjEqual(statusButton, { color: 'green', text: `${textMath}%` });
      const checkstatusButtonOpen = commonUtil.isObjEqual(statusButton, { color: 'orchid', text: `${textMath}%` });
      const checkstatusButtonClosed = commonUtil.isObjEqual(statusButton, { color: 'red', text: 'closed' });
      const checkstatusButtonMerged = commonUtil.isObjEqual(statusButton, { color: 'darkorchid', text: 'merged' } );
      const checkstatusButtonVote = commonUtil.isObjEqual(statusButton, { color: 'lightgreen', text: 'vote' } );
      const checkstatusButtonConflict = commonUtil.isObjEqual(statusButton, { color: 'orange', text: 'conflict' } );
      const checkstatusButtonProblem = commonUtil.isObjEqual(statusButton, { color: 'gray', text: '?' } );
          if (statusPreOpenComponent) {
            
              if (!checkstatusButtonPreOpen) {
                setVoteTotals(textMath);
                console.log(voteTotals, "voteTotals");
                console.log(textMath, "textMath");

               setstatusButton({ color: 'green', text: `${textMath}%` });
              } else {  
                setTsrcPRstatus(tsrcPRstatusComponent);
              }
          } else if (statusOpenComponent) {
          
            if (!checkstatusButtonOpen) {
              setVoteTotals(textMath);
              console.log(voteTotals, "voteTotals");
              console.log(textMath, "textMath");
             setstatusButton({color: 'orchid', text: `${textMath}%` });
            } else {
              setTsrcPRstatus(tsrcPRstatusComponent);
            }
          } else if (statusClosedComponent) {
            if (!checkstatusButtonClosed) {
             setstatusButton({ color: 'red', text: 'closed' });
            } else {
              setTsrcPRstatus(tsrcPRstatusComponent);
            }
          } else if (statusMergedComponent) {
            if (!checkstatusButtonMerged) {

             setstatusButton({ color: 'darkorchid', text: 'merged' });
            } else {
              setTsrcPRstatus(tsrcPRstatusComponent);
            }
          } else if (tsrcPRstatusComponent.mergeableCodeHost === true) {
            if (!checkstatusButtonVote) {
             setstatusButton({ color: 'lightgreen', text: 'vote' });
            } else {
              setTsrcPRstatus(tsrcPRstatusComponent);
            }
          }  else if (tsrcPRstatusComponent.mergeableCodeHost === false) {
            if (!checkstatusButtonConflict) {
             setstatusButton({color: 'orange', text: 'conflict' });
            } else {
              setTsrcPRstatus(tsrcPRstatusComponent);
            }
          } else if (tsrcPRstatusComponent.mergeableCodeHost === true) {
           setstatusButton({ color: 'lightgreen', text: 'vote' });
            } else {
              if (!checkstatusButtonProblem) {
               setstatusButton({ color: 'gray', text: '?' });
              } else {
                setTsrcPRstatus(tsrcPRstatusComponent);
              }
          }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const updateData = async () => {
            
      console.log("It's working!");
      let textMath = statusButton.textMath;
      let tsrcPRstatusComponent;
      try {
        tsrcPRstatusComponent = await postGetPullRequest(
            user,
            repo,
            issueID,
            contributorID,
            side
            );
        const voteYesTotal = await postGetPRvoteYesTotals(
          user,
          repo,
          issueID,
          contributorID,
          ""
        );
        const voteNoTotal = await postGetPRvoteNoTotals(
          user,
          repo,
          issueID,
          contributorID,
          ""
        );
        const resYes = mathUtil.votePercentToMergeInteger(voteYesTotal);
        const resNo = mathUtil.votePercentToMergeInteger(voteNoTotal);
        if (resYes !== null && resNo !== null) {
          textMath = resYes / 2 + resNo / 2;
        }
        setVoteYesTotalState(voteYesTotal);
        setVoteNoTotalState(voteNoTotal);
        
        setTsrcPRstatus(tsrcPRstatusComponent);
        console.log("tsrcPRstatusComponent: ", tsrcPRstatus);
      } catch (error) {
        textMath = "";
      }
      const statusProblemComponent = tsrcPRstatusComponent === null || tsrcPRstatusComponent === undefined;
      if (statusProblemComponent) {
        tsrcPRstatusComponent = {};
        tsrcPRstatusComponent.mergeableCodeHost = true;
        tsrcPRstatusComponent.status = 404;
        tsrcPRstatusComponent.state = "";
      }
      
      const statusPreOpenComponent =
        tsrcPRstatusComponent.status === 200 && tsrcPRstatusComponent.state === "pre-open";
      const statusOpenComponent =
        tsrcPRstatusComponent.status === 200 && tsrcPRstatusComponent.state === "open";
      const statusClosedComponent =
        tsrcPRstatusComponent.status === 200 && tsrcPRstatusComponent.state === "close";
      const statusMergedComponent =
        tsrcPRstatusComponent.status === 200 && tsrcPRstatusComponent.state === "merge";
      const checkstatusButtonPreOpen = commonUtil.isObjEqual(statusButton, { color: 'green', text: `${textMath}%` });
      const checkstatusButtonOpen = commonUtil.isObjEqual(statusButton, { color: 'orchid', text: `${textMath}%` });
      const checkstatusButtonClosed = commonUtil.isObjEqual(statusButton, { color: 'red', text: 'closed' });
      const checkstatusButtonMerged = commonUtil.isObjEqual(statusButton, { color: 'darkorchid', text: 'merged' } );
      const checkstatusButtonVote = commonUtil.isObjEqual(statusButton, { color: 'lightgreen', text: 'vote' } );
      const checkstatusButtonConflict = commonUtil.isObjEqual(statusButton, { color: 'orange', text: 'conflict' } );
      const checkstatusButtonProblem = commonUtil.isObjEqual(statusButton, { color: 'gray', text: '?' } );
          if (statusPreOpenComponent) {
            
              if (!checkstatusButtonPreOpen) {
                setVoteTotals(textMath);
                console.log(textMath);  
               setstatusButton({ color: 'green', text: `${textMath}%` });
              } else {  
                setTsrcPRstatus(tsrcPRstatusComponent);
              }
          } else if (statusOpenComponent) {
          
            if (!checkstatusButtonOpen) {
              setVoteTotals(textMath);
              console.log(textMath);
             setstatusButton({color: 'orchid', text: `${textMath}%` });
            } else {
              setTsrcPRstatus(tsrcPRstatusComponent);
            }
          } else if (statusClosedComponent) {
            if (!checkstatusButtonClosed) {
             setstatusButton({ color: 'red', text: 'closed' });
            } else {
              setTsrcPRstatus(tsrcPRstatusComponent);
            }
          } else if (statusMergedComponent) {
            if (!checkstatusButtonMerged) {

             setstatusButton({ color: 'darkorchid', text: 'merged' });
            } else {
              setTsrcPRstatus(tsrcPRstatusComponent);
            }
          } else if (tsrcPRstatusComponent.mergeableCodeHost === true) {
            if (!checkstatusButtonVote) {
             setstatusButton({ color: 'lightgreen', text: 'vote' });
            } else {
              setTsrcPRstatus(tsrcPRstatusComponent);
            }
          }  else if (tsrcPRstatusComponent.mergeableCodeHost === false) {
            if (!checkstatusButtonConflict) {
             setstatusButton({color: 'orange', text: 'conflict' });
            } else {
              setTsrcPRstatus(tsrcPRstatusComponent);
            }
          } else if (tsrcPRstatusComponent.mergeableCodeHost === true) {
           setstatusButton({ color: 'lightgreen', text: 'vote' });
            } else {
              if (!checkstatusButtonProblem) {
               setstatusButton({ color: 'gray', text: '?' });
              } else {
                setTsrcPRstatus(tsrcPRstatusComponent);
              }
          }

          
        };

        updateData();
    }, [props.clicked]);

    const handleClick = (e) => {
        e.preventDefault();
        //modal.style.display = "none";
    };

    return (
        <Button
        style={{ color: 'white', background: statusButton.color }}
        onClick={handleClick}
        >
        {statusButton.text}
        </Button>
    );
};
