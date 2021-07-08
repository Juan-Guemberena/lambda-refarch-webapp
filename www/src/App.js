import React, { useState, useEffect } from 'react';
import { Container, Jumbotron, Row, Col, Button } from 'reactstrap';
import './App.css';
import InternalAttack from './InternalAttack';
import logo from './aws.png';
import config from './config';


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      idToken: 'eyJraWQiOiJUalBzcWxic3VyTU9KUEQ1dEF3b1JGRW8zOVFTU3Y2S0RvUTdOcG1uR2RJPSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoiSWgzVkh3aENqei1tdElhOFRJdzdHdyIsInN1YiI6Ijc0OWE4YjE4LTViODYtNDBhMy05ZjBkLTVhYTY3OWQxZmZkZSIsImF1ZCI6IjIyYmplaW42a29rMTRqaHAzOHI4bnRpZXM1IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjI1NzczNTEzLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9Zd0JUS2hPdUkiLCJjb2duaXRvOnVzZXJuYW1lIjoiNzQ5YThiMTgtNWI4Ni00MGEzLTlmMGQtNWFhNjc5ZDFmZmRlIiwiZXhwIjoxNjI1Nzc3MTEzLCJpYXQiOjE2MjU3NzM1MTMsImVtYWlsIjoiY2hpbm9ndWVtYmVAZ21haWwuY29tIn0.sEZTnL7RD77YN5oHvBu9bOI2XeHJcyA7eH5a0RqtOH1Tzq2KyUzQz-jg1cunxdDQeZ8rNRUw6KuMFCnb6KDPE6zpeGrQ7wNpn6RJSU7nxCn1lN-UXKTW2sHPPky9pD1OONfDx6syM7WQCGuqn-R-7ginyA8xOjP7DJ06tdcajPjbaC36jVgsh4WtEDsnSsansNxuDxs22x0Iv5RGwBAzzRwqG2mFRHZKvJ8-6M0anZOtdraIp3v3SiKMRw_d8JR3VlGnal_vFSuJampPNYeL84V9czwmW8fHtrqtvCaZQbMhObKDoeSBgvYe8_lwJGKhDJEK9i1Tg__j0NFHDC99mg&access_token=eyJraWQiOiJBRmk5Y3RYNXRuTnY0R2lmb2UyeVRRXC9qamhOdG1QVkhoOXZOSTZWSEI2az0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI3NDlhOGIxOC01Yjg2LTQwYTMtOWYwZC01YWE2NzlkMWZmZGUiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6InBob25lIG9wZW5pZCBlbWFpbCIsImF1dGhfdGltZSI6MTYyNTc3MzUxMywiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfWXdCVEtoT3VJIiwiZXhwIjoxNjI1Nzc3MTEzLCJpYXQiOjE2MjU3NzM1MTMsInZlcnNpb24iOjIsImp0aSI6ImQ0YmUxMWM3LWUyMzUtNDA1My1hYmM1LTExY2I2OTQ2ZjE1ZCIsImNsaWVudF9pZCI6IjIyYmplaW42a29rMTRqaHAzOHI4bnRpZXM1IiwidXNlcm5hbWUiOiI3NDlhOGIxOC01Yjg2LTQwYTMtOWYwZC01YWE2NzlkMWZmZGUifQ.q3z_GVCBmcxnj163Y9ye3EAlrSz9rIxxPekznylYp-Zz2KFD129gvnHKKivbS8LsWtEvLiPGV8M_wEibj75EPPKOoN_qZ1JPUUdkZxyuHpKO6VA8P2Vc5Q_rR6PP901jdejJgVS6n3nt9PkHomi3ARC0-KPmNdxuPxMvIWCy9a2bJRVLCCw2t2hmryHZLG3Of5M5bmtf06CtSuSa2qU4Jlo54E8dF90VQUYq2AFM5uUK9b79b49nf5K2fhaBRIYV6Jl1k-7_kXvGEtypFNRFQqAkaWh8BjIPrAPsuB_ALL0EYuhWm3F-YCgB-EYV5g_Fs0CH3QC8ySnab-DJv2Ko0Q',
      role: '',
      extID: '',
      successful: false,
      attack: 'internal'
    };
    this.setSuccess = this.setSuccess.bind(this)
  }
  setSuccess(bool){
    this.setState({successful: bool})
  }


  setIdToken(idToken){
    this.setState({
      idToken: idToken
    })
  }



  getIdToken(){
    const hash = window.location.hash.substr(1);
    const objects = hash.split("&");
    objects.forEach(object => {
      const keyVal = object.split("=");
      if (keyVal[0] === "id_token") {
        this.setIdToken(keyVal[1]);
      }
    });
  };


  render(){
    return <div className="App">
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
              {this.state.idToken.length > 0 ?
                (
                <Row>
                  <InternalAttack props={this.state}/>
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
              <p className="jumbotron_text">Executing command...</p><p className="jumbotron_text">aws sts assume-role --role-arn arn:aws:iam::111111111111:role/{this.state.role} --external-id {this.state.extID} --role-session-name hacking</p>
              {this.state.successful ? (<h2 className="jumbotron_text_success">CONNECTION SUCCESSFUL</h2>) : (<h2 className="jumbotron_text_fail">CONNECTION FAILED</h2>)}
          </Jumbotron>
        </Jumbotron>
      </Container>
    </div>
}
}





// function ExternalAttack() {

//   const [showHover,setHover] = useState(false);
//   const [isCheating,setCheating] = useState(false);

//   function cheat_button(){

//     if(document.getElementById("externalID").hasAttribute("readonly")){
//       document.getElementById("externalID").removeAttribute("readonly");
//       setCheating(true);
//     }
//     else{
//       document.getElementById("externalID").setAttribute("readonly","true");
//       setCheating(false);
//     }
    
//   }
  
  
//   return (
//     <div className="ExternalAttack" >
//       <Row>
//         <Col xs="12" className="mt-1 mb-1">
//           <h3>External demo attack</h3>
//           <p>This is a more advanced type of attack that simulates being the client of a SaaS vendor.
//             In this case, you would sign up for a service, then create a Role with appropriate permissions, paste its ARN and that would be it.
//             But some vendors provide easy-to-guess external-ids, so you could try to get access to other clients' accounts.
//           </p>
//           <Form>
//             <FormGroup>
//               <Label for="newRole" hidden>Role</Label>
//               <Input type="text" name="role" id="newRole" placeholder="RoleARN" />
//               <Label for="newExternalID" hidden>ExtID</Label>
//               <Input type="text" name="extID" id="externalID" placeholder="example_insecure_external_id" readonly="true"/>
//             </FormGroup>
//             <Button onClick={externalAttack} color="primary" className="ml-1">Connect</Button>
//             <Button id="cheat_button" onClick={() => {cheat_button()} } onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} color="primary" className="ml-1">{isCheating ? "Uncheat" : "Cheat"}</Button>
//             {showHover && (<div className="hoverText" id="cheat_text">Although not editable in the UI, many implementations do not prevent the user from intercepting and modifying the value.  Simulate by "cheating".</div>)}
//           </Form>
//         </Col>      
//       </Row>
//       <br></br>
//       <br></br>
//       <br></br>
//       <br></br>
//       <Row>
//       <Button onClick={<InternalAttack/>} color="primary" className="ml-1">Basic Attack</Button>
//       </Row>
//     </div >
//   );
// }

// const externalAttack = async (event) => {

//   const newRoleInput = document.getElementById("newRole");
//   const newExternalID = document.getElementById("externalID");
//   setRole(newRoleInput.value);
//   setExtID(newExternalID.value);

//   if ((!role || role === '') || (!extID || extID === '')){
//     document.getElementById("hidden_jumbotron").setAttribute("hidden","true");
//     return;
//   }

  
//   const newAccount = {
//     "roleARN": role,
//     "external-id": extID
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
//     newExternalID.value = '';
//     if (result.data.message === 'Connection Successful') {setSuccess(true);} else {setSuccess(false)}
//     document.getElementById("hidden_jumbotron").removeAttribute("hidden");
//   }
// }