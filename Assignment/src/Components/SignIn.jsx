import React from "react"; 
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function SignIn() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let endPoint = "https://full-stack-slgm.onrender.com/signin";
  const handleSubmit = (e) => {
    e.preventDefault();
    const userLogin = { email, password }
    axios.post(endPoint, userLogin)
    .then((res)=>{
      let token = res.data.token
      if(res.status === 200){
        alert("User signed in successfully")
        if(token){
          localStorage.setItem("token", JSON.stringify(token))
          navigate("/dashboard")
        }

      }else{
        alert("User sign in failed")
      }
    })
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded mb-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded mb-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="w-full bg-blue-500 text-white p-2 rounded">
            Sign In
          </button>
        </form>
        <p className="mt-4 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
