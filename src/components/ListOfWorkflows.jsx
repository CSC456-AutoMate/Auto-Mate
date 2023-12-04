import React, { useEffect, useState } from "react";
import { useUserAuth } from "./UserAuth";
import { db } from "../firebase";
import { collection, getDocs,} from "firebase/firestore"; 

function ListOfWorkflows() {

    useEffect(() => {
        // This function will be called once the component is mounted
        getWorkflow();
    }, []);

    const useAuth = useUserAuth();
    const [workflows, setWorkflows] = useState([]);


    //Gets workflow collection from logged in user email
    const getWorkflow = async () => {

        try {
            const querySnapshot = await getDocs(collection(db, "users", useAuth.user.email, "workflows"));

            if (querySnapshot) {
                setWorkflows(workflows,[])

                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data().names);

                    //Get names of actions and set that to workflows
                    const combinedString = doc.data().names.join(', ');
                    setWorkflows(prev => [...prev, combinedString])
                });
            } 
            else {
                // querySnapshot will be undefined in this case
                console.log("No such collection!");
            }
        } catch (err) {
          console.log("error",err)
          alert(err.message);
        }
    };

    const displayWorkflow = async () => {
        //TODO: hopefully find a way to show this workflow in workflow schedule
    };

    console.log("Workflow",workflows)






  return (
    <div>
        <div className="flex h-screen bg-slate-400">
            <div className="w-full max-w-xs m-auto bg-white rounded-lg p-5">
                <a data-testid="login-1" className="flex justify-center items-center mb-3 font-bold">List of Workflows</a>


                <div class="flex mb-4 items-center">
                
                <p class="w-full text-grey-darkest">{workflows[0]}</p>

                {/* I DO NOT GET WHY ITS NOT MAPPING LOL */}
                {/* TODO */}
                <ul>
                        {workflows.map((workflow, index) => (
                            <li key={index}>{workflow.name}</li>
                        ))}
                        <button class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green" onClick = {displayWorkflow}>Go</button>
                    
                </ul>

                </div>
            

                
            </div>

            
        </div>

    </div> 
  )
}

export default ListOfWorkflows