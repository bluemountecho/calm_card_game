
import React, {useEffect, useState} from 'react';
import { makeStyles, TextField } from '@material-ui/core';
import styles from './style';
import {connect} from '../../components/connector'
import { useRouter } from 'next/router'
import $ from "jquery"
import toastr from "toastr"
import axios from 'axios'

const useStyles = makeStyles(styles);

toastr.options = {
  positionClass: 'toast-top-left'
}

function SigninPage(props) {
  const classes = useStyles()
  const router = useRouter()
  var username = ''
  const {socket} = props
  var flag = true
  const [loginLabel, setLoginLabel] = useState('Login')

  useEffect(() => {
    connect(async function (account) {
      var name = (await axios.get('http://167.86.120.197/getPlayerName/' + account)).data
      $('#usernameInput').val(name)
    })
  },[])

  function OnLogin() {
    if (flag == false) {
      toastr.error('Please wait...')
      return
    }

    setLoginLabel('Wait...')
    flag = false

    username = $('#usernameInput').val()

    if (username == '') {
      toastr.error('Please enter your name!')
      setLoginLabel('Login')
      flag = true
      return
    }

    connect(OnConnected)
  }

  async function OnConnected(account) {
    socket.emit('set-player-name', {
      address: account,
      username: username
    })

    router.push('/makedeck')
  }

  return (
    <>
      <div className={classes.hero}>
        <img src="/images/logo.png" alt="" />
        <TextField
          className={classes.textfield}
          variant="outlined"
          id="usernameInput"
          placeholder="Enter Your Name"
        />
        <div className={classes.button} onClick={OnLogin}>
          <p>{loginLabel}</p>
        </div>
      </div>
    </>
  );
}

export default SigninPage;