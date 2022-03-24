import { createStyles } from '@material-ui/styles';
import theme from '../../theme';

const styles = createStyles({
  hero: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100vh',
    backgroundImage: 'url("/images/back_startgame.png")',
    backgroundSize: 'cover',
    padding: '120px 0 40px',
    [theme.breakpoints.down('768')]: {
      backgroundPosition: '68%',
    },
  },
  button: {
    cursor: 'pointer',
    width: '75vh',
    height: '24vh',
    backgroundImage: 'url("/images/button_startgame.png")',
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
      fontSize: '110px',
      textTransform: 'uppercase',
    },
    [theme.breakpoints.down('930')]: {
      width: '75vw',
      height: '24vw',
      '& > p': {
        fontSize: '10vw',
      },
    },
  },

  battleDialog: {
    background: 'rgba(0, 0, 0, 0.95)',
    borderRadius: '20px',
    position: 'fixed',
    minWidth: '40vw',
    width: 'fit-content',
    height: 'fit-content',
    top: '30vh',
    border: '2px solid #f5d88e',
    padding: '30px',
    maxWidth: '90vw',
    animation: '$scaleAppear 0.2s ease-in',
    transform: 'scale(1.0)',

    '& > .closeButton': {
      border: '2px solid #f5d88e',
      borderRadius: '20px',
      width: '30px',
      height: '30px',
      fontSize: '20px',
      fontWeight: 'bolder',
      color: '#f5d88e',
      position: 'absolute',
      right: '-15px',
      textAlign: 'center',
      cursor: 'pointer',
      top: '-15px',
      background: 'rgba(0, 0, 0, 0.95)',
    },

    '&::after': {
      backgroundImage: 'url(/images/logo.png)',
      backgroundSize: '70px 70px',
      display: 'inline-block',
      width: "70px",
      height: "70px",
      position: 'absolute',
      top: '-35px',
      content: "''",
      left: '-15px',
    },

    '& > .dialogTitle': {
      background: '#f5d88e',
      height: '30px',
      fontSize: '20px',
      padding: '2px 5px 2px 15px',
      fontWeight: 'bolder',
      width: 'fit-content',
      borderRadius: '3px',
      position: 'absolute',
      top: '-15px',
      left: '50px',
    },

    '& > p, & > p *': {
      color: '#f5d88e',
      fontSize: '15px',
      fontWeight: 'bold',
    },
  },

  '@keyframes scaleAppear': {
    '0%': {
      transform: 'scale(.5)',
    },
    "50%": {
      transform: "scale(1.2)",
    },
    "100%": {
      transform: "scale(1.0)",
    }
  },
});

export default styles;