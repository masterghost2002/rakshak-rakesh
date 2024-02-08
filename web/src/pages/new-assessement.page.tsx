import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import useTabSwitchDetection from "../hooks/useTabSwitchDetection";
import useRightClickDetectionAndDisable from "../hooks/useDetectAndDisableRightClick";
import useTimer from "../hooks/useTimer";
import useUserStore from "../store/useUserStore";
import { AssessmentType, QuestionType, SelectedOptionsType } from "../types/types";
import { createAxiosInstance } from "../util/api-handler";
import toast from "react-hot-toast";
import QuestionContainer from "../components/QuestionContainer";
const NewAssessmentPage = () => {

    //assessment and questions states
    const [assessment, setAssessment] = useState<AssessmentType>({
        _id: '',
        title: '',
        questions: [],
        passingQuestions: 0,
        totalQuestions: 0,
        createdAt: new Date(),
    });
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState<SelectedOptionsType[]>([]);

    const user = useUserStore(state => state.user);
    const accessToken = user?.accessToken;

    //custom hooks
    const [seconds, resetTimer] = useTimer({ threshold: 30 });
    const isTabActive = useTabSwitchDetection();
    const isRightClicked = useRightClickDetectionAndDisable();
    const navigate = useNavigate();

    const handleOptionChange = (questionId: string, selectedOption: number) => {
        const index = selectedOptions.findIndex((option) => option.questionId === questionId);
        if (index === -1)
            setSelectedOptions([...selectedOptions, { questionId, selectedOption }]);
        else {
            const updatedOptions = selectedOptions.map((option) => {
                if (option.questionId === questionId) {
                    return { ...option, selectedOption };
                }
                return option;
            });
            setSelectedOptions(updatedOptions);
        }
    };

    //handle terminate will be called when user is found to be cheating
    const handleTerminate = async () => {
        const api = createAxiosInstance(accessToken);
        try {
            const response = await api.post('/api/assessement/generate-result', { selectedOptions, assessment, remarks: 'Assessment Terminated user found to be cheating', isTerminated: true });
            navigate('/result', { state: response.data.data })
        } catch (error) {
            toast.error('Failed to terminate Assessment');
        }
    };

    // handle submit will be called when user completes the assessment, or clicks on exit
    const handleSubmit = async (remarks = 'Completed') => {
        const api = createAxiosInstance(accessToken);
        try {
            const response = await api.post('/api/assessement/generate-result', { selectedOptions, assessment, remarks, isTerminated: false });
            navigate('/result', { state: response.data.data });
        } catch (error) {
            console.log(error);
            throw new Error('Failed to submit Assessment');
        }
    };

    //handle next will be called when user clicks on next button
    const handleNext = () => {
        resetTimer();
        if (!assessment) return;
        if (currentQuestion + 1 < assessment?.totalQuestions) {
            const questionId = questions[currentQuestion]?._id;
            const index = selectedOptions.findIndex((option) => option.questionId === questionId);
            if (index === -1)
                setSelectedOptions(prev=>[...prev, { questionId, selectedOption:-1 }]);
            setCurrentQuestion(currentQuestion + 1);

        }
        else toast.promise(handleSubmit(), {
            loading: 'Submitting...',
            success: 'Assessment Submitted!',
            error: 'Failed to submit Assessment'
        });
    }
    const handleExit = () => {
        toast.promise(handleSubmit('User exit in between'), {
            loading: 'Submitting...',
            success: 'Assessment Submitted!',
            error: 'Failed to submit Assessment'
        });
    }


    //handle timer
    useEffect(() => {
        if (seconds <= 0)
            handleNext();
    }, [seconds]);

    // if tab is inactive or right clicked, terminate the assessment
    useEffect(() => {
        if (!isTabActive || isRightClicked) {
            handleTerminate();
            navigate('/guidelines');
        }
    }, [isTabActive, isRightClicked, navigate]);

    //fetch assessment and questions
    useEffect(() => {
        const fetchAssessment = async () => {
            const api = createAxiosInstance(accessToken);
            try {
                const response = await api.get('/api/assessement/new-assessment');
                const { assessment, questions } = response.data.data;
                setAssessment(assessment);
                setQuestions(questions);
            } catch (error) {
                console.log(error);
                throw new Error('Failed to fetch Assessment');
            }
        }
        toast.promise(fetchAssessment(), {
            loading: 'Fetching Assessment...',
            success: 'Assessment Fetched!',
            error: 'Failed to fetch Assessment'
        });
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
                    <Typography noWrap>
                        Time Left: {seconds} s
                    </Typography>
                    <Typography noWrap sx={{ marginLeft: 2 }}>
                        {currentQuestion + 1}/{assessment?.totalQuestions}
                    </Typography>
                    <Box flexGrow={1} />
                    <Button color="inherit" onClick={handleExit}>Exit</Button>
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
                    <QuestionContainer
                        questionNumber={currentQuestion + 1}
                        question={questions[currentQuestion]?.question}
                        options={questions[currentQuestion]?.options}
                        selectedOption={selectedOptions.find((option) => option.questionId === questions[currentQuestion]?._id)?.selectedOption.toString() || ''}
                        questionId={questions[currentQuestion]?._id}
                        handleOptionChange={handleOptionChange}
                    />
                </Container>
            </main>
            <footer
                style={{
                    marginTop: 'auto',
                    padding: '1rem',
                }}
            >
                <Container maxWidth="sm" >
                    <Button variant="contained" color="primary" fullWidth onClick={handleNext}>
                        {currentQuestion + 1 < assessment?.totalQuestions ? 'Next' : 'Submit'}
                    </Button>
                </Container>
            </footer>
        </div>
    )
};
export default NewAssessmentPage;