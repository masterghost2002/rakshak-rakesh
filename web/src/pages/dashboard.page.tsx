import useUserStore from "../store/useUserStore";
import ProfileData from "../components/profile-data";
import { Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import FileHandler from "../components/FileHandler";
import Documents from "../components/Documents";
import useDocumentStore from "../store/useDocumentStore";
import { createAxiosInstance } from "../util/api-handler";
import toast from "react-hot-toast";
const Dashboard = () => {
    const user = useUserStore((state) => state.user);
    const addNewDocument = useDocumentStore((state) => state.addNewDocument);
    const navigate = useNavigate();

    const uploadFile = async (file: File, fileName: string) => {
        if(!file) return;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', fileName);
        const api = createAxiosInstance(user?.accessToken);
        try{
            const response = await api.post('/api/documents/upload', formData);
            addNewDocument(response.data.data);
        }catch(err:any){
            throw new Error(err);
        }
    }
    const handleFileUpload = async (file:File, fileName:string) => {
        toast.promise(uploadFile(file, fileName), {
            loading: 'Uploading document..',
            success: 'Document uploaded successfully',
            error: 'Failed to upload document'
        });
    }
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
                    <FileHandler
                        onFileUpload={handleFileUpload}
                    />
                </Box>
                <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                    You can upload your documents, each of size 5MB, file type can be pdf and image.
                </Typography>
                <Documents 
                    accessToken = {user?.accessToken}
                />
            </Box>
        </div>
    )
};
export default Dashboard;