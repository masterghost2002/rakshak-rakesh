import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import * as z from 'zod';
import { ZodIssue } from 'zod';
import toast from 'react-hot-toast';
import { FormErrorType } from '../forms/schemas/user-data.schema';
import api from '../util/api-handler';
import useUserStore from '../store/useUserStore';
const credentialsValidator = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
});
export default function SignIn() {

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState<FormErrorType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // setUser is a function that takes a User and sets it in the store
  const setUser = useUserStore((state) => state.setUser);

  // useNavigate is a function that returns a function that takes a string and navigates to the given path
  const navigate = useNavigate();

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

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => prev.filter((error) => error.field !== name));
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = credentialsValidator.safeParse(credentials);
    if (!result.success) {
      errorSetterAndNotifier(result.error.errors);
      return;
    }
    setIsLoading(true);
    try {
      const res = await api.post('/api/user/sign-in', { credentials });
      setUser(res.data.data);
      toast.success('Logged in successfully. Redirecting to dashboard...');
      navigate('/');
    } catch (error: any) {
      const data = error.response?.data?.data;
      if (data?.type === 'validation' || data?.type === 'duplicacy' || data?.type === 'authentication' || data?.type === 'not-found')
        errorSetterAndNotifier(data.result);
      else toast.error('Internal server error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkServer = async () => {
      try {
          await api.get('/api/health');
      } catch (error: any) {
        throw new Error('Server is down');
      }
    };
    toast.promise(checkServer(), {
      loading: 'Starting server, this may take a while as we are on free plan of render',
      success: 'Server is up and running!',
      error: 'Server is down, please try again later.'
    });
  }, []);

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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={onChange}
            error={formErrors.some((error) => error.field === 'email')}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onChange}
            error={formErrors.some((error) => error.field === 'password')}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            style={{ minHeight: '36px', position: 'relative' }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} sx={{ position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px' }} /> : `Sign In`}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/welcome/reset-password">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/welcome/sign-up">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}