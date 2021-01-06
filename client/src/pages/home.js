import React from "react";
import { NavLink } from 'react-router-dom';


/* Ui imports */
import {
  Container, Row, Col,
  Card, CardTitle, CardText,
  ListGroup, ListGroupItem, Button
} from 'reactstrap';
import { BsFillClockFill, BsCardChecklist, BsFillTrashFill, BsPencil, BsFillPlusSquareFill, } from "react-icons/bs";

/* For testing purposes only */
import Sidebar from './../layouts/dashboard/sidebar';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'name',
      isOpen2: false,
    }
  }


  render() {

    return (
      <>
        <Container fluid>
          {/* Disable wrap feature of rows and create horizontal scroll */}
          <Row className="flex-row flex-nowrap">
            <Col md="3" style={{ height: '80vh' }}>
              <Container className="border p-4 shadow" style={{ overflow: 'scroll' }} fluid>
                <h2><span className="badge bg-orange text-white rounded-0">Lessons</span></h2>
                <Card className="shadow" body>
                  <CardTitle tag="h5">Bear Hunt</CardTitle>

                  <ListGroup flush>
                    <ListGroupItem tag="button" className="pl-0" style={{ outline: 'none' }} action><Row><Col sm="1">  <BsFillClockFill className="text-orange" /></Col><Col className="" sm="10"> <CardText className="">Mon April 1st</CardText></Col> </Row></ListGroupItem>
                    <ListGroupItem tag="button" className="pl-0 border-bottom-0" onClick={() => { this.setState({ isOpen2: !this.state.isOpen2 }) }} action><Row><Col sm="1">  <BsCardChecklist className="text-orange" /></Col><Col sm="10"> <CardText className="">Sub Tasks</CardText></Col> </Row>
                    </ListGroupItem>
                    <div className="content" style={{ maxHeight: (this.state.isOpen2 ? '100vh' : '0px') }}>
                      <Row>
                        <Col sm="1">
                          <label className="container">
                            <input className="custom-checkbox" type="checkbox" />
                            <span className="checkmark" />
                          </label>
                        </Col>
                        <Col sm="8">
                          <CardText className="" style={{textOverflow: 'ellipsis'}}>Print Worksheets</CardText>
                        </Col>
                        <Col className="p-0 text-orange text-right" sm="2">
                          <BsFillTrashFill style={{ cursor: 'pointer' }} onClick={() => alert('You clicked?')} />
                          <BsPencil className="ml-3" style={{ cursor: 'pointer' }} onClick={() => alert('You clicked?')} />
                        </Col>
                      </Row>
                      <Row>
                        <Col sm="2">
                          <BsFillPlusSquareFill className="text-orange" />
                        </Col>
                      </Row>
                    </div>
                  </ListGroup>
                </Card>

                <Card className="shadow mt-5" body>
                  <CardTitle tag="h5">Bear Hunt</CardTitle>

                  <ListGroup flush>
                    <ListGroupItem tag="button" className="pl-0" style={{ outline: 'none' }} action><Row><Col sm="1">  <BsFillClockFill className="text-orange" /></Col><Col className="" sm="10"> <CardText className="">Mon April 1st</CardText></Col> </Row></ListGroupItem>
                    <ListGroupItem tag="button" className="pl-0 border-bottom-0" onClick={() => { this.setState({ isOpen2: !this.state.isOpen2 }) }} action><Row><Col sm="1">  <BsCardChecklist className="text-orange" /></Col><Col sm="10"> <CardText className="">Sub Tasks</CardText></Col> </Row>
                    </ListGroupItem>
                    <div className="content" style={{ maxHeight: (this.state.isOpen2 ? '100vh' : '0px') }}>
                      <Row>
                        <Col sm="1">
                          <label className="container">
                            <input className="custom-checkbox" type="checkbox" />
                            <span className="checkmark" />
                          </label>
                        </Col>
                        <Col sm="8">
                          <CardText className="">Print Worksheets</CardText>
                        </Col>
                        <Col className="p-0 text-orange text-right" sm="2">
                          <BsFillTrashFill style={{ cursor: 'pointer' }} onClick={() => alert('You clicked?')} />
                          <BsPencil className="ml-3" style={{ cursor: 'pointer' }} onClick={() => alert('You clicked?')} />
                        </Col>
                      </Row>
                      <Row>
                        <Col sm="2">
                          <BsFillPlusSquareFill className="text-orange" />
                        </Col>
                      </Row>
                    </div>
                  </ListGroup>
                </Card>

                <Card className="shadow mt-5" body>
                  <CardTitle tag="h5">Bear Hunt</CardTitle>

                  <ListGroup flush>
                    <ListGroupItem tag="button" className="pl-0" style={{ outline: 'none' }} action><Row><Col sm="1">  <BsFillClockFill className="text-orange" /></Col><Col className="" sm="10"> <CardText className="">Mon April 1st</CardText></Col> </Row></ListGroupItem>
                    <ListGroupItem tag="button" className="pl-0 border-bottom-0" onClick={() => { this.setState({ isOpen2: !this.state.isOpen2 }) }} action><Row><Col sm="1">  <BsCardChecklist className="text-orange" /></Col><Col sm="10"> <CardText className="">Sub Tasks</CardText></Col> </Row>
                    </ListGroupItem>
                    <div className="content" style={{ maxHeight: (this.state.isOpen2 ? '100vh' : '0px') }}>
                      <Row>
                        <Col sm="1">
                          <label className="container">
                            <input className="custom-checkbox" type="checkbox" />
                            <span className="checkmark" />
                          </label>
                        </Col>
                        <Col sm="8">
                          <CardText className="">Print Worksheets</CardText>
                        </Col>
                        <Col className="p-0 text-orange text-right" sm="2">
                          <BsFillTrashFill style={{ cursor: 'pointer' }} onClick={() => alert('You clicked?')} />
                          <BsPencil className="ml-3" style={{ cursor: 'pointer' }} onClick={() => alert('You clicked?')} />
                        </Col>
                      </Row>
                      <Row>
                        <Col sm="2">
                          <BsFillPlusSquareFill className="text-orange" />
                        </Col>
                      </Row>
                    </div>
                  </ListGroup>
                </Card>

                <Card className="shadow mt-5" body>
                  <CardTitle tag="h5">Bear Hunt</CardTitle>

                  <ListGroup flush>
                    <ListGroupItem tag="button" className="pl-0" style={{ outline: 'none' }} action><Row><Col sm="1">  <BsFillClockFill className="text-orange" /></Col><Col className="" sm="10"> <CardText className="">Mon April 1st</CardText></Col> </Row></ListGroupItem>
                    <ListGroupItem tag="button" className="pl-0 border-bottom-0" onClick={() => { this.setState({ isOpen2: !this.state.isOpen2 }) }} action><Row><Col sm="1">  <BsCardChecklist className="text-orange" /></Col><Col sm="10"> <CardText className="">Sub Tasks</CardText></Col> </Row>
                    </ListGroupItem>
                    <div className="content" style={{ maxHeight: (this.state.isOpen2 ? '100vh' : '0px') }}>
                      <Row>
                        <Col sm="1">
                          <label className="container">
                            <input className="custom-checkbox" type="checkbox" />
                            <span className="checkmark" />
                          </label>
                        </Col>
                        <Col sm="8">
                          <CardText className="">Print Worksheets</CardText>
                        </Col>
                        <Col className="p-0 text-orange text-right" sm="2">
                          <BsFillTrashFill style={{ cursor: 'pointer' }} onClick={() => alert('You clicked?')} />
                          <BsPencil className="ml-3" style={{ cursor: 'pointer' }} onClick={() => alert('You clicked?')} />
                        </Col>
                      </Row>
                      <Row>
                        <Col sm="2">
                          <BsFillPlusSquareFill className="text-orange" />
                        </Col>
                      </Row>
                    </div>
                  </ListGroup>
                </Card>

                <Card className="shadow mt-5" body>
                  <CardTitle tag="h5">Bear Hunt</CardTitle>

                  <ListGroup flush>
                    <ListGroupItem tag="button" className="pl-0" style={{ outline: 'none' }} action><Row><Col sm="1">  <BsFillClockFill className="text-orange" /></Col><Col className="" sm="10"> <CardText className="">Mon April 1st</CardText></Col> </Row></ListGroupItem>
                    <ListGroupItem tag="button" className="pl-0 border-bottom-0" onClick={() => { this.setState({ isOpen2: !this.state.isOpen2 }) }} action><Row><Col sm="1">  <BsCardChecklist className="text-orange" /></Col><Col sm="10"> <CardText className="">Sub Tasks</CardText></Col> </Row>
                    </ListGroupItem>
                    <div className="content" style={{ maxHeight: (this.state.isOpen2 ? '100vh' : '0px') }}>
                      <Row>
                        <Col sm="1">
                          <label className="container">
                            <input className="custom-checkbox" type="checkbox" />
                            <span className="checkmark" />
                          </label>
                        </Col>
                        <Col sm="8">
                          <CardText className="">Print Worksheets</CardText>
                        </Col>
                        <Col className="p-0 text-orange text-right" sm="2">
                          <BsFillTrashFill style={{ cursor: 'pointer' }} onClick={() => alert('You clicked?')} />
                          <BsPencil className="ml-3" style={{ cursor: 'pointer' }} onClick={() => alert('You clicked?')} />
                        </Col>
                      </Row>
                      <Row>
                        <Col sm="2">
                          <BsFillPlusSquareFill className="text-orange" />
                        </Col>
                      </Row>
                    </div>
                  </ListGroup>
                </Card>
              </Container>
            </Col>
            <Col md="2">Field</Col>
            <Col md="2">Field</Col>
            <Col md="2">Field</Col>
            <Col md="2">Field</Col>
            <Col md="2">Field</Col>
            <Col md="2">Field</Col>
            <Col md="2">Field</Col>
          </Row>
        </Container >
      </>
    );
  }
}
