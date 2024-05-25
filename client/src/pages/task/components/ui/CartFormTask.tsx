import { ReactNode } from 'react';

export const CartFormTask = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mb-4">{children}</div>
  );
};
