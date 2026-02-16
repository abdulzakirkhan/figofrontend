import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export const UserProfile = () => {
  const [twoFASetup, setTwoFASetup] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [secret, setSecret] = useState("");
  const [otp, setOtp] = useState("");

  const user = useSelector((state) => state.auth.user);

  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleSetup2FA = async () => {
    try {
      if (!user?.email) return toast.error("User not available");

      const res = await axios.get(
        `${VITE_BASE_URL}/admin/2fa/setup?email=${user.email}`,
        { withCredentials: true },
      );

      setQrCodeUrl(res.data.qrCodeUrl);
      setSecret(res.data.secret);

      toast.success("Scan the QR code in your Authenticator app");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to setup 2FA");
    }
  };

  // ---------- Verify 2FA ----------
  const handleVerify2FA = async () => {
    try {
      const res = await axios.post(`${VITE_BASE_URL}/admin/2fa/verify`, {
        email: user?.email,
        token: otp,
      });
      if (res.data.token) {
        setTwoFASetup(true);
        toast.success("2FA enabled successfully!");
        setQrCodeUrl("");
        setOtp("");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid 2FA code");
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

          {/* <h1 className="text-2xl font-bold mb-4">User</h1> */}
          <p className="pb-5">To access the dashboard, you must enable Two-Factor Authentication (2FA) for security purposes.</p>

          {user?.twoFA?.enabled ? (
            <p className="text-green-600 font-semibold">
              ✅ 2FA is already enabled
            </p>
          ) : (
            <div>
              {!qrCodeUrl ? (
                <button
                  onClick={handleSetup2FA}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Enable 2FA
                </button>
              ) : (
                <div className="mt-4">
                  <p>Scan this QR code in your Authenticator app:</p>
                  <img src={qrCodeUrl} alt="2FA QR Code" className="my-4" />
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit code"
                    className="border px-3 py-2 rounded-lg"
                  />
                  <button
                    onClick={handleVerify2FA}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg ml-2"
                  >
                    Verify 2FA
                  </button>
                </div>
              )}
            </div>
          )}
      </div>
    </div>
  );
};
