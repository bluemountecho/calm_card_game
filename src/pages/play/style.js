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
    backgroundImage: 'url("/images/back_gamemenu.png")',
    backgroundSize: 'cover',
    padding: '120px 0 40px',
    [theme.breakpoints.down('768')]: {
      padding: '100px 0 20px',
      backgroundPosition: '50%',
    },
    '& > #play_btns': {
      width: '100%',
      justifyContent: 'space-between',
      [theme.breakpoints.down('768')]: {
        flexDirection: 'column',
        alignItems: 'center',
        height: '70%',
      },
    },
  },
  button_group: {
    display: 'flex',
    '& > div': {
      cursor: 'pointer',
      margin: '0 40px',
      '&:hover': {
        opacity: '0.8',
      },
      [theme.breakpoints.down('930')]: {
        margin: '0',
        '& > img': {
          width: '70px',
        },
      },
    },
    '& > #play_btn': {
      width: '33.33%',
      margin: '0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      cursor: 'unset',
      '&:hover': {
        opacity: '1',
      },
      '& > img': {
        cursor: 'pointer',
        width: '180px',
        '&:hover': {
          opacity: '0.8',
        },
      },
      '& > p': {
        margin: '0',
        paddingTop: '10px',
        fontFamily: 'RajdhaniBold',
        fontSize: '50px',
        color: 'white',
      },
      [theme.breakpoints.down('930')]: {
        '& > img': {
          width: '100px',
        },
        '& > p': {
          fontSize: '30px',
        },
      },
      [theme.breakpoints.down('768')]: {
        '& > img': {
          width: '80px',
        },
      },
    },
    [theme.breakpoints.down('930')]: {
      justifyContent: 'space-between',
      '&:first-child': {
        width: '60%',
      },
      '&:last-child': {
        width: '80%',
      },
    },
  },
});

export default styles;