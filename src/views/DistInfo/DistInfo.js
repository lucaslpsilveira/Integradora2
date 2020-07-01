import React, { Component } from 'react';
import { Row, Col, Card, CardBody, CardHeader, Input } from 'reactstrap';
import api from '../../services/api';

class Cidades extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formType: '',
      info: [],
      loading: true
    }
  }

  async getResults(){         
      let state = this.props.match.params.id;
      api.get('/city/distribuidoras/?distribuidora='+state)
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
                  return <><Col md='2' className='mt-2 mb-2' key={i}>
                    <Card>
                      <CardHeader><b>{line.distribuidora}</b></CardHeader>            
                      <CardBody>
                        <p><b>CNPJ: </b>{line.cnpj}</p>
                        <p><b>População Atendida estimada: </b>{line.populacaoEstimada}</p>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md='10' className='mt-2 mb-2' key={i}>
                    <Card>
                      <CardHeader><b>Cidades Atendidas</b></CardHeader>            
                      <CardBody>
                        <Row>
                        {line.cityInfo.map(city =>{
                          return <Col md='4' className='mb-2'>
                            <Card>
                              <CardHeader>
                                <h4>{city.nome}</h4>
                              </CardHeader>
                              <CardBody>
                                <p><b>Vigencia: </b>{city.vigencia}</p>
                                <hr/>
                                <p><b>População Atendida Estimada: </b>{city.populacaoEstimada}</p>
                              </CardBody>
                            </Card>                                                                                    
                          </Col>
                        })}
                        </Row>
                      </CardBody>
                    </Card>
                  </Col> </> 
                })}</> 
                : <Col className='text-center mt-4'><h4>Nothing to show!</h4></Col>}              
            </Row>            
          </>
        }
      </>
    );
  }
}

export default Cidades;
