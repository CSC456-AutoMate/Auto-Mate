import React from 'react'
import logo from "../assets/logo.png"
import { Link } from 'react-router-dom'
import azure from '../assets/azure.png'
import cal from '../assets/calendar.png'
import email from '../assets/email.png'
import login from '../assets/login.png'
import user from '../assets/user.png'
import workflow from '../assets/workflow.png'

const Landing = () => {
  return (
    <div className="bg-gradient-to-b min-h-screen from-slate-200 to-slate-600">
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        <div className="text-center lg:w-2/3 w-full">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Automated Employee Onboarding</h1>
          <p className="mb-8 leading-relaxed">Streamline your hiring process with our comprehensive onboarding solution.</p>
          <div className="flex justify-center">
            <Link to="/workflow"><button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Get Started</button></Link>
          </div>
        </div>
      </div>
    </section>

    <section id="features" className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">

          <div className="p-4 md:w-1/3">
            <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
              <div className="flex items-center mb-3">
              <img src={user} alt="Description of Image" className="w-8 h-8 mr-3 inline-flex items-center justify-center flex-shrink-0"/>
                <h2 className="text-gray-900 text-lg title-font font-medium">Local Logins</h2>
              </div>
              <div className="flex-grow">
                <p className="leading-relaxed text-base">Create local logins for employees.</p>
              </div>
            </div>
          </div>

          <div className="p-4 md:w-1/3">
            <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
              <div className="flex items-center mb-3">
              <img src={azure} alt="Description of Image" className="w-8 h-8 mr-3 inline-flex items-center justify-center flex-shrink-0"/>
                <h2 className="text-gray-900 text-lg title-font font-medium">Azure Accounts</h2>
              </div>
              <div className="flex-grow">
                <p className="leading-relaxed text-base">Create an Azure account for employees to join an organizaiton.</p>
              </div>
            </div>
          </div>

          <div className="p-4 md:w-1/3">
            <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
              <div className="flex items-center mb-3">
              <img src={login} alt="Description of Image" className="w-8 h-8 mr-3 inline-flex items-center justify-center flex-shrink-0"/>
                <h2 className="text-gray-900 text-lg title-font font-medium">Reset Credentials</h2>
              </div>
              <div className="flex-grow">
                <p className="leading-relaxed text-base">Reset employee login information.</p>
              </div>
            </div>
          </div>

          <div className="p-4 md:w-1/3">
            <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
              <div className="flex items-center mb-3">
              <img src={email} alt="Description of Image" className="w-8 h-8 mr-3 inline-flex items-center justify-center flex-shrink-0"/>
                <h2 className="text-gray-900 text-lg title-font font-medium">Custom Emails</h2>
              </div>
              <div className="flex-grow">
                <p className="leading-relaxed text-base">Send an employee a custom email for the onboarding process.</p>
              </div>
            </div>
          </div>

          <div className="p-4 md:w-1/3">
            <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
              <div className="flex items-center mb-3">
              <img src={cal} alt="Description of Image" className="w-8 h-8 mr-3 inline-flex items-center justify-center flex-shrink-0"/>
                <h2 className="text-gray-900 text-lg title-font font-medium">Calendar Events</h2>
              </div>
              <div className="flex-grow">
                <p className="leading-relaxed text-base">Create a calendar event to follow up on the employee.</p>
              </div>
            </div>
          </div>

          <div className="p-4 md:w-1/3">
            <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
              <div className="flex items-center mb-3">
              <img src={workflow} alt="Description of Image" className="w-8 h-8 mr-3 inline-flex items-center justify-center flex-shrink-0"/>

                <h2 className="text-gray-900 text-lg title-font font-medium">Custom Workflows</h2>
              </div>
              <div className="flex-grow">
                <p className="leading-relaxed text-base">Save onboarding workflows to reuse later.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
    </div>
  )
}

export default Landing
