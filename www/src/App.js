import React, { useState, useEffect } from 'react';
import { Container, Jumbotron, Row, Col, Button } from 'reactstrap';
import axios from 'axios';
import ExternalAttack from './ExternalAttack';
import InternalAttack from './InternalAttack';
import './App.css';
import logo from './aws.png';
import config from './config';

function App() {

  export const [idToken, setIdToken] = useState('');
  export const [role, setRole] = useState('');
  export const [extID,setExtID] = useState('');
  export const [successful,setSuccess] = useState(false);
  export const [isInternal,setInternal] = useState(true);

  useEffect(() => {
    getIdToken();

  }, [idToken]);



  const clearCredentials = () => {
    window.location.href = config.redirect_url;
  }

  const getIdToken = () => {
    const hash = window.location.hash.substr(1);
    const objects = hash.split("&");
    objects.forEach(object => {
      const keyVal = object.split("=");
      if (keyVal[0] === "id_token") {
        setIdToken(keyVal[1]);
      }
    });
  };



  
  



  return (
    <div className="App">
      <Container>
        <Jumbotron>
          <Row>
            <Col md="6" className="logo">
              <h1>Super Secure Clouds We Make</h1>
              <p>Internal and External demo attacks</p>
              <p>Try and hack it!</p>

              <img src={logo} alt="Logo" />
            </Col>
            <Col md="6">
              {idToken.length > 0 ?
                (
                <Row>
                  {isInternal ? (<InternalAttack/>): (<ExternalAttack externalAttack={externalAttack}/>)
}
                  </Row>
                ) : (
                  <Row><Button
                    href={`https://${config.cognito_hosted_domain}/login?response_type=token&client_id=${config.aws_user_pools_web_client_id}&redirect_uri=${config.redirect_url}`}
                    color="primary"
                    className="mt-5 float-center"
                  >
                    Log In
                  </Button></Row>
                )
              }
            </Col>
          </Row>
        </Jumbotron>
        <Jumbotron id="hidden_jumbotron" hidden>
          <Jumbotron className="jumbotron_modified">
              <p className="jumbotron_text">Executing command...</p><p className="jumbotron_text">aws sts assume-role --role-arn arn:aws:iam::111111111111:role/{role} --external-id {extID} --role-session-name hacking</p>
              {successful ? (<h2 className="jumbotron_text_success">CONNECTION SUCCESSFUL</h2>) : (<h2 className="jumbotron_text_fail">CONNECTION FAILED</h2>)}
          </Jumbotron>
        </Jumbotron>
      </Container>
    </div>
  );
}

export default App;
