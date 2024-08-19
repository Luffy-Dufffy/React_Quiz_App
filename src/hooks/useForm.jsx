import { useState } from 'react';

const useForm = (initialValues, validate) => {
    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const validateForm = () => {
        const validationErrors = validate(formData);
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    return { formData, errors, handleInputChange, validateForm, setErrors };
};

export default useForm;
