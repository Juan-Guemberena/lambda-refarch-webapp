import React, { useState } from 'react';
import { Button, Form, FormGroup, Input, Label, Row, Col } from 'reactstrap';
import './Attack.css';


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
            <Form>
              <FormGroup>
                <Label for="newRole" hidden>Role</Label>
                <Input type="text" name="role" id="newRole" placeholder="RoleARN" />
              </FormGroup>
              <Button onClick={addAWSAccount} color="primary" className="ml-1">Connect</Button>
              <Button id="brute_force_button" onClick={() => {brute_force_button()} } onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} color="primary" className="ml-1">Brute Force</Button>
              {showHover && (<div className="hoverText" id="brute_force_text">Click to simulate running a tool like Pacu to brute force the role (by trying known or common words and numbers and their combinations)</div>)}
            </Form>
          </Col>      
        </Row>
        <br></br>
        <Row style={{ display: "flex" }}>
        <Button style={{display: 'flex', justifyContent: 'right'}} color="primary" className="ml-1">Basic Attack</Button>
        </Row>
      </div >
    );
  }
  
  export default InternalAttack;