import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const InputField = ({ type, label, icon, className, onChange, value, placeholder, fieldProperties, name }) => {
    const [hasValue, setHasValue] = useState(false);

    const handleHasValueChange = (e) => {
        onChange(e);
        setHasValue(e.target.value.length > 0);
    };

    return (
        <div className={`${className} pt-1 flex justify-center items-center border-2 px-2 relative focus-within:border-blue-500 group ${hasValue ? 'border-blue-500' : 'border-gray-500'}`}>
            {icon && <span className="icon-container">{icon}</span>}
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                className="p-2 pl-4 outline-none border-none bg-transparent h-full peer w-full placeholder-transparent focus:placeholder-gray-400 transition-all duration-100"
                onChange={handleHasValueChange}
                name={name}
                {...fieldProperties}
            />
            <label
                htmlFor={name}
                className={`absolute pointer-events-none transition-all duration-300 px-2 border-x-2 rounded-sm
                    ${hasValue
                        ? `scale-[0.7] -top-3 bg-white border-blue-500 ${icon ? 'left-5' : '-left-1'}`
                        : `top-1.5 border-transparent ${icon ? 'left-12' : 'left-4'}`
                    } peer-focus:scale-[0.7] peer-focus:-top-3 peer-focus:bg-white peer-focus:border-blue-500 ${icon ? 'peer-focus:left-5' : 'peer-focus:left-4'}`}
            >
                {label}
            </label>
        </div>
    );
};

InputField.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string.isRequired,
    icon: PropTypes.element,
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    fieldProperties: PropTypes.object,
};


export default InputField;
