import { ReactNode } from 'react';


export const CartMain = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
      <div className="bg-gray-50 relative overflow-y-auto lg:ml-64">
        <div className="pt-6 px-4 h-[100vh]">
          {children}
        </div>
      </div>
    </>
  )
};
