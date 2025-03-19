import React from 'react'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

    return (
        <div className='flex flex-col space-y-2'>
            <button className='px-3 py-2 bg-blue-600 border-none text-white rounded'>Register</button>
            <div className='space-x-2'>
                <span>Already have an account?</span>
                <button onClick={() => navigate('/oceanview/login')} className='text-blue-700'> Sign in</button>
            </div>
        </div>
    )
}

export default Register