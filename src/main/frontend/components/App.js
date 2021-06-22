import React, { useEffect } from "react";
import { hot } from "react-hot-loader/root";
import "foundation-sites";
import $ from "jquery";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import PizzaStylesIndex from "./PizzaStylesIndex"
import PizzaStyleShow from "./PizzaStyleShow";

const App = (props) => {
  useEffect(() => {
    $(document).foundation();
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/pizza-styles"/>
        </Route>
        <Route exact path="/pizza-styles" component={PizzaStylesIndex}/>
        <Route exact path="/pizza-styles/:id" component={PizzaStyleShow} />
      </Switch>
    </BrowserRouter>
  )
};

export default hot(App);
