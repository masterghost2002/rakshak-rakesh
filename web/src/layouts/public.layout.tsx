import { Outlet } from "react-router-dom";
import { Container, AppBar, Toolbar, Typography } from "@mui/material";
import { Toaster } from "react-hot-toast";
const PublicLayout = () => {
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