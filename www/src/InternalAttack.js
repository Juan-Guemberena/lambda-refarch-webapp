import React, { useState } from 'react';
import { Button, Form, FormGroup, Input, Label, Row, Col } from 'reactstrap';
import './Attack.css';
import switchAttack from './App';




function InternalAttack({  addAWSAccount }) {
    const [showHover,setHover] = useState(false);
    
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
              <Button onClick={addAWSAccount} color="primary" className="ml-1">Connect</Button>
              <Button id="brute_force_button" onClick={() => {brute_force_button()} } onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} color="primary" className="ml-1">Brute Force</Button>
              {showHover && (<div className="hoverText" id="brute_force_text">Click to simulate running a tool like Pacu to brute force the role (by trying known or common words and numbers and their combinations)</div>)}
            </Form>
          </Col>      
        </Row>
        <br></br>
        <Row>
        <Button onclick={() => switchAttack(false)} color="primary" className="ml-1">Advanced Attack</Button>
        </Row>
      </div >
    );
  }
  
  export default InternalAttack;