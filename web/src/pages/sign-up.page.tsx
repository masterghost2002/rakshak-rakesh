import * as React from 'react';
import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import UserDataForm from '../forms/user-data.form';
import UserSignUpFormSchema, { UserDataFormType, FormErrorType } from '../forms/schemas/user-data.schema';
export default function SignUp() {

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

    const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const parsedFormData = UserSignUpFormSchema.safeParse(formData);
        if (!parsedFormData.success) {
            const errors = parsedFormData.error.errors.map((error) => {
                return {
                    field: error.path[0],
                    message: error.message
                }
            });
            setFormErrors(errors);
            return;
        }
        const data = parsedFormData.data;
        if(data.password !== data.confirmPassword){
            setFormErrors([{field: 'confirmPassword', message: 'Passwords do not match'}]);
            return;
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >

                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <UserDataForm
                    handleSubmit={handleSubmit}
                    onChange={onChange}
                    defaultValue={formData}
                    formErrors={formErrors}
                />
            </Box>
        </Container>
    );
}