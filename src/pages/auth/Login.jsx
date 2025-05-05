import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/ui/form/InputField';
import Button from '../../components/ui/button/Button';
import ErrorAlert from './ErrorAlert';

import { FaEnvelope, FaLock } from 'react-icons/fa';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { PiWarningCircleBold } from "react-icons/pi";

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Sign In | Ocean View";
    }, []);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword(!showPassword);

    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");

    const fetchUserRoles = async () => {
        const response = await fetch(`http://localhost:8000/api.php?controller=UserRoles&action=getUserRoles&user_id=${localStorage.getItem('user_id')}`);

        if (!response.ok) {
            throw new Error(`Http Error! Status: ${response.status} `);
        }

        const data = await response.json();
        localStorage.setItem('user_role', JSON.stringify(data));

        return data;
    };

    const redirectLogIn = (role) => {
        switch (role.role) {
            case 'super_admin':
                navigate('/oceanview/admin/dashboard');
                break;
            case 'resort_super_admin':
            case 'resort_admin':
                navigate('/oceanview/resortadmin/dashboard');
                break;
            case 'guest':
                navigate('/oceanview');
                break;
            default:
                break;
        }

    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setErrorEmail();
        setErrorPassword();

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        try {
            const response = await fetch(`http://localhost:8000/api.php?controller=Auth&action=login`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                signal: controller.signal
            });

            const data = await response.json();

            clearTimeout(timeoutId);

            setTimeout(async () => {
                setLoading(false);
                if (data.error) {
                    if (typeof data.error === "string") {
                        setError(data.error);
                    }
                    else {
                        if (data.error.email) {
                            setErrorEmail(data.error.email);
                        }
                        if (data.error.password) {
                            setErrorPassword(data.error.password);
                        }
                    }
                } else {
                    // alert("Login successful!");
                    localStorage.setItem("user_id", JSON.stringify(data.user['id']));

                    const role = await fetchUserRoles();
                    redirectLogIn(role[0]);
                }
            }, 1000);

        } catch (error) {
            setLoading(false);
            if (error.name === 'AbortError') {
                setError("Network timeout. Please try again.");
            } else {
                setError("An unexpected error occurred. possible error: Server and Backends config has not run");
            }
        }

        // const timer = setTimeout(() => {
        //     setError('');
        // }, 5000);

        // return () => clearTimeout(timer);
    };

    return (
        <>
            {/* {error ? <div className='border border-red-500 p-5 text-red-600'>{error}</div> : null} */}
            <ErrorAlert error={error} clearError={() => setError('')} />

            <div className='flex flex-col space-y-2 bg-white p-7 rounded-lg'>
                <form onSubmit={handleLogin} className='space-y-2'>

                    <div className="w-80 mx-auto space-y-2 text-sm text-gray-700 font-medium">
                        <div>
                            <label className="block mb-1">Email</label>
                            <div className="flex items-center border border-gray-300 rounded px-3 py-2 shadow-sm bg-white focus-within:border-blue-400 focus-within:ring-1">
                                <FaEnvelope className="text-gray-400 mr-2 size-5" />
                                <input onChange={(e) => setEmail(e.target.value)}
                                    type="email" value={email} name='email' required={true}
                                    placeholder="Your valid email address"
                                    className="w-full focus:outline-none focus:ring-0 focus:border-transparent text-sm text-gray-700"
                                />
                            </div>
                            <div className={`flex space-x-2 items-center p-1 border border-red-300 mt-1 text-xs rounded text-red-500 bg-red-100 ${errorEmail ? '' : 'hidden'}`}>
                                <PiWarningCircleBold />
                                <span>
                                    {errorEmail}
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className="block mb-1">Password</label>
                            <div className="flex items-center border border-gray-300 rounded px-3 py-2 shadow-sm  focus-within:ring-1 bg-white focus-within:border-blue-400">
                                <FaLock className="text-gray-400 mr-2 size-5" />
                                <input onChange={(e) => setPassword(e.target.value)}
                                    type={showPassword ? 'text' : 'password'} value={password}
                                    placeholder="Your current password" required={true}
                                    className="w-full focus:outline-none focus:ring-0 focus:border-transparent text-sm text-gray-700"
                                />
                                <div onClick={togglePassword} className="cursor-pointer text-gray-400 ml-2">
                                    {showPassword ? <HiEyeOff className='size-5' /> : <HiEye className='size-5' />}
                                </div>
                            </div>
                            <div className={`flex space-x-2 items-center p-1 border border-red-300 mt-1 text-xs rounded text-red-500 bg-red-100 ${errorPassword ? '' : 'hidden'}`}>
                                <PiWarningCircleBold />
                                <span>
                                    {errorPassword}
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <label className="inline-flex items-center text-sm font-normal">
                                <input type="checkbox" className="mr-2" />
                                Remember me
                            </label>
                            <a href="#" className="text-blue-600 hover:underline text-sm font-normal">
                                Forgot password?
                            </a>
                        </div>

                        <Button btn_type='submit' variant="primary" size="md" onClick={handleLogin} disabled={loading} loading={loading}>
                            {loading ? "Logging In..." : "Log In"}
                        </Button>
                    </div>
                </form>
                <div className='space-x-2 text-sm'>
                    <span className=''>Dont have an Account?</span>
                    <button onClick={() => navigate('/oceanview/register')} className='text-blue-700'>Sign Up</button>
                </div>
            </div>
        </>
    )
}

export default Login