import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8800/api/register", {
        email,
        password,
      });
    } catch (err) {
      console.log(err);
    }
  };

  console.log(email, password, "<<< Register");

  return (
    <section>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
        />
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
        />
        <input type="submit" />
      </form>
      <br />
      <p>OR</p>
      <br />
      <Link to={"/login"}>Already Have an account ?</Link>
    </section>
  );
};

export default Register;
