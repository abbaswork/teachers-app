import React from "react";
import axios from 'axios';

/* Component Imports */
import Section from './section';
import auth from './../../auth/auth';

/* Ui imports */
import {
  Container, Row, Col,
} from 'reactstrap';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      id: this.props.location.pathname.slice(6, this.props.location.pathname.length)
    }
  }


  /* Retrieve Classes from Server API */
  async componentDidMount() {

    if (this.state.id) {

      try {

        const resp = await axios.get(process.env.REACT_APP_SERVER_URL + '/section/' + this.state.id, {
          auth: {
            username: auth.email,
            password: auth.password
          }
        });

        this.setState({ data: resp.data });

      } catch (e) {
        console.log(e);
      }

    }
  }

  /* Handler for deleting sections, perhaps part of an api class :o  */
  handleDeleteSection = async (id) => {

    try { /* Send request to update section and re mount component*/
      await axios.delete(process.env.REACT_APP_SERVER_URL + '/section/' + id,
        { auth: { username: auth.email, password: auth.password } });

      this.componentDidMount();

    } catch (e) {
      console.log(e);
    }

  }

  /* Handler for updating sections name and color */
  handleUpdateSection = async (id, field, value) => {

    try { /* Send request to update section and re mount component*/
      await axios.put(process.env.REACT_APP_SERVER_URL + '/section/' + id,
        { field: field, value: value },
        { auth: { username: auth.email, password: auth.password } });

      this.componentDidMount();

    } catch (e) {
      console.log(e);
    }

  }

  handleCreateSection = async (value) => {

    try { /* Logic: Send request to server to add section and remount component */
      await axios.post(process.env.REACT_APP_SERVER_URL + '/section/' + this.state.id,
        { name: value, color: 'orange' },
        { auth: { username: auth.email, password: auth.password } });

      this.componentDidMount();

    } catch (e) {
      console.log(e);
    }

  }

  render() {

    return (
      <>
        {  /* Render container if class is selected */
          this.props.location.pathname !== '/home' &&

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
        }

        {  /* Render fallback if no class is selected */
          this.props.location.pathname === '/home' &&
          <Container fluid>
            <h4 className="text-muted"> Please select or create a new class to get started!</h4>
          </Container>
        }
      </>
    );
  }
}
