import React from 'react';
import { BiUser } from 'react-icons/bi';


export default function ShowScoreCard({ startColor = '#F4E2FF', endColor = '#FFFFFF',title="Total Countries",image,totalCount=85 }) {
  return (
    <div
      className="bg-linear-to-r from-(--start) to-(--end) rounded-xl p-4 sm:p-6 max-w-full sm:max-w-sm border border-gray-200"
      style={{ ['--start']: startColor, ['--end']: endColor }}
    >
      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
        {/* Icon */}
        <div className="bg-app rounded-lg p-2 sm:p-3 shrink-0 mb-2 sm:mb-0">
 {         image ? <img src={image} alt="icon" className="w-6 h-6 sm:w-8 sm:h-8"/> : <BiUser className="w-6 h-6 sm:w-8 sm:h-8 text-white"/>}
        </div>
        {/* Content */}
        <div className="flex-1">
          <p className="text-gray-600 text-xs sm:text-sm font-medium mb-1">
            {title}
          </p>
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">
            {totalCount}
          </h2>
          <div className="flex flex-wrap items-center gap-1 sm:gap-2">
            <span className="text-xs sm:text-sm text-gray-600">Increase by</span>
            <span className="bg-green-100 text-green-700 text-xs sm:text-sm font-semibold px-1.5 sm:px-2 py-0.5 rounded">
              ~200
            </span>
            <span className="text-xs sm:text-sm text-gray-600">this week</span>
          </div>
        </div>
      </div>
    </div>
  );
}