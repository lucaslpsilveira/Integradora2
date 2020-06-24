import React, { Component } from 'react';

class DefaultAside extends Component {
  render() {
    return (
      <>
       <div className="bg-light border-right" id="sidebar-wrapper">
          <div className="sidebar-heading">Integradora 2</div>
          <div className="list-group list-group-flush">
            <a href="/" className="list-group-item list-group-item-action bg-light">Home</a>            
          </div>
        </div>
      </>
    );
  }
}
export default DefaultAside;
