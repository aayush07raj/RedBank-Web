import React, {useEffect} from "react";
import { Route, Redirect } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { logging } from "./redux/Actions/login";
import Cookies from "universal-cookie";

export const ProtectedRoute = ({ component: Component, ...rest}) => {
  const loggedIn = useSelector((state) => state.loggedIn);
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const authObj = cookies.get("Auth");

  useEffect(() => {
    console.log(loggedIn.isLoggedIn);
    
    // const cookies = new Cookies();
    // const authObj = cookies.get("Auth");
    if (authObj) {
      dispatch(logging(authObj));
      console.log(authObj);
    }
  }, [dispatch]);

        return(
            <Route
            {...rest}
            render = {(props)=>
              (authObj) ? (
                
                <Component {...props} />
              ):(
                // null
                <Redirect to="/Login"/>
              )
            }
            />
        );
    };

