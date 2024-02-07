import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import useTabSwitchDetection from "../hooks/useTabSwitchDetection";
import useRightClickDetectionAndDisable from "../hooks/useDetectAndDisableRightClick";
import useTimer from "../hooks/useTimer";
import useUserStore from "../store/useUserStore";
import { createAxiosInstance } from "../util/api-handler";
const NewAssessmentPage = () => {
    
    const [seconds, resetTimer] = useTimer({threshold: 30 });
    const user = useUserStore(state=>state.user);
    const accessToken = user?.accessToken;
    const isTabActive = useTabSwitchDetection();
    // const isRightClicked = useRightClickDetectionAndDisable();
    const navigate = useNavigate();
    
    const handleNext = ()=>{
        resetTimer();
    }
    useEffect(() => {
        if (seconds <= 0)
            handleNext();
    }, [seconds]);
   
    // useEffect(() => {
    //     if (!isTabActive || isRightClicked) {
    //         navigate('/guidelines');
    //     }
    // }, [isTabActive, isRightClicked, navigate]);
    useEffect(() => {
        const fetchAssessment = async () => {
            const api = createAxiosInstance(accessToken);
            try {
                const response = await api.get('/api/new-assessment');
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAssessment();
    }, [accessToken]);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100dvh',
            }}
        >
            <AppBar position="fixed">
                <Toolbar>
                    <Typography  noWrap>
                        Time Left: {seconds} seconds
                    </Typography>
                    <Box flexGrow={1} />
                    <Button color="inherit" onClick={() => { }}>Exit</Button>
                </Toolbar>
            </AppBar>
            <main
                style={{
                    flexGrow: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Container>
                    {/* Your content here */}
                </Container>
            </main>
            <footer
                style={{
                    marginTop: 'auto',
                    padding: '1rem',
                }}
            >
                <Container maxWidth="sm" >
                    <Button variant="contained"  color="primary" fullWidth onClick={handleNext}>Next</Button>
                </Container>
            </footer>
        </div>
    )
};
export default NewAssessmentPage;