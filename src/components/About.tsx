import * as React from "react";
import { Grid, Row, Col } from "react-bootstrap";

export default class About extends React.Component {
  render() {
    return (
      <Grid fluid={true}>
        <Row>
          <Col sm={12}>About!</Col>
        </Row>
      </Grid>
    );
  }
}
