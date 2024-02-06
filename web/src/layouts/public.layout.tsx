import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import { Toaster } from "react-hot-toast";
const PublicLayout = () => {
    return (
        <Container maxWidth='xl'>
            <Toaster />
            <Outlet/>
        </Container>
    );
};
export default PublicLayout;