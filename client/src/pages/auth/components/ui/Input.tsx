import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ type, ...props }, ref) => (
    <input
        {...props}
        type={type}
        ref={ref}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    />
));