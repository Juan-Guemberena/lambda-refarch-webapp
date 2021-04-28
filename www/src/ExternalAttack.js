import React, { useState } from 'react';
import { Button, Form, FormGroup, Input, Label, Row, Col } from 'reactstrap';
import './Attack.css';
import switchAttack from './App';


function ExternalAttack({  addAWSAccount }) {
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
            <Button onClick={addAWSAccount} color="primary" className="ml-1">Connect</Button>
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
      <Button onClick={switchAttack(true)} color="primary" className="ml-1">Basic Attack</Button>
      </Row>
    </div >
  );
}

export default ExternalAttack;
