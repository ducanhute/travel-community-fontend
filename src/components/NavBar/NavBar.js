import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import logo from '../../images/logo.jpg';
import useStyles from './styles';
import { LOGOUT } from '../../constants/actionTypes';

const Navbar = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const logOut = () => {
    dispatch({ type: LOGOUT });
    history.push('/');
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodeToken = decode(token);
      if (decodeToken.exp * 1000 < new Date().getTime()) logOut();
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);
  const handleClickHome = () => {
    history.push('/');
  };
  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
      <div className={classes.brandContainer}>
        <Typography onClick={handleClickHome} className={classes.heading} variant='h6' align='center'>
          Travel Community
          <img className={classes.image} src={logo} alt='Memories' height='60' width='60'></img>
        </Typography>
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.name || user.result.name}></Avatar>
            <Typography className={classes.userName} variant='h6'>
              {user.name || user.result.name}
            </Typography>
            <Button variant='contained' size='small' className={classes.button} color='secondary' onClick={logOut}>
              Log out
            </Button>
          </div>
        ) : (
          <Button size='small' component={Link} className={classes.button} to='/auth' variant='contained' color='primary'>
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
