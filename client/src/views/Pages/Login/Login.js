import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Redirect, Route, Switch } from 'react-router-dom';

class Login extends Component {
	constructor(props) {
      super(props);
      this.signIn = this.signIn.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.state = {
		items: [],
        isLoaded: false,
        email:'',
        password:''
      };
    }
	
	
    handleEmailChange(e){
      this.setState({email:e.target.value})
    }
    handlePasswordChange(e){
      this.setState({password:e.target.value})
    }
    signIn(){
        alert('Email address is ' + this.state.email + ' Password is ' + this.state.password);            
    }


  render() {
	  return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form action="/auth" method="POST">
                      <h1>Đăng nhập</h1>
                      <p className="text-muted">Đăng nhập tài khoản của bạn</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input name="username" onChange={this.handleEmailChange} type="number" placeholder="Nhập mã giảng viên" autoComplete="username" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input name="password" onChange={this.handlePasswordChange} type="password" placeholder="Nhập mật khẩu" autoComplete="current-password" />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4">Đăng nhập </Button>
                        </Col>
                        <Col xs="6" className="text-right">
                         
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  
}
}

export default Login;
