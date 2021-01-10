/* import React with code splitting + client side router */
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

/* Import Layout Routes */
import AuthLayoutRoute from './layouts/auth/auth-route';
import AdminLayoutRoute from './layouts/dashboard/dashboard-route';

/* Testing only */
import AdminLayout from './layouts/dashboard/dashboard-layout';

/*render dynamic imports as regular components to enable code splitting (only loading what's needed) */
const Home = lazy(() => import('./pages/home/home'));
const Login = lazy(() => import('./pages/login'));
const Signup = lazy(() => import('./pages/signup'));



const App = () => (

  /* using browser router api */
  <Router>

    {/* Setup fallback when waiting for components to load */}
    <Suspense fallback={<div>Loading...</div>}>

      {/* Switch searches through route children to find one to match with current url */}
      <Switch>

        {/* Testing only 
        <AdminLayout/>
        */}

        {/* Using defined protectRoute component and login as default */}
        <AdminLayoutRoute exact path="/home" component={Home} />
        <AuthLayoutRoute exact path="/signup" component={Signup} />
        <AuthLayoutRoute path="/" component={Login} />

      </Switch>
    </Suspense>
  </Router>
);

export default App;
