import React, { useState } from "react";
import { useUserAuth } from "./UserAuth";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

// This needs changing to actually handle sending an email, with also formating "i.e Dear email, here is your login: email, password..."
const mockFirebaseSendEmail = async (email, password) => {
  await new Promise((res) => setTimeout(res, 2000));
};

//parent class
class Task {
  async execute() {}
}

//child class represent actions (should probably put in differnt file to clean up)
//note: must require exectue() and await to ensure an action is completed before moving to the next task

//enter details action
class EnterDetails extends Task {
  constructor(data) {
    super();
    this.data = data;
  }

  async execute() {
    await new Promise((res) => setTimeout(res, 1000));
  }
}

//create login action
class CreateUserLogin extends Task {
  constructor(details, signUpFunc) {
    super();
    this.data = details;
    this.signUp = signUpFunc;
  }

  async execute() {
    try {
      await this.signUp(this.data.email, "password");
    } catch (err) {
      console.log("Error creating user:", err);
    }
  }
}

//send email action (need to actually include the real sending email)
class SendEmail extends Task {
  constructor(details) {
    super();
    this.data = details;
  }

  async execute() {
    //await mockFirebaseSendEmail(this.data.email, this.data.password);
    try{
      await sendPasswordResetEmail(auth, this.data.email);
    } catch (err){
      alert(err.code)
    }
  }
}

//formating and logic
export default function Workflow() {
  const { signUp } = useUserAuth();
  const [selectedActions, setSelectedActions] = useState([]);
  const [tasksCompleted, setTasksCompleted] = useState([]);
  const [detailsDialog, setDetailsDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    jobRole: "",
  });

  const addAction = (actionName) => {
    const lastAction = selectedActions[selectedActions.length - 1];

    if (actionName === "Enter Details") {
      setDetailsDialog(true);
    } else if (
      actionName === "Create User Login" &&
      lastAction &&
      lastAction.name === "Enter Details"
    ) {
      setSelectedActions((prev) => [
        ...prev,
        { name: actionName, data: lastAction.data },
      ]);
      setTasksCompleted((prev) => [...prev, false]);
    } else if (
      actionName === "Send Email" &&
      lastAction &&
      lastAction.name === "Create User Login"
    ) {
      setSelectedActions((prev) => [
        ...prev,
        { name: actionName, data: lastAction.data },
      ]);
      setTasksCompleted((prev) => [...prev, false]);
    }
  };

  const addEnterDetailsAction = () => {
    setSelectedActions((prev) => [
      ...prev,
      { name: "Enter Details", data: formData },
    ]);
    setTasksCompleted((prev) => [...prev, false]);
    setDetailsDialog(false);
    setFormData({ name: "", email: "", jobRole: "" });
  };

  const removeAction = (indexToRemove) => {
    setSelectedActions((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
    setTasksCompleted((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };


  const runWorkflow = async () => {
    for (let i = 0; i < selectedActions.length; i++) {
      const action = selectedActions[i];
      const taskInstance =
        action.name === "Enter Details"
          ? new EnterDetails(action.data)
          : action.name === "Create User Login"
          ? new CreateUserLogin(action.data, signUp)
          : new SendEmail(action.data);
      await taskInstance.execute();
      setTasksCompleted((prev) => {
        const newStatus = [...prev];
        newStatus[i] = true;
        return newStatus;
      });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Custom Workflow Builder*</h1>

      {detailsDialog && (
        <div className="mb-4">
          <h2>Enter Details</h2>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="ml-2 border rounded p-1"
            />
          </div>
          <div className="mt-2">
            <label>Email:</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="ml-2 border rounded p-1"
            />
          </div>
          <div className="mt-2 mb-4">
            <label>Job Role:</label>
            <input
              type="text"
              value={formData.jobRole}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, jobRole: e.target.value }))
              }
              className="ml-2 border rounded p-1"
            />
          </div>
          <button
            onClick={addEnterDetailsAction}
            className="mt-4 bg-blue-500 text-white p-2 rounded"
          >
            Add "Enter Details" Action
          </button>
        </div>
      )}

      {/* Add Actions */}
      <div className="mb-4">
        <h2>Add Actions</h2>
        {["Enter Details", "Create User Login", "Send Email"].map(
          (actionName) => (
            <button
              key={actionName}
              className="mr-2 mb-2 bg-gray-300 p-2 rounded"
              onClick={() => addAction(actionName)}
            >
              {actionName}
            </button>
          )
        )}
      </div>

      {/* Display Selected Actions */}
      <div className="mb-4">
        <h2>Selected Actions</h2>
        <ul>
          {selectedActions.map((action, index) => (
            <li key={index} className="mb-2 flex items-center">
              {tasksCompleted[index] ? (
                <span className="text-green-500 mr-2">&#x2714;</span>
              ) : null}
              {action.name}
              <button
                onClick={() => removeAction(index)}
                className="ml-4 bg-red-500 text-white p-1 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Execute Custom Workflow */}
      <button
        className="mt-4 bg-blue-500 text-white p-2 rounded"
        onClick={runWorkflow}
      >
        Start Custom Workflow
      </button>
    </div>
  );
}
