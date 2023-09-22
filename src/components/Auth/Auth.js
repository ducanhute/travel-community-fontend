import React, { useState, useEffect } from "react";
import { Avatar, Button, Container, Grid, Paper, Typography } from "@material-ui/core";
import LockOutLinedIcon from "@material-ui/icons/LockOutlined";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { signIn, signUp } from "../../actions/auth";
import { AUTH } from "../../constants/actionTypes";
import { Input } from "./Input";
import Icon from "./icon";
import useStyle from "./styles";

const initilState = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" };

export const Auth = () => {
    const classes = useStyle();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);

    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState([]);
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

    const handleLogin = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log("Login Failed:", error),
    });
    useEffect(() => {
        if (user) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user?.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user?.access_token}`,
                        Accept: "application/json",
                    },
                })
                .then((res) => {
                    setProfile(res.data);
                    dispatch({ type: AUTH, data: res.data });
                    history.push("/");
                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    const handleChange = (e) => {
        let fieldName = e.target.name;
        setFormData({ ...formData, [fieldName]: e.target.value });
    };
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutLinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
                <form className={classes.submit} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignUp && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input
                            name="password"
                            label="Password "
                            handleChange={handleChange}
                            type={showPassword ? "text" : "password"}
                            handleShowPassword={handleShowPassword}
                        />
                        {isSignUp && (
                            <>
                                <Input
                                    name="confirmPassword"
                                    label="Repeat Password"
                                    handleChange={handleChange}
                                    type="password"
                                />
                            </>
                        )}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignUp ? "Sign Up" : "Sign In"}
                    </Button>
                    <Button variant="contained" color="secondary" fullWidth onClick={handleLogin}>
                        {<Icon />} &nbsp; Sign in with Google
                    </Button>

                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp ? "Already have an account? Sign In?" : "Don't have an account? Sign Up?"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};
