import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/auth';
import InputField from '../../components/InputField';
import PasswordField from '../../components/PasswordField';
import MyButton from '../../components/MyButton';
import useForm from '../../hooks/useForm';
import { BsPerson } from 'react-icons/bs';
import { CiLock } from 'react-icons/ci';
import Checkbox from '../../components/Checkbox';

const LoginPage = () => {
    const navigate = useNavigate();
    const [serverErrors, setServerErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [pwdVisible, setPwdVisible] = useState(false);

    const validate = (data) => {
        let errors = {};
        if (!data.password) errors.password = 'Password is required';
        else if (data.password.length < 8) errors.password = 'Password must be at least 8 characters long';
        if (!data.username) errors.username = 'Username is required';
        return errors;
    };

    const initialFormValues = { email: '', password1: '', password2: '', username: '' };
    const { formData, errors, handleInputChange, validateForm, setErrors } = useForm(initialFormValues, validate);

    const handlePwdVisible = () => setPwdVisible(!pwdVisible);

    const handleLogin = async (event) => {
        event.preventDefault();
        const valid = validateForm();

        if (valid) {
            try {
                setIsSubmitting(true);
                const message = await login(formData);
                if (message) {
                    setIsSubmitting(false);
                    if (message.error) {
                        setServerErrors(message.message);
                        return;
                    }
                    navigate('/');
                }
            } catch (error) {
                setIsSubmitting(false);
                console.error('Error during login:', error);
                setServerErrors({ general: 'An error occurred during login. Please try again.' });
            }
        }
    };

    return (
        <div className="loginPage w-screen h-screen flex justify-center items-center">
            <div className='drop-shadow-xl shadow-xl p-6 bg-white text-black w-96 rounded-md' disabled={isSubmitting ? true : false}>
                <h1 className='text-2xl text-center mb-6 font-semibold'>Login</h1>
                <form onSubmit={handleLogin} className='space-y-3 flex flex-col justify-center'>
                    <div>
                        <InputField
                            label='Username'
                            type='text'
                            name='username'
                            placeholder='Enter your username'
                            icon={<BsPerson className='text-2xl' />}
                            value={formData.username}
                            onChange={handleInputChange}
                            className={'rounded-md'}
                        />
                        {errors.username && <p className="border-l-2 rounded-sm border-red-800 px-2 mt-1 text-red-600 text-xs">{errors.username}</p>}
                        {serverErrors.username && <p className="border-l-2 rounded-sm border-red-800 px-2 mt-1 text-red-600 text-xs">{serverErrors.username}</p>}
                    </div>

                    <div>
                        <PasswordField
                            label='Password'
                            name='password'
                            placeholder='Enter your password'
                            icon={<CiLock className='text-2xl' />}
                            value={formData.password}
                            onChange={handleInputChange}
                            showPassword={pwdVisible}
                            className={'rounded-md'}
                        />
                        {errors.password && <p className="border-l-2 rounded-sm border-red-800 px-2 mt-1 text-red-600 text-xs">{errors.password}</p>}
                        {serverErrors.password && <p className="border-l-2 rounded-sm border-red-800 px-2 mt-1 text-red-600 text-xs">{serverErrors.password}</p>}
                    </div>

                    {serverErrors.non_field_errors && serverErrors.non_field_errors.map((value, index) => (
                        <p className="border-l-2 rounded-sm border-red-800 px-2 mt-1 text-red-600 text-xs" key={index}>{value}</p>
                    ))}

                    <div className='w-full pt-2 flex flex-col gap-2'>
                        <Checkbox
                            label='Show Password'
                            name='pwdToggle'
                            onChange={handlePwdVisible}
                        />
                        <MyButton text={isSubmitting ? 'Logging...' : 'Login'} className='w-full rounded-lg disabled:bg-blue-500' buttonProperties={{ disabled: isSubmitting }} />

                    </div>
                    {serverErrors.general && <p className="border-l-2 rounded-sm border-red-800 px-2 text-red-600 text-sm mt-2">{serverErrors.general}</p>}

                </form>
                <p className='my-2 mt-4 text-center'>
                    Don't have an account?
                    <span className='text-blue-600 hover:cursor-pointer hover:bg-gray-200 p-2 rounded-lg' onClick={() => navigate('/register')}> Register</span>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
