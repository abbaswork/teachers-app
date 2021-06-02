import React from "react";
import axios from 'axios';

/* Component Imports */
import Section from './section';
import auth from './../../auth/auth';
import SideForum from './sideForum';

/* Ui imports */
import {
  Container, Row, Col,
} from 'reactstrap';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      id: this.props.location.pathname.slice(6, this.props.location.pathname.length),
      sidebar: "0vw",

      /* keep track of active task at home level */
      activeTask: {
        type: null,
        points: null,
        weight: null,
        notes: null
      }
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

  /* Side menu controller to be passed to section task */
  handleSideMenuOpen = async (open) => {
    this.setState({
      width: !open ? '0px' : '25vw',
      padding: !open ? '0px' : '2rem'
    });
  }

  /* Function passed down to several components to track active task */
  handleActiveTask = async (task) => {
    this.setState({ activeTask: task });
  }


  render() {

    return (
      <>
        {/* render fixed sidebar for task menu options */}
        <SideForum width={this.state.width} padding={this.state.padding} handleSideMenuOpen={this.handleSideMenuOpen}
          activeTask={this.state.activeTask}
        />

        {  /* Render container if class is selected */
          this.props.location.pathname !== '/home' &&

          <Container fluid>

            {/* Disable wrap feature of rows and create horizontal scroll */}
            <Row className="flex-row flex-nowrap">
              {this.state.data.map((section) =>
                <Col xs="12" md="3" key={section.id}>
                  <Section section={section} handleDeleteSection={this.handleDeleteSection} handleUpdateSection={this.handleUpdateSection}
                    handleCreateSection={this.handleCreateSection} handleSideMenuOpen={this.handleSideMenuOpen}
                    handleActiveTask={this.handleActiveTask}
                  />
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

