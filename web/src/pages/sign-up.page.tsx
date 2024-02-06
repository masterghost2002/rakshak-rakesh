import * as React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ZodIssue } from 'zod';
import { toast } from 'react-hot-toast';
import CssBaseline from '@mui/material/CssBaseline';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import UserDataForm from '../forms/user-data.form';
import UserSignUpFormSchema, { UserDataFormType, FormErrorType } from '../forms/schemas/user-data.schema';
import api from '../util/api-handler';
export default function SignUp() {

    // will be used for redirecting to login page after successful sign up
    const navigate = useNavigate();

    // formData is an object of UserDataFormType
    const [formData, setFormData] = useState<UserDataFormType>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        address: '',
        phoneNumber: '',
        confirmPassword: ''
    });

    // formErrors is an array of FormErrorType
    const [formErrors, setFormErrors] = useState<Array<FormErrorType>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);


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

    const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        const errors = formErrors.filter((error) => error.field !== name);
        setFormErrors(errors);
    };

    // handleSubmit is an async function that takes an event of type React.FormEvent<HTMLFormElement>
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const parsedFormData = UserSignUpFormSchema.safeParse(formData);
        if (!parsedFormData.success) {
            errorSetterAndNotifier(parsedFormData.error.errors);
            return;
        }
        const data = parsedFormData.data;
        if (data.password !== data.confirmPassword) {
            setFormErrors([{ field: 'confirmPassword', message: 'Passwords do not match' }]);
            toast.error('Passwords do not match');
            return;
        }
        setIsLoading(true);
        try {
            await api.post('/api/user/sign-up', { userData: data });
            toast.success('Account created successfully.Redirecting to login page');
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
                    onChange={onChange}
                    defaultValue={formData}
                    formErrors={formErrors}
                    submitButtonText="Sign Up"
                    isLoading={isLoading}
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