import React, { useContext } from "react";
import { Route, Navigate  } from "react-router";
//import AuthContext from "../contexts/auth/authContext";
const PrivateRoute = ({ component: Component, ...rest }) => {
  //const authContext = useContext(AuthContext);
  let auth=true;
  return (
    <Route
      {...rest}
      render={props =>
       ( auth==false )? (
          <Navigate  to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
