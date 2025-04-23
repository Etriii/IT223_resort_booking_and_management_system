import React, { useState, userEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/ui/form/InputField';
import Button from '../../components/ui/button/Button';


import { FaEnvelope, FaLock } from 'react-icons/fa';
import { HiEye, HiEyeOff } from 'react-icons/hi';



const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword(!showPassword);

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
                    setError(data.error);
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
            {error ? <div className='border border-red-500 p-5 text-red-600'>{error}</div> : null}


            <div className='flex flex-col space-y-2 bg-white p-8 rounded-lg'>
                <form onSubmit={handleLogin} className='space-y-2'>

                    {/* <InputField label="Username" name="username" type="email" disabled={loading} value={email} onChange={(e) => setEmail(e.target.value)} required={false} className="bg-gray-100 text-gray-700" />

                <InputField label="Password" name="password" type="password" disabled={loading} value={password} onChange={(e) => setPassword(e.target.value)} required={false} className="bg-gray-100 text-gray-700" />

                <Button variant="primary" size="md" onClick={handleLogin} disabled={loading} loading={loading}>
                    {loading ? "Logging In..." : "Log In"}
                </Button> */}


                    <div className="w-80 mx-auto space-y-4 text-sm text-gray-700 font-medium">
                        {/* Email Field */}
                        <div>
                            <label className="block mb-1">Email</label>
                            <div className="flex items-center border border-gray-300 rounded px-3 py-2 shadow-sm bg-white focus-within:border-green-400">
                                <FaEnvelope className="text-gray-400 mr-2" />
                                <input
                                    type="email"
                                    placeholder="Your valid email address"
                                    className="w-full focus:outline-none focus:ring-0 focus:border-transparent text-sm text-gray-700"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block mb-1">Password</label>
                            <div className="flex items-center border border-gray-300 rounded px-3 py-2 shadow-sm bg-white focus-within:border-green-400">
                                <FaLock className="text-gray-400 mr-2" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Your current password"
                                    className="w-full focus:outline-none focus:ring-0 focus:border-transparent text-sm text-gray-700"
                                />
                                <div onClick={togglePassword} className="cursor-pointer text-gray-400 ml-2">
                                    {showPassword ? <HiEyeOff /> : <HiEye />}
                                </div>
                            </div>
                        </div>

                        {/* Remember me and Forgot password */}
                        <div className="flex justify-between items-center">
                            <label className="inline-flex items-center text-sm font-normal">
                                <input type="checkbox" className="mr-2" />
                                Remember me
                            </label>
                            <a href="#" className="text-purple-600 hover:underline text-sm font-normal">
                                Forgot password?
                            </a>
                        </div>

                        <Button variant="primary" size="md" onClick={handleLogin} disabled={loading} loading={loading}>
                            {loading ? "Logging In..." : "Log In"}
                        </Button>
                    </div>
                </form>

                <button onClick={() => navigate('/oceanview/register')} className='text-blue-700'>Dont have an Account?</button>
            </div>
        </>
    )
}

export default Login