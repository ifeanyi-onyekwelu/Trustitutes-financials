import React from "react";

interface InputFieldProps {
    label?: string;
    name?: string;
    value: string | number;
    onChange: (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => void;
    placeholder?: string;
    type?: string;
    required?: boolean;
    options?: { label: string; value: string }[]; // For dropdown options
    extraInfo?: React.ReactNode;
    disabled?: boolean;
}

const InputField = ({
    label,
    name,
    value,
    onChange,
    placeholder = "",
    type = "text",
    required = false,
    options = [],
    extraInfo,
    disabled = false,
}: InputFieldProps) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-gray-400 font-semibold mb-2">
                    {label} <span className="text-red-700">*</span>
                </label>
            )}
            {type === "select" ? (
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className="w-full py-2 px-4 bg-gray-900 text-gray-100 border rounded-md border-gray-300 focus:border-blue-800 focus:outline-none font-medium"
                >
                    <option value="" disabled>
                        {placeholder}
                    </option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : type === "textarea" ? (
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    className="w-full py-2 px-4 bg-gray-900 text-gray-100 border rounded-md border-gray-300 focus:border-blue-800 focus:outline-none font-medium"
                    rows={4} // Adjust the rows as needed
                />
            ) : (
                <input
                    type={type}
                    value={value}
                    name={name}
                    onChange={onChange}
                    className="w-full py-2 px-4 bg-gray-900 text-gray-100 border rounded-md border-gray-300 focus:border-blue-800 focus:outline-none font-medium"
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                />
            )}
            {extraInfo && <div className="mt-2">{extraInfo}</div>}
        </div>
    );
};

export default InputField;
