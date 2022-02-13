
import React, {useState} from 'react';
import { makeStyles, TextField } from '@material-ui/core';
import styles from './style';
import {connect, getPlayerName, setPlayerName, getBattle} from '../../components/connector'
import { useRouter } from 'next/router'
import $ from "jquery"

const useStyles = makeStyles(styles);

function SigninPage() {
  const classes = useStyles()
  const router = useRouter()
  var originalName = ''
  var username = ''
  var flag = true

  connect(async function (account) {
    username = originalName = await getPlayerName(account)
    $('#usernameInput').val(originalName)
  })

  function OnLogin() {
    if (flag == false) return

    flag = false
    username = $('#usernameInput').val()

    if (username == '') {
      alert('Please enter your name!')
      return
    }

    connect(OnConnected)
  }

  async function OnConnected(account) {
    getBattle(account)
    .then(async (res1) => {
      router.push('/gameboard')
    })
    .catch(err => {
      console.log(err)
    })

    if (username != originalName) {
      setPlayerName(account, username, () => {
        router.push('/makedeck')
      })
      .catch(err => {
        console.log(err)
        if (originalName != '') {
          router.push('/makedeck')
        }
      })
    } else {
      router.push('/makedeck')
    }
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
          <p>Login</p>
        </div>
      </div>
    </>
  );
}

export default SigninPage;