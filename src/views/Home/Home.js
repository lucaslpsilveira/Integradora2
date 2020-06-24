import React, { Component } from 'react';
import { Row, Col, Button, Input, Label,
Card, CardBody, CardHeader, Form, FormGroup, FormFeedback, CardFooter } from 'reactstrap';
import api from '../../services/api';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formType: ''
    }
  }

  getResults(){      
      api.get('/city/distribuidoras/population/count')
      .then(res => {
        console.log('processing',res.data);        
      })
      .catch(async error => {
        console.log(error.response);        
      })
  }

  componentDidMount(){
      this.getResults();
  }

  loading = () => <Row className='shell-loader-monitor'>
    <Col md='12'>
      Loading...
    </Col>
  </Row>;

  render() {
    return (
      <>
      conteudo
      </>
    );
  }
}

export default Home;
