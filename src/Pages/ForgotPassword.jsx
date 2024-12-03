import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RiMailSendFill } from "react-icons/ri";
import axios from "axios";
import { HiOutlineMail } from "react-icons/hi";

const ForgotPassword = () => {
    const { Loading } = useSelector((state) => state.Users);
    const Navigate = useNavigate();
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { email };
        await axios.post("https://hotel-booking-app-backend-yjvv.onrender.com/api/auth/forgot-password", payload)
            .then((res) => {
                toast.success(res.data.message);
                Navigate("/reset-password");
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.response.data.message);
            });
        setEmail("");
    };
    return (
        <>
            <div className="mb-10 mx-2 mt-20 ">
                <div className="flex p-5 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5 border-2 rounded border-lime-300 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80">

                    {/* Create SignUp Form */}
                    <div className="flex-1">
                        <div className="px-2 py-3 text-center font-semibold text-4xl">
                            Forgot Password
                        </div>
                        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                            {/* E-mail */}
                            <div>
                                <Label className="font-semibold text-md" value="E-mail" />
                                <TextInput
                                icon={HiOutlineMail}
                                    type="email"
                                    placeholder="name@gmail.com"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    <>
                                        <RiMailSendFill className="mt-1 me-2" />
                                        Send Mail</>
                                )}
                            </Button>

                        </form>
                    </div>
                </div>
            </div>
        </>

    );
};

export default ForgotPassword;