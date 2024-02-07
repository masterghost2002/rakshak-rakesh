import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Container, AppBar, Toolbar, Typography } from "@mui/material";
import { Toaster } from "react-hot-toast";
import useUserStore from "../store/useUserStore";
const PublicLayout = () => {
    const user = useUserStore(state => state.user);
    const navigate = useNavigate();
    useEffect(()=>{
        if(user)
            navigate('/');
    }, [user])
    return (
        <>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Typography variant="h6" color="inherit" component="div">
                        Rakshak
                    </Typography>
                </Toolbar>
            </AppBar>
            <Toaster />
            <Container  style = {{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Outlet />
            </Container>
        </>
    );
};
export default PublicLayout;