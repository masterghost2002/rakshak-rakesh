import { Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';
const NotFoundPage = () => {
  return (
    <Container>
      <Typography variant="h1">404</Typography>
      <Typography variant="h5">Page Not Found</Typography>
      <Typography variant="body1">
        The page you are looking for might have been removed or is temporarily unavailable.
      </Typography>
      <Typography variant="body1">
        Go back to <Link to="/">homepage</Link>
      </Typography>
    </Container>
  );
};

export default NotFoundPage;
