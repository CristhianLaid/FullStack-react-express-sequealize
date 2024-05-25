import React from 'react';

interface MessageProps {
  message: string;
}

export const Message: React.FC<MessageProps> = ({ message }) => {
  return (
    <p className="text-slate-200 bg-red-500 py-2 px-3 text-sm rounded-sm mb-1">
      {message}
    </p>
  );
};
