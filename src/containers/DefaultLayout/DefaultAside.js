import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import { Button } from 'reactstrap';

class DefaultAside extends Component {

  constructor(props){
    super(props);  
  }

  render() {
    return (
      <>
       <div class="bg-light border-right" id="sidebar-wrapper">
          <div class="sidebar-heading">Integradora 2</div>
          <div class="list-group list-group-flush">
            <a href="#" class="list-group-item list-group-item-action bg-light">Home</a>            
          </div>
        </div>
      </>
    );
  }
}
export default DefaultAside;
