import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../redux/auth/authSlice";
import toast from "react-hot-toast";
import {
  useLoginWithGoogleMutation,
  useVerifyOTMutation,
} from "../redux/auth/authApi";
import { useNavigate } from "react-router-dom";

export const TFA = ({showTwoFAInput,setShowTwoFAInput,twoFAEmail,}) => {
  const dispatch = useDispatch();
  const [twoFAToken, setTwoFAToken] = useState("");
  const navigate = useNavigate();
  //mutations
  const [loginWithGoogle, { error: loginError, isLoading }] =
    useLoginWithGoogleMutation();
  const [verifyOT, {}] = useVerifyOTMutation();
  // ---------- Google Login ----------
  const handleGoogleResponse = async (response) => {
    try {
      const res = await loginWithGoogle({ tokenId: response.credential });
      if (res.data.twoFARequired) {
        setTwoFAEmail(res.data.email);
        setShowTwoFAInput(true);
      } else {
        dispatch(
          setCredentials({ token: res.data.token, user: res.data.user }),
        );
        toast.success("Login successful!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  // ---------- Verify 2FA ----------
  const handleVerify2FA = async () => {
    try {
      const res = await verifyOT({ email: twoFAEmail, token: twoFAToken });
      dispatch(setCredentials({ token: res.data.token, user: res.data.user }));

      toast.success("2FA verified, login successful!");
      navigate("/admin/panel-dashboard");
      setShowTwoFAInput(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid 2FA token");
    }
  };

  const user = useSelector((state) => state.auth.user);
 const Client_ID=import.meta.env.VITE_GOOGLE_CLIENT_ID;

  // ---------- Load Google Script ----------
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id:Client_ID,
        callback: handleGoogleResponse,
      });
      window.google.accounts.id.renderButton(
        document.getElementById("googleBtn"),
        {
          theme: "outline",
          size: "large",
        },
      );
    };
    document.body.appendChild(script);
  }, []);


  return (
    <div>
      {/* <h2>Login</h2> */}
      {!showTwoFAInput && (<div id="googleBtn" className="hidden"></div>)}

      {showTwoFAInput && (
        <div className="mt-6 flex flex-col items-center gap-4 bg-white p-6 rounded-lg shadow-md max-w-sm mx-auto">
          <p className="text-gray-700 text-center mb-2">
            Enter the 6-digit code from your Authenticator app
          </p>

          <input
            type="text"
            placeholder="123456"
            value={twoFAToken}
            onChange={(e) => setTwoFAToken(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg tracking-widest"
          />

          <button
            onClick={handleVerify2FA}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Verify 2FA
          </button>
        </div>
      )}
    </div>
  );
};
