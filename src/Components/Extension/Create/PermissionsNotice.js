import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Importance from '../../../../icons/importance.png';

const RepoButton = styled.button`
  background-color: #313131;
  color: white;
  width: 200px;
  height: 50px;
  border: none;
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  font-family: 'Inter', sans-serif;
  font-weight: 500;
`;

const PermsNotice = styled.span`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  color: black;
  text-align: center;
  margin: 1rem 0;
  line-height: 1.75;
  font-size: 17px;
`;

const BtnSpan = styled.span`
  text-align: center;
`;

const KeyAPI = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 1rem 0 2rem 0;
  padding: 1rem;
`;

const PermsList = styled.ul`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  color: black;
  text-align: center;
  list-style-type: disc;
  width: 80%;
  margin: 10px auto 40px auto;

  li {
    list-style-type: disc;
  }
`;

const PermsText = styled.span`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  color: black;
  text-align: left;
  width: 95%;
  margin: 0px auto 40px auto;
  line-height: 1.5;
  font-size: 15px;
`;

export default function PermissionsNotice({ errorText, perms }) {
  return (
    <div className="content">
      <div className="onboard">
        <form name="create">
          <KeyAPI>
            <PermsNotice>
              <img src={Importance} style={{ height: '13px', width: '13px' }} />
              {perms.push_permissions
                ? 'Additional permissions are required to add this repository to Turbosrc:'
                : 'You do not have push permissions to this repository.'}
            </PermsNotice>
            {perms.push_permissions ? (
              <PermsList>
                <li>Read/write access to your public repositories</li>
              </PermsList>
            ) : (
              <PermsText>You can only create VotePower for repositories you maintain.</PermsText>
            )}
            {perms.push_permissions && (
              <BtnSpan>
                <a
                  href={`https://github.com/login/oauth/authorize?scope=user:email%20public_repo&client_id=${process.env.GITHUB_CLIENT_ID}`}
                  target="_blank"
                  rel="noopener noreferrer" // it's good practice to add this for security reasons when using target="_blank"
                >
                  <RepoButton type="button">Update Permissions</RepoButton>
                </a>
              </BtnSpan>
            )}
          </KeyAPI>
          <span>{errorText}</span>
        </form>
      </div>
    </div>
  );
}
