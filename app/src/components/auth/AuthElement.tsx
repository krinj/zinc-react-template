import React, { Dispatch, SetStateAction } from 'react';
import DisplayableElement from '../../utils/structure/DisplayableElement';
import AuthElementModel from './AuthElementModel';
import AuthState from './AuthState';
import { Auth } from 'aws-amplify';
import AuthSignInForm from './AuthSignInForm';
import AuthStatus from './AuthStatus';

class AuthElement extends DisplayableElement {

    private model: AuthElementModel;

    constructor(model: AuthElementModel) {
        super();
        this.model = model;
     }

     protected internalRender() {
        return <AuthElementJSX {...this.model}/>;
     }
}



const renderUnknownState = (status: AuthStatus, setStatus: Dispatch<SetStateAction<AuthStatus>>) => {
    
    Auth.currentUserPoolUser()
        .then(user => {setStatus({authState: AuthState.AUTHENTICATED, user: {email: user.attributes.email}})})
        .catch(err => setStatus({authState: AuthState.UNAUTHENTICATED}));

    return <>Please wait...</>;
}

const renderSignInForm = (setStatus: Dispatch<SetStateAction<AuthStatus>>) => {
    return <AuthSignInForm setAuthStatus={setStatus}/>;
}

const renderAuthenticatedState = (status: AuthStatus, setStatus: Dispatch<SetStateAction<AuthStatus>>) => {

    const isDisabled = false;
    const onSignOut = () => {
        Auth.signOut()
            .then(x => console.log(x))
            .catch(e => console.log(e));
        setStatus({authState: AuthState.UNAUTHENTICATED});
    }

    return <div>
        You are authenticated as: {status.user?.email}
        <button style={{width: "100%"}} 
        className="btn btn-primary" 
        onClick={onSignOut}
        disabled={isDisabled}>Sign Out</button>
    </div>
}

const renderUnconfirmedState = (setState: Dispatch<SetStateAction<AuthStatus>>) => {
    return <>Your account is unconfirmed. Please check your email to verify.</>;
}

const renderErrorState = (setState: Dispatch<SetStateAction<AuthStatus>>) => {
    return <>There was an error!</>;
}

const renderAuthForState = (
    status: AuthStatus, 
    setStatus: Dispatch<SetStateAction<AuthStatus>>) => {

    switch (status.authState) {
        case (AuthState.UNKNOWN):
            return renderUnknownState(status, setStatus);

        case AuthState.AUTHENTICATED:
            return renderAuthenticatedState(status, setStatus);

        case AuthState.UNAUTHENTICATED:
            return renderSignInForm(setStatus);

        case AuthState.ERROR:
            return renderErrorState(setStatus);

        case AuthState.UNCONFIRMED:
            return renderUnconfirmedState(setStatus);
    }
}

const AuthElementJSX: React.FC<AuthElementModel> = (props) => {

    const [authStatus, setAuthStatus] = React.useState<AuthStatus>({authState: AuthState.UNKNOWN});
    
    return <div className="card">
        <div className="card-body">
            <h3 className="card-title">{"Authenticate"}</h3>
            {renderAuthForState(authStatus, setAuthStatus)}
        </div>

    </div>
}

export default AuthElement