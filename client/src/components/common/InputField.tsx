interface InputFieldProps {
    label: string;
    name?: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
    required?: boolean;
    extraInfo?: React.ReactNode;
}

const InputField = ({
    label,
    name,
    value,
    onChange,
    placeholder = "",
    type = "text",
    required = false,
    extraInfo,
}: InputFieldProps) => {
    return (
        <div className="w-full">
            <label className="block text-gray-400 font-semibold mb-2">
                {label} <span className="text-red-700">*</span>
            </label>
            <input
                type={type}
                value={value}
                name={name}
                onChange={onChange}
                className="w-full py-2 px-4 bg-gray-900 text-gray-100 border rounded-md border-gray-300 focus:border-blue-800 focus:outline-none font-medium"
                placeholder={placeholder}
                required={required}
            />
            {extraInfo && <div className="mt-2">{extraInfo}</div>}
        </div>
    );
};

export default InputField;
