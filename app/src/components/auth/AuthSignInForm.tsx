import React from 'react';
import CustomInputField from '../common/InputField';
import AuthState from './AuthState';
import { Auth } from 'aws-amplify';

interface AuthSignInFormProps {
    setAuthState: (x: AuthState) => void;
}

interface AuthSignInSubmissionProps {
    username: string;
    email: string;
    password: string;
    setAuthState: (x: AuthState) => void;
}

const onSignInClick = (props: AuthSignInSubmissionProps) => {
    Auth.signIn({username: props.email, password: props.password})
        .then(data => {console.log(data); props.setAuthState(AuthState.AUTHENTICATED)})
        .catch(err => console.log(err));
}

const onRegisterClick = (props: AuthSignInSubmissionProps) => {
    console.log("Register with: " + props);
    console.log(props);
    Auth.signUp({username: props.email, password: props.password})
        .then(data => {console.log(data); props.setAuthState(AuthState.AUTHENTICATED)})
        .catch(err => console.log(err));
}

const createButton = (label: string, isDisabled: boolean, onClick: (e: any) => void) => {
    return <button style={{width: "100%"}} 
        className="btn btn-primary" 
        onClick={onClick}
        disabled={isDisabled}>{label}</button>;
}

const wrapOnClick = (x: Function) => {
    return (e: any) => {e.preventDefault(); x(); };
}

const AuthSignInForm: React.FC<AuthSignInFormProps> = (props) => {

    const isDisabled: boolean = false;
    const usernameField: CustomInputField = new CustomInputField("Name", React.useState(""));
    const emailField: CustomInputField = new CustomInputField("Email", React.useState(""));
    const passwordField: CustomInputField = new CustomInputField("Password", React.useState(""));

    const authProps = {username: usernameField.value, email: emailField.value, password: passwordField.value, setAuthState: props.setAuthState};

    return <form>
        
        <div style={{maxWidth: "24em"}}>
            {/* <div>{usernameField.render()}</div> */}
            <div>{emailField.render()}</div>
            <div>{passwordField.render()}</div>

            <div style={{display: "flex"}}>
                <div style={{width: "50%"}}>{createButton("Sign In", isDisabled, wrapOnClick(() => onSignInClick(authProps)))}</div>
                <div style={{width: "1em"}} />
                <div style={{width: "50%"}}>{createButton("Register", isDisabled, wrapOnClick(() => onRegisterClick(authProps)))}</div>
            </div>
        </div>

    </form>
}

export default AuthSignInForm;