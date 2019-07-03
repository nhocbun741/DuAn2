import React, { Component } from 'react';
import { Button,Modal, ModalHeader, ModalBody, ModalFooter,Badge, Card, CardBody, CardHeader,FormGroup, Label, Col, Pagination, PaginationItem, PaginationLink, Row, Table,Form, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

class Tables extends Component {
  constructor(props) {
        super(props);
        this.state = {
            items: [],
			items2:[],
			items5:[],
            isLoaded: false,
			currentPage: 1,
			todosPerPage: 10,
			currentPage2: 1,
			todosPerPage2: 10,
			modal1: false,
			modal2: false,
			modal3: false,
			modal4: false,
			modal5: false,
			modal6: false,
			ma_mon_hoc: '',
			ma_nhom:'',
			ma_to:''
        };
		this.handleClick = this.handleClick.bind(this);
		this.handleClick2 = this.handleClick2.bind(this);
		this.toggle1 = this.toggle1.bind(this);
		this.toggle2 = this.toggle2.bind(this);
		this.toggle3 = this.toggle3.bind(this);
		this.toggle4 = this.toggle4.bind(this);
		this.toggle5 = this.toggle5.bind(this);
		this.toggle6 = this.toggle6.bind(this);
    }
	componentDidMount() {
        fetch('/api/monhoc')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    items: json
                })
            });
			
		fetch('/api/sinhvien_monhoc')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    items2: json
                })
            });
		 fetch('/getInfo')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    items5: json
                })
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
	
	toggle4() {
    this.setState({
      modal4: !this.state.modal4
    });
	
	}
	
	toggle5() {
    this.setState({
      modal5: !this.state.modal5
    });
	
	}
	
	toggle6() {
    this.setState({
      modal6: !this.state.modal6
    });
	
	}
	
	handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }
  
  handleClick2(event) {
    this.setState({
      currentPage2: Number(event.target.id)
    });
  }
  
  handleChange1(event) {
    var value = event.target.value;
 
    this.setState({
      ma_mon_hoc: value
    });
  }
  
  handleChange2(event) {
    var value = event.target.value;
 
    this.setState({
      ma_nhom: value
    });
  }
  
  handleChange3(event) {
    var value = event.target.value;
 
    this.setState({
      ma_to: value
    });
  }
	
	
  render() {
   var {isLoaded, items, currentPage, todosPerPage,currentPage2, todosPerPage2, items2,items5} = this.state;
   const indexOfLastTodo = currentPage * todosPerPage;
   const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
   const currentTodos = items.slice(indexOfFirstTodo, indexOfLastTodo);
   var monhoc = [...new Set(items.map(item => item.ma_mh))];
   var nhomhoc = [...new Set(items2.map(item => item.nhom_hoc))];
   var tohoc = [...new Set(items2.map(item => item.to_hoc))];
   const monhoc1 = monhoc.map((number) =>
	  <option>{number}</option>
	);
	
	const nhomhoc1 = nhomhoc.map((number) =>
	  <option>{number}</option>
	);
	
	const tohoc1 = tohoc.map((number) =>
	  <option>{number}</option>
	);
	
   const renderTodos = currentTodos.map((todo, index) => {
      return  <tbody>
                        <tr onClick={this.toggle4} key={index}>
							<td>{todo.ma_mh}</td>
							<td>{todo.ten_mh}</td>
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
	
	
   const indexOfLastTodo2 = currentPage2 * todosPerPage2;
   const indexOfFirstTodo2 = indexOfLastTodo2 - todosPerPage2;
   const currentTodos2 = items2.slice(indexOfFirstTodo2, indexOfLastTodo2);
	
   const pageNumbers2 = [];
	
	for (let i = 1; i <= Math.ceil(items2.length / todosPerPage2); i++) {
      pageNumbers2.push(i);
    }
	
	const renderPageNumbers2 = pageNumbers2.map(number => {
      return (
          <PaginationItem active><PaginationLink
		  tag="button"
          id={number}
          onClick={this.handleClick2}
        >
          {number}
        </PaginationLink></PaginationItem>
		
		
      );
    });
	
	const renderTodos2 = currentTodos2.map((todo, index) => {
      return  
			  
		
    })
	
	
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
                <i className="fa fa-align-justify"></i> Quản lý môn học
              </CardHeader>
              <CardBody>
			  <div>
		<Modal isOpen={this.state.modal4} toggle={this.toggle4} className={this.props.className}>
        <ModalHeader toggle={this.toggle4}>Thêm sinh viên vào môn học</ModalHeader>
		<Form action="/themsinhvienvaomonhoc" method="POST">
		<Label for="mamh4" >Mã môn học</Label>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="select" name="mamh4" id="mamh4">
						  <option>Chọn mã môn học cần thêm sinh viên vào</option>
						  {monhoc1}
                      </Input>
                      </InputGroup>
					  <Label for="manhom4" >Mã nhóm học</Label>
					  <Label style = {{paddingLeft:"140px"}} for="mato4" >Mã tổ học (0: Lý thuyết, 1 2: Thực hành)</Label>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input name="manhom4" id="manhom4" type="number" placeholder="Điền vào mã nhóm" autoComplete="manhom4" />
						
						<InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input name="mato4" id="mato4" type="select" placeholder="Điền vào mã tổ" autoComplete="mato4" >
						 <option>Chọn tổ môn học</option>
						<option>0</option>
						<option>1</option>
						<option>2</option>
						</Input>
                      </InputGroup>
					  <Label for="masinhvien4" >Mã số sinh viên (Lưu ý: 1 mã số là 1 hàng)</Label>
					  <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input name="masinhvien4" id="masinhvien4" type="textarea" placeholder="Điền vào mã số sinh viên" autoComplete="masinhvien4" />
                      </InputGroup>
					   <ModalFooter>
                          <Button color="primary" className="px-4">Thêm sinh viên</Button>
					  </ModalFooter>
        </Form>
        </Modal>
		</div>
				<Row style={{marginLeft:"140px",marginBottom:"18px"}}>
			  <Col xs="4">
                <div>
        <Button color="primary" onClick={this.toggle1}>Thêm môn học</Button>
        <Modal isOpen={this.state.modal1} toggle={this.toggle1} className={this.props.className}>
        <ModalHeader toggle={this.toggle1}>Thêm môn học</ModalHeader>
		<Form action="/themmonhoc" method="POST">
		<Label for="mamh" >Mã môn học</Label>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input name="mamh"type="number" id="mamh" placeholder="Điền vào mã môn học" autoComplete="mamh" />
                      </InputGroup>
					  <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          
                        </InputGroupAddon>
                        <Input name="magv" type="hidden" id="mamh" value={items5.a} autoComplete="magv" />
                      </InputGroup>
					  <Label for="tenmh" >Tên môn học</Label>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input name="tenmh" type="text" id="tenmh" placeholder="Điền vào tên môn học" autoComplete="tenmh" />
                      </InputGroup>
					   <ModalFooter>
                          <Button color="primary" className="px-4">Thêm môn học</Button>
					  </ModalFooter>
        </Form>
        </Modal>
        </div>
		
		</Col>
		<Col xs="4">
		 <div>
        <Button color="primary" onClick={this.toggle2}>Sửa môn học</Button>
        <Modal isOpen={this.state.modal2} toggle={this.toggle2} className={this.props.className}>
        <ModalHeader toggle={this.toggle2}>Sửa môn học</ModalHeader>
		<Form action="/suamonhoc" method="POST">
		<Label for="mamh2" >Mã môn học</Label>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="select" name="mamh2" id="mamh2">
						  <option>Chọn mã môn học cần chỉnh sửa</option>
						  {monhoc1}
                      </Input>
                      </InputGroup>
					  <Label for="tenmh2" >Tên môn học</Label>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input name="tenmh2" type="text" id="tenmh2" placeholder="Điền vào tên môn học mới" autoComplete="tenmh2" />
                      </InputGroup>
					   <ModalFooter>
                          <Button color="primary" className="px-4">Sửa môn học</Button>
					  </ModalFooter>
        </Form>
        </Modal>
        </div>
		</Col>
		
		
		<Col xs="4">
		 <div>
        <Button color="primary" onClick={this.toggle3}>Xoá môn học</Button>
        <Modal isOpen={this.state.modal3} toggle={this.toggle3} className={this.props.className}>
        <ModalHeader toggle={this.toggle3}>Xoá môn học</ModalHeader>
		<Form action="/xoamonhoc" method="POST">
		<Label for="mamh3" >Mã môn học</Label>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="select" name="mamh3" id="mamh3">
						  <option>Chọn mã môn học cần xoá</option>
						  {monhoc1}
                      </Input>
                      </InputGroup>
					  <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          
                        </InputGroupAddon>
                        <Input name="magv5" type="hidden" id="mamh" value={items5.a} autoComplete="magv5" />
                      </InputGroup>
					  
					   <ModalFooter>
                          <Button color="primary" className="px-4">Xoá môn học</Button>
					  </ModalFooter>
        </Form>
        </Modal>
        </div>
		</Col>
		</Row>
				<Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>Mã môn học</th>
                    <th>Tên môn học</th>
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
		
		
		
		
		<Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Quản lý sinh viên - môn học
              </CardHeader>
              <CardBody>
			 
				<Row style={{marginLeft:"210px",marginBottom:"18px"}}>
			 
		<Col xs="6">
		 <div>
        <Button color="primary" onClick={this.toggle5}>Sửa sinh viên - môn học</Button>
        <Modal isOpen={this.state.modal5} toggle={this.toggle5} className={this.props.className}>
        <ModalHeader toggle={this.toggle5}>Sửa sinh viên - môn học</ModalHeader>
		<Form action="/suasinhvienmonhoc" method="POST">
		<Label for="mamh5" >Mã môn học</Label>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="select" name="mamh5" id="mamh5">
						  <option>Chọn mã môn học cần chỉnh sửa</option>
						  {monhoc1}
                      </Input>
                      </InputGroup>
					  <Label for="masv5" >Mã số sinh viên</Label>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input name="masv5" id="masv5" type="number" placeholder="Chọn mã số sinh viên cần chỉnh sửa" autoComplete="masv5" />
                      </InputGroup>
					  <Label for="manhom5" >Mã nhóm học</Label>
					  <Label style = {{paddingLeft:"140px"}}for="mato5" >Mã tổ học (0: lý thuyết, 1 2: thực hành)</Label>
					  <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input name="manhom5" id="manhom5" type="number" placeholder="Điền vào nhóm môn học mới" autoComplete="manhom5" />
                      
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input name="mato5" id="mato5" type="select" autoComplete="mato5">
						<option>Chọn tổ môn học mới</option>
						<option>0</option>
						<option>1</option>
						<option>2</option>
						</Input>
                      </InputGroup>
					   <ModalFooter>
                          <Button color="primary" className="px-4">Sửa</Button>
					  </ModalFooter>
        </Form>
        </Modal>
        </div>
		</Col>
		
		
		<Col xs="6">
		 <div>
        <Button color="primary" onClick={this.toggle6}>Xoá sinh viên - môn học</Button>
        <Modal isOpen={this.state.modal6} toggle={this.toggle6} className={this.props.className}>
        <ModalHeader toggle={this.toggle6}>Xoá sinh viên - môn học</ModalHeader>
		<Form action="/xoasinhvienmonhoc" method="POST">
		<Label for="mamh6" >Mã môn học</Label>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="select" name="mamh6" id="mamh6">
						  <option>Chọn mã môn học cần xoá</option>
						  {monhoc1}
                      </Input>
                      </InputGroup>
					  <Label for="masv6" >Mã số sinh viên</Label>
					  <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input name="masv6" id="masv6" type="number" placeholder="Điền vào mã số sinh viên" autoComplete="masv6" />
                      </InputGroup>
					  <Label for="manhom6" >Mã nhóm học</Label>
					  <Label style = {{paddingLeft:"140px"}} for="mato6" >Mã tổ học (0: Lý thuyết, 1 2: Thực hành)</Label>
					  <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input name="manhom6" id="manhom6" type="number" placeholder="Điền vào nhóm môn" autoComplete="manhom6" />
                      
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input name="mato6" id="mato6" type="select" autoComplete="mato6" >
						 <option>Chọn tổ môn học</option>
						<option>0</option>
						<option>1</option>
						<option>2</option>
						</Input>
                      </InputGroup>
					   <ModalFooter>
                          <Button color="primary" className="px-4">Xoá</Button>
					  </ModalFooter>
        </Form>
        </Modal>
        </div>
		</Col>
		</Row>
		
		
		
		<Form className="form-horizontal" onSubmit={event => this.handleSubmitForm(event)}>
				<Row>
				<Col xs="4">
                    <FormGroup>
                      <Label htmlFor="mamonhoc">Mã môn học</Label>
                      <Input onChange={event => this.handleChange1(event)} type="select" name="mamonhoc" id="mamonhoc">
						  <option>Chọn Mã môn học </option>
						  {monhoc1}
                      </Input>
                    </FormGroup>
                  </Col>
				  
				  
				  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="nhom">Nhóm</Label>
                      <Input onChange={event => this.handleChange2(event)} type="select" name="nhom" id="nhom">
						  <option>Chọn nhóm học </option>
						  {nhomhoc1}
                      </Input>
                    </FormGroup>
                  </Col>
				  
				  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="to">Tổ</Label>
                      <Input onChange={event => this.handleChange3(event)} type="select" name="to" id="to">
						  <option>Chọn tổ học </option>
						  {tohoc1}
                      </Input>
                    </FormGroup>
                  </Col>
				  </Row>
      </Form>
		
		
		
				<Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>MSSV</th>
                    <th>Mã môn học</th>
					<th>Nhóm học</th>
					<th>Tổ học</th>
                  </tr>
                  </thead>
                 {items2.map(todo => (
                  <tbody>
				  
                        {todo.ma_mh == this.state.ma_mon_hoc && todo.nhom_hoc == this.state.ma_nhom && todo.to_hoc == this.state.ma_to ? <tr>
							<td>{todo.ma_sv}</td>
							<td>{todo.ma_mh}</td>
							<td>{todo.nhom_hoc}</td>
							<td>{todo.to_hoc}</td>
                        </tr> : ''}
						
					</tbody>
                  ))}
				  
                </Table>
				
               
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
