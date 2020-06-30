import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import routes from '../../routes';
//import axios from 'axios';//To use http requests
import 'bootstrap/dist/css/bootstrap.css';
import '../../sass/main.scss';

//const DefaultAside = React.lazy(() => import('./DefaultAside'));

class DefaultLayout extends Component {

  loading = () => <div className="text-center"></div>

  render() {
    return (
      <div className="d-flex" id="wrapper">       
        <div id="page-content-wrapper">
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
          <button onClick={() => {window.location = '/'}} className="btn" id="menu-toggle"><b>Integradora 2</b></button>        
        </nav>

        <div className="container-fluid mb-4">
          <Suspense fallback={this.loading()}>                  
            <Switch>
              {routes.map((route, idx) => {
                return route.component ? (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={props => (
                      <route.component {...props} />
                    )} />
                ) : (null);
              })}
              <Redirect from="/" to="/" />
            </Switch>
          </Suspense>
        </div>
      </div>
    </div>
    );
  }
}

export default DefaultLayout;
