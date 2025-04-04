import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/ui/form/InputField';
import Button from '../../components/ui/button/Button';


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

        setTimeout(() => {
            setLoading(false);

            if (data.error) {
                setError(data.error);
            } else {
                alert("Login successful!");
                localStorage.setItem("user_id", JSON.stringify(data.user['id']));
                navigate('/oceanview/loginas');
            }
        }, 1000);
    };


    return (
        <div className='flex flex-col space-y-2'>
            {error ? <div className='border border-red-500 p-5 text-red-600'>{error}</div> : null}
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

                <Button variant="primary" size="md" onClick={handleLogin} disabled={loading} loading={loading}>
                    {loading ? "Logging In..." : "Log In"}
                </Button>

            </form>


            <button onClick={() => navigate('/oceanview/register')} className='text-blue-700'>Dont have an Account?</button>
        </div>
    )
}

export default Login