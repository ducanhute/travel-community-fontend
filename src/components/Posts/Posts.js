import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import Post from "./Post/Post";
import useStyles from "./styles";

import { useSelector } from "react-redux";
const Posts = ({ setCurrentId }) => {
    console.log("check posts render");
    const classes = useStyles();
    const posts = useSelector((state) => state.posts);

    return !posts.length ? (
        <CircularProgress />
    ) : (
        <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
            {posts.map((post) => (
                <Grid key={post._id} item xs={12} sm={6}>
                    <Post setCurrentId={setCurrentId} post={post} />
                </Grid>
            ))}
        </Grid>
    );
};

export default Posts;
