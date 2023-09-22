import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import memories from "../../images/memories.png";
import useStyles from "./styles";
import { LOGOUT } from "../../constants/actionTypes";
const Navbar = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

    const logOut = () => {
        dispatch({ type: LOGOUT });
        history.push("/");
        setUser(null);
    };

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location]);

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">
                    Memories
                </Typography>
                <img className={classes.image} src={memories} alt="Memories" height="60" width="60"></img>
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.name} src={user.picture}></Avatar>
                        <Typography className={classes.userName} variant="h6">
                            {user.name}
                        </Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logOut}>
                            Log out
                        </Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">
                        Sign In
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
