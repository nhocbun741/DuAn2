import React, { Component } from 'react';
import { Button, Card, CardBody, Modal, ModalHeader, ModalBody, ModalFooter,CardGroup,DropdownMenu,DropdownItem, Col,DropdownToggle, Container,ButtonDropdown, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';


class Tables extends Component {
 constructor(props) {
      super(props);
      this.signIn = this.signIn.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.state = {
		items: [],
        isLoaded: false,
        email:'',
		  modal: false,
		show: false,
		visible: false,
		dropdownOpen: new Array(19).fill(false),
        password:''
      };
	  
	   this.toggle = this.toggle.bind(this);
	   this.toggleMenu = this.toggleMenu.bind(this);
    }
	showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };
	toggleMenu() {
        this.setState({visible: !this.state.visible})
    }

	 toggle() {
    this.setState({
      modal: !this.state.modal
    });
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
		
		<div>
        <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form action="/submit" method="POST">
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input name="mamh" onChange={this.handleEmailChange} type="number" placeholder="Username" autoComplete="username" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input name="tenmh" onChange={this.handlePasswordChange} type="text" placeholder="Password" autoComplete="current-password" />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                         
                        </Col>
                      </Row>
                    </Form>
				
                  </CardBody>
                </Card>
				<form action="/profile" method="post" enctype="multipart/form-data">
					  <input type="file" name="avatar" />
					  <input type="submit" />
					</form>
              </CardGroup>
            </Col>
          </Row>
        </Container>
		
      </div>
    );
  
}
}

export default Tables;
