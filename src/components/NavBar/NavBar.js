import react from "react";
import { AppBar, Typography } from "@material-ui/core";

import useStyles from "./styles";
const Navbar = () => {
    const classes = useStyles();
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Typography className={classes.heading} variant="h2" align="center">
                Memories
            </Typography>
            <img className={classes.image} src={memories} alt="Memories" height="60" width="60"></img>
        </AppBar>
    );
};

export default Navbar;
