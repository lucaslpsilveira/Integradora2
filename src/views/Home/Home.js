import React, { Component } from 'react';
import { Row, Col, Card, CardBody, CardHeader, Input } from 'reactstrap';
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
      console.log(process.env.REACT_APP_API_URL);
      console.log(api);

      api.get('/region/names')
      .then(async res => {
        console.log('processing',res);        
        let info = res.data;
        await this.setState({info});        
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
            <Row className='mt-2 mb-2'>
              <Col md='4'>
                <label>CNPJ:</label>
                <Input/>
              </Col>
              <Col md='4'>
                <label>Distribuidora:</label>
                <Input/>
              </Col>
              <Col md='4'>
                <label>Vigencia:</label>
                <Input/>
              </Col>
            </Row>
            <hr/>
            <Row>
              {Array.isArray(this.state.info)
                ? <>{this.state.info.map((line, i) => {
                  return <Col md='4' className='mt-2 mb-2' key={i}>
                    <Card>
                      <CardHeader><b>{line}</b></CardHeader>            
                    </Card>
                  </Col>})}</> 
                : <Col className='text-center mt-4'><h4>Nothing to show!</h4></Col>}              
            </Row>            
          </>
        }
      </>
    );
  }
}

export default Home;
