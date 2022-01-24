import { createStyles } from '@material-ui/styles';
import theme from '../../theme';

const styles = createStyles({
  root: {
    display: 'flex',
    '& > div': {
      position: 'relative',
      cursor: 'pointer',
      margin: '0 40px',
      '&:hover': {
        opacity: '0.8',
      },
      '& > span': {
        position: 'absolute',
        top: '0',
        right: '0',
        width: '50px',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        backgroundColor: 'red',
        color: 'white',
        fontFamily: 'RajdhaniBold',
        fontSize: '36px',
      },
      [theme.breakpoints.down('930')]: {
        margin: '0',
        '& > img': {
          width: '70px',
        },
        '& > span': {
          width: '30px',
          height: '30px',
          fontSize: '20px',
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