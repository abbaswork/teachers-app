import React from "react";
import { Card, Col, Row } from "reactstrap";

/* Chart library with temp sample data */
import { Line } from 'react-chartjs-2';
const data = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};



export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {



    return (
      <div className="gradebook">
        {/* render programmable graph */}
        <Card>

          {/* Top row with expand button */}
          <Row>
            <Col xs="10">

            </Col>
            <Col xs="2">
              expand
            </Col>
          </Row>

          <Line data={data} options={options} />
        </Card>
      </div>
    );
  }
}


