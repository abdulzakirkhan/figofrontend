import { Visibility, VisibilityOff } from '@mui/icons-material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../redux/auth/authApi';
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setCredentials } from '../redux/auth/authSlice';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [serverError, setServerError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();


    const [login, {error: loginError, isLoading }] = useLoginMutation()


  const handleSubmit = async () => {
    console.log('Login attempt:', { email, password, rememberMe });
     try {
      const payload = { email, password, rememberMe };

      const res = await login(payload).unwrap(); // throws on 4xx/5xx
      if(res?.user){
        const { token, user } = res || {}
     
        dispatch(setCredentials({ token, user }));
        toast.success("Login successful!")
         navigate('/admin/panel-dashboard');
            console.log("token :", token);
        console.log("user :", user);
      }
    } catch (err) {
      const msg = err?.data?.message || err?.error || "Login failed";
      setServerError(msg);
      toast.error(msg);
    }  
  };

  return (
    <div className="flex h-screen bg-app text-app overflow-hidden">
      {/* Left Side - Fixed Image */}
      <div className="hidden lg:flex flex-1 relative">
        <img
          src="./loginImage.png"
          alt="Login visual"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Optional overlay */}
        <div className="absolute inset-0 bg-black opacity-20"></div>
      </div>

      {/* Right Side - Scrollable Form */}
      <div className="w-full lg:w-1/2 flex flex-col bg-panel">
        <div className="flex-1 overflow-y-auto px-6 py-8 lg:px-12">
          <div className="max-w-md mx-auto w-full">

            <div className="mt-10 lg:mt-20">
              <img src="./logo.png" height="100%" width="140px" alt="Logo" className="mb-8" />
              <h2 className="text-2xl font-semibold text-app">
                Sign In to your Account
              </h2>
              <p className="text-xs text-muted mt-2">Welcome back! Please enter your details</p>
            </div>

            <div className="mt-10 space-y-6">
              {/* Email Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
  className="w-full pl-10 pr-4 py-3 border border-gray-300 bg-white text-black placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300  bg-white  text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <VisibilityOff className="h-5 w-5" /> : <Visibility className="h-5 w-5" />}
                </button>
              </div>

              {/* Remember Me & Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-muted">Remember me</span>
                </label>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Forgot Password?
                </a>
              </div>

              {/* Submit Button */}
            
              <button
              disabled={isLoading}
                onClick={handleSubmit}
                className="w-full text-white bg-primary text-primary-contrast py-3 rounded-lg font-medium hover:opacity-90 transition"
              >
               {isLoading ? "Loading..." : "Sign In"}
              </button>

              {/* Divider */}
              {/* <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4  bg-panel text-muted">Or sign in with</span>
                </div>
              </div> */}

              {/* Social Buttons */}
              {/* <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Google</span>
                </button>
                <button className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

