import React from "react";
import { useUserAuth } from "../components/UserAuth";
import Workflow from "../components/WorkflowBuilder";
import DragAndDrop from "../components/DragAndDrop";

const Home = () => {
  return (
    <div className="flex text-center justify-center h-screen bg-red-400">
      <div className="max-w-xs bg-white rounded-lg p-5 ml-2">
        <div className="justify-center items-center">
          <h1 data-testid="home-1">Welcome User!</h1>
          <DragAndDrop />
        </div>
      </div>
    </div>
  );
};

export default Home;
