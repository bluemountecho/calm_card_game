import { createStyles } from '@material-ui/styles';
import theme from '../../theme';

const styles = createStyles({
  hero: {
    position: 'relative',
    backgroundImage: 'url("/images/back_sign.png")',
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    paddingTop: '50px',
    '& > img': {
      width: '20vh',
      marginBottom: '40px',
    },
    '& > a': {
      fontSize: '20px',
      color: 'white',
      '&:hover': {
        textDecoration: 'none',
      },
      [theme.breakpoints.down('768')]: {
        fontSize: '16px',
      },
    },
    [theme.breakpoints.down('768')]: {
      backgroundPosition: '10%',
    },
  },
  textfield: {
    width: '490px',
    marginTop: '20px',
    '& > .MuiInputBase-root': {
      borderRadius: '50px',
      '& > .MuiInputBase-input': {
        zIndex: '1',
        color: 'white',
        fontFamily: 'Rajdhani',
        fontSize: '36px',
        padding: '20px 25px',
      },
      '& > .MuiOutlinedInput-notchedOutline': {
        border: '4px solid rgba(255, 50, 50, 0.6)',
        background: 'rgba(0, 0, 0, 0.3)',
      },
    },
    [theme.breakpoints.down('768')]: {
      width: '80%',
      '& > .MuiInputBase-root': {
        '& > .MuiOutlinedInput-notchedOutline': {
          border: '2px solid rgba(255, 50, 50, 0.6) !important',
        },
      },
    },
  },
  button: {
    cursor: 'pointer',
    margin: '50px 0 20px',
    width: '30vh',
    height: '11.525vh',
    backgroundImage: 'url("/images/button_login.png")',
    backgroundSize: 'cover',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      opacity: '0.8',
    },
    '& > p': {
      margin: '0',
      fontFamily: 'RajdhaniBold',
      fontSize: '40px',
    },
    [theme.breakpoints.down('768')]: {
      marginTop: '40px', 
    }
  },
});

export default styles;