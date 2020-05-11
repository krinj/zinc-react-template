import React, { Dispatch, SetStateAction } from 'react';
import DisplayableElement from '../../utils/structure/DisplayableElement';
import AuthElementModel from './AuthElementModel';
import AuthState from './AuthState';
import { Auth } from 'aws-amplify';
import AuthSignInForm from './AuthSignInForm';

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



const renderUnknownState = (setState: Dispatch<SetStateAction<AuthState>>) => {
    
    Auth.currentSession()
        .then(user => setState(AuthState.AUTHENTICATED))
        .catch(err => setState(AuthState.UNAUTHENTICATED));

    return <>Please wait...</>;
}

const renderSignInForm = (setState: Dispatch<SetStateAction<AuthState>>) => {
    return <AuthSignInForm setAuthState={setState}/>;
}

const renderAuthenticatedState = (setState: Dispatch<SetStateAction<AuthState>>) => {

    const isDisabled = false;
    const onSignOut = () => {
        Auth.signOut()
            .then(x => console.log(x))
            .catch(e => console.log(e));
        setState(AuthState.UNAUTHENTICATED);
    }

    return <div>
        You are authenticated as: ....
        <button style={{width: "100%"}} 
        className="btn btn-primary" 
        onClick={onSignOut}
        disabled={isDisabled}>Sign Out</button>
    </div>
}

const renderUnconfirmedState = (setState: Dispatch<SetStateAction<AuthState>>) => {
    return <>Your account is unconfirmed. Please check your email to verify.</>;
}

const renderErrorState = (setState: Dispatch<SetStateAction<AuthState>>) => {
    return <>There was an error!</>;
}

const renderAuthForState = (state: AuthState, setState: Dispatch<SetStateAction<AuthState>>) => {
    switch (state) {
        case (AuthState.UNKNOWN):
            return renderUnknownState(setState);

        case AuthState.AUTHENTICATED:
            return renderAuthenticatedState(setState);

        case AuthState.UNAUTHENTICATED:
            return renderSignInForm(setState);

        case AuthState.ERROR:
            return renderErrorState(setState);

        case AuthState.UNCONFIRMED:
            return renderUnconfirmedState(setState);
    }
}

const AuthElementJSX: React.FC<AuthElementModel> = (props) => {

    const [authState, setAuthState] = React.useState(AuthState.UNKNOWN);
    
    return <div className="card">
        <div className="card-body">
            <h3 className="card-title">{"Authenticate"}</h3>
            {renderAuthForState(authState, setAuthState)}
        </div>

    </div>
}

export default AuthElement