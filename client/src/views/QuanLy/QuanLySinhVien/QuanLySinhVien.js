import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink,Label, Row, Table,Button,Modal, ModalHeader, ModalBody, ModalFooter,Form, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

class Tables extends Component {
	constructor(props) {
        super(props);
        this.state = {
			modal1: false,
			modal2: false,
			modal3: false,
            items: [],
            isLoaded: false,
			currentPage: 1,
			todosPerPage: 30
        };
		this.handleClick = this.handleClick.bind(this);
		this.toggle1 = this.toggle1.bind(this);
		this.toggle2 = this.toggle2.bind(this);
		this.toggle3 = this.toggle3.bind(this);
    }
	componentDidMount() {
        fetch('/api/sinhvien')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    items: json
                })
            });
    }
	
	handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }
	 toggle1() {
    this.setState({
      modal1: !this.state.modal1
    });
  }
  
	toggle2() {
    this.setState({
      modal2: !this.state.modal2
    });
	
	}
	
	toggle3() {
    this.setState({
      modal3: !this.state.modal3
    });
	
	}
	
  render() {
   var {isLoaded, items, currentPage, todosPerPage} = this.state;
   const indexOfLastTodo = currentPage * todosPerPage;
   const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
   const currentTodos = items.slice(indexOfFirstTodo, indexOfLastTodo);
   
   
   const renderTodos = currentTodos.map((todo, index) => {
      return  <tbody>
	  
                        <tr key={index}>
							<td>{todo.ma_lop}</td>
							<td>{todo.ma_sv}</td>
							<td>{todo.holot_sv}</td>
							<td>{todo.ten_sv}</td>
							<td>{todo.email_sv}</td>
                        </tr>
					</tbody>
    })
	
	const pageNumbers = [];
	
	for (let i = 1; i <= Math.ceil(items.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }
	
	
	const renderPageNumbers = pageNumbers.map(number => {
      return (
          <PaginationItem active><PaginationLink
		  tag="button"
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </PaginationLink></PaginationItem>
		
		
      );
    });
	
   if(!isLoaded){
	   return <div> Loading ... </div>
   }
   else{
	   return (
	   <div className="animated fadeIn">
	   <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Quản lý sinh viên
              </CardHeader>
              <CardBody>
                <Row style={{marginLeft:"140px",marginBottom:"18px"}}>
			  <Col xs="4">
                <div>
        <Button color="primary" onClick={this.toggle1}>Thêm sinh viên</Button>
        <Modal isOpen={this.state.modal1} toggle={this.toggle1} className={this.props.className}>
        <ModalHeader toggle={this.toggle1}>Thêm sinh viên</ModalHeader>
		<Form enctype="multipart/form-data" action="/themsinhvien" method="POST">
                      <Label for="themsv">Tập tin sinh viên</Label>
					  <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          </InputGroupText>
                        </InputGroupAddon>
						<input type="file" name="themsv" />
                      </InputGroup>
                      <p>Lưu ý: Tập tin dưới dạng Excel, gồm có những cột: Lop,Mssv,HoLot,Ten,Email</p>
					   <ModalFooter>
                          <Button color="primary" className="px-4">Thêm sinh viên</Button>
					  </ModalFooter>
        </Form>
        </Modal>
        </div>
		
		</Col>
		<Col xs="4">
		 <div>
        <Button color="primary" onClick={this.toggle2}>Sửa sinh viên</Button>
        <Modal isOpen={this.state.modal2} toggle={this.toggle2} className={this.props.className}>
        <ModalHeader toggle={this.toggle2}>Sửa sinh viên</ModalHeader>
		<Form action="/suasinhvien" method="POST">
		<Label for="masv2">Mã số sinh viên</Label>
                      <InputGroup className="mb-3">
					  
                        <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
						 
                        <Input type="number" placeholder="Chọn mã số sinh viên cần chỉnh sửa" name="masv2" id="masv2">
                      </Input>
                      </InputGroup>
					  <Label for="lopsv2" >Mã lớp</Label>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input name="lopsv2" id="lopsv2"type="text" placeholder="Điền vào mã lớp cần chỉnh sửa" autoComplete="lopsv2" />
                      </InputGroup>
					  <Label for="holotsv2" >Họ lót sinh viên</Label>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input name="holotsv2" id="holotsv2"type="text" placeholder="Điền vào họ lót sinh viên" autoComplete="holotsv2" />
                      </InputGroup>
					  <Label for="tensv2" >Tên sinh viên</Label>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input name="tensv2" id="tensv2"type="text" placeholder="Điền vào tên sinh viên" autoComplete="tensv2" />
                      </InputGroup>
					  <Label for="emailsv2" >Email sinh viên</Label>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input name="emailsv2" id="emailsv2"type="text" placeholder="Điền vào email sinh viên mới" autoComplete="emailsv2" />
                      </InputGroup>
					   <ModalFooter>
                          <Button color="primary" className="px-4">Sửa sinh viên</Button>
					  </ModalFooter>
        </Form>
        </Modal>
        </div>
		</Col>
		
		
		<Col xs="4">
		 <div>
        <Button color="primary" onClick={this.toggle3}>Xoá sinh viên</Button>
        <Modal isOpen={this.state.modal3} toggle={this.toggle3} className={this.props.className}>
        <ModalHeader toggle={this.toggle3}>Xoá sinh viên</ModalHeader>
		<Form action="/xoasinhvien" method="POST">
		 <Label for="masv3" >Mã số sinh viên</Label>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="number" placeholder="Chọn mã số sinh viên cần xoá" name="masv3" id="masv3">
                      </Input>
                      </InputGroup>
					   <ModalFooter>
                          <Button color="primary" className="px-4">Xoá sinh viên</Button>
					  </ModalFooter>
        </Form>
        </Modal>
        </div>
		</Col>
		</Row>
				<Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>Lớp</th>
                    <th>MSSV</th>
					<th>Họ Lót</th>
					<th>Têm</th>
					<th>Email</th>
                  </tr>
                  </thead>
                 
                  {renderTodos}
                  
                </Table>
				
                <nav>
                  <Pagination>
                   
                    {renderPageNumbers}
                    
                  </Pagination>
                </nav>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
	   );
   }   
}
}

export default Tables;
