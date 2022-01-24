import { createStyles } from '@material-ui/styles';
import theme from '../theme';

const styles = createStyles({
  root: {
    position: 'relative',
    margin: '0 auto',
    width: '100%',
    '& > div': {
      width: '100%',
    },
  },
});

export default styles;