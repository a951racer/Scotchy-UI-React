import React, { Component } from 'react'
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import  { Button } from 'primereact/button';

class Login extends Component {

  constructor() {
    super()
    this.state = {
      username: '',
      password: ''
    }
    //this.usernameRef = React.createRef()
  }

  componentDidMount() {
    //this.usernameRef.current.focus();
  }

  render() {
    const footer = <span style={{textAlign: 'center'}}><h4><i>Angus McScotchy III</i></h4></span>
    return (
      <>
        <Card>
          <Container>
            <Row>
              <Col>
                <Card footer={footer}>
                  <img src="logo.png" alt="Angus McScotchy III"/>
                </Card>
              </Col>
              <Col style={{marginTop: '10em'}}>
                <div style={{fontSize: '1.5em'}}>Username:</div>
                <div>
                  <InputText
                    id="username"
                    value={this.state.username}
                    onChange={(e) => this.setState({username: e.target.value})}
                    //ref={this.usernameRef}  
                  />
                </div>
                <div style={{marginBottom: '1em'}}>
                <div style={{fontSize: '1.5em'}}>Password:</div>
                  <Password value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} />
                </div>
                <div>
                  <Button label="Login" icon="pi pi-check" iconPos="right" onClick={this.props.onSubmit}/>
                </div>
              </Col>
            </Row>
          </Container>
        </Card>
      </>
    )
  }
}

export default Login