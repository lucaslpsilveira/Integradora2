import React, { Component } from 'react';
import { Row, Col, Card, CardBody, CardHeader, Input } from 'reactstrap';
import api from '../../services/api';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';

class DistInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formType: '',
      info: [],
      toSearch: [],
      start_date: null,
      end_date: null,
      loading: true
    }
  }

  async onChangeDate(name, date) {    
    if (date[0] && date[1]) {            
      let start_date = date[0]._d.toISOString().slice(0,10);
      let end_date = date[1]._d.toISOString().slice(0,10);
      await this.setState({ start_date });
      await this.setState({ end_date });
      this.getResults('&vigencia='+start_date+'/'+end_date);
    } else {
      await this.setState({ start_date: null });
      await this.setState({ end_date: null });
      this.getResults();
    }
  }

  async getResults(search = ''){         
      let state = this.props.match.params.id;
      api.get('/city/distribuidoras/?distribuidora='+state+search)
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
    const { RangePicker } = DatePicker;
    const dateFormat = 'YYYY-MM-DD';

    return (
      <>
        { this.state.loading ? this.loading() :
          <>                        
              {Array.isArray(this.state.info)
                ? <>{this.state.info.map((line, i) => {
                  return <Row key={i}><Col md='2' className='mt-2 mb-2'>
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
                      <CardHeader>
                        <Row>
                          <Col sm='12' md='8'><b>Cidades Atendidas</b></Col>                          
                          <Col sm='12' md='4'>
                            <RangePicker 
                              format={dateFormat}
                              defaultValue={[this.state.start_date, this.state.end_date]}
                              placeholder={['Vigencia inicial', 'Vigencia final']}
                              onChange={(e) => this.onChangeDate('date', e)} />
                          </Col>
                        </Row>
                      </CardHeader>            
                      <CardBody>
                        <Row>
                        {line.cityInfo.length > 0 ? line.cityInfo.map((city,j) =>{
                          return <Col key={j} md='4' className='mb-2'>
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
                        }): <h4>Nenhuma cidade com vigencia para o range selecionado!</h4>}
                        </Row>
                      </CardBody>
                    </Card>
                  </Col> </Row> 
                })}</> 
                : <Row><Col className='text-center mt-4'><h4>Nothing to show!</h4></Col></Row>}                          
          </>
        }
      </>
    );
  }
}

export default DistInfo;
