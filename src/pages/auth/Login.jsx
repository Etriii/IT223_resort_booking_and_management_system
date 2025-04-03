import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/ui/form/InputField';

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const response = await fetch(`http://localhost:8000/api.php?controller=Auth&action=login`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        setTimeout(() => { // Delay execution for 1 second
            setLoading(false);

            if (data.error) {
                setError(data.error);
            } else {
                alert("Login successful!");
                localStorage.setItem("user", JSON.stringify(data.user)); // Save user session
                navigate('/oceanview/loginas');
            }
        }, 1000);
    };


    return (
        <div className='flex flex-col space-y-2'>
            {error ?? <div className='border border-red-500 p-5'>{error}</div>}
            <form onSubmit={handleLogin} className='space-y-2'>

                <InputField
                    label="Username"
                    name="username"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required={false}
                    className="bg-gray-100 text-gray-700"
                />

                <InputField
                    label="Password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required={false}
                    className="bg-gray-100 text-gray-700"
                />

                <InputField
                    name="login"
                    type="submit"
                    value={loading ? "Logging in..." : "Login"}
                    className=" bg-blue-700 text-white border-none rounded cursor-pointer"
                    disabled={loading}
                />
            </form>

            <button onClick={() => navigate('/oceanview/register')} className='text-blue-700'>Dont have an Account?</button>
        </div>
    )
}

export default Login