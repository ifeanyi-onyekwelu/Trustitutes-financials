import React from "react";

interface Props {
    value: string;
    name: string;
    label: string;
    type?: string;
    onChange: (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => void;
}

const FormGroup = ({ value, name, label, onChange, type = "text" }: Props) => {
    return (
        <div className="mb-5 w-full">
            <label
                htmlFor={name}
                className="block mb-1 font-medium text-gray-700"
            >
                {label}
            </label>
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                aria-label={label}
                placeholder={`Enter your ${label}`}
                className="w-full bg-white border border-gray-300 rounded-lg transition-all duration-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary hover:border-primary"
                required
            />
        </div>
    );
};

export default FormGroup;
