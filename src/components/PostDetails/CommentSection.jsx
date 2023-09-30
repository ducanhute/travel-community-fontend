import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";

import useStyles from './styles.js'
import { commentPost } from '../../actions/posts.js'

const CommentSection = ({ post }) => {
    const classes = useStyles()
    const [comments, setComments] = useState(post?.comments)
    const [comment, setComment] = useState('')
    const user = JSON.parse(localStorage.getItem('profile'))
    const dispatch = useDispatch()
    const commentsRef = useRef()

    const handleClick = async () => {
        const finalComment = `${user?.result?.name || user?.name}: ${comment}`
        const newComments = await dispatch(commentPost(finalComment, post._id))

        setComments(newComments)
        setComment("")

        commentsRef.current.scrollIntoView({
            behavior: "smooth", block: 'center',
            inline: 'center'
        })
    }

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div style={{ width: '50%' }} className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">
                        Comments
                    </Typography>
                    {comments.map((c, i) => (
                        <Typography key={i} gutterBottom variant="subtitle2">
                            <strong>{c.split(":")[0]}: </strong>{c.split(":")[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef}></div>
                </div>

                {!(user?.result?.name || user?.name) &&
                    <div style={{ width: '50%' }}>
                        <Typography color="secondary" align="center" gutterBottom variant="h6">Sign in to write a comment!</Typography>
                    </div>
                }
                {(user?.result?.name || user?.name) &&
                    <div style={{ width: '50%' }}>
                        <Typography gutterBottom variant="h6">Write a comment</Typography>
                        <TextField
                            fullWidth
                            minRows={4}
                            variant="outlined"
                            label="Comment"
                            multiline
                            value={comment}
                            onChange={(e) => { setComment(e.target.value) }}
                        />
                        <Button color="primary" style={{ marginTop: "10px" }} fullWidth disabled={!comment} variant="contained" onClick={handleClick}>
                            Comment
                        </Button>
                    </div>

                }

            </div>
        </div>
    )
}

export default CommentSection;