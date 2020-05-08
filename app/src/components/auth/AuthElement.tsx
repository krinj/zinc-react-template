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

const renderSignInForm = (setState: Dispatch<SetStateAction<AuthState>>) => {
    return <AuthSignInForm setAuthState={setState}/>;
}

const renderAuthenticatedState = (setState: Dispatch<SetStateAction<AuthState>>) => {
    return <div>You are authenticated as: ....</div>
}

const renderAuthForState = (state: AuthState, setState: Dispatch<SetStateAction<AuthState>>) => {
    switch (state) {
        case (AuthState.UNKNOWN):
            return renderSignInForm(setState);

        case AuthState.AUTHENTICATED:
            return renderAuthenticatedState(setState);

        case AuthState.UNAUTHENTICATED:
            return renderSignInForm(setState);
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