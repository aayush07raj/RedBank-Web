import React, {useEffect} from "react";
import { Route, Redirect } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { logging } from "./redux/Actions/login";
import Cookies from "universal-cookie";

export const ProtectedRoute = ({ component: Component, ...rest}) => {
  const loggedIn = useSelector((state) => state.loggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    const cookies = new Cookies();
    const authObj = cookies.get("Auth");
    if (authObj) {
      dispatch(logging(authObj));
    }
  }, [dispatch]);


        // const loggedIn = useSelector((state) => state.loggedIn);
        return(
            <Route
            {...rest}
            render={props =>{
                if(loggedIn.isLoggedIn && props.authObj){
                    return <Component {...props}/>
                }
                else{
                    return (
                        <Redirect
                          to={{
                            pathname: "/",
                            state: {
                              from: props.location
                            }
                          }}
                        />
                      );
                }
            }}
            />
        );
    };
