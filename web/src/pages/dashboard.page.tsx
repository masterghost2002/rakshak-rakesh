import useUserStore from "../store/useUserStore";
import ProfileData from "../components/profile-data";
import { Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import FileHandler from "../components/FileHandler";
const Dashboard = () => {
    const user = useUserStore((state) => state.user);
    const navigate = useNavigate();
    return (
        <div style={{ minWidth: '100vw', padding: '20px' }}>
            <Box display="flex" justifyContent="space-between">
                <Typography variant="h6">Dashboard</Typography>
                <Box>
                    <Button
                        variant="outlined"
                        startIcon={<EditIcon />}
                        onClick={() => {
                            navigate('/edit-profile');
                        }}
                    >
                        Edit Profile
                    </Button>
                </Box>
            </Box>
            <ProfileData profileData={user} />
            <Box
                display="flex"
                flexWrap="wrap"
                gap={2}
                bgcolor="primary.main"
                p={2}
                mt={2}
                color="white"
                flexDirection="column"
            >
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    gap={2}
                    flexGrow={1}
                >
                    <Typography variant="h6" gutterBottom>
                        Documents
                    </Typography>
                    <FileHandler />
                </Box>
                <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                    You can upload up to 5 documents, each of size 5MB, file type can be pdf and image.
                </Typography>
            </Box>
        </div>
    )
};
export default Dashboard;