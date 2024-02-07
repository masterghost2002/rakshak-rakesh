
import { Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
function GuidelinePage() {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                marginY: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                padding:2
            }}
        >
            <Typography variant="h4" gutterBottom>
                Test Guidelines
            </Typography>
            <Box >
                <ul>
                    <li>This test will contain 20 questions.</li>
                    <li>You must answer 15 questions correctly to pass the test.</li>
                    <li>Each question will have 4 options, one of which is correct.</li>
                    <li>You will have 10 minutes to complete the assessment.</li>
                    <li>Each question has a time limit of 30 seconds.</li>
                    <li>You can't go back to the previous question.</li>
                    <li>Switching tabs, opening developer options (Right Click is probhited), will lead to termination of the assessment.</li>
                    <li>On successful completion, your license will be generated.</li>
                </ul>
            </Box>
            <Button variant="contained" color="primary" onClick={() => navigate('/new-assessement')}>
                Start Assessment
            </Button>
        </Box>
    );
}

export default GuidelinePage;
