import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { login } from '../services/auth';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [serverErrors, setServerErrors] = useState({});
    const [pwdVisible, setPwdVisible] = useState(false);

    const handlePwdVisibleChange = () => {
        setPwdVisible(!pwdVisible);
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
        if (!formData.password || !formData.password.trim()) {
            newErrors.password = 'Password is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        const valid = validateInputFieldsData();

        if (valid) {
            try {
                const message = await login(formData);
                if (message.error) {
                    setServerErrors(message.message);
                    return;
                }
                navigate('/');
            } catch (error) {
                console.error('Error during login:', error);
                setServerErrors({ general: 'An error occurred during login. Please try again.' });
            }
        }
    };

    return (
        <div className="loginPage w-screen h-screen flex justify-center items-center">
            <div className="login-wrapper min-w-[340px] bg-white p-10 rounded-xl shadow-2xl select-none">
                <form className="flex justify-center align-center flex-col" onSubmit={handleLogin}>
                    <h2 className="text-3xl font-bold text-center mb-5 font-serif">Login</h2>

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

                    <div className="field password flex flex-col mb-2">
                        <label htmlFor="password">Password</label>
                        <div className={`flex justify-center align-center w-full border-2 rounded-md bg-white ${errors.password ? 'border-red-600' : ''}`}>
                            <input
                                type={pwdVisible ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleFormDataChange}
                                className="peer outline-none px-3 py-1 w-[88%] rounded-md"
                            />
                            <div className="w-[12%] h-full p-1.5" onClick={handlePwdVisibleChange}>
                                {pwdVisible ? <FaEyeSlash className="h-full w-full cursor-pointer" /> : <FaEye className="h-full w-full cursor-pointer" />}
                            </div>
                        </div>
                        {errors.password && <p className="border-l-2 rounded-sm border-red-800 px-2 mt-1 text-red-600 text-xs">{errors.password}</p>}
                        {serverErrors.password && <p className="border-l-2 rounded-sm border-red-800 px-2 mt-1 text-red-600 text-xs">{serverErrors.password}</p>}
                    </div>

                    {serverErrors.non_field_errors && serverErrors.non_field_errors.map((value, index) => <p className="border-l-2 rounded-sm border-red-800 px-2 mt-1 text-red-600 text-xs" key={index}>{value}</p>)}

                    <button type="submit" className="bg-blue-600 h-10 text-white rounded-md mt-6 hover:bg-blue-500 cursor-pointer mb-4">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
