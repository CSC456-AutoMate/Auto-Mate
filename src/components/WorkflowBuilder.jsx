import React, { useState, useEffect } from "react";
import { useUserAuth } from "./UserAuth";
import { sendPasswordResetEmail } from "firebase/auth";
import axios from "axios";
import emailjs from '@emailjs/browser';

import {ref, set } from "firebase/database";
import { auth, db } from "../firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore"; 


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

class CreateAzureUser extends Task {
  async execute() {
    // Need to wait 3 minutes for Azure User to be created
    console.log("Wait 3 minutes for Azure User to be created")
    await new Promise((res) => setTimeout(res, 180000));
  }
}




// Send custom email action
class SendCustomEmail extends Task {
  constructor(emailDetails) {
    super();
    this.emailDetails = emailDetails;
  }

  async execute() {
    try {
      // Use emailjs.send instead of sendForm
      await emailjs.send('service_qvu8paj', 'template_7tqnf0e', this.emailDetails, '71STLWyPvmPlMDfeQ');
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }
}

class AddUserToGroup extends Task {
  async execute() {
    // Need to wait 3 minutes for User to be added to Group
    console.log("Wait 3 minutes for Azure User to be created")
    await new Promise((res) => setTimeout(res, 180000));
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

//Reset Password action (need to actually include the real sending email)
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

class CreateCalendarEvent extends Task {
  constructor(eventDetails) {
    super();
    this.eventDetails = eventDetails;
  }

  async execute() {
    const icsData = generateICSData(this.eventDetails);
    const blob = new Blob([icsData], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'event.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

function generateICSData(eventDetails) {
  const { date, startTime, endTime, message } = eventDetails;
  
  const startDate = new Date(`${date}T${startTime}`).toISOString().replace(/-|:|\.\d\d\d/g,"");
  const endDate = new Date(`${date}T${endTime}`).toISOString().replace(/-|:|\.\d\d\d/g,"");
  
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `DTSTART:${startDate}`,
    `DTEND:${endDate}`,
    `SUMMARY:${message}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\n');
}

//formating and logic
export default function Workflow() {


  const handleCancel = () => {
    // Close the form dialog or reset form fields
    setFormDialog(false); // Assuming you use a state to control the form's visibility
    // Reset form data if needed
    setFormData({
        //...initial state of your form
    });
};

  const addCalendarEventAction = () => {
    setSelectedActions((prev) => [
      ...prev,
      { name: "Create Calendar Event", data: calendarEventData },
    ]);
    setTasksCompleted((prev) => [...prev, false]);
    setCalendarEventDialog(false);
  };

  const addSendCustomEmailAction = () => {
    setSelectedActions((prev) => [
      ...prev,
      { name: "Send Custom Email", data: emailFormData },
    ]);
    setTasksCompleted((prev) => [...prev, false]);
    setEmailDialog(false);
    setEmailFormData({ from_name: "", to_name: "", message: "" });
  };
  
  const { signUp } = useUserAuth();
  const [selectedActions, setSelectedActions] = useState([]);
  const [tasksCompleted, setTasksCompleted] = useState([]);
  const [detailsDialog, setDetailsDialog] = useState(false);
  const [azureDialog, setAzureDialog] = useState(false);
  const [groupDialog, setGroupDialog] = useState(false);
  const [workflowName, setWorkflowName] = useState('')

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    jobRole: "",
  });
  const [emailFormData, setEmailFormData] = useState({
    from_name: "",
    to_name: "",
    message: "",
  });
  const [emailDialog, setEmailDialog] = useState(false);

const [calendarEventDialog, setCalendarEventDialog] = useState(false);
const [calendarEventData, setCalendarEventData] = useState({
  date: "",
  startTime: "",
  endTime: "",
  message: "",
});


  
  
  
  const useAuth = useUserAuth()
  const saveWorkflow = async () => {

    try {
      //Gets list of names from SelectedActions
      const namesArray = selectedActions.map(item => item.name);

      // Add a new document in collection "workflows"
      // So we add a new workflow doc under users, under this email, under workflows
      // We need to update the last parameter to change, maybe a useState count
      await setDoc(doc(db, "users" ,useAuth.user.email , "workflows" ,workflowName), {
        names: namesArray
      });

    } catch (err) {
      console.log("error",err)
      alert(err.message);
    }
  };








  const [azureFormData, setAzureFormData] = useState({
    display_name: "",
    mail_nickname: "",
    user_principal_name: "",
    password: "",
  });

  const [groupFormData, setGroupFormData] = useState({
    user_principal_name: ""
  });
  

  const addAction = (actionName) => {
    const lastAction = selectedActions[selectedActions.length - 1];
  
    // Logic for "Enter Details" action
    if (actionName === "Enter Details") {
      setDetailsDialog(true);
    } 
    // Logic for "Create User Login" action
    else if (
      actionName === "Create User Login" &&
      lastAction &&
      lastAction.name === "Enter Details"
    ) {
      setSelectedActions((prev) => [
        ...prev,
        { name: actionName, data: lastAction.data },
      ]);
      setTasksCompleted((prev) => [...prev, false]);
    } 
    // Logic for "Reset Password" action
    else if (
      actionName === "Reset Password" &&
      lastAction &&
      lastAction.name === "Create User Login"
    ) {
      setSelectedActions((prev) => [
        ...prev,
        { name: actionName, data: lastAction.data },
      ]);
      setTasksCompleted((prev) => [...prev, false]);
    } 
    // Logic for "Create Azure User" action
    else if (
      actionName === "Create Azure User"
    ) {
      setAzureDialog(true);
    } 
    // Logic for "Send Custom Email" action
    else if (actionName === "Send Custom Email") {
      // This will open the dialog for the user to input email details
      setEmailDialog(true);
    } else if (actionName === "Create Calendar Event") {
      setCalendarEventDialog(true);
    } else if (
      actionName === "Add User to Group"
    ) {
      setGroupDialog(true);
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


  const handleAzureUser = async (e) => {
    e.preventDefault();
    setSelectedActions((prev) => [
      ...prev,
      { name: "Create Azure User", data: azureFormData },
    ]);
    setTasksCompleted((prev) => [...prev, false]);
    setAzureDialog(false);
    setAzureFormData({ display_name:"", mail_nickname:"", user_principal_name:"", password:"" });

    try {
      const response = await axios.post('http://127.0.0.1:5000/', azureFormData);
      console.log(response.data);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleGroup = async (e) => {
    e.preventDefault();
    setSelectedActions((prev) => [
      ...prev,
      { name: "Add User to Group", data: groupFormData },
    ]);
    setTasksCompleted((prev) => [...prev, false]);
    setGroupDialog(false);
    setGroupFormData({user_principal_name:""});

    try {
      const response = await axios.post('http://127.0.0.1:5000/group', groupFormData);
      console.log(response.data);
    } catch (error) {
      console.error('Error adding user to group:', error);
    }
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
      let taskInstance;
      switch(action.name) {
        case "Enter Details":
          taskInstance = new EnterDetails(action.data);
          break;
        case "Create User Login":
          taskInstance = new CreateUserLogin(action.data, signUp);
          break;
        case "Reset Password":
          taskInstance = new SendEmail(action.data);
          break;
        case "Send Custom Email":
          taskInstance = new SendCustomEmail(action.data);
          break;
        case "Create Azure User":
          taskInstance = new CreateAzureUser();
          break;
        case "Create Calendar Event": // New case for creating calendar event
          taskInstance = new CreateCalendarEvent(action.data);
          break;
        // ... [any other cases]
      }
      await taskInstance.execute();
      setTasksCompleted((prev) => {
        const newStatus = [...prev];
        newStatus[i] = true;
        return newStatus;
      });
    }
  };

  return (
    <div className="p-4 flex flex-col">
      {/* <h1 className="text-2xl mb-4">Custom Workflow Builder</h1> */}

      {detailsDialog && (
        <div className="mb-4 flex flex-col justify-center bg-gray-300 m-auto rounded-lg p-5">
          <h2 className="justify-center text-center">Enter Details</h2>
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
            <label>Role:</label>
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
            Add Enter Details
          </button>
          <button
            onClick={() => setDetailsDialog(false)}
            className="mt-4 bg-blue-500 text-white p-2 rounded"
          >
            Close
          </button>
        </div>
      )}
      
      {emailDialog && (
  <div className="mb-4 flex flex-col justify-center bg-gray-300 m-auto rounded-lg p-5">
    <h2 className="text-center">Send Custom Email</h2>
    <div>
      <label>From Name:</label>
      <input
        type="text"
        value={emailFormData.from_name}
        onChange={(e) =>
          setEmailFormData((prev) => ({ ...prev, from_name: e.target.value }))
        }
        className="ml-2 border rounded p-1"
      />
    </div>
    <div className="mt-2">
      <label>To Email:</label>
      <input
        type="text"
        className="ml-2 border rounded p-1"
      />
    </div>
    <div className="mt-2">
      <label>To Name:</label>
      <input
        type="text"
        value={emailFormData.to_name}
        onChange={(e) =>
          setEmailFormData((prev) => ({ ...prev, to_name: e.target.value }))
        }
        className="ml-2 border rounded p-1"
      />
    </div>
    <div className="mt-2 mb-4">
      <label>Message:</label>
      <textarea
        value={emailFormData.message}
        onChange={(e) =>
          setEmailFormData((prev) => ({ ...prev, message: e.target.value }))
        }
        className="ml-2 border rounded p-1"
      />
    </div>
    <button
      onClick={addSendCustomEmailAction}
      className="mt-4 bg-blue-500 text-white p-2 rounded"
    >
      Add Custom Email
    </button>
    <button
      onClick={() => setEmailDialog(false)}
      className="mt-4 bg-blue-500 text-white p-2 rounded"
    >
      Close
    </button>
  </div>
)}

{calendarEventDialog && (
  <div className="mb-4 flex flex-col justify-center bg-gray-300 m-auto rounded-lg p-5">
    <h2>Calendar Event Details</h2>
    <input
      type="date"
      value={calendarEventData.date}
      onChange={(e) => setCalendarEventData({...calendarEventData, date: e.target.value})}
    />
    <input
      type="time"
      value={calendarEventData.startTime}
      onChange={(e) => setCalendarEventData({...calendarEventData, startTime: e.target.value})}
    />
    <input
      type="time"
      value={calendarEventData.endTime}
      onChange={(e) => setCalendarEventData({...calendarEventData, endTime: e.target.value})}
    />
    <textarea
      className="bg-gray-100"
      value={calendarEventData.message}
      onChange={(e) => setCalendarEventData({...calendarEventData, message: e.target.value})}
    />
    <button className="mt-4 bg-blue-500 text-white p-2 rounded" onClick={() => addCalendarEventAction()}>Add Calendar Event</button>
    <button className="mt-4 bg-blue-500 text-white p-2 rounded" onClick={() => setCalendarEventDialog(false)}>Close</button>
  </div>
)}
      {/* Azure User Details */}
      {azureDialog && (
        <div className="mb-4 flex flex-col justify-center bg-gray-300 m-auto rounded-lg p-5">
        <form onSubmit={handleAzureUser}>
          <h1>Enter Azure User Details</h1>
          <div>
            <label>Display Name:</label>
            <input
              type="text"
              id = "displayName"
              name="displayName"
              value={azureFormData.display_name}
              onChange={(e) =>
                setAzureFormData((prev) => ({ ...prev, display_name: e.target.value }))
              }
              className="ml-2 border rounded p-1"
            />
          </div>
          <div className="mb-4">
            <label>Mail Nickname:</label>
            <input
              type="text"
              id = "mailNickname"
              name="mailNickname"
              value={azureFormData.mail_nickname}
              onChange={(e) =>
                setAzureFormData((prev) => ({ ...prev, mail_nickname: e.target.value }))
              }
              className="ml-2 border rounded p-1"
            />
          </div>
          <div className="mb-4">
            <label>User Principal Name:</label>
            <input
              type="text"
              id = "userPrincipalName"
              name="userPrincipalName"
              value={azureFormData.user_principal_name}
              onChange={(e) =>
                setAzureFormData((prev) => ({ ...prev, user_principal_name: e.target.value }))
              }
              className="ml-2 border rounded p-1"
            />
          </div>
          <div className="mb-4">
            <label>Password:</label>
            <input
              type="text"
              id = "password"
              name="password"
              value={azureFormData.password}
              onChange={(e) =>
                setAzureFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              className="ml-2 border rounded p-1"
            />
          </div>
          <br />
          <button className="mt-4 bg-blue-500 text-white p-2 rounded" type="submit" >Add Azure</button>
          <button className="mt-4 bg-blue-500 text-white p-2 rounded" onClick={() => setAzureDialog(false)}>Close</button>
        </form>
        </div>
      )}


      {/* Add User to Group Details */}
      {groupDialog && (
        <div className="mb-4 flex flex-col justify-center bg-gray-300 m-auto rounded-lg p-5">
        <form onSubmit={handleGroup}>
          <h1 style={{ color: 'red' }}>WAIT FOR NEW USER TO BE CREATED BEFORE ADDING TO GROUP (wait ~ 3 mins)</h1>
          <h1>Enter User Principal Name</h1>
          <div >
            <label>User Principal Name:</label>
            <input
              type="text"
              id = "userPrincipalName"
              name="userPrincipalName"
              value={groupFormData.user_principal_name}
              onChange={(e) =>
                setGroupFormData((prev) => ({ ...prev, user_principal_name: e.target.value }))
              }
              className="ml-2 border rounded p-1"
            />
          </div>
          <br />
          <button className="mt-4 bg-blue-500 text-white p-2 rounded" type="submit" >Submit</button>
          <button className="mt-4 bg-blue-500 text-white p-2 rounded" onClick={()=> setGroupDialog(false)} >close</button>


        </form>
        </div>
      )}

      {/* Add Actions */}
      <div className="mb-4">
        <h2>Add Actions</h2>
        {["Enter Details", "Create User Login", "Reset Password", "Create Azure User", "Send Custom Email", "Create Calendar Event", "Add User to Group"].map(
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
        <h2 className="text-center">Selected Actions</h2>
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
      {selectedActions.length > 0 && (
        <div className="flex flex-col justify-center align-items">
        <input
          type="text"
          className="mt-4 p-2 rounded"
          placeholder="Enter workflow name"
          value={workflowName}
          onChange={(e) => setWorkflowName(e.target.value)} 
        />
        <button
          className="mt-4 bg-green-500 text-white p-2 rounded"
          onClick={saveWorkflow}
        >
          Save Workflow
        </button>
      </div>
        )}

      


    </div>
  );
}
