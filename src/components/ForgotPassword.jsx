import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        sendPasswordResetEmail(auth, email).then(data => {
            alert("Password reset completed, check your email.");
            navigate("/login");
        }).catch(err => {
            alert(err);
        })
    }

    return ( 
        <div className="flex h-screen bg-slate-400">
        <div className="w-full max-w-xs m-auto bg-white rounded-lg p-5">
          <a data-testid="login-1" class="flex justify-center items-center mb-3 font-bold">Password Reset</a>
          {/* <img class="w-20 mx-auto mb-5" src={} /> */}
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <label className="block mb-2 text-indigo-500" for="username">Email</label>
              <input type="email"
                     placeholder="Email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" name="username"/>
            </div>
            <div>          
              <button data-testid="login-button" className="w-full bg-indigo-700 hover:bg-green-700 text-white font-bold py-2 px-4 mb-6 rounded" type="submit">Reset</button>
            </div>       
          </form>
          <a className="text-indigo-700 hover:text-green-700 text-sm flex justify-center items-center"><Link to="/signup">Need an Account? Signup</Link></a>
        </div>
      </div>
     );
}
 
export default ForgotPassword;