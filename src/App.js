import logo from "./logo.svg";
import "./App.css";
import React, { useState, useReducer } from "react";
import { login } from "./apiService";

const loginReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { ...state, isLoading: true };
    case "error":
      return {
        ...state,
        isLoading: false,
        error: "Invalid username or password",
        isLoggedIn: false,
      };
    case "success":
      return {
        ...state,
        isLoading: false,
        error: "",
        isLoggedIn: true,
        password: "",
      };
    case "logout":
      return {
        ...state,
        isLoggedIn: false,
        username: "",
      };
    case "field":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    default:
      return state;
  }
};
const initialValue = {
  username: "",
  password: "",
  isLoading: false,
  error: "",
  isLoggedIn: false,
};

function App() {
  const [state, dispatch] = useReducer(loginReducer, initialValue);

  const { username, password, isLoading, error, isLoggedIn } = state;

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "login" });
    try {
      await login({ username, password });
      dispatch({ type: "success" });
    } catch (error) {
      dispatch({ type: "error" });
    }
  };

  return (
    <div className="App">
      <div className="login-container">
        {isLoggedIn ? (
          <>
            <h1>Welcome {username}!</h1>
            <button onClick={() => dispatch({ type: "logout" })}>
              Log Out
            </button>
          </>
        ) : (
          <form className="form" onSubmit={onSubmit}>
            <h1>Log In</h1>
            <p className="error">{error}</p>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) =>
                dispatch({
                  type: "field",
                  payload: { name: "username", value: e.currentTarget.value },
                })
              }
            />
            <input
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              value={password}
              onChange={(e) =>
                dispatch({
                  type: "field",
                  payload: { name: "password", value: e.currentTarget.value },
                })
              }
            />
            <button className="submit" type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Submit"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;
