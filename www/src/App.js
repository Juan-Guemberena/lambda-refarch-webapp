import React, { useState, useEffect } from 'react';
import { Container, Jumbotron, Row, Col, Button } from 'reactstrap';
import './App.css';
import logo from './aws.png';
import config from './config';

function App() {
  const [idToken, setIdToken] = useState('');
  const [role, setRole] = useState('');
  const [extID,setExtID] = useState('');
  const [successful,setSuccess] = useState(false);
  const [isInternal,setInternal] = useState(true);

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
                  {isInternal ? (<InternalAttack/>): (<ExternalAttack/>)
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


function InternalAttack() {

  const [showHover,setHover] = useState(false);

  
  
  return (
    <div className="InternalAttack" >
      <Row>
        <Col xs="12" className="mt-1 mb-1">
            <h3>Internal demo attack</h3>
            <p>This attack can happen when a user inside an AWS account has insecure credentials, and they get stolen by a malicious 3rd party.
               Inside the SaaS vendor's cloud, you'll find that sometimes there are "sts:assumeRole":"*" type of permissions, only limited by the external-id inside the clients cloud.
               The thing is, you don't need the external-id if you want to attack yourself and the cloud isn't well configured, so the only thing you need to find is a high privilege role to assume.
            </p>
          <Form>
            <FormGroup>
              <Label for="newRole" hidden>Role</Label>
              <Input type="text" name="role" id="newRole" placeholder="role-name"/>
            </FormGroup>
            <Button onClick={internalAttack} color="primary" className="ml-1">Connect</Button>
            <Button id="brute_force_button" onClick={() => {brute_force_button()} } onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} color="primary" className="ml-1">Brute Force</Button>
            {showHover && (<div className="hoverText" id="brute_force_text">Click to simulate running a tool like Pacu to brute force the role (by trying known or common words and numbers and their combinations)</div>)}
          </Form>
        </Col>      
      </Row>
      <br></br>
      <Row>
      <Button onclick={() => {<ExternalAttack/>}} color="primary" className="ml-1">Advanced Attack</Button>
      </Row>
    </div >
  );
}

function brute_force_button(){
  var role_txt = document.getElementById('newRole');
  var roles = ["SSC", "SSC-role", "SecureCloud-role", "SecureCloudRole", "SSC_role_Dev", "SSC_role_prod", "SSC_role"];
  role_txt.value = roles[0];
  for(let i = 1 ; i < roles.length ; i++){
      setTimeout(function() {
          role_txt.value = roles[i];
      }, i*1000);
  }      
}


const internalAttack = async (event) => {
const newRoleInput = document.getElementById("newRole");
setRole(newRoleInput.value);

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

function ExternalAttack() {

  const [showHover,setHover] = useState(false);
  const [isCheating,setCheating] = useState(false);

  function cheat_button(){

    if(document.getElementById("externalID").hasAttribute("readonly")){
      document.getElementById("externalID").removeAttribute("readonly");
      setCheating(true);
    }
    else{
      document.getElementById("externalID").setAttribute("readonly","true");
      setCheating(false);
    }
    
  }
  
  
  return (
    <div className="ExternalAttack" >
      <Row>
        <Col xs="12" className="mt-1 mb-1">
          <h3>External demo attack</h3>
          <p>This is a more advanced type of attack that simulates being the client of a SaaS vendor.
            In this case, you would sign up for a service, then create a Role with appropriate permissions, paste its ARN and that would be it.
            But some vendors provide easy-to-guess external-ids, so you could try to get access to other clients' accounts.
          </p>
          <Form>
            <FormGroup>
              <Label for="newRole" hidden>Role</Label>
              <Input type="text" name="role" id="newRole" placeholder="RoleARN" />
              <Label for="newExternalID" hidden>ExtID</Label>
              <Input type="text" name="extID" id="externalID" placeholder="example_insecure_external_id" readonly="true"/>
            </FormGroup>
            <Button onClick={externalAttack} color="primary" className="ml-1">Connect</Button>
            <Button id="cheat_button" onClick={() => {cheat_button()} } onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} color="primary" className="ml-1">{isCheating ? "Uncheat" : "Cheat"}</Button>
            {showHover && (<div className="hoverText" id="cheat_text">Although not editable in the UI, many implementations do not prevent the user from intercepting and modifying the value.  Simulate by "cheating".</div>)}
          </Form>
        </Col>      
      </Row>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Row>
      <Button onClick={<InternalAttack/>} color="primary" className="ml-1">Basic Attack</Button>
      </Row>
    </div >
  );
}

const externalAttack = async (event) => {

  const newRoleInput = document.getElementById("newRole");
  const newExternalID = document.getElementById("externalID");
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