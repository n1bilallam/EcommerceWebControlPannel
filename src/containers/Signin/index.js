import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { login } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

/**
 * @author
 * @function Signin
 **/

const Signin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const userLogin = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };

    dispatch(login(user));
  };

  if (auth.authanticate) {
    return <Redirect to={"/"} />;
  }
  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: "50px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userLogin}>
              <Input
                type="email"
                label="Email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                type="password"
                label="Password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Signin;
