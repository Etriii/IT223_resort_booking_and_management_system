import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/ui/form/InputField';
import Button from '../../components/ui/button/Button';
import ErrorAlert from './ErrorAlert';

import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { PiWarningCircleBold } from "react-icons/pi";

const Register = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Register | Ocean View";
    }, []);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [errorUsername, setErrorUsername] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorConfirm, setErrorConfirm] = useState("");

    const togglePassword = () => setShowPassword(!showPassword);

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setErrorUsername('');
        setErrorEmail('');
        setErrorPassword('');
        setErrorConfirm('');

        // Form validations
        if (!username.trim()) {
            await sleep(1000);
            setLoading(false);
            setErrorUsername("Username is required.");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            await sleep(1000);
            setLoading(false);
            setErrorEmail("Valid email is required.");
            return;
        }

        if (password.length < 6) {
            await sleep(1000);
            setLoading(false);
            setErrorPassword("Password must be at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            await sleep(1000);
            setLoading(false);
            setErrorConfirm("Passwords do not match.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/api.php?controller=Auth&action=register`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();

            console.log('API Response:', data);

            setTimeout(() => {
                if (data.success) {
                    navigate('/oceanview/login');
                } else {
                    setError(data.message || "Registration failed.");
                }
                setLoading(false);
            }, 1500);
        } catch (error) {
            console.error("Registration error:", error);
            setLoading(false);
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <>
            <ErrorAlert error={error} clearError={() => setError('')} />

            <div className='flex flex-col space-y-2 bg-white p-7 rounded-lg'>
                <form onSubmit={handleRegister} className='space-y-2'>
                    <div className="w-80 mx-auto space-y-2 text-sm text-gray-700 font-medium">

                        <div>
                            <label className="block mb-1">Username</label>
                            <div className="flex items-center border border-gray-300 rounded px-3 py-2 shadow-sm bg-white focus-within:border-blue-400 focus-within:ring-1">
                                <FaUser className="text-gray-400 mr-2 size-5" />
                                <input onChange={(e) => setUsername(e.target.value)}
                                    type="text" value={username} name='username' required
                                    placeholder="Your username"
                                    className="w-full focus:outline-none text-sm text-gray-700"
                                />
                            </div>
                            <div className={`flex space-x-2 items-center p-1 border border-red-300 mt-1 text-xs rounded text-red-500 bg-red-100 ${errorUsername ? '' : 'hidden'}`}>
                                <PiWarningCircleBold />
                                <span>{errorUsername}</span>
                            </div>
                        </div>

                        <div>
                            <label className="block mb-1">Email</label>
                            <div className="flex items-center border border-gray-300 rounded px-3 py-2 shadow-sm bg-white focus-within:border-blue-400 focus-within:ring-1">
                                <FaEnvelope className="text-gray-400 mr-2 size-5" />
                                <input onChange={(e) => setEmail(e.target.value)}
                                    type="email" value={email} name='email' required
                                    placeholder="Your valid email address"
                                    className="w-full focus:outline-none text-sm text-gray-700"
                                />
                            </div>
                            <div className={`flex space-x-2 items-center p-1 border border-red-300 mt-1 text-xs rounded text-red-500 bg-red-100 ${errorEmail ? '' : 'hidden'}`}>
                                <PiWarningCircleBold />
                                <span>{errorEmail}</span>
                            </div>
                        </div>

                        <div>
                            <label className="block mb-1">Password</label>
                            <div className="flex items-center border border-gray-300 rounded px-3 py-2 shadow-sm bg-white focus-within:border-blue-400 focus-within:ring-1">
                                <FaLock className="text-gray-400 mr-2 size-5" />
                                <input onChange={(e) => setPassword(e.target.value)}
                                    type={showPassword ? 'text' : 'password'} value={password}
                                    placeholder="Create a password" required
                                    className="w-full focus:outline-none text-sm text-gray-700"
                                />
                                <div onClick={togglePassword} className="cursor-pointer text-gray-400 ml-2">
                                    {showPassword ? <HiEyeOff className='size-5' /> : <HiEye className='size-5' />}
                                </div>
                            </div>
                            <div className={`flex space-x-2 items-center p-1 border border-red-300 mt-1 text-xs rounded text-red-500 bg-red-100 ${errorPassword ? '' : 'hidden'}`}>
                                <PiWarningCircleBold />
                                <span>{errorPassword}</span>
                            </div>
                        </div>

                        <div>
                            <label className="block mb-1">Confirm Password</label>
                            <div className="flex items-center border border-gray-300 rounded px-3 py-2 shadow-sm bg-white focus-within:border-blue-400 focus-within:ring-1">
                                <FaLock className="text-gray-400 mr-2 size-5" />
                                <input onChange={(e) => setConfirmPassword(e.target.value)}
                                    type={showPassword ? 'text' : 'password'} value={confirmPassword}
                                    placeholder="Re-type your password" required
                                    className="w-full focus:outline-none text-sm text-gray-700"
                                />
                            </div>
                            <div className={`flex space-x-2 items-center p-1 border border-red-300 mt-1 text-xs rounded text-red-500 bg-red-100 ${errorConfirm ? '' : 'hidden'}`}>
                                <PiWarningCircleBold />
                                <span>{errorConfirm}</span>
                            </div>
                        </div>

                        <Button btn_type='submit' variant="primary" size="md" onClick={handleRegister} disabled={loading} loading={loading}>
                            {loading ? "Creating Account..." : "Sign Up"}
                        </Button>
                    </div>
                </form>

                <div className='space-x-2 text-sm'>
                    <span>Already have an Account?</span>
                    <button onClick={() => navigate('/oceanview/login')} className='text-blue-700'>Login</button>
                </div>
            </div>
        </>
    );
};

export default Register;
