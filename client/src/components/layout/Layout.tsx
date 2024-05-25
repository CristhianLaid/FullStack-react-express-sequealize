import { Outlet } from "react-router-dom";
import { CartLayout, Navbar } from "..";
import { SliceBar } from "./SliceBar";


export const Layout = () => {
    return (
        <div>
            <Navbar />
            <CartLayout>
                <SliceBar />
            </CartLayout>
            <Outlet />
        </div>
    );
};
