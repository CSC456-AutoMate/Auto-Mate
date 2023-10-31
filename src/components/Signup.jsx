import React, { useState } from "react";
import { useUserAuth } from "./UserAuth";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const  {signUp}  = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      alert("Success")
      navigate("/login");
    } catch (err) {
      //alert("2 Invalid credentials")
      console.log(err, 'ERROR');
      alert(err)
    }
    
  };

  return (
    <div class="flex h-screen bg-slate-400">
      <div class="w-full max-w-xs m-auto bg-white rounded-lg p-5">
        <a class="flex justify-center items-center mb-3 font-bold">SignUp</a>
        {/* <img class="w-20 mx-auto mb-5" src={} /> */}
        <form onSubmit={handleSubmit}>
          <div>
            <label class="block mb-2 text-indigo-500" for="username">Username</label>
            <input type="email"
                   placeholder="City College Email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   class="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" name="username"/>
          </div>
          <div>
            <label class="block mb-2 text-indigo-500" for="password">Password</label>
            <input type="password"
                   placeholder="Password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)} 
                   class="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" name="password"/>
          </div>
          <div>          
            <button class="w-full bg-indigo-700 hover:bg-green-700 text-white font-bold py-2 px-4 mb-6 rounded" data-testid="signup-button" type="submit">SignUp</button>
          </div>       
        </form>
        <a class="text-indigo-700 hover:text-green-700 text-sm flex justify-center items-center"><Link to="/login">Already have an Account? Login</Link></a>
      </div>
    </div>
  )
}

export default Signup;
