import { createStyles } from '@material-ui/styles';
import theme from '../../theme';

const styles = createStyles({
  hero: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100vh',
    backgroundImage: 'url("/images/back_journey.png")',
    backgroundSize: 'cover',
    padding: '120px 0 40px',
    [theme.breakpoints.down('930')]: {
      flexDirection: 'column',
      padding: '100px 0 20px',
    },
  },
  arrow: {
    width: '15%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    '& > svg': {
      fontSize: '120px',
      fill: 'white',
      [theme.breakpoints.down('1280')]: {
        fontSize: '90px',
      },
      [theme.breakpoints.down('930')]: {
        fontSize: '50px',
        transform: 'rotate(90deg)',
      },
    },
  },
  button_group: {
    width: '70%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('930')]: {
      height: '75%',
      marginTop: '30px',
      flexDirection: 'column',
    },
  },
  button: {
    position: 'relative',
    cursor: 'pointer',
    width: '200px',
    height: '212px',
    backgroundImage: 'url("/images/button_key.png")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '5px solid transparent',
    borderRadius: '40px',
    transition: 'border .3s ease',
    '&:hover': {
      border: '5px solid orange',
    },
    '& > p': {
      margin: '0',
      fontFamily: 'RajdhaniBold',
      fontSize: '110px',
      color: 'white',
    },
    '& > img': {
      width: '80px',
      margin: '0 10px 10px 0',
    },
    '& > span': {
      fontFamily: 'RajdhaniBold',
      fontSize: '70px',
      color: 'white',
      position: 'absolute',
      top: '-120px',
    },
    [theme.breakpoints.down('1280')]: {
      width: '15vw',
      height: '15.9vw',
      '& > p': {
        fontSize: '90px',
      },
      '& > span': {
        fontSize: '50px',
        top: '-90px',
      },
    },
    [theme.breakpoints.down('930')]: {
      width: '10vh',
      height: '10.6vh',
      '& > p': {
        fontSize: '60px',
      },
      '& > span': {
        fontSize: '30px',
        top: '-40px',
      },
    },
  },
});

export default styles;