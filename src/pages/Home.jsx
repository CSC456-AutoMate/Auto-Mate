import React from "react";
import { useUserAuth } from "../components/UserAuth";

const Home = () => {

  return (
    <div class="flex h-screen bg-slate-400">
      <div class="w-full max-w-xs m-auto bg-white rounded-lg p-5">
        <div class="justify-center items-center">
          <h1>Welcome User!</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
