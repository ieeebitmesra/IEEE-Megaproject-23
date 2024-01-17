import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Sidebar.scss';
import { SiteContext } from '../../Context/siteContext';

const Sidebar = () => {
  const { toggle, Post, setPost } = useContext(SiteContext);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      const userToken = localStorage.getItem('token');
      try {
        const userResponse = await axios.get('http://localhost:3000/auth/current-user', {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        setUsername(userResponse.data.username);
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername();
  }, []);

  return (
    <div className="SidebarMenu">
      <div className="side d-flex flex-column flex-shrink-0 p-3" style={toggle ? { opacity: '1' } : { opacity: '0' }}>
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <span className="fs-4">Welcome {username}</span>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <Link
              className={`nav-link text-white ${Post === 'Post' && 'activ'}`}
              aria-current="page"
              onClick={() => setPost('Post')}
            >
              Post Section
            </Link>
          </li>
          <li>
            <Link
              className={`nav-link text-white ${Post === 'PostCreate' && 'activ'}`}
              onClick={() => setPost('PostCreate')}
            >
              Create Your Post
            </Link>
          </li>
          <li>
            <Link
              className={`nav-link text-white ${Post === 'UserPost' && 'activ'}`}
              onClick={() => setPost('UserPost')}
            >
              See Your Post
            </Link>
          </li>
        </ul>
        <hr />
      </div>
    </div>
  );
};

export default Sidebar;
