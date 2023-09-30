import React, { useState, useEffect, useRef } from 'react';
import { TextField, Button, Typography, Paper, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

// Get the current id
const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.posts.find((p) => p._id === currentId) : null));
  const classes = useStyles();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updatePost(currentId, { ...postData, name: user?.name, createAt: new Date().toString() }));
      setTimeout(() => {
        setCurrentId(null);
        clear();
      }, 500);
    } else {
      // Check here
      dispatch(createPost({ ...postData, name: user?.name || user?.result.name, createdAt: new Date() }));
      clear();
    }
  };

  const clear = () => {
    inputRef.current.value = null;
    setPostData({ title: '', message: '', tags: '' });
  };

  if (!user?.name && !user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography align='center' variant='h6' color='secondary'>
          Please Sign In to create your own memories and like other's memories
        </Typography>
      </Paper>
    );
  }
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  const handleChangeFile = async (e) => {
    let file = e.target.files[0];
    const result = await toBase64(file);
    setPostData({ ...postData, selectedFile: result });
  };
  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant='h6'>{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
        <TextField
          size='small'
          name='title'
          variant='outlined'
          label='Title'
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name='message'
          variant='outlined'
          label='Message'
          fullWidth
          value={postData.message}
          onChange={(e) => setPostData({ ...postData, message: e.target.value })}
        />
        <TextField
          size='small'
          name='tags'
          variant='outlined'
          label='Tags'
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
        />
        <div className={classes.fileInput}>
          <input ref={inputRef} type='file' onChange={handleChangeFile} />
        </div>
        <Grid container alignItems='center' justifyContent='space-around'>
          <Button size='small' className={classes.buttonSubmit} variant='contained' color='primary' type='submit'>
            Submit
          </Button>
          <Button size='small' variant='contained' color='secondary' onClick={clear}>
            Clear
          </Button>
        </Grid>
      </form>
    </Paper>
  );
};

export default Form;
