import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Auth(props) {
  const { setShowModal } = props;
  const [isRegistration, setIsRegistration] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthentication, setIsAuthentication] = useState(false);
  const [error, setError] = useState(null);
  const { signup, login } = useAuth();
  async function handleAuth() {
    if (
      !email ||
      !email.includes("@") ||
      !password ||
      !password.length > 6 ||
      isAuthentication
    ) {
      return;
    }
    try {
      setError(null);
      setIsAuthentication(true);
      if (isRegistration) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
      setShowModal(false);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setIsAuthentication(false);
    }
  }
  return (
    <>
      <h2 className="sign-up-text">{isRegistration ? "Sign up" : "Log in"}</h2>
      <p>
        {isRegistration ? "Create new account" : "Sign up to your account"}{" "}
      </p>
      {error && <p>{error}</p>}
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="******"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button onClick={handleAuth}>
        <p>{isAuthentication ? "Authenticating" : "Submit"}</p>
      </button>
      <hr />
      <div className="register-content">
        <p>
          {isRegistration
            ? "Already have an account?"
            : `Don't have an account? Sign up`}
        </p>
        <button
          onClick={() => {
            setIsRegistration(!isRegistration);
          }}
        >
          <p>{isRegistration ? "Sign in" : "Sign up"}</p>
        </button>
      </div>
    </>
  );
}

export default Auth;
