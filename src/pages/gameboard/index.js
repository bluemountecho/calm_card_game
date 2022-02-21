
import React, {useEffect, useState} from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router';
import styles from './style';
import {connect} from '../../components/connector'
import Card from '../../components/Card/Card';
import $ from 'jquery'
import axios from 'axios'
import socketIOClient from "socket.io-client"
import toastr from "toastr"

const ENDPOINT = "http://167.86.120.197";
const socket = socketIOClient(ENDPOINT)
const useStyles = makeStyles(styles);

const PlayerBoard = (props) => {
  const classes = useStyles();
  const { name, avatar, isSelf, playerInfo, monsterCards, spellCards, equipCards, setPlayerInfo, battleInfo, setBattleInfo, setPlayerInfo1, setPlayerInfo2, setAttackOrDefense } = props;

  return (
    <div className={classes.board}>
      {!isSelf && <div>
        <Avatar
          name={name}
          avatar={avatar}
          isSelf={isSelf} />
        <CardsInHand
          isSelf={isSelf}
          battleInfo={battleInfo}
          setBattleInfo={setBattleInfo}
          cards={playerInfo[3]}
          setPlayerInfo={setPlayerInfo}
          playerInfo={playerInfo}
          monsterCards={monsterCards}
          spellCards={spellCards}
          equipCards={equipCards}
          setPlayerInfo1={setPlayerInfo1}
          setPlayerInfo2={setPlayerInfo2}
          setAttackOrDefense={setAttackOrDefense}
          />
        <Life
          isSelf={isSelf}
          life={playerInfo[1]}
          mana={playerInfo[2]} />
      </div>}
      <div>
        <div className={classes.battle_history}></div>
        <CardsPlay
          battleInfo={battleInfo}
          setBattleInfo={setBattleInfo}
          setPlayerInfo={setPlayerInfo}
          playerInfo={playerInfo}
          monsterCards={monsterCards}
          spellCards={spellCards}
          equipCards={equipCards}
          cards={playerInfo[4]}
          isSelf={isSelf} />
        <CardsDeck
          cards={playerInfo[5]}
          battleInfo={battleInfo}
          setBattleInfo={setBattleInfo}
          isSelf={isSelf}
          playerInfo={playerInfo}
          monsterCards={monsterCards}
          spellCards={spellCards}
          equipCards={equipCards}
          setPlayerInfo={setPlayerInfo} />
      </div>
      {isSelf && <div>
        <Life
          isSelf={isSelf}
          life={playerInfo[1]}
          mana={playerInfo[2]} />
        <CardsInHand
          isSelf={isSelf}
          battleInfo={battleInfo}
          setBattleInfo={setBattleInfo}
          cards={playerInfo[3]}
          playerInfo={playerInfo}
          setPlayerInfo={setPlayerInfo}
          monsterCards={monsterCards}
          spellCards={spellCards}
          equipCards={equipCards}
          setPlayerInfo1={setPlayerInfo1}
          setPlayerInfo2={setPlayerInfo2}
          setAttackOrDefense={setAttackOrDefense} />
        <Avatar
          name={name}
          avatar={avatar}
          isSelf={isSelf} />
      </div>}
    </div>
  );
}

const Avatar = (props) => {
  const classes = useStyles();
  const { name, avatar, isSelf } = props;

  return (
    <div className={classes.avatar}>
      {isSelf && <p>{name}</p>}
      <div style={isSelf ? {marginLeft: '15px'} : {marginRight: '15px'}}>
        <img src="/images/player_back.png" alt="" />
        <img src={`/images/${avatar}`} alt="" />
      </div>
      {!isSelf && <p>{name}</p>}
    </div>
  )
}

const Life = (props) => {
  const classes = useStyles();
  const { isSelf, life, mana } = props;

  return (
    <div className={classes.life} style={!isSelf ? {textAlign: 'right'} : {}}>
      {isSelf && <img src="/images/life_mark.png" alt=""/>}
      <div>
        <img src="/images/life_back.png" alt="" />
        {!isSelf && <img src="/images/life_line.png" alt="" style={{width: `${life * 0.85}%`}} />}
        {isSelf && <img src="/images/life_line.png" alt="" style={{width: `${life * 0.85}%`, left: '7%'}} />}
      </div>
      {!isSelf && <img src="/images/life_mark.png" alt="" />}<br/>
      {isSelf && <img src="/images/life_mark.png" alt="" />}
      <div>
        <img src="/images/life_back.png" alt="" />
        {!isSelf && <img src="/images/life_line.png" alt="" style={{width: `${mana * 4.25}%`}} />}
        {isSelf && <img src="/images/life_line.png" alt="" style={{width: `${mana * 4.25}%`, left: '7%'}} />}
      </div>
      {!isSelf && <img src="/images/life_mark.png" alt="" />}<br/>
    </div>
  )
}

const CardsInHand = (props) => {
  const classes = useStyles();
  var { cards, isSelf, monsterCards, spellCards, equipCards, playerInfo, setPlayerInfo, battleInfo, setBattleInfo, setPlayerInfo1, setPlayerInfo2, setAttackOrDefense } = props
  var handCardsData = []
  var flag = true

  if (!cards) cards = []

  for (var i = 0; i < monsterCards.length; i ++) {
    if (cards.includes(monsterCards[i].TokenID)) {
      handCardsData.push({
        Type: monsterCards[i].Type,
        Card: monsterCards[i].Card,
        CardName: monsterCards[i].CardName,
        AttackPoint: monsterCards[i].AttackPoint,
        DefensePoint: monsterCards[i].DefensePoint,
        ManaCost: monsterCards[i].ManaCost,
        IsNew: true,
        TokenID: monsterCards[i].TokenID
      })
    }
  }

  for (var i = 0; i < spellCards.length; i ++) {
    if (cards.includes(spellCards[i].TokenID)) {
      handCardsData.push({
        Type: spellCards[i].Type,
        Card: spellCards[i].Card,
        CardName: spellCards[i].CardName,
        AttackPoint: spellCards[i].AttackPoint,
        DefensePoint: spellCards[i].DefensePoint,
        ManaCost: spellCards[i].ManaCost,
        IsNew: true,
        TokenID: spellCards[i].TokenID
      })
    }
  }

  for (var i = 0; i < equipCards.length; i ++) {
    if (cards.includes(equipCards[i].TokenID)) {
      handCardsData.push({
        Type: equipCards[i].Type,
        Card: equipCards[i].Card,
        CardName: equipCards[i].CardName,
        AttackPoint: equipCards[i].AttackPoint,
        DefensePoint: equipCards[i].DefensePoint,
        ManaCost: equipCards[i].ManaCost,
        IsNew: true,
        TokenID: equipCards[i].TokenID
      })
    }
  }

  if (battleInfo.length == 0) return (<></>)

  return (
    <>
      <div className={classes.cards_inhand}>
        <img src="/images/cards5_back.png" alt="" />
        { handCardsData.map((card, index) => (<Card
          CardShowType="play_big"
          Type={card.Type}
          Card={card.Card}
          CardName={card.CardName}
          AttackPoint={card.AttackPoint}
          DefensePoint={card.DefensePoint}
          ManaCost={card.ManaCost}
          key={index}
          TokenID={card.TokenID}
          playerInfo={playerInfo}
          setPlayerInfo={setPlayerInfo}
          isSelf={isSelf}
          battleInfo={battleInfo}
        />))}
      </div>
    </>
  )
}

const CardsPlay = (props) => {
  const classes = useStyles();
  var { cards, isSelf, monsterCards, spellCards, equipCards, playerInfo, setPlayerInfo, battleInfo, setBattleInfo } = props;
  var playCardsData = []

  if (!cards) cards = []

  for (var i = 0; i < monsterCards.length; i ++) {
    if (cards.includes(monsterCards[i].TokenID)) {
      playCardsData.push({
        Type: monsterCards[i].Type,
        Card: monsterCards[i].Card,
        CardName: monsterCards[i].CardName,
        AttackPoint: monsterCards[i].AttackPoint,
        DefensePoint: monsterCards[i].DefensePoint,
        ManaCost: monsterCards[i].ManaCost,
        IsNew: true,
        TokenID: monsterCards[i].TokenID
      })
    }
  }

  for (var i = 0; i < spellCards.length; i ++) {
    if (cards.includes(spellCards[i].TokenID)) {
      playCardsData.push({
        Type: spellCards[i].Type,
        Card: spellCards[i].Card,
        CardName: spellCards[i].CardName,
        AttackPoint: spellCards[i].AttackPoint,
        DefensePoint: spellCards[i].DefensePoint,
        ManaCost: spellCards[i].ManaCost,
        IsNew: true,
        TokenID: spellCards[i].TokenID
      })
    }
  }

  for (var i = 0; i < equipCards.length; i ++) {
    if (cards.includes(equipCards[i].TokenID)) {
      playCardsData.push({
        Type: equipCards[i].Type,
        Card: equipCards[i].Card,
        CardName: equipCards[i].CardName,
        AttackPoint: equipCards[i].AttackPoint,
        DefensePoint: equipCards[i].DefensePoint,
        ManaCost: equipCards[i].ManaCost,
        IsNew: true,
        TokenID: equipCards[i].TokenID
      })
    }
  }

  if (battleInfo.length == 0) return (<></>)

  var tmp = playerInfo[0] == battleInfo[1][0] ? battleInfo[1] : battleInfo[2]

  return (
    <>
      <div className={classes.cards_play}>
        { playCardsData.map((card, index) => (<Card
          CardShowType="play_real"
          Type={card.Type}
          Card={card.Card}
          CardName={card.CardName}
          AttackPoint={card.AttackPoint}
          DefensePoint={card.DefensePoint}
          ManaCost={card.ManaCost}
          key={index}
          TokenID={card.TokenID}
          playerInfo={playerInfo}
          setPlayerInfo={setPlayerInfo}
          isSelf={isSelf}
          battleInfo={battleInfo}
        />))}
      </div>
    </>
  )
}

const CardsDeck = (props) => {
  const classes = useStyles();
  const { cards, isSelf, playerInfo, monsterCards, spellCards, equipCards, setPlayerInfo, battleInfo } = props;
  var cardsDeck = playerInfo[5]
  var deckCardsData = []
  
  if (!cardsDeck) return(<></>)

  for (var i = 0; i < monsterCards.length; i ++) {
    if (cardsDeck.includes(monsterCards[i].TokenID)) {
      deckCardsData.push({
        Type: monsterCards[i].Type,
        Card: monsterCards[i].Card,
        CardName: monsterCards[i].CardName,
        AttackPoint: monsterCards[i].AttackPoint,
        DefensePoint: monsterCards[i].DefensePoint,
        ManaCost: monsterCards[i].ManaCost,
        IsNew: true,
        TokenID: monsterCards[i].TokenID
      })
    }
  }

  for (var i = 0; i < spellCards.length; i ++) {
    if (cardsDeck.includes(spellCards[i].TokenID)) {
      deckCardsData.push({
        Type: spellCards[i].Type,
        Card: spellCards[i].Card,
        CardName: spellCards[i].CardName,
        AttackPoint: spellCards[i].AttackPoint,
        DefensePoint: spellCards[i].DefensePoint,
        ManaCost: spellCards[i].ManaCost,
        IsNew: true,
        TokenID: spellCards[i].TokenID
      })
    }
  }

  for (var i = 0; i < equipCards.length; i ++) {
    if (cardsDeck.includes(equipCards[i].TokenID)) {
      deckCardsData.push({
        Type: equipCards[i].Type,
        Card: equipCards[i].Card,
        CardName: equipCards[i].CardName,
        AttackPoint: equipCards[i].AttackPoint,
        DefensePoint: equipCards[i].DefensePoint,
        ManaCost: equipCards[i].ManaCost,
        IsNew: true,
        TokenID: equipCards[i].TokenID
      })
    }
  }

  return (
    <>
      <div className={classes.cards_deck}>
        <div>
          { deckCardsData.map((card, index) => (<Card
            CardShowType="play_small"
            Type={card.Type}
            Card={card.Card}
            CardName={card.CardName}
            AttackPoint={card.AttackPoint}
            DefensePoint={card.DefensePoint}
            ManaCost={card.ManaCost}
            key={index}
            TokenID={card.TokenID}
            playerInfo={playerInfo}
            setPlayerInfo={setPlayerInfo}
            battleInfo={battleInfo}
            isSelf={isSelf}
          />))}
        </div>
      </div>
    </>
  )
}

const GameMessage = (props) => {
  const classes = useStyles();
  // const [message, setMessage] = useState('')
  // var { battleInfo } = props;

  // if (!battleInfo[1]) return (<></>)
  // if (!(battleInfo.player1.lifePoint == 0 || battleInfo.player2.lifePoint == 0 || battleInfo.turn == 6)) return (<></>)
  // $('#last_history_div').show()
  // var address = battleInfo.player1.playerAddress

  // if (battleInfo.player1.lifePoint < battleInfo.player2.lifePoint) {
  //   address = battleInfo.player2.playerAddress
  // }

  // axios.get('http://167.86.120.197/getPlayerName/' + address).then(res => {
  //   setMessage(res.data + ' won the game!')
  // })

  function onClose() {
    $('#game_message_div').hide()
  }

  return (
    <>
      {/* {(battleInfo.player1.lifePoint == 0 || battleInfo.player2.lifePoint == 0 || battleInfo.turn == 6) && message != '' &&  */}
      <div className={classes.last_history} id="game_message_div" style={{display: 'block'}}>
        <div>
          <div className="close-button" onClick={(e) => onClose()}>X</div>
        </div>
        <div><h1 style={{color: 'white'}} id="game_message"></h1></div>
      </div>
    </>
  )
}

function GameBoardPage() {
  const classes = useStyles();
  const router = useRouter();
  const [battleInfo, setBattleInfo] = useState([])
  const [playerInfo1, setPlayerInfo1] = useState([])
  const [playerInfo2, setPlayerInfo2] = useState([])
  const [monsterCards1, setMonsterCards1] = useState([])
  const [spellCards1, setSpellCards1] = useState([])
  const [equipCards1, setEquipCards1] = useState([])
  const [monsterCards2, setMonsterCards2] = useState([])
  const [spellCards2, setSpellCards2] = useState([])
  const [equipCards2, setEquipCards2] = useState([])
  const [playerName1, setPlayerName1] = useState('Player1')
  const [playerName2, setPlayerName2] = useState('Player2')
  const [attackOrDefense, setAttackOrDefense] = useState('Attack')
  var flag = true

  async function updatePlayerCards() {
    var res = (await axios.get('http://167.86.120.197/getDefaultCards')).data
    var arr1 = []

    for (var i = 0; i < res[0].length; i ++) {
      arr1.push({
        Type: "Monster",
        Card: res[0][i].card_image,
        CardName: res[0][i].card_name,
        AttackPoint: res[0][i].attack_point,
        DefensePoint: res[0][i].defense_point,
        ManaCost: res[0][i].mana_point,
        TokenID: res[0][i].card_id
      })
    }

    var arr2 = []

    for (var i = 0; i < res[1].length; i ++) {
      arr2.push({
        Type: "Spell",
        Card: res[1][i].card_image,
        CardName: res[1][i].card_name,
        AttackPoint: res[1][i].attack_point,
        DefensePoint: res[1][i].defense_point,
        ManaCost: res[1][i].mana_point,
        TokenID: res[1][i].card_id
      })
    }

    var arr3 = []

    for (var i = 0; i < res[2].length; i ++) {
      arr3.push({
        Type: "Equip",
        Card: res[2][i].card_image,
        CardName: res[2][i].card_name,
        AttackPoint: res[2][i].attack_point,
        DefensePoint: res[2][i].defense_point,
        ManaCost: res[2][i].mana_point,
        TokenID: res[2][i].card_id
      })
    }
    
    setMonsterCards1(arr1)
    setSpellCards1(arr2)
    setEquipCards1(arr3)
    setMonsterCards2(arr1)
    setSpellCards2(arr2)
    setEquipCards2(arr3)
  }

  async function updateBattleInfo(account, flg = true) {
    var res1 = (await axios.get('http://167.86.120.197/getBattleInfo/' + account)).data

    if (res1 == '') {
      router.push('/makedeck')
      return
    }
    
    if (res1.player1Address == '0x0000000000000000000000000000000000000000' || res1.player2Address == '0x0000000000000000000000000000000000000000') {
      toastr.error('Please wait for opponent join!')
      $('#game_message_div').show()
      $('#game_message').text('Please wait for opponent to join!')
      return
    }

    $('#game_message_div').hide()
    setBattleInfo(res1)

    var player = res1.player1
    var enemyPlayer = res1.player2

    if (enemyPlayer[0].toLowerCase() == account.toLowerCase()) {
      enemyPlayer = res1.player1
      player = res1.player2
    }

    var username = (await axios.get('http://167.86.120.197/getPlayerName/' + enemyPlayer[0])).data
    
    setPlayerName1(username)
    setPlayerInfo1(enemyPlayer)

    if (flg)
      setPlayerInfo2(player)

    if ((res1[1][0] == player[0] && res1.playerState == 1) || (res1[2][0] == player[0] && res1.playerState == 2)) {
      setAttackOrDefense('Attack')
    } else {
      setAttackOrDefense('Defense')
    }

    if (battleInfo[1] && (battleInfo.player1.lifePoint == 0 || battleInfo.player2.lifePoint == 0 || (battleInfo.turn == 5 && battleInfo.playerState == 2))) {
      $('#game_message_div').show()
      var address = battleInfo.player1.playerAddress

      if (battleInfo.player1.lifePoint < battleInfo.player2.lifePoint) {
        address = battleInfo.player2.playerAddress
      }

      axios.get('http://167.86.120.197/getPlayerName/' + address).then(res => {
        $('#game_message').text(res.data + ' won the game!')
      })
    }
  }

  useEffect(() => {
    socket.on('battle-info-updated', (res) => {
      connect((account) => {
        updateBattleInfo(account, res)
      })
    })

    connect(async (account) => {
      var username = (await axios.get('http://167.86.120.197/getPlayerName/' + account)).data
      var battleInfo = (await axios.get('http://167.86.120.197/getBattleInfo/' + account)).data

      if (username == '') {
        toastr.error('Sign in first!')
        router.push('/signin')
        return
      }

      if (battleInfo == '') {
        toastr.error('Start game first!')
        router.push('/makedeck')
        return
      }

      setPlayerName2(username)
      updatePlayerCards().then((res) => {
        updateBattleInfo(account)
      })
    })
  }, [])

  if (playerInfo1 == []) return(<></>)

  function onAttack(e) {
    if (playerInfo2[4].length == 0) {
      toastr.error('Please select cards to attack!')
      return
    }
    
    if (playerInfo2[3].length == 0) {
      toastr.error('Please select cards in hand')
      return
    }

    var tmp = battleInfo[1][0] == playerInfo2[0] ? battleInfo[1] : battleInfo[2]

    if (tmp[4].length || flag == false) {
      toastr.error('You can not attack. Please wait for opponet is ready!')
      return
    }

    flag = false

    connect(async (account) => {
      var username = (await axios.get('http://167.86.120.197/getPlayerName/' + account)).data
      var battleInfo = (await axios.get('http://167.86.120.197/getBattleInfo/' + account)).data

      if (username == '') {
        toastr.error('Sign in first!')
        router.push('/signin')
        return
      }

      if (battleInfo == '') {
        toastr.error('Start game first!')
        router.push('/makedeck')
        return
      }

      var tmpBattleInfo = JSON.parse(JSON.stringify(battleInfo))
      var isPlayer1 = true
      
      if (playerInfo2[0] == battleInfo[1][0]) {
        tmpBattleInfo[1] = playerInfo2
      } else {
        tmpBattleInfo[2] = playerInfo2
        isPlayer1 = false
      }

      await setBattleInfo(tmpBattleInfo)
      flag = true

      socket.emit('update-battle-info', {
        address: account,
        battleInfo: tmpBattleInfo,
        isPlayer1: isPlayer1
      })

      toastr.success('Your action is saved!')
    })
  }

  function onEndTurn(e) {
    connect(async (account) => {
      var username = (await axios.get('http://167.86.120.197/getPlayerName/' + account)).data
      var battleInfo = (await axios.get('http://167.86.120.197/getBattleInfo/' + account)).data

      if (username == '') {
        toastr.error('Sign in first!')
        router.push('/signin')
        return
      }

      if (battleInfo == '') {
        toastr.error('Start game first!')
        router.push('/makedeck')
        return
      }

      socket.emit('end-turn', {
        address: account,
        value: (playerInfo2[0] == battleInfo[1][0]) ? 1 : 2
      })

      toastr.success('You ended this turn!')
    })
  }

  return (
    <>
      <div className={classes.hero}>
        {playerInfo1.playerAddress != '0x0000000000000000000000000000000000000000' &&
        <PlayerBoard
          name={playerName1}
          avatar={"avatar2.png"}
          isSelf={false}
          playerInfo={playerInfo1}
          monsterCards={monsterCards1}
          spellCards={spellCards1}
          equipCards={equipCards1}
          setPlayerInfo={setPlayerInfo1}
          battleInfo={battleInfo}
          setBattleInfo={setBattleInfo}
        /> }
        <div>
          {!battleInfo.isFinished && 
          <Button onClick={(e) => onAttack(e)}>{attackOrDefense}</Button>}
          {battleInfo[1] && battleInfo[1][4].length && battleInfo[2][4].length && ((playerInfo2[0] == battleInfo[1][0]) ? (battleInfo.isEndTurn & 1) == 0 : (battleInfo.isEndTurn & 2) == 0) &&
          <Button onClick={(e) => onEndTurn(e)}>End Turn</Button>}
        </div>
        <PlayerBoard
          name={playerName2}
          avatar={"avatar3.png"}
          isSelf={true}
          playerInfo={playerInfo2}
          monsterCards={monsterCards2}
          spellCards={spellCards2}
          equipCards={equipCards2}
          setPlayerInfo={setPlayerInfo2}
          battleInfo={battleInfo}
          setBattleInfo={setBattleInfo}
          setAttackOrDefense={setAttackOrDefense}
          setPlayerInfo1={setPlayerInfo1}
          setPlayerInfo2={setPlayerInfo2}
        />
        <GameMessage/>
      </div>
    </>
  );
}

export default GameBoardPage;