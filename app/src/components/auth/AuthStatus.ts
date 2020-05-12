import AuthState from "./AuthState";

interface AuthUser {
    email?: string;
    name?: string;
}

interface AuthStatus {
    authState: AuthState;
    authStateReason?: string;
    user?: AuthUser;
}

export default AuthStatus;