import { createStyles } from '@material-ui/styles';
import theme from '../../theme';

const styles = createStyles({
  hero: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundImage: 'url("/images/back_leaderboard.png")',
    backgroundSize: 'cover',
    padding: '120px 0 40px',
    '& > div#table': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundImage: 'url("/images/leaderboard.png")',
      backgroundSize: '100% 100%',
      width: '95vw',
      height: '55vw',
      padding: '10vw 3vw 3vw',
      '& > li': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxHeight: '65px',
        padding: '0 20px',
        margin: '15px 0',
        backgroundColor: 'rgba(255,100,255,0.2)',
        boxShadow: '0px 15px 10px 0px rgba(0,0,0,0.5)',
        fontSize: '20px',
        '& > div': {
          flexBasis: '14%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          '&:first-child': {
            flexBasis: '16%',
          },
          '& > img': {
            width: '6vw',
            marginLeft: '20px',
          },
        },
        [theme.breakpoints.down('1350')]: {
          margin: '5px 0',
          maxHeight: '50px',
          fontSize: '16px',
        },
        [theme.breakpoints.down('850')]: {
          margin: '0',
          maxHeight: '5vw',
          fontSize: '10px',
        },
      },
      '& > li#header': {
        textTransform: 'uppercase',
        margin: '0 0 25px',
        padding: '20px',
        '& > div': {
          fontFamily: 'RajdhaniBold',
        },
        [theme.breakpoints.down('1350')]: {
          margin: '0 0 15px',
        },
        [theme.breakpoints.down('850')]: {
          margin: '0 0 5px',
        },
      },
      [theme.breakpoints.down('850')]: {
        marginTop: '20px',
      },
    },
    '& > #buttons': {
      display: 'none',
      [theme.breakpoints.down('850')]: {
        display: 'flex',
      },
    },
    [theme.breakpoints.down('850')]: {
      justifyContent: 'start',
      '& > div:last-child': {
        alignItems: 'end',
        flexGrow: '1',
      },
    },
    [theme.breakpoints.down('768')]: {
      backgroundPosition: '38%',
    },
  },
});

export default styles;