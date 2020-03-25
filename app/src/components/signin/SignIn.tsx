import React from 'react';
import DisplayableElement from '../../utils/structure/DisplayableElement';
import SignInModel from './SignInModel';


class SignIn extends DisplayableElement {

    private model: SignInModel;

    constructor(model: SignInModel) {
        super();
        this.model = model;
     }

     protected internalRender() {
        return <SignInJSX {...this.model}/>;
     }
}

const SignInJSX: React.FC<SignInModel> = (props) => {
    return <>This is a SignIn Element!</>;
}

export default SignIn