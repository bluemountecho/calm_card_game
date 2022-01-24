import { createStyles } from '@material-ui/styles';
import theme from '../../theme';

const styles = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#101219',
    padding: '0',
  },
  info: {
    padding: '20px 50px',
    borderTop: '1px solid rgb(70, 70, 70)',
    '& > p': {
      color: 'white',
      margin: '0',
      fontSize: '16px',
      lineHeight: '40px',
    },
    [theme.breakpoints.down('768')]: {
      textAlign: 'center',
    },
  },
});

export default styles;