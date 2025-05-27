import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 533.5 544.3">
    <path
      fill="#4285F4"
      d="M533.5 278.4c0-17.8-1.6-35-4.6-51.5H272v97.6h146.9c-6.3 34-25.1 62.8-53.5 82.1v68h86.4c50.5-46.5 81.7-115.1 81.7-196.2z"
    />
    <path
      fill="#34A853"
      d="M272 544.3c72.6 0 133.6-24 178.2-65.3l-86.4-68c-24 16.1-54.7 25.7-91.8 25.7-70.6 0-130.4-47.7-151.8-111.6H31v70.2c44.7 88.4 136.6 149 241 149z"
    />
    <path
      fill="#FBBC05"
      d="M120.2 325.1c-10.4-30.3-10.4-62.9 0-93.2V161.7H31c-42.3 84.7-42.3 184.2 0 268.9l89.2-70.2z"
    />
    <path
      fill="#EA4335"
      d="M272 107.7c39.4 0 74.9 13.6 102.9 40.4l77.2-77.2C405.6 24 344.6 0 272 0c-104.4 0-196.3 60.6-241 149l89.2 70.2c21.4-63.9 81.2-111.5 151.8-111.5z"
    />
  </svg>
);


const OAuth = () => {

 const handleSuccess = (credentialResponse) => {
 
    const decoded = jwtDecode(credentialResponse.credential);
    console.log("token googleToken :",decoded); //token print

    // console.log("User Info:", decoded);
    const googleToken = credentialResponse.credential;

  }



  return (
    <div>
      <GoogleLogin onSuccess={handleSuccess} 
        type="button"
        className="w-full border hover:border-yellow border-red-500 py-2 rounded flex items-center justify-center   dark:text-black  hover:bg-gradient-to-tl to-pink-500 from-orange-500  transition"
      >
        <GoogleIcon />
        <span className="px-1"> Sign in with Google</span>
      </GoogleLogin>
    </div>
  );
};

export default OAuth;

// npm install -g firebase-tools , npm install firebase

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyB6g7MwfYC5FoLk27fq5QNAf-8bX7Bfvq8",
//   authDomain: "pratap-blog-41c29.firebaseapp.com",
//   projectId: "pratap-blog-41c29",
//   storageBucket: "pratap-blog-41c29.firebasestorage.app",
//   messagingSenderId: "92525219402",
//   appId: "1:92525219402:web:cc609c6dd012ef767d60b3",
//   measurementId: "G-CMLG0RX9VR"
// };

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);