import React from 'react';
import DisplayableElement from '../../utils/structure/DisplayableElement';
import AuthHeaderModel from './AuthHeaderModel';
import Amplify, { Auth } from 'aws-amplify';
import AuthSignInForm from './AuthSignInForm';
import AuthState from './AuthState';


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

const onUserAuthenticationResults = (user: any, success: boolean, err: any, setAuthState: any) => {
    console.log("Auth Success: " + success);
    setAuthState(success ? AuthState.AUTHENTICATED : AuthState.UNAUTHENTICATED);
}

const renderUnauthenticatedUI = (setAuthState: (x: AuthState) => void): JSX.Element => {
    return <AuthSignInForm setAuthState={setAuthState}/>
}

const AuthHeaderJSX: React.FC<AuthHeaderModel> = (props) => {

    const [authState, setAuthState] = React.useState(AuthState.UNKNOWN);

    if (authState === AuthState.UNKNOWN) {
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

    if (authState === AuthState.UNAUTHENTICATED) {
        return renderUnauthenticatedUI(setAuthState);
    } else {
        return <>This is a AuthHeader Element: {AuthState[authState]}
        <button style={{minWidth: "120px"}} className="btn btn-primary" onClick={signOut}>Sign Out</button>
        </>;
    }
}

export default AuthHeader