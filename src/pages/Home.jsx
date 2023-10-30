import React from "react";
import { useUserAuth } from "../components/UserAuth";
import Workflow from "../components/WorkflowBuilder";

const Home = () => {

  return (
    <div className="flex h-screen bg-slate-400">
      <div className="w-full max-w-xs m-auto bg-white rounded-lg p-5">
        <div className="justify-center items-center">
          <h1 data-testid="home-1">Welcome User!</h1>
          <Workflow />
        </div>
      </div>
    </div>
  );
};

export default Home;
