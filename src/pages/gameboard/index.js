
import React, {useEffect, useState} from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router';
import styles from './style';
import Card from '../../components/Card/Card';
import $ from 'jquery'
import axios from 'axios'
import { animate } from 'dom-helpers';

const useStyles = makeStyles(styles);

var battleInfo

function GameBoardPage(props) {
  const classes = useStyles();
  const router = useRouter();
  const {baseURL, socket} = props
  const [timeUnit, setTimeUnit] = useState(1000)
  const [showVS, setShowVS] = useState(true)
  const [player1Info, setPlayer1Info] = useState([])
  const [player2Info, setPlayer2Info] = useState([])
  const [player1Name, setPlayer1Name] = useState('1')
  const [player2Name, setPlayer2Name] = useState('2')
  var cards, player1Deck, player2Deck
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

  function getTransImageURL(url) {
    var arr = url.split('/')

    return '/images/cards/transImages/' + arr[arr.length - 1]
  }

  async function Animate(elem, data, time) {
    $(elem).animate(data, time);
    await delay(time)
  }

  async function init() {
    var name = (await axios.get(baseURL + '/getPlayerName/' + battleInfo.player1Address)).data

    setPlayer1Name(name)
    name = (await axios.get(baseURL + '/getPlayerName/' + battleInfo.player2Address)).data
    setPlayer2Name(name)

    cards = JSON.parse(battleInfo.cards)
    player1Deck = JSON.parse(battleInfo.player1Deck)
    player2Deck = JSON.parse(battleInfo.player2Deck)

    for (var i = 0; i < player1Deck.length; i ++) {
      player1Info.push(cards[player1Deck[i]])
    }

    for (var i = 0; i < player2Deck.length; i ++) {
      player2Info.push(cards[player2Deck[i]])
    }

    setPlayer1Info([...player1Info])
    setPlayer2Info([...player2Info])
  }

  async function vsAnimation() {
    await Animate($(".vs-div")[0], {
      top: '0px',
    }, timeUnit * 0.4)
    
    await Animate($(".vs-div")[0], {
      top: '-20vh',
    }, timeUnit * 0.1)

    await Animate($(".vs-div")[0], {
      top: '-10vh',
    }, timeUnit * 0.1)

    Animate($('.player1-vs')[0], {
      left: '-50px'
    }, timeUnit * 0.5)

    await Animate($('.player2-vs')[0], {
      right: '-50px'
    }, timeUnit * 0.5)

    Animate($('.player1-vs')[0], {
      left: '0px'
    }, timeUnit * 3)

    await Animate($('.player2-vs')[0], {
      right: '0px'
    }, timeUnit * 3)

    await Animate($('#vsDiv')[0], {
      left: '-100vw',
    }, timeUnit * 0.5)

    setShowVS(false)
  }

  useEffect(async () => {
    battleInfo = (await axios.post(baseURL + '/getBattleHisotry', {
      battleID: window.location.search.substring(8)
    })).data

    if (battleInfo == 'failed') {
      router.push('/signin')
      return
    }

    await init()
    await vsAnimation()
  }, [])

  return (
    <>
      <div className={classes.hero}>
        <div className="cards-row">
          <div className="cards-side">
            {player1Info.length != 0 &&
            <>
              <Card
                CardShowType="captain"
                Type={player1Info[0].type}
                Image={player1Info[0].image}
                CardName={player1Info[0].name}
                AttackPoint={player1Info[0].attack}
                DefensePoint={player1Info[0].defense}
                ManaCost={player1Info[0].mana}
                Speed={player1Info[0].speed}
                Health={player1Info[0].health}
                Ability={player1Info[0].ability}
                CardID={0}
                ID={player1Info[0].card_id}
              />
              <label className="fire" style={{bottom: '-80px'}}>{player1Name}</label>
            </>}
          </div>
          <div className="cards-pos"></div>
          <div className="cards-side"></div>
        </div>
        <div className="cards-row">
          <div className="cards-side"></div>
          <div className="cards-pos"></div>
          <div className="cards-side"></div>
        </div>
        <div className="cards-row">
          <div className="cards-side"></div>
          <div className="cards-pos"></div>
          <div className="cards-side" style={{alignItems: 'flex-end'}}>
          {player2Info.length != 0 &&
          <>
            <label className="fire" style={{top: '-80px'}}>{player2Name}</label>
            <Card
              CardShowType="captain"
              Type={player2Info[0].type}
              Image={player2Info[0].image}
              CardName={player2Info[0].name}
              AttackPoint={player2Info[0].attack}
              DefensePoint={player2Info[0].defense}
              ManaCost={player2Info[0].mana}
              Speed={player2Info[0].speed}
              Health={player2Info[0].health}
              Ability={player2Info[0].ability}
              CardID={0}
              ID={player2Info[0].card_id}
            />
          </>}
          </div>
        </div>
      </div>
      {showVS == true &&
      <div className={classes.vsDiv} id="vsDiv">
        <div className='player1-vs' style={player1Info.length ? {backgroundImage: 'url(' + getTransImageURL(player1Info[0].image) + ')'} : {}}><span className="fire">{player1Name}</span></div>
        <div className='vs-div'></div>
        <div className='player2-vs' style={player2Info.length ? {backgroundImage: 'url(' + getTransImageURL(player2Info[0].image) + ')'} : {}}><span className="fire">{player2Name}</span></div>
      </div>}
    </>
  )
}

export default GameBoardPage;