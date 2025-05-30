const Input = ({ label, name, value, onChange, type = "text" }: any) => {
    return (
        <>
            <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
            >
                {label}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
            />
        </>
    );
};

export default Input;
