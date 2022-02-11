
import React, {useEffect, useState} from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router';
import styles from './style';
import {connect, getBattle, getCardsOfPlayer} from '../../components/connector'
import Card from '../../components/Card/Card';

const useStyles = makeStyles(styles);

const PlayerBoard = (props) => {
  const classes = useStyles();
  const { name, avatar, cardsInHand, deckCards, playCards, isSelf, life, mana, playerInfo, monsterCards, spellCards, equipCards, setPlayerInfo } = props;

  return (
    <div className={classes.board}>
      {!isSelf && <div>
        <Avatar name={name} avatar={avatar} isSelf={isSelf} />
        <CardsInHand cards={playerInfo.cardsInHand} setPlayerInfo={setPlayerInfo} />
        <Life isSelf={isSelf} life={life} mana={mana} />
      </div>}
      <div>
        <BattleHistory />
        <CardsPlay cards={playCards} isSelf={isSelf} />
        <CardsDeck cards={deckCards} isSelf={isSelf} playerInfo={playerInfo} monsterCards={monsterCards} spellCards={spellCards} equipCards={equipCards} setPlayerInfo={setPlayerInfo} />
      </div>
      {isSelf && <div>
        <Life isSelf={isSelf} life={life} mana={mana} />
        <CardsInHand cards={playerInfo.cardsInHand} setPlayerInfo={setPlayerInfo} />
        <Avatar name={name} avatar={avatar} isSelf={isSelf} />
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
        {!isSelf && <img src="/images/life_line.png" alt="" style={{width: `${mana * 8.5}%`}} />}
        {isSelf && <img src="/images/life_line.png" alt="" style={{width: `${mana * 8.5}%`, left: '7%'}} />}
      </div>
      {!isSelf && <img src="/images/life_mark.png" alt="" />}<br/>
    </div>
  )
}

const CardsInHand = (props) => {
  const classes = useStyles();
  var { cards } = props

  if (!cards) cards = []

  return (
    <div className={classes.cards_inhand}>
      <img src="/images/cards5_back.png" alt="" />
      { cards.map((card, index) => (
        <img src={`/images/card${card}.png`} alt="" key={index} />
      ))}
    </div>
  )
}

const CardsPlay = (props) => {
  const classes = useStyles();
  const { cards, isSelf } = props;

  return (
    <>
      <div className={classes.cards_play}>
        cards play
      </div>
    </>
  )
}

const CardsDeck = (props) => {
  const classes = useStyles();
  const { cards, isSelf, playerInfo, monsterCards, spellCards, equipCards, setPlayerInfo } = props;
  var cardsDeck = playerInfo.cardsDeck
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
          />))}
        </div>
      </div>
    </>
  )
}

const BattleHistory = (props) => {
  const classes = useStyles();
  const { cards, isSelf } = props;

  return (
    <>
      <div className={classes.battle_history}>
        <div>
        </div>
      </div>
    </>
  )
}

function GameBoardPage() {
  const classes = useStyles();
  const router = useRouter();
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

  var player1 = {
    name: 'Player Name',
    avatar: 'avatar2.png',
    cards_inhand: ['0a', '0a', '0a', '0a', '0a'],
    deckCards: ['0b', '0b', '0b'],
    life: 70,
    mana: 5
  };

  var player2 = {
    name: 'Player Name',
    avatar: 'avatar2.png',
    cards_inhand: ['0a', '0a', '0a', '0a', '0a'],
    deckCards: ['0b', '0b', '0b'],
    life: 60,
    mana: 8
  };

  var battleHistory = []

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

  useEffect(() => {
    connect(async (account) => {      
      getCardsOfPlayer(account)
      .then(async (res) => {
        if (res[0].length == 0 || res[2].length == 0 || res[4].length == 0) {
          router.push('/signin')
        } else {
          await updatePlayerCards(account, res, false)

          getBattle(account)
          .then(async (res1) => {
            var player = res1.player1
            var enemyPlayer = res1.player2

            if (enemyPlayer.playerAddress == account) {
              enemyPlayer = res1.player2
              player = res1.player1
            }

            await updatePlayerCards(enemyPlayer.playerAddress, res, true)

            setPlayerInfo1(enemyPlayer)
            setPlayerInfo2(player)
          })
        }
      })
    })
  }, [])

  if (playerInfo1 == []) return(<></>)

  return (
    <>
      <div className={classes.hero}>
        <PlayerBoard
          name={player1.name}
          avatar={player1.avatar}
          cardsInHand={player1.cards_inhand}
          deckCards={player1.cards_left}
          playCards={player1.cards_play}
          life={playerInfo1.lifePoint}
          mana={playerInfo1.manaPoint}
          isSelf={false}
          playerInfo={playerInfo1}
          monsterCards={monsterCards1}
          spellCards={spellCards1}
          equipCards={equipCards1}
          setPlayerInfo={setPlayerInfo1}
        />
        <Button>Attack</Button>
        <PlayerBoard
          name={player2.name}
          avatar={player2.avatar}
          cardsInHand={player2.cards_inhand}          
          deckCards={player2.cards_left}
          playCards={player2.cards_play}
          life={playerInfo2.lifePoint}
          mana={playerInfo2.manaPoint}
          isSelf={true}
          playerInfo={playerInfo2}
          monsterCards={monsterCards2}
          spellCards={spellCards2}
          equipCards={equipCards2}
          setPlayerInfo={setPlayerInfo2}
        />
      </div>
    </>
  );
}

export default GameBoardPage;