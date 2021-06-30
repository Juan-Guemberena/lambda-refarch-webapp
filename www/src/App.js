import React, { useState, useEffect } from 'react';
import { Container, Jumbotron, Row, Col, Button } from 'reactstrap';
import axios from 'axios';
import ExternalAttack from './ExternalAttack';
import InternalAttack from './InternalAttack';
import './App.css';
import logo from './aws.png';
import config from './config';


const clearCredentials = () => {
  window.location.href = config.redirect_url;
}



const internalAttack = async (event) => {
  const [successful,setSuccess] = useState(false);
  console.log(event)
  const newRoleInput = document.getElementById("newRole");
  const role = newRoleInput.value;

  if (!role || role === ''){
    document.getElementById("hidden_jumbotron").setAttribute("hidden","true");
    return;
  }


  const newAccount = {
    "roleARN": role,
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
    if (result.data.message === 'Connection Successful') {setSuccess(true);} else {setSuccess(false)}
    document.getElementById("hidden_jumbotron").removeAttribute("hidden");
  }
}




function App() {
  const [idToken, setIdToken] = useState('');
  const [extID, setExtID] = useState('');




  useEffect(() => {
    getIdToken();

  }, [idToken]);





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



  const externalAttack = async (event) => {

    const newRoleInput = document.getElementById("newRole");
    const newExternalID = document.getElementById("externalID");
    const role = newRoleInput.value;
    const extID = newExternalID.value;
    setExtID(newExternalID.value);

    if ((!role || role === '') || (!extID || extID === '')) {
      document.getElementById("hidden_jumbotron").setAttribute("hidden", "true");
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
      if (result.data.message === 'Connection Successful') { setSuccess(true); } else { setSuccess(false) }
      document.getElementById("hidden_jumbotron").removeAttribute("hidden");
    }
  }


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
              {idToken.length > 0 ? (<InternalAttack internalAttack={internalAttack}/>) : (
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
            <p className="jumbotron_text">Executing command...</p><p className="jumbotron_text">aws sts assume-role --role-arn arn:aws:iam::111111111111:role/{role} --external-id {extID} --role-session-name hacking</p>
            {successful ? (<h2 className="jumbotron_text_success">CONNECTION SUCCESSFUL</h2>) : (<h2 className="jumbotron_text_fail">CONNECTION FAILED</h2>)}
          </Jumbotron>
        </Jumbotron>
      </Container>
    </div>
  );
}

export default App;
