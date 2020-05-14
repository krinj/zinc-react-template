import React from 'react';
import DisplayableElement from '../../utils/structure/DisplayableElement';
import AuthHeaderModel from './AuthHeaderModel';
import Amplify, { Auth, API } from 'aws-amplify';
import AuthSignInForm from './AuthSignInForm';
import AuthState from './AuthState';
import AuthStatus from './AuthStatus';


class AuthHeader extends DisplayableElement {

    private model: AuthHeaderModel;

    constructor(model: AuthHeaderModel) {
        console.log("Auth Initialized");
        super();
        this.model = model;
     }

     protected internalRender() {
        return <AuthHeaderJSX {...this.model}/>;
     }
}

const onUserAuthenticationResults = (user: any, success: boolean, err: any, setAuthStatus: any) => {
    console.log("Auth Success: " + success);
    setAuthStatus({authState: success ? AuthState.AUTHENTICATED : AuthState.UNAUTHENTICATED});
}

const renderUnauthenticatedUI = (status: AuthStatus, setAuthStatus: (x: AuthStatus) => void): JSX.Element => {
    return <AuthSignInForm authStatus={status} setAuthStatus={setAuthStatus}/>
}

const AuthHeaderJSX: React.FC<AuthHeaderModel> = (props) => {

    const [authState, setAuthState] = React.useState(AuthState.UNKNOWN);

    // Auth.signUp({
    //     username: "hello@zinccli.com",
    //     password: "Hunter12!"
    // })
    // .then(x => console.log(x))
    // .catch(x => console.log(x))

    if (authState === AuthState.UNKNOWN) {
        Auth.currentCredentials().then(x => {console.log("Got Credentials"); console.log(x);}).catch(x => console.log(x));
        Auth.currentSession()
            .then(user => onUserAuthenticationResults(user, true, null, setAuthState))
            .catch(err => onUserAuthenticationResults(null, false, err, setAuthState));
    }

    const signOut = () => {
        Auth.signOut()
            .then((x) => { 
                console.log("sign out success"); 
                console.log(x); 
                setAuthState(AuthState.UNAUTHENTICATED);}
            )
            .catch((e) => {
                console.log("sign out success"); 
                console.log(e)}
            );
    }

    const post = async () => {
        console.log('calling api');
        const response = await API.post('apiCrudPost', '/', {
          body: {
            id: '1',
            message: 'hello amplify!',
            payload: "Message from Amplify"
          }
        });
        alert(JSON.stringify(response, null, 2));
      };
    
      const get = async () => {
        console.log('calling api');
        const response = await API.get('apiCrudGet', '/books/1', {
            queryStringParameters: {x: "q1"}
        });
        
        alert(JSON.stringify(response, null, 2));
      };
    
      const list = async () => {
        console.log('calling api');
        const response = await API.get('apiCrudGet', '/items/1', {});
        alert(JSON.stringify(response, null, 2));
      };

    if (authState === AuthState.UNAUTHENTICATED) {
        return <>
            {/* {renderUnauthenticatedUI(setAuthState)}
            <button onClick={post}>POST</button>
            <button onClick={get}>GET</button>
            <button onClick={list}>LIST</button> */}
        </>
    } else {
        return <>This is a AuthHeader Element: {AuthState[authState]}
        {/* <button style={{minWidth: "120px"}} className="btn btn-primary" onClick={signOut}>Sign Out</button>
        <button onClick={post}>POST</button>
        <button onClick={get}>GET</button>
        <button onClick={list}>LIST</button> */}
        </>;
    }
}

export default AuthHeader