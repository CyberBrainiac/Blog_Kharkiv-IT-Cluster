import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './register.scss';

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    usersurname: "",
    email: "",
    password: "",
  });

  const [err, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const inpName = event.target.name;
    const inpValue = event.target.value

    if (!inpValue.trim()) {
      setError(`${inpName} can't contain empty value` );
      return;
    }
    setInputs((prev) => ({ ...prev, [inpName]: inpValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const inputsValues = Object.values(inputs);
    if (inputsValues.some((elem) => !elem)) {
      setError(`You must provide all fields`);
      return;
    }
    try {
      await axios.post("/auth/register", inputs);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="auth">
      <div className="auth__container">
        <h1>Register</h1>
        <form>
          <input
            required
            type="text"
            placeholder="user name"
            name="username"
            onChange={handleChange}
          />
          <input
            required
            type="text"
            placeholder="user surname"
            name="usersurname"
            onChange={handleChange}
          />
          <input
            required
            type="email"
            placeholder="email"
            name="email"
            onChange={handleChange}
          />
          <input
            required
            type="password"
            placeholder="password"
            name="password"
            onChange={handleChange}
          />
          <button type="submit" className="auth__button" onClick={handleSubmit}>Register</button>{" "}
          <span className="auth__redirect">
            If you have account <Link to="/login">Login</Link>{" "}
          </span>
          {err && <p className="auth__error">{err}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;