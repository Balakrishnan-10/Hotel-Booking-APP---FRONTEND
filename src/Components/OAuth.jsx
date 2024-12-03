import { Button } from "flowbite-react";
import React from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";
import { SignInFail, SignInSuccess } from "../Redux/Slice/UserSlice";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OAuth = () => {
  const auth = getAuth(app);
  const Dispatch = useDispatch();
  const Navigate = useNavigate();
  const handleSubmit = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const result = await signInWithPopup(auth, provider);
      const res = await fetch("https://hotel-booking-app-backend-yjvv.onrender.com/api/auth/googleauth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          profilePicture: result.user.photoURL,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('Token', data.token)
        Dispatch(SignInSuccess(data));
        toast.success(data.message)
        Navigate("/");
      }
    } catch (error) {
      Dispatch(SignInFail(error.message));
    }
  };
  return (
    <Button gradientDuoTone="tealToLime" onClick={handleSubmit}>
      <AiFillGoogleCircle className="w-6 h-6 mr-2" /> Continue with Google
    </Button>
  );
};

export default OAuth;
