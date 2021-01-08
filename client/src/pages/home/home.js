import React from "react";

/* Component Imports */
import Section from './section';

/* Ui imports */
import {
  Container, Row, Col,
} from 'reactstrap';

/* Example Data, that would be retrieved from server API */
const db = [
  {
    id: '123',
    name: 'Lessons',
    color: 'blue'
  },
  {
    id: '1234',
    name: 'Assesments',
    color: 'orange'
  },
  {
    id: '12345',
    name: 'Activities',
    color: 'green'
  },
];

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  }

  /* Retrieve Classes from Server API */
  componentDidMount() {
    this.setState({ data: db });
  }

  /* Handler for deleting sections, perhaps part of an api class :o  */
  handleDeleteSection = (id) => {

    /* filter array based on id and set as new sections */
    var rmSection = this.state.data.filter(section => section.id !== id);
    this.setState({ data: rmSection });
  }

  /* Handler for updating sections name and color */
  handleUpdateSection = (id, field, value) => {

    console.log('update value: ', id, field, value);

    /* find index to update, and update state with updated copy */
    var sections = this.state.data;
    var idIndex = sections.findIndex((section => section.id === id));
    sections[idIndex][field] = value;
    this.setState({ data: sections });

  }

  handleCreateSection = (value) => {
    this.setState({ data: [...this.state.data, { id: '45', name: value, color: 'orange' }] })
  }

  render() {

    return (
      <>
        <Container fluid>

          {/* Disable wrap feature of rows and create horizontal scroll */}
          <Row className="flex-row flex-nowrap">
            {this.state.data.map((section) =>
              <Col xs="12" md="3" key={section.id}>
                <Section section={section} handleDeleteSection={this.handleDeleteSection} handleUpdateSection={this.handleUpdateSection} handleCreateSection={this.handleCreateSection} />
              </Col>
            )}

            {/* render psuedo section to create new section */}
            <Col xs="12" md="3">
              <Section section={null} handleDeleteSection={this.handleDeleteSection} handleUpdateSection={this.handleUpdateSection} handleCreateSection={this.handleCreateSection} />
            </Col>
          </Row>
        </Container >
      </>
    );
  }
}
