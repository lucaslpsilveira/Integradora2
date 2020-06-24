import React, { Component } from 'react';
import { Row, Col, Button, Input, Label,
Card, CardBody, CardHeader, Form, FormGroup, FormFeedback, CardFooter } from 'reactstrap';
import api from '../../services/api';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formType: '',
      info: null,
      loading: true
    }
  }

  getResults(){      
      api.get('/city/distribuidoras/population/count')
      .then(res => {
        console.log('processing',res.data);
        let info = res.data;
        this.setState({info,loading:false});
      })
      .catch(async error => {
        console.log(error.response);        
      })
  }

  componentDidMount(){
      this.getResults();
  }

  loading = () => <Row>
    <Col md='12'>
      Loading...
    </Col>
  </Row>;

  render() {
    return (
      <>
        { this.state.loading ? this.loading() :
          <>
            <Row>
              {this.state.info.map(line => {
                return <Col md='4' className='mt-2 mb-2'>
                  <Card>
                    <CardHeader><b>{line.distribuidora}</b></CardHeader>
                    <CardBody>
                      <p><b>População estimada:</b> { line.populacaoEstimada}</p>
                    </CardBody>
                  </Card>
                </Col>
              })}              
            </Row>            
          </>
        }
      </>
    );
  }
}

export default Home;
