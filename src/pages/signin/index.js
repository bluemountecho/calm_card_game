
import React from 'react';
import { makeStyles, TextField } from '@material-ui/core';
import styles from './style';
import Link from '../../Link';

const useStyles = makeStyles(styles);

function SigninPage() {
  const classes = useStyles();

  const [ username, setUsername ] = React.useState('');
  const [ password, setPassword ] = React.useState('');

  return (
    <>
      <div className={classes.hero}>
        <img src="/images/logo.png" alt="" />
        <TextField
          className={classes.textfield}
          variant="outlined" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          className={classes.textfield}
          variant="outlined" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={classes.button}>
          <p>Login</p>
        </div>
        <Link href="#">forget password?</Link>
      </div>
    </>
  );
}

export default SigninPage;