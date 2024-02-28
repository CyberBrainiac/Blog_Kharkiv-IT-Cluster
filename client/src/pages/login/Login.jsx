import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import './login.scss';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [err, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const inpName = event.target.name;
    const inpValue = event.target.value
    setInputs((prev) => ({ ...prev, [inpName]: inpValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <h1>Login</h1>
        <form>
          <input
            type="email"
            placeholder="email"
            name="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={handleChange}
          />
          <button className="login__button" onClick={handleSubmit}>Click to Login</button>
          <span className="login__redirect">
            Create account <Link to="/register">Register</Link>
          </span>
          {err && <p className="login__error">{err}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;