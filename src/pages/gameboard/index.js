
import React, {useEffect, useState} from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router';
import styles from './style';
import {connect, getBattle, getCardsOfPlayer, getPlayerName, updateBattle, endTurn} from '../../components/connector'
import Card from '../../components/Card/Card';

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

const LastHistory = (props) => {
  return (
    <>
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
  const [player1MonsterCards, setPlayer1MonsterCards] = useState([])
  const [player1SpellCards, setPlayer1SpellCards] = useState([])
  const [player2MonsterCards, setPlayer2MonsterCards] = useState([])
  const [player2SpellCards, setPlayer2SpellCards] = useState([])
  var flag = true

  async function updatePlayerCards(account, res, flag) {
    var res = await getCardsOfPlayer(account)

    if (res[0].length == 0 || res[2].length == 0 || res[4].length == 0) {
      router.push('/signin')
    } else {
      var arr1 = []
      var arr2 = []
      var arr3 = []

      for (var i = 0; i < res[0].length; i ++) {          
        arr1.push({
          Type: "Monster",
          Card: res[1][i],
          CardName: "Monster" + (i + 1),
          AttackPoint: res[0][i][0],
          DefensePoint: res[0][i][1],
          ManaCost: res[0][i][2],
          TokenID: res[2][i]
        })
      }

      for (var i = 0; i < res[3].length; i ++) {          
        arr2.push({
          Type: "Spell",
          Card: res[4][i],
          CardName: "Spell" + (i + 1),
          AttackPoint: res[3][i][0],
          DefensePoint: res[3][i][1],
          ManaCost: res[3][i][2],
          TokenID: res[5][i]
        })
      }
      
      for (var i = 0; i < res[6].length; i ++) {          
        arr3.push({
          Type: "Equip",
          Card: res[7][i],
          CardName: "Equip" + (i + 1),
          AttackPoint: res[6][i][0],
          DefensePoint: res[6][i][1],
          ManaCost: res[6][i][2],
          TokenID: res[8][i]
        })
      }

      if (flag == true) {
        setMonsterCards1(arr1)
        setSpellCards1(arr2)
        setEquipCards1(arr3)
      } else {
        setMonsterCards2(arr1)
        setSpellCards2(arr2)
        setEquipCards2(arr3)
      }
    }
  }

  
  function waitForReady(account) {
    console.log('Wait For Ready')
    getBattle(account).then(res => {
      console.log(res)
      if (res[1][0] == '0x0000000000000000000000000000000000000000' || res[2][0] == '0x0000000000000000000000000000000000000000') {
        return
      }
      setBattleInfo(res)

      var player = res.player1
      var enemyPlayer = res.player2

      if (enemyPlayer.playerAddress.toLowerCase() == account.toLowerCase()) {
        enemyPlayer = res.player1
        player = res.player2
      }

      if (player[4].length != 0) {
        setTimeout(function () {
          waitForReady(account)
        }, 5000)

        return
      }

      if (enemyPlayer.playerAddress.toLowerCase() == res[1][0].toLowerCase()) {
        setPlayer1MonsterCards(res1[8])
        setPlayer1SpellCards(res1[9])
        setPlayer2MonsterCards(res1[10])
        setPlayer2SpellCards(res1[11])
      } else {
        setPlayer1MonsterCards(res1[10])
        setPlayer1SpellCards(res1[11])
        setPlayer2MonsterCards(res1[8])
        setPlayer2SpellCards(res1[9])
      }

      setPlayerInfo1(enemyPlayer)
      setPlayerInfo2(player)

      if ((res[1][0] == player[0] && res[6] == 1) || (res[2][0] == player[0] && res[6] == 2)) {
        setAttackOrDefense('Attack')
      } else {
        setAttackOrDefense('Defense')
      }
    })
  }

  function waitForJoin(account, res) {
    console.log('Wait For Join')
    getBattle(account)
    .then(async (res1) => {
      if (res1[1][0] == '0x0000000000000000000000000000000000000000' || res1[2][0] == '0x0000000000000000000000000000000000000000') {
        setTimeout(function () {
          waitForJoin(account)
        },5000)

        return
      }

      setBattleInfo(res1)

      var player = res1.player1
      var enemyPlayer = res1.player2

      if (enemyPlayer.playerAddress.toLowerCase() == account.toLowerCase()) {
        enemyPlayer = res1.player1
        player = res1.player2
      }

      if (enemyPlayer.playerAddress.toLowerCase() == res[1][0].toLowerCase()) {
        setPlayer1MonsterCards(res1[8])
        setPlayer1SpellCards(res1[9])
        setPlayer2MonsterCards(res1[10])
        setPlayer2SpellCards(res1[11])
      } else {
        setPlayer1MonsterCards(res1[10])
        setPlayer1SpellCards(res1[11])
        setPlayer2MonsterCards(res1[8])
        setPlayer2SpellCards(res1[9])
      }

      updatePlayerCards(enemyPlayer.playerAddress, res, true).then(res => {})
      getPlayerName(enemyPlayer.playerAddress).then(res => {
        setPlayerName1(res)
      })

      setPlayerInfo1(enemyPlayer)
      setPlayerInfo2(player)

      if ((res1[1][0] == player[0] && res1[6] == 1) || (res1[2][0] == player[0] && res1[6] == 2)) {
        setAttackOrDefense('Attack')
      } else {
        setAttackOrDefense('Defense')
      }
    })
  }

  useEffect(() => {

    connect(async (account) => {
      getPlayerName(account).then(res => {
        setPlayerName2(res)
      })
      getCardsOfPlayer(account)
      .then(async (res) => {
        if (res[0].length == 0 || res[2].length == 0 || res[4].length == 0) {
          router.push('/signin')
        } else {
          updatePlayerCards(account, res, false).then(res => {})
          getBattle(account).then(res1 => {
            waitForJoin(account, res)
            waitForReady(account)
          })
        }
      })
    })
  }, [])

  if (playerInfo1 == []) return(<></>)

  function onAttack(e) {
    if (playerInfo2[4].length == 0) {
      alert('Please select cards to attack!')
      return
    }
    if (playerInfo2[3].length == 0) {
      alert('Please select cards in hand')
      return
    }
    if (flag == false) {
      alert('Please wait. Server is saving info!')
      return
    }

    var tmp = battleInfo[1][0] == playerInfo2[0] ? battleInfo[1] : battleInfo[2]

    if (tmp[4].length) {
      alert('You can not attack. Please wait for opponet is ready!')
      return
    }

    flag = false

    connect((account) => {
      var tmpBattleInfo = JSON.parse(JSON.stringify(battleInfo))
      
      if (playerInfo2[0] == battleInfo[1][0]) {
        tmpBattleInfo[1] = playerInfo2
      } else {
        tmpBattleInfo[2] = playerInfo2
      }
      
      updateBattle(account, tmpBattleInfo, () => {
        flag = true
        waitForReady(account)
      }, () => {
        flag = true
      })
    })
  }

  var tmp = false
  
  if (battleInfo.length) tmp = playerInfo2[0] == battleInfo[1][0] ? battleInfo[6] == 1 : battleInfo[6] == 2

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
          <Button onClick={(e) => onAttack(e)}>{attackOrDefense}</Button>
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
        <LastHistory
          player1MonsterCards={player1MonsterCards}
          player1SpellCards={player1SpellCards}
          player2MonsterCards={player2MonsterCards}
          player2SpellCards={player2SpellCards}
        />
      </div>
    </>
  );
}

export default GameBoardPage;