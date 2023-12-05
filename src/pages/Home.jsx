import React from "react";
import { useUserAuth } from "../components/UserAuth";
import Workflow from "../components/WorkflowBuilder";

const Home = () => {

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-slate-300 to-slate-600 items-center justify-center">
      <div className="w-full max-w-xs m-auto bg-white rounded-lg p-5 m-5">
        <div className="flex flex-col justify-center items-center">
          <h1 data-testid="home-1">Workflow Builder</h1>
          <Workflow />
        </div>
      </div>
    </div>
  );
};

export default Home;
