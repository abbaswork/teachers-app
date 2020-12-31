/* React + Route API */
import React from 'react';
import { Route } from 'react-router-dom';

/* Auth layout */
import AuthLayout from './auth-layout';

/* Component responsible for loading Auth (Login, Signup) pages in the Auth layout, deconstruct component to render and pass props to it */
const AuthLayoutRoutes = ({ component: Component, ...rest }) => {
    return (
        /* Use Route API and pass properties, render layout with deconstructed component */
        <Route {...rest} render={props => (
            <AuthLayout>
                <Component {...props} />
            </AuthLayout>
        )} />
    )
}

export default AuthLayoutRoutes;