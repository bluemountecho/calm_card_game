
import { Box, makeStyles } from '@material-ui/core';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './style';

const useStyles = makeStyles(styles);

export default function Layout({ children }) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Header />
      {children}
      <Footer />
    </Box>
  )
}