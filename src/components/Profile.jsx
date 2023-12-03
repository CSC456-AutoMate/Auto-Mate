import React, { useState } from "react";
import { useUserAuth } from "./UserAuth";
import { getAuth, updatePassword } from "firebase/auth";


const Profile = () => {

        const useAuth = useUserAuth();
        const auth = getAuth();
        const user = auth.currentUser;
        const [password, newPassword] = useState("");
        const [error, setErr] = useState(false);
    
        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                await updatePassword(user, password);
                alert("success")
                console.log(e)
            } catch (err) {
                console.log(err)
                setErr(true);
            }
        }   
    
    
    return (
        <div className="flex h-screen bg-slate-400">
            <div className="w-full max-w-xs m-auto bg-white rounded-lg p-5">
                <a data-testid="login-1" className="flex justify-center items-center mb-3 font-bold">User Profile</a>

                <div>
                <label className="block mb-2 text-indigo-500" htmlFor="email">Email: {useAuth.user.email}</label>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>  
                        <h3>Enter New Password -</h3>
                        <input type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => newPassword(e.target.value)} 
                        className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" name="new password" id= "newPassword"/>
                    </div>
                    <div>          
                        <button data-testid="updatePassword-button" className="w-full bg-indigo-700 hover:bg-green-700 text-white font-bold py-2 px-4 mb-6 rounded" type="submit">Update Password</button>
                    </div> 
                </form>

                
            </div>

            
        </div>
)
}


export default Profile