import React, {useEffect} from "react";
import { Route, Redirect } from "react-router-dom";

import { logging } from "./redux/Actions/login";
import Cookies from "universal-cookie";
import { useSelector, useDispatch } from "react-redux";

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
                if(loggedIn.isLoggedIn){
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
