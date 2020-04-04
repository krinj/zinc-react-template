import React from 'react';
import CustomInputField from '../common/InputField';
import AuthState from './AuthState';
import { Auth } from 'aws-amplify';

interface AuthSignInFormProps {
    setAuthState: (x: AuthState) => void;
}

interface AuthSignInSubmissionProps {
    username: string;
    password: string;
    setAuthState: (x: AuthState) => void;
}

const onContactFormClick = (props: AuthSignInSubmissionProps) => {
    console.log("Sign In Submission");
    console.log(props.username);
    console.log(props.password);

    const username: string = props.username;
    const password: string = props.password;
    console.log({username, password});

    Auth.signIn({username, password})
        .then(data => {console.log(data); props.setAuthState(AuthState.AUTHENTICATED)})
        .catch(err => console.log(err));
}

const AuthSignInForm: React.FC<AuthSignInFormProps> = (props) => {

    const isDisabled: boolean = false;
    const usernameField: CustomInputField = new CustomInputField(React.useState(""));
    const passwordField: CustomInputField = new CustomInputField(React.useState(""));

    const onSubmit = (e: any) => {
        e.preventDefault();
        onContactFormClick({username: usernameField.value, password: passwordField.value, setAuthState: props.setAuthState});
    }

    return <form onSubmit={onSubmit}>

        <div>THIS IS A SIGN IN FORM</div>
        <div>{usernameField.render()}</div>
        <div>{passwordField.render()}</div>
        <button style={{minWidth: "120px"}} className="btn btn-primary" type="submit" disabled={isDisabled}>HELLO</button>

    </form>
}

export default AuthSignInForm;