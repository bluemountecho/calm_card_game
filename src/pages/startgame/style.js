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
});

export default styles;