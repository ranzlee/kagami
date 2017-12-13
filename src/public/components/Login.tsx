import * as React from "react";
import { Grid, Row, Col, Button, Glyphicon } from "react-bootstrap";

export default class Login extends React.Component {
  render() {
    return (
      <Grid fluid={false}>
        <Row>
          <Col lg={4} />
          <Col lg={4}>
            <a className="btn btn-block btn-social btn-facebook">
              <i className="fa fa-facebook" />
              | Sign in with Facebook
            </a>
          </Col>
        </Row>
      </Grid>
    );
  }
}
