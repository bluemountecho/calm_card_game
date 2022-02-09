
import React, {useState, useEffect} from 'react';
import { Router, Link } from "react-router-dom";
import { makeStyles, TextField } from '@material-ui/core';
import styles from './style';
import {connect} from '../../components/connector'

const useStyles = makeStyles(styles);

function SigninPage() {
  const classes = useStyles()
  const [ username, setUsername ] = useState('')

  function OnLogin() {
  }

  connect()

  return (
    <>
      <div className={classes.hero}>
        <img src="/images/logo.png" alt="" />
        <TextField
          className={classes.textfield}
          variant="outlined" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Your Name"
        />
        <div className={classes.button} onClick={OnLogin}>
          <p>Login</p>
        </div>
      </div>
    </>
  );
}

export default SigninPage;