import useUserStore from "../store/useUserStore";
import ProfileData from "../components/profile-data";
import { Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
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
        </div>
    )
};
export default Dashboard;