import React, { useState } from 'react';

export const LogoFavicon = () => {
  const [logoFile, setLogoFile] = useState(null);
  const [faviconFile, setFaviconFile] = useState(null);
  const [primaryColor, setPrimaryColor] = useState('#4318FF');
  const [secondaryColor, setSecondaryColor] = useState('#E0E5F2');

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(URL.createObjectURL(file));
    }
  };

  const handleFaviconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFaviconFile(URL.createObjectURL(file));
    }
  };

  const handleReset = () => {
    setLogoFile(null);
    setFaviconFile(null);
    setPrimaryColor('#4318FF');
    setSecondaryColor('#E0E5F2');
  };

  const handleSave = () => {
    console.log('Settings saved');
  };

  return (
    <div className="bg-[#F4F7FE] min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[24px] font-bold text-[#2B3674]">General Setting</h1>
        <div className="text-[13px] text-[#A3AED0]">
          <span className="text-[#2B3674]">Settings/</span> Logo & Favicon
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl p-8">
        {/* Logo and Favicon Upload Section */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Logo Upload */}
          <div>
            <label className="block text-[14px] font-semibold text-[#2B3674] mb-3">
              Logo (140px X 140px)
            </label>
            <div className="flex items-start gap-4">
              <input
                type="file"
                id="logo-upload"
                accept="image/*"
                onChange={handleLogoChange}
                className="hidden"
              />
              <label
                htmlFor="logo-upload"
                className="border border-[#E0E5F2] rounded-lg px-4 py-2 text-[12px] text-[#A3AED0] cursor-pointer hover:bg-[#F4F7FE] transition-colors"
              >
                Choose File
              </label>
              <span className="text-[12px] text-[#A3AED0] py-2">
                {logoFile ? 'File chosen' : 'No File chosen'}
              </span>
            </div>
            <div className="mt-4 w-24 h-24 bg-[#E0E5F2] rounded-lg flex items-center justify-center overflow-hidden">
              {logoFile ? (
                <img src={logoFile} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                <span className="text-[12px] text-[#A3AED0] font-medium">logo</span>
              )}
            </div>
          </div>

          {/* Favicon Upload */}
          <div>
            <label className="block text-[14px] font-semibold text-[#2B3674] mb-3">
              Fav Icon (120px x 120px)
            </label>
            <div className="flex items-start gap-4">
              <input
                type="file"
                id="favicon-upload"
                accept="image/*"
                onChange={handleFaviconChange}
                className="hidden"
              />
              <label
                htmlFor="favicon-upload"
                className="border border-[#E0E5F2] rounded-lg px-4 py-2 text-[12px] text-[#A3AED0] cursor-pointer hover:bg-[#F4F7FE] transition-colors"
              >
                Choose File
              </label>
              <span className="text-[12px] text-[#A3AED0] py-2">
                {faviconFile ? 'File chosen' : 'No File chosen'}
              </span>
            </div>
            <div className="mt-4 w-24 h-24 bg-[#E0E5F2] rounded-lg flex items-center justify-center overflow-hidden">
              {faviconFile ? (
                <img src={faviconFile} alt="Favicon" className="w-full h-full object-cover" />
              ) : (
                <span className="text-[12px] text-[#A3AED0] font-medium">logo</span>
              )}
            </div>
          </div>
        </div>

        {/* Theme Colors Section */}
        <div className="mb-8">
          <h3 className="text-[14px] font-semibold text-[#2B3674] mb-4">Theme Colors</h3>
          <div className="flex items-center gap-4">
            {/* Primary Color */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-16 h-16 rounded-lg cursor-pointer border-2 border-[#E0E5F2]"
                  style={{ backgroundColor: primaryColor }}
                />
              </div>
              <span className="text-[11px] text-[#2B3674] font-medium mt-2">Primary</span>
            </div>

            {/* Secondary Color */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <input
                  type="color"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="w-16 h-16 rounded-lg cursor-pointer border-2 border-[#E0E5F2]"
                  style={{ backgroundColor: secondaryColor }}
                />
              </div>
              <span className="text-[11px] text-[#2B3674] font-medium mt-2">Secondary</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#E0E5F2]">
          <button
            onClick={handleReset}
            className="px-6 py-2.5 border border-[#E0E5F2] text-[#FF6B6B] text-[13px] font-bold rounded-lg hover:bg-[#FF6B6B]/5 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-[#4318FF] text-white text-[13px] font-bold rounded-lg hover:bg-[#3311DD] transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
