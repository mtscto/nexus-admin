import {
    createContext,
    useContext,
    useReducer,
} from "react";
import type { ReactNode } from "react";
import { authService } from "../services/authService";
import type { User } from "../services/authService";

interface AuthState {
    user: User | null;
}

type AuthAction =
    | { type: "LOGIN"; payload: User }
    | { type: "LOGOUT" };

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

function authReducer(state: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload };

        case "LOGOUT":
            return { user: null };

        default:
            return state;
    }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const initialUser = authService.getCurrentUser();

    const [state, dispatch] = useReducer(authReducer, {
        user: initialUser,
    });

    async function login(email: string, password: string) {
        const user = await authService.login(email, password);
        dispatch({ type: "LOGIN", payload: user });
    }

    function logout() {
        authService.logout();
        dispatch({ type: "LOGOUT" });
    }

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}