import InputField from './InputField';

const PasswordField = ({ showPassword, label, icon, className, onChange, value, placeholder, fieldProperties, name }) => {

    return (
        <InputField
            type={showPassword ? 'text' : 'password'}
            label={label}
            icon={icon}
            className={className}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            fieldProperties={fieldProperties}
            name={name}
        />
    );
}

export default PasswordField
