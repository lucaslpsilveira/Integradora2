import React, { Component } from 'react';
import { Row, Col, Card, CardBody, CardHeader } from 'reactstrap';
import api from '../../services/api';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formType: '',
      info: [],
      loading: true
    }
  }

  async getResults(){      
      api.get('/city/distribuidoras/population/count/')
      .then(async res => {
        console.log('processing',res.data);        
        let info = res.data;
        await this.setState({info});
        let cards = await info.map((line, i) => {
          return <Col md='4' className='mt-2 mb-2' key={i}>
          <Card>
            <CardHeader><b>{line.distribuidora}</b></CardHeader>
            <CardBody>
              <p><b>População estimada:</b> { line.populacaoEstimada}</p>
            </CardBody>
          </Card>
        </Col>});
        await this.setState({cards});        
        await this.setState({loading:false});        
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
              {this.state.cards ? this.state.cards : <Col className='text-center mt-4'><h4>Nothing to show!</h4></Col>}              
            </Row>            
          </>
        }
      </>
    );
  }
}

export default Home;
