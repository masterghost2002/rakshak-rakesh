import { Box, Button, Grid, TextField, TextareaAutosize } from '@mui/material';
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import UserSignUpFormSchema, { UserDataFormType, FormErrorType, UserDataFormSchemaPartial } from './schemas/user-data.schema';
import { ZodIssue } from 'zod';
type Props = {
    handleSubmit: (data:UserDataFormType) => Promise<void>;
    defaultValue?: UserDataFormType | undefined;
    submitButtonText: string;
    isLoading: boolean;
    formErrors: Array<FormErrorType>;
    errorSetterAndNotifier: (values: Array<ZodIssue>) => void;
    setFormErrors: (values: Array<FormErrorType>) => void;
    type?:'UPDATE'|'CREATE';
}
const UserDataForm = ({ handleSubmit, defaultValue, submitButtonText, isLoading , formErrors, errorSetterAndNotifier, setFormErrors, type = 'CREATE'}: Props) => {
    // formData is an object of UserDataFormType
    const [formData, setFormData] = useState<UserDataFormType>({
        firstName:defaultValue?.firstName || '',
        lastName: defaultValue?.lastName || '',
        email: defaultValue?.email || '',
        password: defaultValue?.password || '',
        address: defaultValue?.address || '',
        phoneNumber: defaultValue?.phoneNumber || '',
        confirmPassword: defaultValue?.confirmPassword  || ''
    });
    // onChange is a function that takes an event of type React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        const errors = formErrors.filter((error) => error.field !== name);
        setFormErrors(errors);
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(type);
        let parsedFormData;
        if(type === 'CREATE') parsedFormData = UserSignUpFormSchema.safeParse(formData);
        else parsedFormData = UserDataFormSchemaPartial.safeParse(formData);
        if (!parsedFormData.success) {
            errorSetterAndNotifier(parsedFormData.error.errors);
            return;
        }
        const data = parsedFormData.data;
        handleSubmit(data);
    }
    return (
        <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required = {type === 'CREATE'}
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        onChange={onChange}
                        value={formData.firstName}
                        error={formErrors?.some((error) => error.field === 'firstName')}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required = {type === 'CREATE'}
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                        onChange={onChange}
                        value={formData.lastName}
                        error={formErrors?.some((error) => error.field === 'lastName')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required = {type === 'CREATE'}
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={onChange}
                        value={formData.email}
                        error={formErrors?.some((error) => error.field === 'email')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required = {type === 'CREATE'}
                        fullWidth
                        name="password"
                        label={type === "CREATE"?"Password":"New Password"}
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        onChange={onChange}
                        value={formData.password}
                        error={formErrors?.some((error) => error.field === 'password')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required = {type === 'CREATE'}
                        fullWidth
                        name="confirmPassword"
                        label={type === "CREATE"?"Confirm Password":"Confirm new Password"}
                        type="password"
                        id="confirmPassword"
                        onChange={onChange}
                        value={formData.confirmPassword}
                        error={formErrors?.some((error) => error.field === 'confirmPassword')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required = {type === 'CREATE'}
                        fullWidth
                        name="phoneNumber"
                        label="Phone Number"
                        type="text"
                        id="phopneNumber"
                        autoComplete="phone-number"
                        onChange={onChange}
                        value={formData.phoneNumber}
                        error={formErrors?.some((error) => error.field === 'phoneNumber')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextareaAutosize
                        required = {type === 'CREATE'}
                        name="address"
                        style={{ width: '100%', minHeight: '60px' }} // Adjust width as needed
                        id="address"
                        autoComplete="address"
                        onChange={onChange}
                        placeholder="Address"
                        value={formData.address}
                    />
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ minHeight: '36px', position: 'relative' }}
                disabled={isLoading}
            >
                {isLoading ? <CircularProgress size={24} sx={{ position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px' }} /> : `${submitButtonText}`}
            </Button>
        </Box>
    )
};
export default UserDataForm;