/* import ui components */
import { Row, Col, Container } from "reactstrap";

/* import page components */
import GradeTable from "./table";
import GradeChart from "./graph";

export default function Gradebook() {

  return (
    <Container fluid>
      <Row>
        <GradeChart />
      </Row>
      <Row>
        <GradeTable />
      </Row>
    </Container>
  )

}