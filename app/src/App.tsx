import React from 'react';
import SiteContent from './injected/content/siteContent';
import SiteGenerator from './utils/structure/SiteGenerator';
import AuthTest from './x/AuthTest';
import Amplify from 'aws-amplify';
import awsconfig from "./amplify";


const App: React.FC = () => {

  Amplify.configure(awsconfig);

//   Amplify.configure({
//     Auth: {
//         identityPoolId: 'ap-southeast-2:8c04a5bf-dbd6-4d0d-a9f9-bb1aaaf2581a',
//         userPoolWebClientId: '7eik7mv0iu70gi57rr45vh3g7p', 
//         // REQUIRED - Amazon Cognito Region
//         region: 'ap-southeast-2',
//         // OPTIONAL - Amazon Cognito User Pool ID
//         userPoolId: 'ap-southeast-2_spejU6Caq',
//         // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
//         // authenticationFlowType: 'USER_PASSWORD_AUTH',
//     }
// });
  
  const siteContent: SiteContent = new SiteContent()
  return (
    <div className="App">
      
      {/* <AuthTest /> */}
      <SiteGenerator content={siteContent}/>

    </div>
  );
}

export default App;
