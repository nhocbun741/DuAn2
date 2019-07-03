import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, FormGroup, Label, Input, Form, CardFooter, Button} from 'reactstrap';

class Tables extends Component {
	
	constructor(props) {
        super(props);
		
        this.state = {
            items: [],
			item2:[],
			item3:[],
			item4:[],
            isLoaded: false,
			currentPage: 1,
			todosPerPage: 10,
			ma_mon_hoc: '',
			ma_nhom:'',
			ma_to:''
			
        };
		this.handleClick = this.handleClick.bind(this);
    }
	componentDidMount() {
        fetch('/api/sinhvien_monhoc_thongke')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    items: json
                })
            });
			
		fetch('/getInfo')
		.then(res => res.json())
		.then(json => {
			this.setState({
				item2: json
			})
		});
		
		 fetch('/api/giangvien')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    item3: json
                })
            });
		fetch('/api/sinhvien_monhoc')
		.then(res => res.json())
		.then(json => {
			this.setState({
				item4: json
			})
		});
    }
	
	handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
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
	  
   var {isLoaded, items , item2,item3,item4, currentPage, todosPerPage, email} = this.state;
   
   const indexOfLastTodo = currentPage * todosPerPage;
   const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
   const currentTodos = items.slice(indexOfFirstTodo, indexOfLastTodo);
   
   var ngayhoc = [...new Set(items.map(item => item.ma_mh == this.state.ma_mon_hoc && item.nhom_hoc == this.state.ma_nhom && item.to_hoc == this.state.ma_to ? item.ngay_hoc : ''))];
   
   var diemdanh = [...new Set(items.map(item => item.ngay_hoc))];
   
   var monhoc = [...new Set(items.map(item => item.ma_mh))];
   
   var nhomhoc = [...new Set(items.map(item => item.nhom_hoc))];
   
   var tohoc = [...new Set(items.map(item => item.to_hoc))];
   
   var user = [...new Set(item3.map(item => item.ten_dn == item2.a ? item2.a : ''))];
   
   const renderUser = user.map((number) =>
	  <option>{number}</option>
	);
	
   const renderTodos = items.map((todo, index) => {
	   
	  
	   
      return  <tbody>
						{todo.ma_mh == this.state.ma_mon_hoc && todo.nhom_hoc == this.state.ma_nhom && todo.to_hoc == this.state.ma_to ?  <tr><td>{todo.ma_sv}</td>
							{ngayhoc.map(number => (<td style={{display: number==='' ? 'none' : ''}}>{todo.tinh_trang === 1 && number === todo.ngay_hoc && todo.ma_mh == this.state.ma_mon_hoc && todo.nhom_hoc == this.state.ma_nhom && todo.to_hoc == this.state.ma_to ? 'x' : ''}</td>))}	
                        </tr> : '' }
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
   
   const ngayhoc1 = ngayhoc.map((todo, index) => {
      return  <tr>
						{todo === 0 ? '' : <th>todo</th>}
						
              </tr>
    })
   
    
	const monhoc1 = monhoc.map((number) =>
	  <option>{number}</option>
	);
	
	const nhomhoc1 = nhomhoc.map((number) =>
	  <option>{number}</option>
	);
	
	const tohoc1 = tohoc.map((number) =>
	  <option>{number}</option>
	);
	
	
    const diemdanh = items.map( item => (
		<tr> 
			<td>{item.ma_sv}</td>
				{ngayhoc.map(number => (<td></td>))}
		</tr>
	)				
	);
	
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
                <i className="fa fa-align-justify"></i>Quản lý điểm danh
              </CardHeader>
              <CardBody>
			  
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
					
					{ngayhoc.map(number => ( <th style={{display: number==='' ? 'none' : ''}}>{number}</th>))}
                   </tr>
                  </thead>
				  {renderTodos}
                </Table>
                <nav>
                  <Pagination>
				 
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
