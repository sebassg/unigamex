import React, { ChangeEvent } from 'react';

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, name, value, onChange, error, placeholder }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
