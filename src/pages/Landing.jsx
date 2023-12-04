import React from 'react'
import logo from "../assets/logo.png"
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div class="bg-gradient-to-b from-slate-200 to-slate-500">
        
    <section class="text-gray-600 body-font">
      <div class="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        <div class="text-center lg:w-2/3 w-full">
          <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Automated Employee Onboarding</h1>
          <p class="mb-8 leading-relaxed">Streamline your hiring process with our comprehensive onboarding solution.</p>
          <div class="flex justify-center">
            <Link to="/workflow"><button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Get Started</button></Link>
          </div>
        </div>
      </div>
    </section>

    <section id="features" class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-wrap -m-4">

          <div class="p-4 md:w-1/3">
            <div class="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
              <div class="flex items-center mb-3">
                <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">

                </div>
                <h2 class="text-gray-900 text-lg title-font font-medium">Create Local Logins</h2>
              </div>
              <div class="flex-grow">
                <p class="leading-relaxed text-base">Description</p>
              </div>
            </div>
          </div>

          <div class="p-4 md:w-1/3">
            <div class="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
              <div class="flex items-center mb-3">
                <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">

                </div>
                <h2 class="text-gray-900 text-lg title-font font-medium">Create Azure Accounts</h2>
              </div>
              <div class="flex-grow">
                <p class="leading-relaxed text-base">Description</p>
              </div>
            </div>
          </div>

          <div class="p-4 md:w-1/3">
            <div class="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
              <div class="flex items-center mb-3">
                <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">

                </div>
                <h2 class="text-gray-900 text-lg title-font font-medium">Reset Credentials</h2>
              </div>
              <div class="flex-grow">
                <p class="leading-relaxed text-base">Description</p>
              </div>
            </div>
          </div>

          <div class="p-4 md:w-1/3">
            <div class="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
              <div class="flex items-center mb-3">
                <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">

                </div>
                <h2 class="text-gray-900 text-lg title-font font-medium">Send Custom Emails</h2>
              </div>
              <div class="flex-grow">
                <p class="leading-relaxed text-base">Description</p>
              </div>
            </div>
          </div>

          <div class="p-4 md:w-1/3">
            <div class="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
              <div class="flex items-center mb-3">
                <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">

                </div>
                <h2 class="text-gray-900 text-lg title-font font-medium">Send Calendar Info</h2>
              </div>
              <div class="flex-grow">
                <p class="leading-relaxed text-base">Description</p>
              </div>
            </div>
          </div>

          <div class="p-4 md:w-1/3">
            <div class="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
              <div class="flex items-center mb-3">
                <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">

                </div>
                <h2 class="text-gray-900 text-lg title-font font-medium">Save Custom Workflows</h2>
              </div>
              <div class="flex-grow">
                <p class="leading-relaxed text-base">Description</p>
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