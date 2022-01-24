import { createStyles } from '@material-ui/styles';
import theme from '../../theme';

const styles = createStyles({
  hero: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: '100vh',
    backgroundImage: 'url("/images/back_startgame.png")',
    backgroundSize: 'cover',
    padding: '120px 0 40px',
    [theme.breakpoints.down('768')]: {
      backgroundPosition: '38%',
    },
  },
  main: {
    margin: '20px 0',
    padding: '20px 30px',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: '40px',
    '& > h3': {
      margin: '0',
      fontFamily: 'RajdhaniBold',
      fontSize: '70px',
      lineHeight: '1',
      color: 'white',
      marginBottom: '20px',
    },
    [theme.breakpoints.down('768')]: {
      borderRadius: '20px',
      padding: '20px',
      '& > h3': {
        fontSize: '36px',
      },
    },
  },
  notification: {
    display: 'flex',
    alignItems: 'center',
    border: '2px solid white',
    borderRadius: '50px',
    marginBottom: '20px',
    padding: '10px',
    '& > img': {
      width: '80px',
      [theme.breakpoints.down('768')]: {
        width: '50px',
      },
    },
    '& > h5': {
      margin: '0',
      fontFamily: 'RajdhaniBold',
      fontSize: '40px',
      color: 'white',
      padding: '0 10px',
      [theme.breakpoints.down('768')]: {
        fontSize: '20px',
      },
    },
    '& > p': {
      margin: '0',
      fontSize: '40px',
      color: 'white',
      padding: '0 10px',
      [theme.breakpoints.down('768')]: {
        fontSize: '20px',
      },
    },
  },
});

export default styles;