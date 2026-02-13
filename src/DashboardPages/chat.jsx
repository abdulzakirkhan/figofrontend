import React, { useState } from 'react';
import { Send, Plus, Check } from 'lucide-react';

export default function Chat() {
  const [status, setStatus] = useState('Select Data');
  const [comment, setComment] = useState('');

  return (
    <div className="p-4">
           <div className="text-2xl py-2">All Users</div>
    <div className="flex h-[calc(100vh-130px)] gap-5 ">
     
      {/* Left Sidebar */}
      <div className="w-72 bg-white border-r border-gray-200 my-shadow  rounded-lg p-6">
        <h1 className="text-xl font-semibold mb-6">Complaints</h1>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Answered</p>
            <p className="text-sm font-medium">Complaints Detail</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Department</p>
            <p className="text-sm font-medium">Support</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Submitted</p>
            <p className="text-sm font-medium">Today, 10:30 PM - 02:30 AM</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Priority</p>
            <p className="text-sm font-medium">Medium</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">Status</p>
            <select 
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option>Select Data</option>
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
              <option>Closed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col  my-shadow rounded-3xl bg-white">
        {/* Chat Messages Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="">
            {/* Message 1 */}
            <div className="mb-6">
              <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-4 inline-block max-w-md">
                <p className="text-sm text-gray-800">I need some change is this</p>
              </div>
              <div className="flex items-center gap-2 mt-1 ml-1">
                <Check className="w-4 h-4 text-blue-600" />
                <span className="text-xs text-gray-500">11:45 PM</span>
              </div>
            </div>

            {/* Message 2 */}
            <div className="flex justify-end mb-6">
              <div>
                <div className="bg-blue-700 text-white rounded-2xl rounded-tr-sm p-4 inline-block max-w-md">
                  <p className="text-sm">Can you the share the detail note on it.</p>
                </div>
                <div className="flex items-center justify-end gap-2 mt-1 mr-1">
                  <span className="text-xs text-gray-500">11:48 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 rounded-2xl bg-white p-4">
          <div className=" mx-auto flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Plus className="w-5 h-5 text-gray-600" />
            </button>
            
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write Comment..."
              className="flex-1 px-4 py-3 text-sm border-none focus:outline-none"
            />
            
            <button className="p-3 bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors">
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}