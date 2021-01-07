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
  }
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

  render() {

    return (
      <>
        <Container fluid>
          {/* Disable wrap feature of rows and create horizontal scroll */}
          <Row className="flex-row flex-nowrap">
            {this.state.data.map((section) =>
              <Col xs="12" md="3" key={section.id}>
                <Section section={section} />
              </Col>
            )}
          </Row>
        </Container >
      </>
    );
  }
}
