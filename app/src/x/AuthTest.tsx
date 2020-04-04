import React from 'react';
import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react'; // or 'aws-amplify-react-native';


Amplify.configure({
    Auth: {
        userPoolWebClientId: '78u97ubnb947hf0600p8cioqa3', 
        // REQUIRED - Amazon Cognito Region
        region: 'us-east-1',

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'us-east-1_BcoXVlbvz',

        // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
        authenticationFlowType: 'USER_PASSWORD_AUTH',

        // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
        clientMetadata: { myCustomKey: 'myCustomValue' }
    }
});


interface AuthTestProps {

}

const AuthTest: React.FC<AuthTestProps> = (props) => {

    const username: string = "hello2@zinccli.com";
    const password: string = "Hunter12!";

    // Auth.signIn({username, password})
    //     .then(data => console.log(data))
    //     .catch(err => console.log(err));


    // Auth.signUp({
    //     username: username,
    //     password: password})
    //     .then(data => console.log(data))
    //     .catch(err => console.log(err));


    // Auth.signIn({
    //     username, // Required, the username
    //     password, // Optional, the password
    // }).then(user => console.log(user))
    // .catch(err => console.log(err));

    return <>New AuthTest</>;
}

export default withAuthenticator(AuthTest);