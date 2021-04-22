import React, { useState } from 'react';
import { Button, ButtonGroup, Form, FormGroup, Input, Label, Row, Col } from 'reactstrap';
import './ToDo.css';



function ToDo({  addAWSAccount }) {
  
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
    <div className="ToDo">
      <Row>
        <Col xs="12" className="mt-1 mb-1">
          <Form>
            <FormGroup>
              <Label for="newRole" hidden>Role</Label>
              <Input type="text" name="role" id="newRole" placeholder="RoleARN" />
              <Label for="newExternalID" hidden>ExtID</Label>
              <Input type="text" name="extID" id="externalID" placeholder="example_insecure_external_id" readonly="true"/>
            </FormGroup>
            <Button onClick={addAWSAccount} color="primary" className="ml-1">Connect</Button>
            <Button id="cheat_button" onClick={() => {cheat_button()} } color="primary" className="ml-1">{isCheating ? "Uncheat" : "Cheat"}</Button>
          </Form>
        </Col>
       
      </Row>
    </div >
  );
}

export default ToDo;
