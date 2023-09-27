import React, { useState, useEffect } from 'react';
import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import LockOutLinedIcon from '@material-ui/icons/LockOutlined';
import { useGoogleLogin, GoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useHistory } from 'react-router-dom';

import { signIn, signUp } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';
import { Input } from './Input';
import Icon from './icon';
import useStyle from './styles';

const initilState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

export const Auth = () => {
  const classes = useStyle();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({});
  const [formData, setFormData] = useState(initilState);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(signUp(formData, history));
    } else {
      dispatch(signIn(formData, history));
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const switchMode = () => {
    setIsSignUp(!isSignUp);
  };

  const onSuccess = (credentialResponse) => {
    const credentialResponseDecode = jwtDecode(credentialResponse.credential);
    setProfile({ ...credentialResponseDecode, token: credentialResponse.credential });
    dispatch({
      type: AUTH,
      data: {
        ...credentialResponseDecode,
        token: credentialResponse.credential,
      },
    });
    history.push('/');
  };
  const handleChange = (e) => {
    let fieldName = e.target.name;
    setFormData({ ...formData, [fieldName]: e.target.value });
  };
  console.log('Check profile', profile);
  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutLinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.submit} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                <Input name='lastName' label='Last Name' handleChange={handleChange} half />
              </>
            )}
            <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
            <Input
              name='password'
              label='Password '
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <>
                <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' />
              </>
            )}
          </Grid>
          <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
          <Grid container fullWidth direction='row' justifyContent='center' alignItems='center'>
            <GoogleLogin
              onSuccess={onSuccess}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </Grid>
          <Grid container justifyContent='flex-end' className={classes.magin}>
            <Grid item>
              <Typography className={classes.hover} color='primary' onClick={switchMode}>
                {isSignUp ? 'Already have an account? Sign In?' : "Don't have an account? Sign Up?"}
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};
