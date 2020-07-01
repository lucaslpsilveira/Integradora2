import React, { Component } from 'react';
import { Row, Col, Card, CardHeader, Input } from 'reactstrap';
import api from '../../services/api';
import CardBody from 'reactstrap/lib/CardBody';

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
            {/*<Row className='mt-2 mb-2'>
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
            </Row>*/}
            <hr/>
            <Row>
              {Array.isArray(this.state.info)
                ? <>{this.state.info.map((line, i) => {
                  return <Col md='4' className='mt-2 mb-2' key={i}>
                    <Card onClick={() => {window.location = '/estados/'+line}}>
                      <CardHeader><b>{line}</b></CardHeader> 
                      <CardBody className='regiaoCard'><img className='regioes' src={'/regioes/'+line+'.png'}/></CardBody>           
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
