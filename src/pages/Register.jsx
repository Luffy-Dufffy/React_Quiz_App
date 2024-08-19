import React, { useState } from 'react';
import { TfiEmail } from 'react-icons/tfi';
import { CiLock } from 'react-icons/ci';
import { BsPerson } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import useForm from '../hooks/useForm';
import InputField from '../components/InputField';
import PasswordField from '../components/PasswordField';
import Checkbox from '../components/Checkbox';
import MyButton from '../components/MyButton';
import { register } from '../services/auth.js';

const Register = () => {
    const navigate = useNavigate();
    const [serverErrors, setServerErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [pwdsVisible, setPwdsVisible] = useState(false);

    const validate = (data) => {
        let errors = {};
        if (!data.email) errors.email = 'Email is required';
        if (!data.password1) errors.password1 = 'Password is required';
        else if (data.password1.length < 8) errors.password1 = 'Password must be at least 8 characters long';
        if (!data.password2) errors.password2 = 'Password is required';
        else if (data.password1 !== data.password2) errors.password2 = 'Passwords do not match';
        if (!data.username) errors.username = 'Username is required';
        return errors;
    };

    const initialFormValues = { email: '', password1: '', password2: '', username: '' };
    const { formData, errors, handleInputChange, validateForm, setErrors } = useForm(initialFormValues, validate);

    const handleRegistration = async (event) => {
        event.preventDefault();
        const isValid = validateForm();
        if (isValid) {
            try {
                setIsSubmitting(true);
                const message = await register(formData);
                if (message) {
                    setIsSubmitting(false);
                    if (message.error) {
                        setServerErrors(message.message);
                        return;
                    }
                    navigate('/verification-sent');
                }
            } catch (error) {
                setIsSubmitting(false);
                console.error('Error during registration:', error);
                setServerErrors({ general: 'An error occurred during registration. Please try again.' });
            }
        }
    };

    const handlePwdsVisible = () => setPwdsVisible(!pwdsVisible);

    return (
        <div className="registerPage w-screen h-screen flex justify-center items-center">
            <div className='drop-shadow-xl shadow-xl p-6 bg-white text-black w-96 rounded-md'>
                <h1 className='text-2xl text-center mb-6 font-semibold'>Sign Up</h1>
                <form onSubmit={handleRegistration} className='space-y-3 flex flex-col justify-center'>
                    <div>
                        <InputField
                            label='Email'
                            type='email'
                            name='email'
                            placeholder='Enter your email'
                            icon={<TfiEmail className='text-2xl' />}
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        {errors.email && <p className="border-l-2 rounded-sm border-red-800 px-2 mt-1 text-red-600 text-xs">{errors.email}</p>}
                        {serverErrors.email && <p className="border-l-2 rounded-sm border-red-800 px-2 mt-1 text-red-600 text-xs">{serverErrors.email}</p>}

                    </div>
                    <div>

                        <PasswordField
                            label='Password'
                            name='password1'
                            placeholder='Enter your password'
                            icon={<CiLock className='text-2xl' />}
                            value={formData.password1}
                            onChange={handleInputChange}
                            showPassword={pwdsVisible}
                        />
                        {errors.password1 && <p className="border-l-2 rounded-sm border-red-800 px-2 mt-1 text-red-600 text-xs">{errors.password1}</p>}
                        {serverErrors.password1 && <p className="border-l-2 rounded-sm border-red-800 px-2 mt-1 text-red-600 text-xs">{serverErrors.password1}</p>}
                    </div>

                    <div>
                        <PasswordField
                            label='Confirm Password'
                            name='password2'
                            placeholder='Confirm your password'
                            icon={<CiLock className='text-2xl' />}
                            value={formData.password2}
                            onChange={handleInputChange}
                            showPassword={pwdsVisible}
                        />
                        {errors.password2 && <p className="border-l-2 rounded-sm border-red-800 px-2 mt-1 text-red-600 text-xs">{errors.password2}</p>}
                        {serverErrors.password2 && <p className="border-l-2 rounded-sm border-red-800 px-2 mt-1 text-red-600 text-xs">{serverErrors.password2}</p>}
                    </div>

                    <div>
                        <InputField
                            label='Username'
                            type='text'
                            name='username'
                            placeholder='@Username'
                            icon={<BsPerson className='text-2xl' />}
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                        {errors.username && <p className="border-l-2 rounded-sm border-red-800 px-2 mt-1 text-red-600 text-xs">{errors.username}</p>}
                        {serverErrors.username && <p className="border-l-2 rounded-sm border-red-800 px-2 mt-1 text-red-600 text-xs">{serverErrors.username}</p>}
                    </div>

                    <Checkbox
                        label='Show Password'
                        name='pwdToggle'
                        // checked={pwdsVisible}
                        onChange={handlePwdsVisible}
                    />

                    {serverErrors.non_field_errors && serverErrors.non_field_errors.map((value, index) => (
                        <p className="border-l-2 rounded-sm border-red-800 px-2 mt-1 text-red-600 text-xs" key={index}>{value}</p>
                    ))}

                    <MyButton text={isSubmitting ? 'Registering...' : 'Register'} className='w-full rounded-lg' buttonProperties={{ disabled: isSubmitting }} />

                    {serverErrors.general && <p className="border-l-4 rounded-sm border-red-800 px-2 text-red-600 text-sm mt-2">{serverErrors.general}</p>}

                </form>
                <p className='my-2 mt-8 text-center'>
                    Already have an account?
                    <span className='text-blue-600 hover:cursor-pointer hover:bg-gray-200 p-2 rounded-lg' onClick={() => navigate('/login')}> Login</span>
                </p>
            </div>
        </div>
    );
};

export default Register;
