import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Nav() {
  const repo = useSelector(state => state.repo);
  const navigate = useNavigate();
  return (
    <div className="nav">
      <span className="navIcon">
        <span>
          <img src="../icons/search.png" />
        </span>
        <span>Search</span>
      </span>
      <span className="navIcon">
        <span>
          <img src="../icons/community.png" />
        </span>
        <span>Community</span>
      </span>
      <span
        className="navIcon"
        onClick={() => {
          if (repo.name !== 'none' && repo.owner.login !== 'none') {
            navigate('/transfer');
          }
        }}
      >
        <span>
          <img src="../icons/transfer.png" />
        </span>
        <span>Transfer</span>
      </span>

      <span className="navIcon" onClick={() => navigate('/account')}>
        <span>
          <img src="../icons/account.png" />
        </span>
        Account
      </span>
    </div>
  );
}
