
import React, { useState, useEffect } from 'react';
import { makeStyles, LinearProgress } from '@material-ui/core';
import { useRouter } from 'next/router';
import styles from './style';
import TopButtons from '../../components/TopButtons';
import BottomButtons from '../../components/BottomButtons';
import {connect} from '../../components/connector'
import axios from 'axios'

const useStyles = makeStyles(styles);
var timerID
var accountAddress
var battleInfo

function FindingBattleDialog(props) {
  const classes = useStyles()
  const {setShowDialog, setShowNotFoundDialog, setJoinToBattleDialog, baseURL} = props
  const [timeRemain, setTimeRemain] = useState(120)
  const router = useRouter()

  function closeDialog() {
    clearInterval(timerID)
    setShowDialog(false)
  }

  async function timerFunc() {
    if (timeRemain % 5 == 0) {
      battleInfo = (await axios.get(baseURL + '/findBattle/' + accountAddress + '/' + timeRemain)).data

      if (battleInfo.player1Address != '' && battleInfo.player2Address != '') {
        if (battleInfo.isAccepted == 3) {
          router.push('/makedeck')
        } else {
          closeDialog()
          setJoinToBattleDialog(true)
        }
      }
    }

    timeRemain --

    setTimeRemain(timeRemain)

    if (timeRemain == 0) {
      clearInterval(timerID)
      setShowDialog(false)
      setShowNotFoundDialog(true)
    }
  }

  useEffect(() => {
    timerID = setInterval(timerFunc, 1000)
  },[])

  return (
    <div className={classes.battleDialog}>
      <div className="closeButton" onClick={closeDialog}>X</div>
      <div className="dialogTitle">Finding Battle</div>
      <p>
        Please wait until finding battle is finished! If you didn't find battle in 2 minutes, you need to find battle again!
      </p>
      <p>
        {timeRemain} secs remain ...<br />
        <LinearProgress variant="determinate" value={(120 - timeRemain) / 120.0 * 100.0} />
      </p>
      <div style={{textAlign: 'center', marginTop: '30px'}}>
        <div className={classes.button} style={{width: '100px', height: '30px', display: 'inline-flex'}} onClick={closeDialog}>
          <p style={{fontSize: '15px'}}>Cancel</p>
        </div>
      </div>
    </div>
  )
}

function NotFoundBattleDialog(props) {
  const classes = useStyles()
  const {setShowDialog, setShowNotFoundDialog} = props

  return (
    <div className={classes.battleDialog}>
      <div className="closeButton" onClick={() => {setShowNotFoundDialog(false)}}>X</div>
      <div className="dialogTitle">Oops! Can't find battle!</div>
      <p>
        Sorry, we didn't find battle! Please try again!
      </p>
      <div style={{textAlign: 'center', marginTop: '30px'}}>
        <div className={classes.button} style={{width: '100px', height: '30px', display: 'inline-flex', marginRight: '10px'}} onClick={() => {setShowNotFoundDialog(false),setShowDialog(true)}}>
          <p style={{fontSize: '15px'}}>Try again</p>
        </div>
        <div className={classes.button} style={{width: '100px', height: '30px', display: 'inline-flex'}} onClick={() => {setShowNotFoundDialog(false)}}>
          <p style={{fontSize: '15px'}}>Cancel</p>
        </div>
      </div>
    </div>
  )
}

function JoinToBattleDialog(props) {
  const classes = useStyles()
  const {setJoinToBattleDialog, baseURL} = props
  const [opponentName, setOpponentName] = useState('')
  const [timeRemain, setTimeRemain] = useState(30)
  const [acceptButton, setAcceptButton] = useState(true)
  const router = useRouter()

  async function timerFunc() {
    var tmp = 30 - Math.floor((new Date().getTime() - new Date(battleInfo.acceptedAt).getTime()) / 1000)

    if (tmp % 5 == 0) {
      battleInfo = (await axios.get(baseURL + '/findBattle/' + accountAddress + '/0')).data

      if (battleInfo.isAccepted == 3) {
        router.push('/makedeck')
      }
    }

    if (tmp < 0) {
      closeDialog()
    } else {
      setTimeRemain(tmp)
    }
  }

  async function closeDialog() {
    clearInterval(timerID)
    setJoinToBattleDialog(false)
    await axios.get(baseURL + '/cancelBattle/' + battleInfo.battle_id)
  }

  async function acceptBattle() {
    var res = (await axios.post(baseURL + '/acceptBattle', {
      address: accountAddress,
      battleID: battleInfo.battle_id
    })).data

    if (res == 'done') {
      router.push('/makedeck')
    } else {
      setAcceptButton(false)
    }
  }

  useEffect(async () => {
    var opponentAddress = battleInfo.player2Address

    if (battleInfo.player2Address == accountAddress) {
      opponentAddress = battleInfo.player1Address
    }

    setOpponentName((await axios.get(baseURL + '/getPlayerName/' + opponentAddress)).data)
    timerID = setInterval(timerFunc, 1000)
    battleInfo = (await axios.get(baseURL + '/findBattle/' + accountAddress + '/0')).data

    if (((battleInfo.isAccepted & 1) == 1 && battleInfo.player1Address == accountAddress) || ((battleInfo.isAccepted & 2) == 2 && battleInfo.player2Address == accountAddress)) {
      setAcceptButton(false)
    }
  }, [])

  return (
    <div className={classes.battleDialog}>
      {acceptButton &&
      <div className="closeButton" onClick={closeDialog}>X</div>}
      <div className="dialogTitle">Accept Battle!</div>
      <p>
        We found a battle. Your opponent is "{ opponentName }".<br/>
        Please accept battle in 30 secconds!
      </p>
      <p>
        {timeRemain} secs remain ...<br />
        <LinearProgress variant="determinate" value={(30 - timeRemain) / 30.0 * 100.0} />
      </p>
      {!acceptButton &&
        <p>Please wait until opponent accept battle!</p>}
      <div style={{textAlign: 'center', marginTop: '30px'}}>
        {acceptButton &&
        <><div className={classes.button} style={{width: '100px', height: '30px', display: 'inline-flex', marginRight: '10px'}} onClick={acceptBattle}>
          <p style={{fontSize: '15px'}}>Accept</p>
        </div>
        <div className={classes.button} style={{width: '100px', height: '30px', display: 'inline-flex'}} onClick={closeDialog}>
          <p style={{fontSize: '15px'}}>Cancel</p>
        </div></>}
      </div>
    </div>
  )
}

function StartGamePage(props) {
  const classes = useStyles();
  const router = useRouter();
  const {socket, baseURL} = props
  const [showDialog, setShowDialog] = useState(false)
  const [showNotFoundDialog, setShowNotFoundDialog] = useState(false)
  const [joinToBattleDialog, setJoinToBattleDialog] = useState(false)

  function onClickStargGame() {
    connect((account) => {
      if (!showNotFoundDialog && !joinToBattleDialog) {
        setShowDialog(true)
      }
    }, () => {
      router.push('/signin')
    })
  }

  useEffect(() => {
    connect((account) => {
      accountAddress = account
    }, () => {
      router.push('/signin')
    })
  }, [])

  useEffect(() => {
    return () => {
      clearInterval(timerID)
    }
  }, [])

  return (
    <>
      <div className={classes.hero}>
        <TopButtons />
        <div className={classes.button} onClick={() => onClickStargGame()}>
          <p>Start Game</p>
        </div>
        <BottomButtons />
        {showDialog &&
        <FindingBattleDialog
          setShowDialog={setShowDialog}
          setShowNotFoundDialog={setShowNotFoundDialog}
          setJoinToBattleDialog={setJoinToBattleDialog}
          baseURL={baseURL}
        />}
        {showNotFoundDialog &&
        <NotFoundBattleDialog
          setShowDialog={setShowDialog}
          setShowNotFoundDialog={setShowNotFoundDialog}
        />}
        {joinToBattleDialog &&
        <JoinToBattleDialog
          setJoinToBattleDialog={setJoinToBattleDialog}
          baseURL={baseURL}
        />}
      </div>
    </>
  );
}

export default StartGamePage;