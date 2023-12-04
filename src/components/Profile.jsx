import React, { useState, useEffect } from "react";
import { useUserAuth } from "./UserAuth";
import { updatePassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";import { useNavigate } from "react-router-dom";
import ListOfWorkflows from "./ListOfWorkflows";


const Profile = () => {

    const useAuth = useUserAuth();
    const user = useAuth.getUser();
    const [newPassword, setNewPassword] = useState(""); // Corrected useState
    const [confirmPassword, setConfirmPassword] = useState(""); // Corrected useState
    const navigate = useNavigate();
    const [showComponent, setShowComponent] = useState(false);
    const [role, setRole] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(""); // Renamed from setErr for consistency

    const handleClick = () => {
        setShowComponent(true);
    };

    const handleCloseClick = () => {
        setShowComponent(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(db, "users", useAuth.user.email);
                const docSnap = await getDoc(docRef);
                console.log(docSnap.data());
                setRole(docSnap.data().role);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, [useAuth.user.email]);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (confirmPassword !== newPassword) {
    //         setError("Passwords do not match.");
    //         return;
    //     }
    //     try {
    //         await updatePassword(user, newPassword);
    //         navigate("/");
    //     } catch (err) {
    //         console.log(err);
    //         setError(err.message);
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (confirmPassword != newPassword) {
                alert("Password must be the same as old password")
            }
            else{
                await updatePassword(user, newPassword);
                navigate("/")
                console.log(e)
            }
        } catch (err) {
            console.log(err)
        }
    }
    
    return (
        <div className="flex h-screen bg-gradient-to-b from-slate-300 to-slate-600">
            <div className="w-full max-w-xs m-auto bg-white rounded-lg p-5">


                <h2 data-testid="login-1" className="flex justify-center items-center mb-3 font-bold">User Profile</h2>

                <div>
                    <label className="block mb-2">Email: <a className="text-indigo-500">{useAuth.user.email}</a></label>
                    <label className="block mb-2">Role: <a className="text-indigo-600">{role}</a></label>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>  
                        <label htmlFor="newPassword">Enter New Password:</label>
                        <input type={showPassword ? "text" : "password"}
                               placeholder="New Password"
                               value={newPassword}
                               onChange={(e) => setNewPassword(e.target.value)} 
                               className="w-full p-2 mb-2 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" />

                        <label htmlFor="confirmPassword">Confirm New Password:</label>
                        <input type={showPassword ? "text" : "password"}
                               placeholder="Confirm Password"
                               value={confirmPassword}
                               onChange={(e) => setConfirmPassword(e.target.value)} 
                               className="w-full p-2 mb-2 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" />
                        
                        <div className="mb-3">
                            <input type="checkbox" 
                                   id="showPassword"
                                   checked={showPassword}
                                   onChange={() => setShowPassword(!showPassword)} />
                            <label htmlFor="showPassword" className="ml-2">Show Password</label>
                        </div>
                    </div>
                    
                    {error && <p className="text-red-500">{error}</p>}
                    <button data-testid="updatePassword-button" className="w-full bg-indigo-700 hover:bg-green-700 text-white font-bold py-2 px-4 mb-6 rounded" type="submit">Update Password</button>
                </form>
                <button className="w-full bg-indigo-700 hover:bg-green-700 text-white font-bold py-2 px-4 mb-6 rounded" onClick={handleClick}>Display Workflows</button>
                
            </div>
            <div>
                

                </div>
                {showComponent && (
                            <div className="w-full max-w-xs m-auto bg-white rounded-lg p-5">
                            <ListOfWorkflows />

                            <button
                                className=""
                                onClick={handleCloseClick}
                            >
                                Close Workflows
                            </button>
                            </div>
                        )}
        </div>
        

    );
};

export default Profile;
