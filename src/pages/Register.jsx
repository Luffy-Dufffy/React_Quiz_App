import React, { useState } from 'react';
import MyButton from '../components/MyButton.jsx';
import InputField from '../components/InputField.jsx';
import { TfiEmail } from 'react-icons/tfi';
import { CiLock } from 'react-icons/ci';
import { BsPerson } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/auth.js';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        password1: '',
        password2: '',
        username: ''
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [serverErrors, setServerErrors] = useState({});
    const [pwdsVisible, setPwdsVisible] = useState(false);

    const handlePwdsVisible = (e) => {
        setPwdsVisible(e.target.checked);
    }

    const handleFormDataChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };


    const validateForm = () => {
        let valid = true;
        let newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
            valid = false;
        }
        if (!formData.password1) {
            newErrors.password1 = 'Password is required';
            valid = false;
        } else if (formData.password1.length < 8) {
            newErrors.password1 = 'Password must be at least 8 characters long';
            valid = false;
        }

        if (!formData.password2) {
            newErrors.password2 = 'Password is required';
            valid = false;
        }
        if (formData.password1 !== formData.password2) {
            newErrors.password2 = 'Passwords do not match';
            valid = false;
        }
        if (!formData.username) {
            newErrors.username = 'Username is required';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleRegistration = async (event) => {
        event.preventDefault();
        const valid = validateForm();

        if (valid) {
            try {
                const message = await register(formData);
                if (message.error) {
                    setServerErrors(message.message);
                    return;
                }
                navigate('/verification-sent');
            } catch (error) {
                console.error('Error during registration:', error);
                setServerErrors({ general: 'An error occurred during registration. Please try again.' });
            }
        }
    };

    return (
        <div className="registerPage w-screen h-screen flex justify-center items-center">
            <div className='drop-shadow-xl shadow-xl p-6 bg-white text-black w-96'>
                <h1 className='text-2xl text-center mb-6 font-semibold'>Registration Form</h1>
                <form onSubmit={handleRegistration} className='space-y-3 flex flex-col justify-center'>
                    <div className='w-full'>
                        <InputField
                            label='Email'
                            type='email'
                            name={'email'}
                            placeholder='Enter your email'
                            icon={<TfiEmail className='text-2xl' />}
                            onChange={handleFormDataChange}
                            value={formData.email}
                            className='w-full'
                        />
                        {errors.email && <span className="border-l-2 border-red-800 px-2 mt-1 text-red-600 text-xs">{errors.email}</span>}
                        {serverErrors.email && <p className="border-l-2 border-red-800 px-2 mt-1 text-red-600 text-xs">{serverErrors.email}</p>}
                    </div>

                    <div className='w-full'>
                        <InputField
                            label='Password'
                            type={pwdsVisible ? 'text' : 'password'}
                            name={'password1'}
                            placeholder='Enter your password'
                            icon={<CiLock className='text-2xl' />}
                            onChange={handleFormDataChange}
                            value={formData.password1}
                            className='w-full'
                        />
                        {errors.password1 && <span className="border-l-2 border-red-800 px-2 mt-1 text-red-600 text-xs">{errors.password1}</span>}
                        {serverErrors.password1 && <p className="border-l-2 rounded-sm border-red-800 px-2 mt-1 text-red-600 text-xs">{serverErrors.password1}</p>}
                    </div>

                    <div className='w-full'>
                        <InputField
                            label='Re-Password'
                            type={pwdsVisible ? 'text' : 'password'}
                            name={'password2'}
                            placeholder='Confirm your password'
                            icon={<CiLock className='text-2xl' />}
                            onChange={handleFormDataChange}
                            value={formData.password2}
                            className='w-full'
                        />
                        {errors.password2 && <span className="border-l-2 border-red-800 px-2 mt-1 text-red-600 text-xs">{errors.password2}</span>}
                        {serverErrors.password2 && <p className="border-l-2 rounded-sm border-red-800 px-2 mt-1 text-red-600 text-xs">{serverErrors.password2}</p>}
                    </div>

                    <div className='w-full'>
                        <div className='w-full h-full flex justify-center items-center'>
                            <InputField
                                label='Username'
                                type='text'
                                name={'username'}
                                placeholder='@Username'
                                icon={<BsPerson className='text-2xl' />}
                                onChange={handleFormDataChange}
                                value={formData.username}
                                // fieldProperties={{ readOnly: true, disabled: true }}
                                className='border-gray-500'
                            />
                            <button className='py-2 h-full w-[30%] border-purple-500 text-black border-2 ml-1' type='button'>G-User</button>
                        </div>
                        {errors.username && <span className="border-l-2 border-red-800 px-2 mt-1 text-red-600 text-xs">{errors.username}</span>}
                        {serverErrors.username && <p className="border-l-2 border-red-800 px-2 mt-1 text-red-600 text-xs">{serverErrors.username}</p>}
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type="checkbox" name="pwdToggle" onChange={handlePwdsVisible} />
                        <p>Show Password</p>
                    </div>
                    {serverErrors.non_field_errors && serverErrors.non_field_errors.map((value, index) => <p className="border-l-2 rounded-sm border-red-800 px-2 mt-1 text-red-600 text-xs" key={index}>{value}</p>)}
                    <MyButton text='Register' className='w-full' />
                    {serverErrors.general && <p className="text-red-600 text-sm mt-2">{serverErrors.general}</p>}
                </form>

                <p className='my-2 mt-8 text-center'>
                    Already have an account?
                    <span className='text-blue-600 hover:cursor-pointer' onClick={() => navigate('/login')}> Login</span>
                </p>
            </div>
        </div>
    );
};

export default Register;
