import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import {
  SignInFail,
  SignInStart,
  SignInSuccess,
} from "../Redux/Slice/UserSlice";
import OAuth from "../Components/OAuth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
  const [formdata, setFormdata] = useState({});
  const Dispatch = useDispatch();
  const { CurrentUser, Loading, Error: errmsg } = useSelector((state) => state.Users);
  const Navigate = useNavigate();

  // Username,Email,Pasword data read and receiving handle Change function :
  const handleChange = (e) => {
    // console.log(e.target.value);
    setFormdata({ ...formdata, [e.target.id]: e.target.value.trim() });
    // console.log(formdata);
  };

  //Form Submit funtion :
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formdata.email || !formdata.password) {
      return Dispatch(SignInFail("Please fill out the All fields"));
    }
    try {
      Dispatch(SignInStart());
      const res = await fetch("https://hotel-booking-app-backend-yjvv.onrender.com/api/auth/login-user", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if (data.success === false) {
        Dispatch(SignInFail(data.message))
        toast.error(data.message);
      }
      if (res.ok) {
        localStorage.setItem('Token', data.token)
        Dispatch(SignInSuccess(data));
        toast.success(data.message);
        Navigate(CurrentUser?.Result?.isAdmin ? "/admin" : "/userhome");
      }
    } catch (error) {
      Dispatch(SignInFail(error.message));
      toast.error(error.message);
    }
  };
  return (
    <div className="min-h-screen mx-2 mt-20 ">
      <div className="flex p-5 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5 border-2 rounded border-lime-300 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80">
        <div className="flex-1">
          <div className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 text-white rounded-lg bg-gradient-to-r from-lime-600 via-lime-500 to-teal-300">
              Hotel
            </span>
            BOOKING
          </div>
          <p className="text-sm mt-6">
            You can sign In with your Email and Password or you can use the
            <span><img src="https://cdn.usbrandcolors.com/images/logos/google-logo.svg" alt="Google" className="w-28 h-10 inline" /></span>
          </p>
        </div>

        {/* Create SignUp Form */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* E-mail */}
            <div>
              <Label className="font-semibold text-md" value="E-mail" />
              <TextInput
                type="email"
                placeholder="name@gmail.com"
                id="email"
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div>
              <Label className="font-semibold text-md" value="Password" />
              <TextInput
                type="password"
                placeholder="**********"
                id="password"
                onChange={handleChange}
              />
            </div>

            <Button
              className="font-semibold"
              gradientDuoTone="tealToLime"
              type="submit"
              disabled={Loading}
            >
              {Loading ? (
                <>
                  <Spinner
                    color="success"
                    aria-label="success spinner example"
                    size="sm"
                  />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-6">
            <span>Don't have an Account ?</span>
            <Link to="/signup" className="text-blue-700">
              Sign Up
            </Link>
            <Link to="/forgot-password" className="hover:text-blue-700">
              <u>Forgot Password !</u>
            </Link>
          </div>
          {errmsg && (
            <Alert
              className="mt-2"
              color="failure"
              withBorderAccent
              icon={HiInformationCircle}
            >
              <span className="font-medium">OOPS! </span> {errmsg}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
