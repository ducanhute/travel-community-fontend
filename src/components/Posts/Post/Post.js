import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { deletePost, likePost } from '../../../actions/posts';

import useStyles from './styles';
import ThumbUpAlt from '@material-ui/icons/ThumbUpAlt';
import ThumbUpOutlined from '@material-ui/icons/ThumbUpOutlined';
import posts from '../../../reducers/posts';

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('profile'));
  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((item) => item === user?.sub || item === user?.result?._id) ? (
        <>
          <ThumbUpAlt />
          &nbsp;
          {post.likes.length > 2 ? (
            <span style={{ fontSize: '8px' }}>You and {post.likes.length - 1} others </span>
          ) : (
            `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`
          )}
        </>
      ) : (
        <>
          <ThumbUpOutlined />
          &nbsp; {`${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}
        </>
      );
    }
    return (
      <>
        <ThumbUpOutlined /> &nbsp; Like
      </>
    );
  };
  const handleCardAction = () => {
    history.push(`/posts/${post._id}`);
  };
  return (
    <Card className={classes.card} elevation={3}>
      <div className='wrap-card' onClick={handleCardAction} style={{ cursor: 'pointer' }}>
        <CardMedia className={classes.media} image={post?.selectedFile} title={post?.title} />
        <div className={classes.overlay}>
          <Typography variant='h6'>{post.name}</Typography>
          <Typography variant='body2' style={{ fontSize: '10px', fontStyle: 'italic' }}>
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        <div className={classes.overlay2}>
          {(post.creator === user?.sub || post.creator === user?.result?._id) && (
            <Button
              style={{ color: 'white' }}
              size='small'
              onClick={() => {
                return setCurrentId(post._id);
              }}>
              <MoreHorizIcon fontSize='medium' />
            </Button>
          )}
        </div>
        <div className={classes.details}>
          <Typography style={{ fontSize: '12px' }} variant='body2' color='textSecondary'>
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <CardContent className={classes.cardContTent}>
          <Typography className={classes.title} variant='h6' style={{ padding: 0 }} gutterBottom>
            {post.title}
          </Typography>
          <Typography className={classes.message} variant='body2' color='textSecondary' component='p' gutterBottom>
            {post.message}
          </Typography>
          <Typography variant='subtitle2' color='primary'>
            More details....
          </Typography>
        </CardContent>
      </div>

      <CardActions className={classes.cardActions}>
        <Button
          size='small'
          color='primary'
          disabled={!user}
          onClick={() => {
            dispatch(likePost(post._id));
          }}>
          {Likes()}
        </Button>
        {(post.creator === user?.result?._id || post.creator === user?.sub) && (
          <Button
            size='small'
            style={{ fontSize: '12px' }}
            color='primary'
            onClick={() => {
              dispatch(deletePost(post._id));
              setCurrentId(`${post._id}-`);
            }}>
            <DeleteIcon fontSize='medium' />
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
