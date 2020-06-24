import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Loadable from 'react-loadable';

const loading = () => <div className="animated fadeIn pt-3 text-center"></div>;

// Containers
const Index = Loadable({
  loader: () => import('./containers/DefaultLayout'),
  loading
});

class App extends Component {  
  render() {
    return (
      <BrowserRouter>
        <Switch>          
          <Route path="/" name="Home" component={Index} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
