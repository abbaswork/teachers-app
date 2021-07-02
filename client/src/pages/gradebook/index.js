/* import ui components */
import { Row, Col, Container } from "reactstrap";

/* import page components */
import GradeTable from "./table";
import GradeChart from "./graph";

export default function Gradebook(props) {
  const classId = props.location.pathname.split('/gradebook/')[1];
  return (
    <Container fluid>
      <Row>
       {/* <GradeChart /> */}
      </Row>
      <Row className="mt-5">
        <GradeTable classId={classId} />
      </Row>
    </Container>
  )

}