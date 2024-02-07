import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Container } from "@mui/material";
import { Toaster } from "react-hot-toast";
import Header from "../components/Header";
import useUserStore from "../store/useUserStore";
const ProtectedLayout = () => {
    const user = useUserStore((state) => state.user);
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;
    useEffect(() => {
        if (!user)
            navigate('/welcome/sign-in');
    }, [user, navigate]);
    return (
        <>
            {pathname !== '/new-assessement' && <Header />}
            <Toaster />
            <Container  style = {{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Outlet />
            </Container>
        </>
    )
};
export default ProtectedLayout;