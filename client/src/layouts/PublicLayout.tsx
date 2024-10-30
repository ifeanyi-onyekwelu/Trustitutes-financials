import { Outlet } from "react-router-dom";
import Header from "../shared/Header";
import Footer from "../shared/Footer";

const PublicLayout = () => {
    return (
        <>
            <Header />
            <main className="md:px-20">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default PublicLayout;
