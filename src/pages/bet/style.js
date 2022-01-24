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
    backgroundImage: 'url("/images/back_bet.png")',
    backgroundSize: 'cover',
    padding: '120px 0 40px',
    [theme.breakpoints.down('768')]: {
      backgroundPosition: '70%',
    },
  },
  button: {
    cursor: 'pointer',
    width: '60vh',
    height: '23.25vh',
    backgroundImage: 'url("/images/button_bet.png")',
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
      fontSize: '100px',
      color: 'white',
    },
    [theme.breakpoints.down('930')]: {
      width: '60vw',
      height: '23.25vw',
      '& > p': {
        fontSize: '10vw',
      },
    },
  },
});

export default styles;