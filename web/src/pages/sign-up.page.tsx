import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import CssBaseline from '@mui/material/CssBaseline';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import UserDataForm from '../forms/user-data.form';
import api from '../util/api-handler';
import { FormErrorType, UserDataFormType } from '../forms/schemas/user-data.schema';
import { ZodIssue } from 'zod';
export default function SignUp() {

    // will be used for redirecting to login page after successful sign up
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // formErrors is an array of FormErrorType
    const [formErrors, setFormErrors] = useState<Array<FormErrorType>>([]);

    // errorSetterAndNotifier is a function that takes an array of ZodIssue and returns an array of FormErrorType
    const errorSetterAndNotifier = (values: Array<ZodIssue>) => {
        const errors = values.map((error) => {
            toast.error(error.message);
            return {
                field: error.path[0],
                message: error.message
            }
        });
        setFormErrors(errors);
    }
    // handleSubmit is an async function that takes an event of type React.FormEvent<HTMLFormElement>
    const handleSubmit = async (data:UserDataFormType) => {
        setIsLoading(true);
        try {
            await api.post('/api/user/sign-up', { userData: data });
            navigate('/welcome/sign-in');
            setIsLoading(false);
        } catch (error: any) {
            const data = error.response?.data?.data;
            if (data?.type === 'validation' || data?.type === 'duplicacy' || data?.type === 'authentication' || data?.type === 'not-found')
                errorSetterAndNotifier(data.result);
            else toast.error('Server error');
            setIsLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginY: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2
                }}
            >
                <Typography component="h4" color={'grey.500'}>
                    Streamlining Onboarding, Driving Excellence: Your Gateway to Effortless Online Driving Assessment and Instant Licensing
                </Typography>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <UserDataForm
                    handleSubmit={handleSubmit}
                    submitButtonText="Sign Up"
                    isLoading={isLoading}
                    errorSetterAndNotifier={errorSetterAndNotifier}
                    setFormErrors={setFormErrors}
                    formErrors={formErrors}
                    defaultValue={undefined}
                />
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link to="/welcome/sign-in">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}