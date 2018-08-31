import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./containers/Home";
import Company from "./containers/Company"
import NewCompany from "./containers/NewCompany";
import NewEmployee from "./containers/NewEmployee";
import NotFound from "./containers/NotFound";

export default ({ childProps }) =>
  <Switch>
    <Route path="/" exact component={Home} props={childProps} />

    <Route path="/company/new" exact component={NewCompany} props={childProps} />
    <Route path="/company/:id" exact component={Company} props={childProps} />
    <Route path="/employee/new" exact component={NewEmployee} props={childProps} />
    { /* Finally, catch all unmatched routes */}
    <Route component={NotFound} />
  </Switch>;
