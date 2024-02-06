import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import { Toaster } from "react-hot-toast";
import Header from "../components/Header";
import useUserStore from "../store/useUserStore";
const ProtectedLayout = () => {
    const user = useUserStore((state) => state.user);
    const navigate = useNavigate();
    useEffect(() => {
        if (!user)
            navigate('/welcome/sign-in');
    }, [user, navigate]);
    return (
        <>
            <Header />
            <Toaster />
            <Container  style = {{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Outlet />
            </Container>
        </>
    )
};
export default ProtectedLayout;