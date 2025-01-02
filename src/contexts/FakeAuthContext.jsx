import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
const initialState = {
  isAuthenticated: false,
  user: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case "LOG_IN": {
        return { ...state, user: action.payload, isAuthenticated: true };
    }
    case "LOG_OUT": {
        return { ...state, user: null, isAuthenticated: false };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };
function AuthProvider({ children }) {
  const [{ isAuthenticated, user }, dispatch] = useReducer(
    authReducer,
    initialState
  );
  function logIn(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "LOG_IN", payload: FAKE_USER });
  }
  function logOut() {
    dispatch({ type: "LOG_OUT" });
  }
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}
function useAuth() {
  const context = useContext(AuthContext);  
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
export { AuthProvider, useAuth };
