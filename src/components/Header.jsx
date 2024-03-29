import React, { useState } from 'react';
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom"; 


// MUI Themes and Features
import PropTypes from 'prop-types';
import HomeIcon from '@mui/icons-material/Home';
import { Toolbar, Button, Typography, Link, Alert } from '@mui/material';
import { auth } from "../firebase";

function Header(props) {
  const { sections, title } = props;
  const navigate = useNavigate();
  const [error, setError] = useState();
  const { currentUser, logout } = useAuth();
  const history = useNavigate();

  async function handleLogout() {
      setError('');

      try {
          await logout(auth);
          history('/login');
      } catch {
          setError('Failed to log out');
      }
  }

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Button onClick={() => navigate("/")}><HomeIcon></HomeIcon></Button>
        {currentUser && <Typography>{currentUser.email}</Typography>}
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
          fontFamily=''
        >
          {title}
        </Typography>
        <div>
          {currentUser 
            ? <Button onClick={() => navigate("/update-profile")}>Update Profile</Button>
            : <Button onClick={() => navigate("/login")}>Log In</Button>
          }
        </div>
        <div>
          {error && <Alert severity="error">{error}</Alert>}
          {currentUser 
            ? <Button onClick={handleLogout}>Log Out</Button>
            : <Button onClick={() => navigate("/signup")}>Sign Up</Button>
          }
        </div>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'center', overflowX: 'auto' }}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            onClick={() => navigate(`/tags/${(section.title).toLowerCase()}`)}
            sx={{ p: 1, flexShrink: 0 }}>
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;