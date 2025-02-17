import config from './config';
import React from 'react';
import { Row, Col, Button, Form, FormGroup,Label,Input } from 'reactstrap';
import axios from 'axios';


const clearCredentials = () => {
  window.location.href = config.redirect_url;
}

export default class InternalAttack extends React.Component {
  role = this.props.props.role;
  render(){
    return (
    <div className="InternalAttack" >
      <Row>
        <Col xs="12" className="mt-1 mb-1">
            <h3>Internal demo attack {this.role}</h3>
            <p>This attack can happen when a user inside an AWS account has insecure credentials, and they get stolen by a malicious 3rd party.
               Inside the SaaS vendor's cloud, you'll find that sometimes there are "sts:assumeRole":"*" type of permissions, only limited by the external-id inside the clients cloud.
               The thing is, you don't need the external-id if you want to attack yourself and the cloud isn't well configured, so the only thing you need to find is a high privilege role to assume.
            </p>
          <Form>
            <FormGroup>
              <Label for="newRole" hidden>Role</Label>
              <Input type="text" name="role" id="newRole" placeholder="role-name"/>
            </FormGroup>
            <Button onClick={internalAttack(this.role,this.idToken)} color="primary" className="ml-1">Connect</Button>
            <Button id="brute_force_button" onClick={() => {brute_force_button()} } color="primary" className="ml-1">Brute Force</Button>
            {(<div className="hoverText" id="brute_force_text">Click to simulate running a tool like Pacu to brute force the role (by trying known or common words and numbers and their combinations)</div>)}
          </Form>
        </Col>      
      </Row>
      <br></br>
      <Row>
      <Button onclick={() => {}} color="primary" className="ml-1">Advanced Attack</Button>
      </Row>
    </div >
  );
}
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



const internalAttack = async (role,idToken) => {
  const newRoleInput = document.getElementById("newRole");
  
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
    if (result.data.message === 'Connection Successful') {console.log('success')} else {console.log('fail')}
    document.getElementById("hidden_jumbotron").removeAttribute("hidden");
  }
  }

// import React, { useState } from 'react';
// import { Button, Form, FormGroup, Input, Label, Row, Col } from 'reactstrap';
// import './Attack.css';
// import {setSuccess, role, setRole, idToken} from './App';
// import {ExternalAttack} from './ExternalAttack';




// function InternalAttack() {

//     const [showHover,setHover] = useState(false);

    
    
//     return (
//       <div className="InternalAttack" >
//         <Row>
//           <Col xs="12" className="mt-1 mb-1">
//               <h3>Internal demo attack</h3>
//               <p>This attack can happen when a user inside an AWS account has insecure credentials, and they get stolen by a malicious 3rd party.
//                  Inside the SaaS vendor's cloud, you'll find that sometimes there are "sts:assumeRole":"*" type of permissions, only limited by the external-id inside the clients cloud.
//                  The thing is, you don't need the external-id if you want to attack yourself and the cloud isn't well configured, so the only thing you need to find is a high privilege role to assume.
//               </p>
//             <Form>
//               <FormGroup>
//                 <Label for="newRole" hidden>Role</Label>
//                 <Input type="text" name="role" id="newRole" placeholder="role-name"/>
//               </FormGroup>
//               <Button onClick={internalAttack} color="primary" className="ml-1">Connect</Button>
//               <Button id="brute_force_button" onClick={() => {brute_force_button()} } onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} color="primary" className="ml-1">Brute Force</Button>
//               {showHover && (<div className="hoverText" id="brute_force_text">Click to simulate running a tool like Pacu to brute force the role (by trying known or common words and numbers and their combinations)</div>)}
//             </Form>
//           </Col>      
//         </Row>
//         <br></br>
//         <Row>
//         <Button onclick={() => {<ExternalAttack/>}} color="primary" className="ml-1">Advanced Attack</Button>
//         </Row>
//       </div >
//     );
//   }

// function brute_force_button(){
//     var role_txt = document.getElementById('newRole');
//     var roles = ["SSC", "SSC-role", "SecureCloud-role", "SecureCloudRole", "SSC_role_Dev", "SSC_role_prod", "SSC_role"];
//     role_txt.value = roles[0];
//     for(let i = 1 ; i < roles.length ; i++){
//         setTimeout(function() {
//             role_txt.value = roles[i];
//         }, i*1000);
//     }      
// }


// const internalAttack = async (event) => {
//   const newRoleInput = document.getElementById("newRole");
//   setRole(newRoleInput.value);

//   if (!role || role === ''){
//     document.getElementById("hidden_jumbotron").setAttribute("hidden","true");
//     return;
//   }

  
//   const newAccount = {
//     "roleARN": role,
//   };

//   axios.defaults.headers.post['Authorization'] = idToken

//   const result = await axios({
//     method: 'POST',
//     url: `${config.api_base_url}`,
//     data: newAccount
//   });


//   if (result && result.status === 401) {
//     clearCredentials();
//   } else if (result && result.status === 200) {
//     newRoleInput.value = '';
//     if (result.data.message === 'Connection Successful') {setSuccess(true);} else {setSuccess(false)}
//     document.getElementById("hidden_jumbotron").removeAttribute("hidden");
//   }
// }
// export default InternalAttack;