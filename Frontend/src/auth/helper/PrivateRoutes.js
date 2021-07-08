import React from "react";
import { Route, Redirect } from "react-router-dom";

import { isAuthenticated } from "./index";

const PrivateRoutes = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated()                       // gives us true or false value
          ? (
            <Component {...props} />             // loging out props here
          )
          : (
            <Redirect                        // if not authenticated
              to={{
                pathname: "/signin",
                state: { from: props.location },
              }}
            />
          )}
    />
  );
};

export default PrivateRoutes;
