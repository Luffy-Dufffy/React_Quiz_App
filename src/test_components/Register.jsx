import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { register } from '../services/auth';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password1: '',
        password2: ''
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [serverErrors, setServerErrors] = useState({});
    const [pwd1Visible, setPwd1Visible] = useState(false);
    const [pwd2Visible, setPwd2Visible] = useState(false);

    const handlePwd1VisibleChange = () => {
        setPwd1Visible(!pwd1Visible);
    };

    const handlePwd2VisibleChange = () => {
        setPwd2Visible(!pwd2Visible);
    };

    const handleFormDataChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const validateInputFieldsData = () => {
        const newErrors = {};
        if (!formData.username || !formData.username.trim()) {
            newErrors.username = 'Username is required';
        }
        if (!formData.email || !formData.email.trim()) {
            newErrors.email = 'Email is required';
        }
        if (!formData.password1 || !formData.password1.trim()) {
            newErrors.password1 = 'Password is required';
        }
        if (!formData.password2 || !formData.password2.trim()) {
            newErrors.password2 = 'Password is required';
        }
        if (!formData.password1.trim().length >= 8) {
            newErrors.password1 = 'Password is required';
        }
        if (formData.password1 !== formData.password2) {
            newErrors.password1 = 'Passwords do not match';
            newErrors.password2 = 'Passwords do not match';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegistration = async (event) => {
        event.preventDefault();
        const valid = validateInputFieldsData();

        if (valid) {
            try {
                const message = await register(formData);
                if (message.error) {
                    setServerErrors(message.message);
                    console.log("message.message error");
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
            <div className="register-wrapper min-w-[340px] bg-white p-10 rounded-xl shadow-2xl select-none">
                <form className="flex justify-center align-center flex-col" onSubmit={handleRegistration}>
                    <h2 className="text-3xl font-bold text-center mb-5 font-serif">Register</h2>

                    <div className="field email flex flex-col mb-2">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleFormDataChange}
                            className="border-2 rounded-md px-3 py-1"
                        />
                        {errors.email && <p className="border-l-2 border-red-800 px-2 mt-1 text-red-600 text-xs">{errors.email}</p>}
                        {serverErrors.email && <p className="border-l-2 border-red-800 px-2 mt-1 text-red-600 text-xs">{serverErrors.email}</p>}
                    </div>

                    <div className="field username flex flex-col mb-2">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleFormDataChange}
                            className="border-2 rounded-md px-3 py-1"
                        />
                        {errors.username && <p className="border-l-2 border-red-800 px-2 mt-1 text-red-600 text-xs">{errors.username}</p>}
                        {serverErrors.username && <p className="border-l-2 border-red-800 px-2 mt-1 text-red-600 text-xs">{serverErrors.username}</p>}
                    </div>

                    <div className="flex flex-col mb-2">
                        <label htmlFor="password1">Password</label>
                        <div className='flex  justify-center align-center w-full border-2 rounded-md bg-white'>
                            <input
                                type={pwd1Visible ? "text" : "password"}
                                name="password1"
                                value={formData.password1}
                                onChange={handleFormDataChange}
                                className='peer outline-none px-3 py-1 w-[88%] rounded-md'
                            />
                            <div className='w-[12%] h-full p-1.5' onClick={handlePwd1VisibleChange}>
                                {pwd1Visible ? <FaEyeSlash className='h-full w-full cursor-pointer' /> : <FaEye className='h-full w-full cursor-pointer' />}
                            </div>
                        </div>
                        {errors.password1 && <p className="border-l-2 rounded-sm border-red-800 px-2 mt-1 text-red-600 text-xs">{errors.password1}</p>}
                        {serverErrors.password1 && <p className="border-l-2 rounded-sm border-red-800 px-2 mt-1 text-red-600 text-xs">{serverErrors.password1}</p>}
                    </div>

                    <div className="flex flex-col mb-2">
                        <label htmlFor="password2">Confirm Password</label>
                        <div className={`flex justify-center align-center w-full border-2 rounded-md bg-white ${errors.password2 ? 'border-red-600' : ''}`}>
                            <input
                                type={pwd2Visible ? "text" : "password"}
                                name="password2"
                                value={formData.password2}
                                onChange={handleFormDataChange}
                                className='peer outline-none px-3 py-1 w-[88%] rounded-md'
                            />
                            <div className='w-[12%] h-full p-1.5' onClick={handlePwd2VisibleChange}>
                                {pwd2Visible ? <FaEyeSlash className='h-full w-full cursor-pointer' /> : <FaEye className='h-full w-full cursor-pointer' />}
                            </div>
                        </div>
                        {errors.password2 && <p className="border-l-2 rounded-sm border-red-800 px-2 mt-1 text-red-600 text-xs">{errors.password2}</p>}
                        {serverErrors.password2 && <p className="border-l-2 rounded-sm border-red-800 px-2 mt-1 text-red-600 text-xs">{serverErrors.password2}</p>}
                    </div>

                    {serverErrors.general && <p className="text-red-600 text-center text-sm mt-2">{serverErrors.general}</p>}

                    <button type="submit" className="bg-blue-600 h-10 text-white rounded-md mt-6 hover:bg-blue-500 cursor-pointer mb-4">Register</button>
                    {serverErrors.non_field_errors && serverErrors.non_field_errors.map((value, index) => <p className="border-l-2 rounded-sm border-red-800 px-2 mt-1 text-red-600 text-xs" key={index}>{value}</p>)}
                </form>
            </div>
        </div>

    );
};

export default Register;
