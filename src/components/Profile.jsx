import React, { useState, useEffect } from "react";
import { useUserAuth } from "./UserAuth";
import { getAuth, updatePassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const Profile = () => {
    const useAuth = useUserAuth();
    const auth = getAuth();
    const user = auth.currentUser;
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);
    const [role, setRole] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            await updatePassword(user, newPassword);
            alert("Password successfully updated");
        } catch (err) {
            console.error(err);
            setError(true);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(db, "users", user.email);
                const docSnap = await getDoc(docRef);
                setRole(docSnap.data().role);
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, [user.email]);

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
            </div>
        </div>
    );
};

export default Profile;
