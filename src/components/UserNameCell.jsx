import React from 'react';

const UserNameCell = ({ name, role }) => {
  // Generate initials from name
  const getInitials = (name) => {
    const words = name.split(' ');
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Generate color based on name
  const getColorFromName = (name) => {
    const colors = [
      '#4318FF', '#05CD99', '#FFB547', '#8B5CF6', 
      '#FF6AD5', '#01B6FF', '#6AD2FF', '#FF6B6B'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const bgColor = getColorFromName(name);
  const initials = getInitials(name);

  return (
    <div className="flex items-center gap-2.5">
      <div 
        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold"
        style={{ backgroundColor: bgColor }}
      >
        {initials}
      </div>
      <div>
        <p className="text-[12px] font-bold text-[#2B3674] leading-tight">{name}</p>
        {role && (
          <p className="text-[10px] text-[#A3AED0] font-medium">{role}</p>
        )}
      </div>
    </div>
  );
};

export default UserNameCell;
