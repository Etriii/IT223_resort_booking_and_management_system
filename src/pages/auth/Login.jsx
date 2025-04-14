import React, { useState, userEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/ui/form/InputField';
import Button from '../../components/ui/button/Button';


const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

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
        <div className='flex flex-col space-y-2'>

            {error ? <div className='border border-red-500 p-5 text-red-600'>{error}</div> : null}

            <form onSubmit={handleLogin} className='space-y-2'>

                <InputField label="Username" name="username" type="email" disabled={loading} value={email} onChange={(e) => setEmail(e.target.value)} required={false} className="bg-gray-100 text-gray-700" />

                <InputField label="Password" name="password" type="password" disabled={loading} value={password} onChange={(e) => setPassword(e.target.value)} required={false} className="bg-gray-100 text-gray-700" />

                <Button variant="primary" size="md" onClick={handleLogin} disabled={loading} loading={loading}>
                    {loading ? "Logging In..." : "Log In"}
                </Button>

            </form>

            <button onClick={() => navigate('/oceanview/register')} className='text-blue-700'>Dont have an Account?</button>
        </div>
    )
}

export default Login