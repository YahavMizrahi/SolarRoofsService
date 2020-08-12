import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";

import Navbar from "./components/Navbar/Navbar";
import AboutUs from "./components/AboutUs/AboutUs";
import PrivateService from "./components/PrivateService/PrivateService";
import OrganizationalService from "./components/OrganizationalService/OrganizationalService";

function App() {
  return (
    <Router history={history}>
      <Navbar />
      <Switch>
        <Route path="/" exact component={AboutUs} />
        <Route path="/service/private" exact component={PrivateService} />
        <Route
          path="/service/organizational"
          exat
          component={OrganizationalService}
        />
      </Switch>
    </Router>
  );
}

export default App;
