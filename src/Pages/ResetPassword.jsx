import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "flowbite-react";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaLock } from "react-icons/fa";
import { MdOutlineLockReset } from "react-icons/md";

const ResetPassword = () => {
    const { Loading } = useSelector((state) => state.Users);
    const [formData, setFormData] = useState({});
    const Navigate = useNavigate();
    const { id } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!id) {
                console.error("ID is undefined");
                return;
              }
            const res = await fetch(`http://localhost:5000/api/auth/reset-password/${id}`, {
                method: "POST",
                headers: {
                    "content-Type": "application/json",
                    token: localStorage.getItem("Token"),
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (res.ok) {
                toast.success(data.message);
                console.log(data.message)
                Navigate("/");
            }
        } catch (error) {
            toast.error(error.message);
        };
    };
    return (
        <>
            <div className="mb-10 mx-2 mt-20 ">
                <div className="flex p-5 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5 border-2 rounded border-lime-300 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80">

                    {/* Create SignUp Form */}
                    <div className="flex-1">
                        <div className="px-2 py-3 text-center font-semibold text-4xl">
                            Reset Password
                        </div>
                        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                            {/* Password */}
                            <div>
                                <Label className="font-semibold text-md" value="Password" />
                                <TextInput
                                    icon={FaLock}
                                    required
                                    type="password"
                                    placeholder="Enter Your Password"
                                    id="password"
                                    onChange={(e) =>
                                        setFormData({ ...formData, password: e.target.value })
                                      }
                                />
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <Label className="font-semibold text-md" value="Confirm Password" />
                                <TextInput
                                    icon={FaLock}
                                    required
                                    type="password"
                                    placeholder="Re Enter Your Password"
                                    id="confirmPassword"
                                    onChange={(e) =>
                                        setFormData({ ...formData, confirmPassword: e.target.value })
                                      }
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
                                        <MdOutlineLockReset className="mt-1 me-2" />
                                        Reset</>
                                )}
                            </Button>

                        </form>
                    </div>
                </div>
            </div>
        </>

    );
};

export default ResetPassword;