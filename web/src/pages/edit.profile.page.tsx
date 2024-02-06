import { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import UserDataForm from '../forms/user-data.form';
import api from '../util/api-handler';
import { FormErrorType, UserDataFormType } from '../forms/schemas/user-data.schema';
import { ZodIssue } from 'zod';
import useUserStore from '../store/useUserStore';
export default function EditProfile() {

    const user = useUserStore(state => state.user);
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
        // setIsLoading(true);
        // try {
        //     await api.post('/api/user/sign-up', { userData: data });
        //     toast.success('Account created successfully.Redirecting to login page');
        //     navigate('/welcome/sign-in');
        //     setIsLoading(false);
        // } catch (error: any) {
        //     const data = error.response?.data?.data;
        //     if (data?.type === 'validation' || data?.type === 'duplicacy' || data?.type === 'authentication' || data?.type === 'not-found')
        //         errorSetterAndNotifier(data.result);
        //     else toast.error('Server error');
        //     setIsLoading(false);
        // }

    };

    return (
        <Container maxWidth="xs">
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
                <Typography component="h1" variant="h5">
                    Edit Profile
                </Typography>
                <UserDataForm
                    handleSubmit={handleSubmit}
                    submitButtonText="Update"
                    isLoading={isLoading}
                    errorSetterAndNotifier={errorSetterAndNotifier}
                    setFormErrors={setFormErrors}
                    formErrors={formErrors}
                    defaultValue={{
                        firstName: user?.firstName || '',
                        lastName: user?.lastName || '',
                        email: user?.email || '',
                        phoneNumber: user?.phoneNumber || '',
                        address: user?.address || '',
                        password:'',
                        confirmPassword:''
                    }}
                    type='UPDATE'
                />
            </Box>
        </Container>
    );
}