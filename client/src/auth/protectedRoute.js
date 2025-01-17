import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth";
import { useCookies } from 'react-cookie';

/* Export secure route functional component */
export const ProtectedRoute =
    /* Destructure component from passed argument and pass rest containing the rest */
    ({ component: Component, ...rest }) => {

        /* Load cookies for auth */
        const [cookies] = useCookies(['auth']);
        if (cookies.auth) {
            auth.checkSession(cookies.auth);
        }

        return (
            /* Using Route API, pass rest of arguments as props to the component */
            <Route {...rest} render={props => {
                /* If route is authenticated using auth class (true), return passed component */
                if (auth.isAuthenticated()) {
                    return <Component {...props} />;
                } else {
                    /* Otherwise redirect using redirect component from react-router */
                    return (
                        <Redirect to={{
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
