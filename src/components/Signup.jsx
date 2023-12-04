import React, { useState } from "react";
import { useUserAuth } from "./UserAuth";
import { useNavigate, Link } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErr] = useState(false);
  const { signUp, user } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password).then(async () => {
        await addUserdata();
        navigate("/");
      })
    } catch (err) {
   
      setErr(true);
    }
  };

  const addUserdata = async (e) => {
    await setDoc(doc(db, "users", email), {
      email: email,
      role: "",
    })
      .then((docRef) => {
        console.log("Document Id:", docRef.id);
      })
      .catch((error) => {
        console.log("Error adding document:", error);
      });
  };

  return (
    <div className="flex h-screen bg-gradient-to-b from-slate-300 to-slate-600">
      <div className="w-full max-w-xs m-auto bg-white rounded-lg p-5">
        <a data-testid="signup-heading" className="flex justify-center items-center mb-3 font-bold">SignUp</a>
        {/* <img className="w-20 mx-auto mb-5" src={} /> */}
        <form onSubmit={handleSubmit}>
          <div>
          <span data-testid="signup-error" style={{visibility: error ? "visible" : "hidden", color: "red"}} >Sign up error</span>
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
            <button className="w-full bg-indigo-700 hover:bg-green-700 text-white font-bold py-2 px-4 mb-6 rounded" type="submit">SignUp</button>
          </div>       
        </form>
        <a className="text-indigo-700 hover:text-green-700 text-sm flex justify-center items-center"><Link data-testid="redirectLink" to="/login">Already have an Account? Login</Link></a>
      </div>
    </div>
  )
}

export default Signup;
