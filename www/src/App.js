import React, { useState, useEffect } from 'react';
import { Container, Jumbotron, Row, Col, Button } from 'reactstrap';
import axios from 'axios';
import ToDo from './ToDo'

import './App.css';
import logo from './aws.png';

import config from './config';

function App() {

  const [idToken, setIdToken] = useState('');
  const [role, setRole] = useState('');
  const [extID,setExtID] = useState('');
  const [successful,setSuccess] = useState(false);

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



  const addAWSAccount = async (event) => {

    const newRoleInput = document.getElementById("newRole");
    const newExternalID = document.getElementById("externalID");
    const role = newRoleInput.value;
    const extID = newExternalID.value;
    setRole(newRoleInput.value);
    setExtID(newExternalID.value);

    if ((!role || role === '') || (!extID || extID === '')){
      document.getElementById("hidden_jumbotron").setAttribute("hidden","true");
      return;
    }

    
    const newAccount = {
      "roleARN": role,
      "external-id": extID
    };

    axios.defaults.headers.post['Authorization'] = idToken
 
    const result = await axios({
      method: 'POST',
      url: `${config.api_base_url}`,
      data: newAccount
    });


    if (result && result.status === 401) {
      clearCredentials();
    } else if (result && result.status === 200) {
      newRoleInput.value = '';
      newExternalID.value = '';
      if (result.data.message === 'Connection Successful') {setSuccess(true);} else {setSuccess(false)}
      document.getElementById("hidden_jumbotron").removeAttribute("hidden");
    }
  }



  return (
    <div className="App">
      <Container>
        <Jumbotron>
          <Row>
            <Col md="6" className="logo">
              <h1>Serverless Test</h1>
              <p>This is a demo that showcases AWS serverless.</p>
              <p>Try and hack it!</p>

              <img src={logo} alt="Logo" />
            </Col>
            <Col md="6">
              {idToken.length > 0 ?
                (
                  <ToDo addAWSAccount={addAWSAccount} />
                ) : (
                  <Button
                    href={`https://${config.cognito_hosted_domain}/login?response_type=token&client_id=${config.aws_user_pools_web_client_id}&redirect_uri=${config.redirect_url}`}
                    color="primary"
                    className="mt-5 float-center"
                  >
                    Log In
                  </Button>
                )
              }
            </Col>
          </Row>
        </Jumbotron>
        <Jumbotron id="hidden_jumbotron" hidden>
          <Jumbotron className="jumbotron_modified">
              <p className="jumbotron_text">Executing command...</p><p className="jumbotron_text">aws sts assume-role --role-arn {role} --external-id {extID} --role-session-name hacking</p>
              {successful ? (<p className="jumbotron_text_success">CONNECTION SUCCESSFUL</p>) : (<p className="jumbotron_text_fail">CONNECTION FAILED</p>)}
          </Jumbotron>
        </Jumbotron>
      </Container>
    </div>
  );
}

export default App;
