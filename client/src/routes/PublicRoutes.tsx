import { Routes, Route } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import Home from "../features/public/Home";
import Account from "../features/public/Account";
import Services from "../features/public/Services";
import Loans from "../features/public/Loans";
import Help from "../features/public/Help";
import About from "../features/public/About";

const PublicRoutes = () => {
    return (
        <Routes>
            <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="about-us" element={<About />} />
                <Route path="accounts" element={<Account />} />
                <Route path="services" element={<Services />} />
                <Route path="loans" element={<Loans />} />
                <Route path="help" element={<Help />} />
            </Route>
        </Routes>
    );
};

export default PublicRoutes;
