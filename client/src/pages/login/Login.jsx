// import axios from "axios";
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post("http://localhost:8800/api/login", {
//         email,
//         password,
//       });
//       console.log(res.data);
//       if (res.data === "Success") {
//         navigate("/home");
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <section>
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           onChange={(e) => {
//             setEmail(e.target.value);
//           }}
//           placeholder="Email"
//         />
//         <input
//           type="password"
//           onChange={(e) => {
//             setPassword(e.target.value);
//           }}
//           placeholder="Password"
//         />
//         <button type="submit">Login</button>
//       </form>
//       <br />
//       <p>OR</p>
//       <br />
//       <Link to={"/register"}>Don't have account?</Link>
//     </section>
//   );
// };

// export default Login;

import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8800/api/login", {
        email,
        password,
      });
      console.log(res.data);
      if (res.data === "Success") {
        navigate("/home");
      } else {
        setErrorMessage("Either email or password is incorrect.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="bg-white text-black min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="font-bold text-3xl mb-8 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errorMessage && (
            <p className="text-red-500 mt-4 text-center">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="w-full p-2 border border-black bg-black text-white rounded cursor-pointer hover:bg-white hover:text-black hover:border-transparent transition-colors"
          >
            Login
          </button>
        </form>
        <div className="flex items-center justify-center mt-6">
          <p className="mr-2">OR</p>
          <Link to="/register" className="text-blue-500 hover:underline">
            Don't have an account?
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
