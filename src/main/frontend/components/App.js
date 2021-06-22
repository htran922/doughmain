import React, { useEffect } from "react";
import { hot } from "react-hot-loader/root";
import "foundation-sites";
import $ from "jquery";
import "../assets/scss/main.scss"

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import NavBar from "./NavBar"
import { BrowserRouter, Route } from "react-router-dom";

const App = (props) => {
  useEffect(() => {
    $(document).foundation();
  }, []);

  return(
    <BrowserRouter>
      <Route path="/" component={NavBar} />
    </BrowserRouter>
  )
};

export default hot(App);
