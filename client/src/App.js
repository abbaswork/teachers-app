/* import React with code splitting + client side router */
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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
        <Route exact path="/" component={Home}/>
        <Route path="/login" component={Login}/>
      </Switch>
    </Suspense>
  </Router>
);

export default App;
