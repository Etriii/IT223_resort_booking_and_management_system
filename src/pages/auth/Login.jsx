import React from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();
    return (
        <div className='flex flex-col space-y-2'>
            <button className='px-4 py-2 bg-blue-600 border-none text-white rounded' onClick={() => navigate('/oceanview/loginas')}>Log In</button>
            <button onClick={() => navigate('/oceanview/register')} className='text-blue-700'>Dont have an Account?</button>
        </div>
    )
}

export default Login