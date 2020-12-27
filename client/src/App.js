/* import React with code splitting + client side router */
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from './auth/protectedRoute';

/*render dynamic imports as regular components to enable code splitting (only loading what's needed) */
const Home = lazy(() => import('./pages/home'));
const Login = lazy(() => import('./pages/login'));

const App = () => (

  /* using browser router api */
  <Router>

    {/* Setup fallback when waiting for components to load */}
    <Suspense fallback={<div>Loading...</div>}>

      {/* Switch searches through route children to find one to match with current url */}
      <Switch>
        
        {/* Using defined protectRoute component and login as default */}
        <ProtectedRoute exact path="/home" component={Home} />
        <Route path="/" component={Login}/>
      </Switch>
    </Suspense>
  </Router>
);

export default App;
