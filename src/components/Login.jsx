import React, { useState } from "react";
import { useUserAuth } from "./UserAuth";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn } = useUserAuth();
  const [error, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await logIn(email, password);
      navigate("/");
    } catch (err) {
      
      setErr(true);
    }
  };

  return (
    <div className="flex h-screen bg-slate-400">
      <div className="w-full max-w-xs m-auto bg-white rounded-lg p-5">
        <a data-testid="login-1" class="flex justify-center items-center mb-3 font-bold">Login</a>
        {/* <img class="w-20 mx-auto mb-5" src={} /> */}
        <form onSubmit={handleSubmit}>
          <div>
          <span data-testid="login-error" style={{visibility: error ? "visible" : "hidden", color: "red"}} >Login Error</span>
            <label className="block mb-2 text-indigo-500" for="username">Username</label>
            <input type="email"
                   placeholder="Email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" name="username"/>
          </div>
          <div>
            <label className="block mb-2 text-indigo-500" for="password">Password</label>
            <input type="password"
                   placeholder="Password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)} 
                   className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" name="password"/>
          </div>
          <div>          
            <button data-testid="login-button" className="w-full bg-indigo-700 hover:bg-green-700 text-white font-bold py-2 px-4 mb-6 rounded" type="submit">Login</button>
          </div>       
        </form>
        <a className="text-indigo-700 hover:text-green-700 text-sm flex justify-center items-center"><Link to="/signup">Dont Have an Account? Signup</Link></a>
      </div>
    </div>
  )
}

export default Login;
