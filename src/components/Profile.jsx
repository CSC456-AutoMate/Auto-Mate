import React, { useState } from "react";
import { useUserAuth } from "./UserAuth";
import { updatePassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, doc, setDoc } from "firebase/firestore"; 
import ListOfWorkflows from "./ListOfWorkflows";


const Profile = () => {

        const useAuth = useUserAuth();
        const user = useAuth.getUser();
        const [password, newPassword] = useState("");
        const [cPassword, confirmPassword] = useState("");
        const navigate = useNavigate();
        const [showComponent, setShowComponent] = useState(false);

        const handleClick = () => {
            setShowComponent(true);
        };

    
        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                if (cPassword != password) {
                    alert("Password must be the same as old password")
                }
                else{
                    await updatePassword(user, password);
                    navigate("/")
                    console.log(e)
                }
            } catch (err) {
                console.log(err)
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
                        <h3>Confirm Password -</h3>
                        <input type="password"
                        placeholder="Password"
                        value={cPassword}
                        onChange={(e) => confirmPassword(e.target.value)} 
                        className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" name="new password" id= "ogPassword"/>
                    </div>
                    <div>          
                        <button data-testid="updatePassword-button" className="w-full bg-indigo-700 hover:bg-green-700 text-white font-bold py-2 px-4 mb-6 rounded" type="submit">Update Password</button>
                    </div> 
                </form>
                
            </div>
            <div>
                        <button className="w-full bg-indigo-700 hover:bg-green-700 text-white font-bold py-2 px-4 mb-6 rounded" onClick={handleClick}>Display Workflows</button>
                        {showComponent && <ListOfWorkflows/>}

                </div>
        </div>
        
    </div> 
)
}


export default Profile