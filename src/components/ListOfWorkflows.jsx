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
                    console.log(doc.id, " => ", doc.data());

                    //Get names of actions and set that to workflows
                    // const combinedString = doc.data().names.join(', ');
                    const newData = {
                        "id": doc.id,
                        "name": doc.data().names
                    };
                    setWorkflows(prevWorkflows => [...prevWorkflows, newData]);

                    
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


    console.log("WorkflowREAL",workflows)

    //TODO: hopefully find a way to show this workflow in workflow schedule
    //Given selectedActions names, try to generate the workflow in workflowBuilder
    const displayWorkflow = async (names) => {
    };






  return (
    <div>
        {/* <div className="flex h-screen bg-slate-400"> */}
            <div className="w-full max-w-xs m-auto bg-white rounded-lg p-5">
                <a data-testid="login-1" className="flex justify-center items-center mb-3 font-bold">List of Workflows</a>

                
                    <p class="w-full text-grey-darkest"></p>

                    {/* MAPS THE WORKFLOW */}
                    <div className="space-y-4">
                        {workflows.map((workflow, index) => (
                            <React.Fragment key={index}>
                            <div className="flex items-center"> {/* Use flex and items-center to align workflow.id and button horizontally */}
                                <span className="mr-2">{workflow.id}</span> {/* Add margin to create space between workflow.id and button */}
                                <button
                                className="flex-no-shrink p-2 border-2 rounded hover:text-white text-green border-green hover:bg-green"
                                onClick={() => displayWorkflow(workflow.names)} // Pass workflow.names to displayWorkflow function
                                >
                                Go
                                </button>
                            </div>
                            </React.Fragment>
                        ))}
                    </div>



                
            </div>

            
        </div>

    // </div> 
  )
}

export default ListOfWorkflows