import React, { useEffect } from "react";
import { Paper, Typography, CircularProgress, Divider, Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useHistory } from "react-router-dom";

import CommentSection from "./CommentSection";
import useStyles from "./styles";
import { getPost, fetchPostsBySearch } from "../../actions/posts";

const PostDetails = () => {
    const { post, posts, isLoading } = useSelector((state) => state.posts)
    const dispatch = useDispatch()
    const history = useHistory()
    const classes = useStyles()
    const { id } = useParams()

    useEffect(() => {
        dispatch(getPost(id))
    }, [id])

    useEffect(() => {
        dispatch(fetchPostsBySearch({ search: "none", tags: post?.tags.join(',') }))
    }, [id, post])

    if (!post) return null

    if (isLoading) {
        return (<Paper evaluation={6} className={classes.loadingPaper}>
            <CircularProgress size="7em" />
        </Paper>)
    }
    const recommendPosts = posts.filter(({ _id }) => _id !== post._id);

    const openPost = (_id) => history.push(`/posts/${_id}`)

    return <Paper style={{ padding: "20px", borderRadius: "15px" }} evaluation={6} >
        <div className={classes.card}>
            <div className={classes.section}>
                <Typography variant="h3" component="h2">{post.title}</Typography>
                <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
                <Typography variant="h6">Created by: {post.name}</Typography>
                <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                <Divider style={{ margin: '20px 0' }} />
                <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
                <Divider style={{ margin: '20px 0' }} />
                <CommentSection post={post} />
                <Divider style={{ margin: '20px 0' }} />
            </div>
            <div className={classes.imageSection}>
                <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
            </div>
        </div>
        {recommendPosts.length > 0 && (
            <div className={classes.section}>
                <Typography gutterBottom variant="h6" style={{ fontWeight: "bold" }}> You might also like: </Typography>
                <Divider style={{ marginBottom: "15px" }} />

                <Grid container spacing={6} >
                    {recommendPosts.map(({ title, message, name, likes, selectedFile, _id }) => (
                        <Grid xs={12} md={4} lg={3} item onClick={() => { openPost(_id) }} key={_id}>
                            <Paper evaluation={9} className={classes.recommendedPosts}>
                                <Typography gutterBottom variant="h6" style={{ fontWeight: "bold" }}>{title}</Typography>
                                <Typography gutterBottom variant="subtitle2">Created by: {name}</Typography>
                                <Typography gutterBottom className={classes.message} variant="subtitle1">{message}</Typography>
                                <span>...</span>
                                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                                <img src={selectedFile} style={{ width: "100%" }} />
                            </Paper>
                        </Grid>

                    ))}
                </Grid>

            </div>
        )}
    </Paper>;
};
export default PostDetails;
