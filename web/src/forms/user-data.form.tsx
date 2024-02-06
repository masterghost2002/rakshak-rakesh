import { Box, Button, Grid, TextField, TextareaAutosize } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { UserDataFormType, FormErrorType } from './schemas/user-data.schema';
type Props = {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    defaultValue?: UserDataFormType;
    formErrors?: Array<FormErrorType>;
    submitButtonText: string;
    isLoading: boolean;
}
const UserDataForm = ({ handleSubmit, onChange, defaultValue, formErrors, submitButtonText, isLoading }: Props) => {
    return (
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        onChange={onChange}
                        value={defaultValue?.firstName || ''}
                        error={formErrors?.some((error) => error.field === 'firstName')}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                        onChange={onChange}
                        value={defaultValue?.lastName || ''}
                        error={formErrors?.some((error) => error.field === 'lastName')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={onChange}
                        value={defaultValue?.email || ''}
                        error={formErrors?.some((error) => error.field === 'email')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        onChange={onChange}
                        value={defaultValue?.password || ''}
                        error={formErrors?.some((error) => error.field === 'password')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        onChange={onChange}
                        value={defaultValue?.confirmPassword || ''}
                        error={formErrors?.some((error) => error.field === 'confirmPassword')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="phoneNumber"
                        label="Phone Number"
                        type="text"
                        id="phopneNumber"
                        autoComplete="phone-number"
                        onChange={onChange}
                        value={defaultValue?.phoneNumber || ''}
                        error={formErrors?.some((error) => error.field === 'phoneNumber')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextareaAutosize
                        required
                        name="address"
                        style={{ width: '100%', minHeight: '60px' }} // Adjust width as needed
                        id="address"
                        autoComplete="address"
                        onChange={onChange}
                        placeholder="Address"
                        value={defaultValue?.address || ''}
                    />
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading}
            >
                {isLoading ? <CircularProgress size={24} sx={{ position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px' }} /> : `${submitButtonText}`}
            </Button>
        </Box>
    )
};
export default UserDataForm;