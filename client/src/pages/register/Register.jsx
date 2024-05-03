import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8800/api/register", {
        email,
        password,
        name,
      });
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="bg-white text-black min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="font-bold text-3xl mb-8 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Name"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="submit"
            className="w-full p-2 border border-black bg-black text-white rounded cursor-pointer hover:bg-white hover:text-black hover:border-transparent transition-colors"
          />
        </form>
        <div className="flex items-center justify-center mt-6">
          <p className="mr-2">OR</p>
          <Link to={"/login"} className="text-blue-500 hover:underline">
            Already Have an account ?
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Register;
