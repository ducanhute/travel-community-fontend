import React, { useState } from 'react';
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

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('profile'));
  const [likes, setLikes] = useState(post?.likes);

  const userId = user?.sub || user?.result?._id;

  const hasLikedPost = post.likes.find((item) => item === userId);

  const handleClickLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((item) => item === userId) ? (
        <>
          <ThumbUpAlt />
          &nbsp;
          {likes.length > 2 ? (
            <span style={{ fontSize: '8px' }}>You and {likes.length - 1} others </span>
          ) : (
            `${likes.length} like${likes.length > 1 ? 's' : ''}`
          )}
        </>
      ) : (
        <>
          <ThumbUpOutlined />
          &nbsp; {`${likes.length} like${likes.length > 1 ? 's' : ''}`}
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
  console.log('render', post.likes);
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
        <Button size='small' color='primary' disabled={!user} onClick={handleClickLike}>
          <Likes />
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
            <DeleteIcon color='secondary' fontSize='medium' />
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
