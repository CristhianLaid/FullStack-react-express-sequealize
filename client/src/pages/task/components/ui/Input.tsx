
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type: string;
  }
  
  export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ type, ...props }, ref) => (
    <input
      {...props}
      type={type}
      ref={ref}
      className={`border border-gray-400 p-2 w-full rounded`}
    />
  ));