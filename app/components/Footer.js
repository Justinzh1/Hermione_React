import React from 'react';
import {Grid, Row, Jumbotron, Col, Button} from 'react-bootstrap/lib';

const styles = {
  top: {
    backgroundColor: '#EEEEEE',
    minHeight: '150px'
  },
  col: {
    width: '25vw',
    minWidth: '250px',
    minHeight: '200px',
    display:'inline-block',
    verticalAlign: 'top',
    textAlign: 'left'
  },
  icon: {
    width: '40px',
    height: '40px'
  },
  buttons: {
    position: 'relative',
    top: '50%',
    transform: 'translateY(190%)',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%'
  },
  subheader: {
    fontFamily: 'open sans',
    fontWeight: '800',
    color: '#003262',
    fontSize: '18px',
    textTransform: 'uppercase',
    marginTop: '55px'
  },
  text: {
    fontFamily: 'open sans',
    fontWeight: '400',
    color: '#5F5F5F',
    fontSize: '12px',
    margin: 0,
    lineHeight: '1.5em'
  },
  bot: {
    padding: '20px',
    backgroundColor: '#003262',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  Copyright: {
    fontSize: '18px',
    color: 'white',
    fontWeight: '800',
    fontFamily: 'open sans',
    display: 'inline-block',
    verticalAlign: 'top',
    margin: 0
  },
  Policy: {
    fontSize: '14px',
    color: 'white',
    fontWeight: '500',
    marginRight: '12px',
    display: 'inline-block'
  },
  botright: {
    width: '200px',
    verticalAlign: 'top'
  }
}

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div style={styles.top}>
          <div style={styles.col}>
            <div style={styles.buttons}>
                <img style={styles.icon} src='/images/fb.png'></img>
                <img style={styles.icon} src='/images/twitter.png'></img>
                <img style={styles.icon} src='/images/instagram.png'></img>
            </div>
          </div>
          <div style={styles.col}>
              <h2 style={styles.subheader}> Sponsors </h2>
              <p style={styles.text}> ASUC </p>
              <p style={styles.text}> UC Berkeley </p>
              <p style={styles.text}> Office of the CTO </p>
          </div>
          <div style={styles.col}>
              <h2 style={styles.subheader}> Tools </h2>
              <p style={styles.text}> OpenCV </p>
              <p style={styles.text}> NodeJS </p>
              <p style={styles.text}> ReactJS</p>
          </div>
          <div style={styles.col}>
              <h2 style={styles.subheader}> Contact </h2>
              <p style={styles.text}> hello@hermione.io </p>
          </div>
        </div>
        <div style={styles.bot}>
          <h1 style={styles.Copyright}>© HERMIONE INC</h1>
          <div style={styles.botright}>
            <p style={styles.Policy}> Privacy Policy </p>
            <p style={styles.Policy}> Terms of Use </p>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
