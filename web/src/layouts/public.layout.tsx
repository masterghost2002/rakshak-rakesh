import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
const PublicLayout = () => {
    return (
        <Container maxWidth='xl'>
            <Outlet/>
        </Container>
    );
};
export default PublicLayout;