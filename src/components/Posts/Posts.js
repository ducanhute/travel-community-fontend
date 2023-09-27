import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress, Typography, Divider } from '@material-ui/core';
import Post from './Post/Post';
import useStyles from './styles';
import Paginate from '../Pagination';
import { useSelector } from 'react-redux';
const Posts = ({ setCurrentId, page }) => {
  const classes = useStyles();
  const { posts, isLoading } = useSelector((state) => state.posts);

  return (
    <>
      <Grid container justifyContent='center' style={{ marginBottom: '10px' }}>
        <Paginate page={page} />
      </Grid>
      {!posts.length && !isLoading && (
        <Typography variant='h5' color='secondary'>
          No post found!
        </Typography>
      )}
      {isLoading ? (
        <Grid className={classes.loadingPaper}>
          <CircularProgress size='6em' />
        </Grid>
      ) : (
        <Grid style={{ height: 'calc(100vh - 140px)', overflowY: 'scroll', overflowX: 'hidden', padding: '0 15px' }} container>
          <Grid className={classes.mainContainer} container alignItems='stretch' spacing={3}>
            {posts.map((post) => (
              <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                <Post setCurrentId={setCurrentId} post={post} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Posts;
