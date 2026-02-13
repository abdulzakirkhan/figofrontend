import React, { useState } from 'react';
import { Check, Plus, Send } from 'lucide-react';

export default function ComplaintsDetail() {
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('Select Data');

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-72 bg-white border-r border-gray-200 p-6">
        <h1 className="text-xl font-semibold mb-6 text-gray-900">Compaints</h1>
        
        <div className="space-y-5">
          {/* Answered Status */}
          <div>
            <p className="text-xs text-gray-500 mb-1.5">Answered</p>
            <p className="text-sm font-normal text-gray-900">Complaints Detail</p>
          </div>

          {/* Department */}
          <div>
            <p className="text-xs text-gray-500 mb-1.5">Department</p>
            <p className="text-sm font-normal text-gray-900">Support</p>
          </div>

          {/* Submitted */}
          <div>
            <p className="text-xs text-gray-500 mb-1.5">Submitted</p>
            <p className="text-sm font-normal text-gray-900">Today, 10:30 PM - 02:30 AM</p>
          </div>

          {/* Priority */}
          <div>
            <p className="text-xs text-gray-500 mb-1.5">Priority</p>
            <p className="text-sm font-normal text-gray-900">Medium</p>
          </div>

          {/* Status Dropdown */}
          <div>
            <p className="text-xs text-gray-500 mb-2">Status</p>
            <div className="relative">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md bg-white text-gray-700 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
              >
                <option>Select Data</option>
                <option>Open</option>
                <option>In Progress</option>
                <option>Resolved</option>
                <option>Closed</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Header */}
        <div className="bg-transparent px-6 py-3">
          <div className="flex items-center justify-end">
            <span className="bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded">1560 × 32</span>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="max-w-3xl space-y-3">
            {/* User Message */}
            <div className="flex justify-start">
              <div className="bg-white rounded-lg px-4 py-2.5 max-w-md shadow-sm border border-gray-100">
                <p className="text-sm text-gray-800 mb-1.5">I need some change is this</p>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Check className="w-3.5 h-3.5 text-blue-500" />
                  <span>11:45 PM</span>
                </div>
              </div>
            </div>

            {/* Support Response */}
            <div className="flex justify-end">
              <div className="bg-blue-600 text-white rounded-lg px-4 py-2.5 max-w-md shadow-sm">
                <p className="text-sm">Can you the share the detail note on it.</p>
                <p className="text-xs text-blue-100 mt-1.5 text-right">11:48 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Comment Input Area */}
        <div className="bg-white px-6 py-4">
          <div className="max-w-3xl flex items-center gap-3">
            <button className="flex-shrink-0 w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded-md transition-colors">
              <Plus className="w-5 h-5 text-gray-600" />
            </button>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write Comment..."
              className="flex-1 px-4 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
            <button className="flex-shrink-0 bg-blue-600 text-white w-9 h-9 flex items-center justify-center rounded-md hover:bg-blue-700 transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}