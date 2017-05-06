import React from 'react';
import {Grid, Row, Jumbotron, Col, Button} from 'react-bootstrap/lib';

const FooterHeader = {
  fontFamily: 'Open Sans',
  fontSize: '20px',
  color: '#646464',
  fontWeight: '800',
  margin: 0,
  padding: 0
}

const FooterContainer = {
  textAlign: 'left',
  padding: '25px 40px'
}

const FooterContent = {
  backgroundColor: '#EEEEEE'
}

const FooterText = {
  color: '#646464',
  fontSize: '16px',
  margin: 0
}

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <Row style={FooterContent}>
          <Col md={6} style={FooterContainer}>
            <h2 style={FooterHeader}>HERMIONE</h2>
            <p style={FooterText}> Hermione is developed by ASUC OCTO. Founded 2016. </p>
          </Col>
          <Col md={6} style={FooterContainer}>
            <h2 style={FooterHeader}>CONTACT</h2>
            <p style={FooterText}><a href="mailto:hello@hermione.io">hello@hermione.io</a></p>
          </Col>
        </Row>
      </footer>
    );
  }
}

export default Footer;
