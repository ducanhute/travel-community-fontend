import { Container } from "@material-ui/core";
import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Router } from "react-router-dom/cjs/react-router-dom";

import PostDetails from "./components/PostDetails/PostDetails";
import { Auth } from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import Navbar from "./components/NavBar/NavBar";
const App = () => {
    return (
        <BrowserRouter>
            <Container maxWidth="xl">
                <Navbar />
                <Switch>
                    <Route path="/" exact component={() => <Redirect to="/posts" />} />
                    <Route path="/posts" exact component={Home} />
                    <Route path="/posts/search" exact component={Home} />
                    <Route path="/posts/:id" exact component={PostDetails} />
                    <Route path="/auth" exact component={Auth} />
                </Switch>
            </Container>
        </BrowserRouter>
    );
};

export default App;
