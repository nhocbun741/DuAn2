import React, { Component } from 'react';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Collapse, Fade, Row } from 'reactstrap';


class Tables extends Component {
 
  constructor(props) {
    super(props);
    this.onEntering = this.onEntering.bind(this);
    this.onEntered = this.onEntered.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.toggleCustom = this.toggleCustom.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
	  items: [],
	  item2:[],
      isLoaded: false,
      collapse: false,
      accordion: [true, false, false],
      custom: [true, false],
      status: 'Closed',
      fadeIn: true,
      timeout: 300,
    };
  }
  
  
	componentDidMount() {
        fetch('/api/giangvien')
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
    }

  onEntering() {
    this.setState({ status: 'Opening...' });
  }

  onEntered() {
    this.setState({ status: 'Opened' });
  }

  onExiting() {
    this.setState({ status: 'Closing...' });
  }

  onExited() {
    this.setState({ status: 'Closed' });
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleAccordion(tab) {

    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => tab === index ? !x : false);

    this.setState({
      accordion: state,
    });
  }

  toggleCustom(tab) {

    const prevState = this.state.custom;
    const state = prevState.map((x, index) => tab === index ? !x : false);

    this.setState({
      custom: state,
    });
  }

  toggleFade() {
    this.setState({ fadeIn: !this.state.fadeIn });
  }
  
  
  render() {
	var {isLoaded, items, item2} = this.state;
	
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl="12">
           
              <CardHeader>
                <i className="fa fa-align-justify"></i>Thông tin giảng viên
              </CardHeader>
              <CardBody>
                <div id="accordion">
				{items.map(item => (    
					 <div>{item2.a === item.ma_gv ? <p>Mã giảng viên : {item.ma_gv}</p> : ''}</div>
					 
					 ))}
				 {items.map(item => (    
					
					 <div>{item2.a === item.ma_gv ? <p> Họ và tên giảng viên : {item.ho_ten} </p> : ''}</div>
					
					 ))}
					 
				{items.map(item => (    
					
					 <div>{item2.a === item.ma_gv ? <p> Email giảng viên : {item.email_gv} </p> : ''}</div>
					 ))}
				 
				  
                </div>
              </CardBody>
           
          </Col>
        </Row>
      </div>
    );
  }
}

export default Tables;
