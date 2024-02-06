import { Container, Typography, Grid, Paper, useMediaQuery } from '@mui/material';
import { UserType } from '../types/types';
type Props = {
    profileData: UserType | undefined,
}
const ProfileData = ({ profileData }: Props) => {
    // Use media query hook to detect screen size
    const isMobile = useMediaQuery('(max-width:600px)');
    // Conditionally set the padding based on screen size
    const paperPadding = isMobile ? 10 : 20;

    if (!profileData) return null;
    const { firstName, lastName, address, phoneNumber, email } = profileData;
    return (
        <Container style={{width:'100%'}}>
            <Paper  style={{ padding: paperPadding, margin:'40px 0 0', width:'100%' }}>
                <Typography variant="h5" gutterBottom>
                    Profile Information
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1">
                            <strong>First Name:</strong> {firstName}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1">
                            <strong>Last Name:</strong> {lastName}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1">
                            <strong>Phone Number:</strong> {phoneNumber}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1">
                            <strong>Email Address:</strong> {email}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1">
                            <strong>Address:</strong> {address}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default ProfileData;
