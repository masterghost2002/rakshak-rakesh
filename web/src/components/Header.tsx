import AppBar from '@mui/material/AppBar';
import { Link } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import  useUserStore  from '../store/useUserStore';
const LogoLinkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1em',
    fontWeight: 'bold',
    marginRight: '1em'
}
export default function Header() {
    const navigate = useNavigate();
    const reset = useUserStore((state) => state.reset);
    const handleSignOut = () => {
        sessionStorage.clear();
        reset();
        navigate('/welcome/sign-in');
    }
    return (
        <>
            <AppBar position="static">
                <Toolbar variant='dense'>
                    <Link to='/' style={LogoLinkStyle}>
                        Rakshak
                    </Link>
                    <Link to='/licence' style={LogoLinkStyle}>
                        Licence
                    </Link>
                    <Button onClick={handleSignOut} sx={{ marginLeft: 'auto' }} color="inherit">Sign Out</Button>
                </Toolbar>
            </AppBar>
        </>
    );
}
