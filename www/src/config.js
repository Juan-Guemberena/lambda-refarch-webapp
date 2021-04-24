// You can obtain these values by running:
// aws cloudformation describe-stacks --stack-name <YOUR STACK NAME> --query "Stacks[0].Outputs[]"

const config = {
  "aws_user_pools_web_client_id": "22bjein6kok14jhp38r8nties5",     // CognitoClientID
  "api_base_url": "https://054x4dskg8.execute-api.us-east-1.amazonaws.com/dev",                                     // TodoFunctionApi
  "cognito_hosted_domain": "mytodoappdemo-lambda-refarch-stack-chino-test.auth.us-east-1.amazoncognito.com",                   // CognitoDomainName
  "redirect_url": "https://master.d2rkelmbl3djii.amplifyapp.com"                                      // AmplifyURL
};

export default config;
