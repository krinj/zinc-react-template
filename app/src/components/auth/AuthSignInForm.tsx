import React from 'react';
import CustomInputField, { FieldType } from '../common/InputField';
import AuthState from './AuthState';
import { Auth } from 'aws-amplify';
import AuthStatus from './AuthStatus';
import SignIn from '../signin/SignIn';

enum SignInState {
    ACTIVE,
    PENDING,
    ERROR
}

interface AuthSignInFormProps {
    authStatus: AuthStatus;
    setAuthStatus: (x: AuthStatus) => void;
}

interface AuthSignInSubmissionProps {
    username: string;
    email: string;
    password: string;
    setAuthStatus: (x: AuthStatus) => void;
}

const onSignInClick = (props: AuthSignInSubmissionProps, setSignInState: (x: SignInState) => void) => {
    Auth.signIn({username: props.email, password: props.password})
        .then(data => {console.log(data); props.setAuthStatus({authState: AuthState.AUTHENTICATED, user: {email: data.attributes.email}})})
        .catch(err => {console.log(err); setSignInState(SignInState.ERROR);});
    setSignInState(SignInState.PENDING);
}

const onRegisterClick = (props: AuthSignInSubmissionProps) => {
    console.log("Register with: " + props);
    console.log(props);
    Auth.signUp({username: props.email, password: props.password})
        .then(data => {console.log(data); props.setAuthStatus({authState: AuthState.UNCONFIRMED})})
        .catch(err => {console.log(err); props.setAuthStatus({authState: AuthState.ERROR})});
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

    const [signInState, setSignInState] = React.useState(SignInState.ACTIVE);

    const isDisabled: boolean = signInState === SignInState.PENDING;
    const isError: boolean = signInState === SignInState.ERROR;

    const defaultSettings = {showLabel: false, showIcon: false, disabled: isDisabled};
    const usernameField = new CustomInputField({label: "Name", fieldType: FieldType.Name, hook: React.useState(""), ...defaultSettings});
    const emailField = new CustomInputField({label: "Email", fieldType: FieldType.Email, hook: React.useState(""), ...defaultSettings});
    const passwordField = new CustomInputField({label: "Password", fieldType: FieldType.Password, hook: React.useState(""), ...defaultSettings});

    const authProps = {username: usernameField.value, email: emailField.value, password: passwordField.value, setAuthStatus: props.setAuthStatus};

    let errorSection = null;
    if (isError) {
        errorSection = <div className="alert alert-danger" role="alert">Error: Your sign-in details were incorrect.</div>;
    }

    return <form>
        
        <div style={{maxWidth: "24em"}}>

            {errorSection}

            <div>{emailField.render()}</div>
            <div>{passwordField.render()}</div>

            <div style={{display: "flex"}}>
                <div style={{width: "50%"}}>{createButton("Sign In", isDisabled, wrapOnClick(() => onSignInClick(authProps, setSignInState)))}</div>
                <div style={{width: "1em"}} />
                <div style={{width: "50%"}}>{createButton("Register", isDisabled, wrapOnClick(() => onRegisterClick(authProps)))}</div>
            </div>

        </div>

    </form>
}

export default AuthSignInForm;