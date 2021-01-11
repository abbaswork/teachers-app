/* React + Route API */
import React from 'react';

/* Auth layout */
import { ProtectedRoute } from '../../auth/protectedRoute';
import AdminLayout from './dashboard-layout';

/* Component responsible for loading Auth (Login, Signup) pages in the Auth layout, deconstruct component to render and pass props to it */
const AdminLayoutRoutes = ({ component: Component, ...rest }) => {

    const AdminComponent = (props) =>
        <AdminLayout >
            <Component {...props} />
        </AdminLayout>

    return (
        /* Use Route API and pass properties, render layout with deconstructed component */
        <ProtectedRoute {...rest} component={AdminComponent} />
    )
}

export default AdminLayoutRoutes;