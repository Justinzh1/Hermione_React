import React from 'react';
import { connect } from 'react-redux'
import Messages from './Messages';
import {Grid, Row, Jumbotron, Col, Button} from 'react-bootstrap/lib';

const CoverCaption = {
  fontSize: "90px",
  color: "white",
  fontFamily: "Open Sans",
  fontWeight: 700,
  float: 'left',
  width: '100%',
  lineHeight: '1em',
}

const InfoContainer = {
  padding: '100px 0',
  paddingBottom: '50px',
  boxShadow: 'box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px'
}

const CoverSubCaption = {
  fontSize: "18px",
  color: "white",
  margin: 0,
  padding: 0,
  lineHeight: '1.5em'
}

const SubContainer = {
  marginTop: '260px'
}

const HeaderContainer = {
  marginTop: '20px'
}

const InfoHeader = {
  textTransform: 'uppercase',
  fontSize: '32px',
  fontWeight: 500
}

const InfoItem = {
  textAlign: 'center !important',
  marginBottom: '100px'
}

const InfoText = {
  lineHeight: '1.25em',
  margin: 0
}

const ImageStyle = {
  height: '80px',
  width: 'auto'
}

const RowContainer = {

}

const SponsorsHeader = {
  fontSize: '60px',
  color: 'white',
  fontWeight: '700',
  margin: '0 auto',
}

const SponsorsCaption = {
  fontSize: "18px",
  color: "white",
  lineHeight: '1.5em'
}

const SponsorStyle = {
  height: '90px',
  width: 'auto'
}

const SponsorItem = {
  textAlign: 'center',
  marginBottom: '100px'
}

const ASUCItem = {
  height: '130px',
  width: 'auto',
  position: 'relative',
  top: '-20px'
}

const SubGraphic = {
  bottom: '100px',
  width: '400px',
  flexDirection: 'row',
  justifyContent: 'space-between',
  display: 'flex',
  textAlign: 'center',
  position: 'absolute',
  bottom: '60px',
  transform: 'translateX(-50%)',
  left: '50%',
}

const Circle = {
  width: '80px',
  height: '80px',
  borderRadius: '100%',
  border: '2px solid white',
  display: 'inline-block'
}

const GraphicText = {
  textTransform: 'uppercase',
  fontSize: '16px',
  fontWeight: '800',
  color: 'white',
  position: 'relative',
  top: '20px'
}

const IconItem = {
  marginTop: '12.5px',
  width: '50px',
  height: 'auto'
}

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="background-tint cover">
          <div style={HeaderContainer}>
            <h1 style={CoverCaption}>Redefining</h1>
            <h1 style={CoverCaption}>Webcasting</h1>
          </div>
          <div style={SubContainer}>
            <p style={CoverSubCaption}> A computer vision project developed </p>
            <p style={CoverSubCaption}> by the Office of the CTO </p>
          </div>
          <div style={SubGraphic}>
            <div style={Circle}>
              <img src="/images/record.png" style={IconItem}/>
              <p style={GraphicText}> capture </p>
            </div>
            <div style={Circle}>
              <img src="/images/setting.png" style={IconItem}/>
              <p style={GraphicText}> process </p>
            </div>
            <div style={Circle}>
              <img src="/images/upload.png" style={IconItem}/>
              <p style={GraphicText}> post </p>
            </div>
          </div>
        </div>

        <div style={InfoContainer}>
          <Grid>
            <Row style={RowContainer}>
              <Col xs={12} md={4} style={InfoItem}>
                <img src="/images/info.png" style={ImageStyle}/>
                <h2 style={InfoHeader}> About </h2>
                <p style={InfoText}>We streamline the lecture capturing process using
  computer vision and natural language processing.</p>
              </Col>
              <Col xs={12} md={4} style={InfoItem}>
                <img src="/images/mission.png" style={ImageStyle}/>
                <h2 style={InfoHeader}> Mission </h2>
                <p style={InfoText}>Our goal is to provide cheap, efficient ways to record lectures to
  accomodate growing demands for classes.</p>
              </Col>
              <Col xs={12} md={4} style={InfoItem}>
                <img src="/images/contact.png" style={ImageStyle}/>
                <h2 style={InfoHeader}> Contact </h2>
                <p style={InfoText}>If you are interested in learning more about Hermione
   free to contact us at <a href="mailto:hello@hermione.io">hello@hermione.io</a></p>
              </Col>
            </Row>
          </Grid>
        </div>

        <div className="background-tint-more sponsorsheader">
          <h1 style={SponsorsHeader}>In Collaboration With</h1>
          <p style={SponsorsCaption}>UC Berkeley, ASUC, Office of the Chief Technology Office</p>
        </div>

        <div style={InfoContainer}>
          <Grid>
            <Row style={RowContainer}>
              <Col xs={12} md={4} style={SponsorItem}>
                <img src="/images/cal.jpg" style={SponsorStyle}/>
              </Col>
              <Col xs={12} md={4} style={SponsorItem}>
                <img src="/images/asuc.png" style={ASUCItem}/>
              </Col>
              <Col xs={12} md={4} style={SponsorItem}>
                <img src="/images/octo.png" style={SponsorStyle}/>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Main);
