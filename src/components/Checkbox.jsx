const Checkbox = ({ label, name, checked, onChange }) => (
    <div className='flex items-center gap-2'>
        <input type="checkbox" name={name} checked={checked} onChange={onChange} />
        <p>{label}</p>
    </div>
);

export default Checkbox;