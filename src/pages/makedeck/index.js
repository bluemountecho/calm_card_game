import React, {useEffect, useState} from 'react'
import { makeStyles, LinearProgress } from '@material-ui/core'
import { useRouter } from 'next/router'
import styles from './style'
import Card from '../../components/Card/Card';
import {connect} from '../../components/connector'
import $ from 'jquery'
import axios from 'axios'

const useStyles = makeStyles(styles);

var battleInfo
var accountAddress
var timerID

function MakeDeckPage(props) {
  const classes = useStyles();
  const router = useRouter();
  const [addedCards, setAddedCards] = useState([{},{},{},{},{},{},{}])
  const [captains, setCaptains] = useState([])
  const [monsters, setMonsters] = useState([])
  const [showExceedDialog, setShowExceedDialog] = useState(false)
  const [showSelect2Cards, setShowSelect2Cards] = useState(false)
  const [showStartGame, setShowStartGame] = useState(true)
  const [showWaitOpponent, setShowWaitOpponent] = useState(false)
  const {baseURL} = props
  const [timeRemain, setTimeRemain] = useState(180)

  async function timerFunc() {
    var tmp = 180 - Math.floor((new Date().getTime() - new Date(battleInfo.startedAt).getTime()) / 1000)

    if (tmp % 5 == 0) {
      battleInfo = (await axios.get(baseURL + '/getBattle/' + accountAddress)).data

      if (battleInfo.length == 0) {
        router.push('/startgame')
      } else {
        battleInfo = battleInfo[0]
      }

      if (battleInfo.isStarted == 3) {
        router.push('/makedeck')
      }
    }

    if (tmp < 0) {
      router.push('/startgame')
    } else {
      setTimeRemain(tmp)
    }
  }

  useEffect(async () => {
    var rows = (await axios.get(baseURL + '/getDefaultCards')).data
    var captains = []
    var monsters = []

    for (var i = 0; i < rows.length; i ++) {
      if (rows[i].type == 1) captains.push(rows[i])
      else monsters.push(rows[i])
    }

    setCaptains(captains)
    setMonsters(monsters)

    connect(async (account) => {
      accountAddress = account
      battleInfo = (await axios.get(baseURL + '/getBattle/' + account)).data

      if (battleInfo.length == 0) {
        router.push('/startgame')
      } else {
        battleInfo = battleInfo[0]
      }

      timerID = setInterval(timerFunc, 1000)
    }, () => {
      router.push('/signin')
    })

    const maxTilt = 30;

    $(document).on('mousemove', ".b-game-card", function(evt) {
      if ($(evt.target).hasClass('ability')) return
      let bounding = mouseOverBoundingElem(evt);

      let posX = bounding.width / 2 - bounding.x;
      let posY = bounding.height / 2 - bounding.y;
      let hypotenuseCursor = Math.sqrt(Math.pow(posX, 2) + Math.pow(posY, 2));
      let hypotenuseMax = Math.sqrt(Math.pow(bounding.width / 2, 2) + Math.pow(bounding.height / 2, 2));
      let ratio = hypotenuseCursor / hypotenuseMax;

      $(".cover", this).css({
          transform: `rotate3d(${-posY / hypotenuseCursor}, ${+posX / hypotenuseCursor}, 0, ${ratio * maxTilt}deg)`,
          // filter: `brightness(${1.6 - bounding.y / bounding.height})` // 0.6 = offset, brightness will be from 0.6 to 1.6
      });
      $(".gloss", this).css({
          transform: `translateX(${posX * ratio * 0.75}px) translateY(${posY * ratio}px)` // 0.75 = offset
      });
    })
    .on('mouseleave', ".b-game-card", function() {
      let css = {
          transform: "",
          filter: ""
      };
      $(".cover, .gloss", this).css(css);
    });

    function mouseOverBoundingElem(evt) {
        let bounding = evt.target.getBoundingClientRect();
        let x = evt.originalEvent.clientX - Math.round(bounding.left);
        let y = evt.originalEvent.clientY - Math.round(bounding.top);
      
        return {
            x: Math.max(0, x),
            y: Math.max(0, y),
            width: Math.round(bounding.width),
            height: Math.round(bounding.height)
        };
    }
  }, [])

  useEffect(() => {
    return () => {
      clearInterval(timerID)
    }
  }, [])

  return (
    <>
      <div className={classes.deckContainer}>
        <div className={classes.container}>
          <CardList
            captains={captains}
            monsters={monsters}
            setMonsters={setMonsters}
            addedCards={addedCards}
            setAddedCards={setAddedCards}
            timeRemain={timeRemain}
          />
          <DeckCardList
            addedCards={addedCards}
            setAddedCards={setAddedCards}
            baseURL = {baseURL}
            setShowExceedDialog={setShowExceedDialog}
            setShowSelect2Cards={setShowSelect2Cards}
            showStartGame={showStartGame}
            setShowWaitOpponent={setShowWaitOpponent}
            setShowStartGame={setShowStartGame}
          />
        </div>
      </div>
      {showExceedDialog &&
      <ExceedTotalMana
        setShowExceedDialog={setShowExceedDialog}
      />}
      {showSelect2Cards &&
      <Select2CardsDialog
        setShowSelect2Cards={setShowSelect2Cards}
      />}
      {showWaitOpponent &&
      <WaitForOpponent
        baseURL={baseURL}
      />}
    </>
  );
}

function CardList(props) {
  const classes = useStyles()
  const {captains, monsters, setMonsters, addedCards, setAddedCards, timeRemain} = props
  const [filter, setFilter] = useState(0)
  const [ordering, setOrdering] = useState(0)
  const [manaFilter, setManaFilter] = useState(0)

  var length
  
  for (var length = 0; length < props.addedCards.length; length ++) {
    if (!props.addedCards[length].CardName) break
  }

  useEffect(() => {
    var width = $('.toolbar').parent()[0].offsetWidth

    $('.toolbar').css('width', (width - 20) + 'px')
  }, [])

  function onFilter(type) {
    if (filter == type) setFilter(0)
    else setFilter(type)
  }

  function onManaFilter(type) {
    if (manaFilter == type) setManaFilter(0)
    else setManaFilter(type)
  }

  function onOrder(type) {
    var tmpOrdering = type

    if (ordering == type) {
      tmpOrdering = 0
      setOrdering(0)
    }
    else setOrdering(type)

    var flag = tmpOrdering % 2
    var field = 'name'

    if (tmpOrdering == 1 || tmpOrdering == 2) {
      field = 'attack'
    } else if (tmpOrdering == 3 || tmpOrdering == 4) {
      field = 'health'
    } else if (tmpOrdering == 5 || tmpOrdering == 6) {
      field = 'speed'
    } else if (tmpOrdering == 7 || tmpOrdering == 8) {
      field = 'defense'
    }
    
    var tmp = monsters.sort((a, b) => {
      if (flag == 1) {
        if (a[field] < b[field]) return 1
        if (a[field] > b[field]) return -1
        return 0
      } else {
        if (a[field] < b[field]) return -1
        if (a[field] > b[field]) return 1
        return 0
      }
    })

    setMonsters([...tmp])
  }

  return (
    <>
      <div className={classes.cardList + ' cardListDiv'}>
        <div className="toolbar">
          <div>
            <h1>Time Left: {timeRemain} seconds</h1>
            {/* <input type="text" placeholder="Search..." /> */}
          </div>
          <div>
            <div className="filter">
              <div onClick={() => onFilter(2)} style={filter == 2 ? {opacity: '1'} : {}}><img src="/images/deck/melee-attack.png"></img></div>
              <div onClick={() => onFilter(3)} style={filter == 3 ? {opacity: '1'} : {}}><img src="/images/deck/ranged-attack.png"></img></div>
              <div onClick={() => onFilter(4)} style={filter == 4 ? {opacity: '1'} : {}}><img src="/images/deck/magic-attack.png"></img></div>
            </div>
            <div className="sort">
              <div onClick={() => onOrder(1)} style={ordering == 1 ? {opacity: '1'} : {}}><img src="/images/deck/melee-attack.png"/><label>🠗</label></div>
              <div onClick={() => onOrder(2)} style={ordering == 2 ? {opacity: '1'} : {}}><img src="/images/deck/melee-attack.png"/><label>🠕</label></div>
              <div onClick={() => onOrder(3)} style={ordering == 3 ? {opacity: '1'} : {}}><img src="/images/deck/health.png"/><label>🠗</label></div>
              <div onClick={() => onOrder(4)} style={ordering == 4 ? {opacity: '1'} : {}}><img src="/images/deck/health.png"/><label>🠕</label></div>
              <div onClick={() => onOrder(5)} style={ordering == 5 ? {opacity: '1'} : {}}><img src="/images/deck/speed.png"/><label>🠗</label></div>
              <div onClick={() => onOrder(6)} style={ordering == 6 ? {opacity: '1'} : {}}><img src="/images/deck/speed.png"/><label>🠕</label></div>
              <div onClick={() => onOrder(7)} style={ordering == 7 ? {opacity: '1'} : {}}><img src="/images/deck/defense.png"/><label>🠗</label></div>
              <div onClick={() => onOrder(8)} style={ordering == 8 ? {opacity: '1'} : {}}><img src="/images/deck/defense.png"/><label>🠕</label></div>
            </div>
            <div className="manas">
              <div onClick={() => onManaFilter(1)} style={manaFilter == 1 ? {opacity: '1'} : {}}>1</div>
              <div onClick={() => onManaFilter(2)} style={manaFilter == 2 ? {opacity: '1'} : {}}>2</div>
              <div onClick={() => onManaFilter(3)} style={manaFilter == 3 ? {opacity: '1'} : {}}>3</div>
              <div onClick={() => onManaFilter(4)} style={manaFilter == 4 ? {opacity: '1'} : {}}>4</div>
              <div onClick={() => onManaFilter(5)} style={manaFilter == 5 ? {opacity: '1'} : {}}>5</div>
              <div onClick={() => onManaFilter(6)} style={manaFilter == 6 ? {opacity: '1'} : {}}>6</div>
              <div onClick={() => onManaFilter(7)} style={manaFilter == 7 ? {opacity: '1'} : {}}>7</div>
              <div onClick={() => onManaFilter(8)} style={manaFilter == 8 ? {opacity: '1'} : {}}>8</div>
              <div onClick={() => onManaFilter(9)} style={manaFilter == 9 ? {opacity: '1'} : {}}>9</div>
              <div onClick={() => onManaFilter(10)} style={manaFilter == 10 ? {opacity: '1'} : {}}>10</div>
            </div>
          </div>
        </div>
        {!length &&
        <div className={classes['l-container']}>
          { captains.map((card, index) => (<Card
            CardShowType="big"
            Type={card.type}
            Image={card.image}
            CardName={card.name}
            AttackPoint={card.attack}
            DefensePoint={card.defense}
            ManaCost={card.mana}
            Speed={card.speed}
            Health={card.health}
            Ability={card.ability}
            key={index}
            CardID={index}
            addedCards={addedCards}
            setAddedCards={setAddedCards}
            ID={card.card_id}
          />))}
        </div>}
        {length != 0 &&
        <div className={classes['l-container']}>
          { monsters.map((card, index) => {
            if ((card.type == filter || filter == 0) && (manaFilter == card.mana || manaFilter == 0)) {
              return (<Card
                CardShowType="big"
                Type={card.type}
                Image={card.image}
                CardName={card.name}
                AttackPoint={card.attack}
                DefensePoint={card.defense}
                ManaCost={card.mana}
                Speed={card.speed}
                Health={card.health}
                Ability={card.ability}
                key={index}
                CardID={index}
                addedCards={addedCards}
                setAddedCards={setAddedCards}
                ID={card.card_id}
              />)
            }
          })}
        </div>}
      </div>
    </>
  )
}

function ExceedTotalMana(props) {
  const classes = useStyles()
  const {setShowExceedDialog} = props

  return (
    <div className={classes.battleDialog}>
      <div className="closeButton" onClick={() => {setShowExceedDialog(false)}}>X</div>
      <div className="dialogTitle">Oops! Total mana exceeds limit!</div>
      <p>
        Sorry, your total mana exceeds limit. Please select cards again to make total mana less than limit.
      </p>
      <div style={{textAlign: 'center', marginTop: '30px'}}>
        <div className={classes.button} style={{width: '100px', height: '30px', display: 'inline-flex'}} onClick={() => {setShowExceedDialog(false)}}>
          <p style={{fontSize: '15px'}}>Cancel</p>
        </div>
      </div>
    </div>
  )
}

function Select2CardsDialog(props) {
  const classes = useStyles()
  const {setShowSelect2Cards} = props

  return (
    <div className={classes.battleDialog}>
      <div className="closeButton" onClick={() => {setShowSelect2Cards(false)}}>X</div>
      <div className="dialogTitle">Oops! Wrong Select!</div>
      <p>
        You must select at least 1 Captain card and 1 Monster card!
      </p>
      <div style={{textAlign: 'center', marginTop: '30px'}}>
        <div className={classes.button} style={{width: '100px', height: '30px', display: 'inline-flex'}} onClick={() => {setShowSelect2Cards(false)}}>
          <p style={{fontSize: '15px'}}>Cancel</p>
        </div>
      </div>
    </div>
  )
}

function WaitForOpponent(props) {
  const classes = useStyles()
  const {baseURL} = props
  const [opponentName, setOpponentName] = useState('')
  const [timeRemain, setTimeRemain] = useState(180)
  const router = useRouter()
  var battleHistory

  async function timerFunc() {
    var tmp = 180 - Math.floor((new Date().getTime() - new Date(battleInfo.startedAt).getTime()) / 1000)

    if (tmp % 5 == 0) {
      battleHistory = (await axios.get(baseURL + '/getBattleHistory/' + battleInfo.battle_id)).data

      if (battleHistory.length) {
        router.push('/gameboard?battle=' + battleHistory[0].history_id)
      }
    }

    if (tmp < 0) {
      router.push('/startgame')
    } else {
      setTimeRemain(tmp)
    }
  }

  useEffect(async () => {
    var opponentAddress = battleInfo.player2Address

    if (battleInfo.player2Address == accountAddress) {
      opponentAddress = battleInfo.player1Address
    }

    setOpponentName((await axios.get(baseURL + '/getPlayerName/' + opponentAddress)).data)
    timerID = setInterval(timerFunc, 1000)
    battleHistory = (await axios.get(baseURL + '/getBattleHistory/' + battleInfo.battle_id)).data

    if (battleHistory.length) {
      router.push('/gameboard?battle=' + battleHistory[0].history_id)
    }
  }, [])

  return (
    <div className={classes.battleDialog}>
      <div className="dialogTitle">Waiting...</div>
      <p>
        Please wait your opponent "{ opponentName }" to be ready.<br/>
      </p>
      <p>
        {timeRemain} seconds remain ...<br />
        <LinearProgress variant="determinate" value={(180 - timeRemain) / 180.0 * 100.0} />
      </p>
    </div>
  )
}

function DeckCardList(props) {
  const classes = useStyles()
  const router = useRouter();
  const {baseURL, addedCards, setAddedCards, setShowExceedDialog, setShowSelect2Cards, showStartGame, setShowStartGame, setShowWaitOpponent} = props
  var captain = []
  var monsters = []
  var total = 0
  var length = 0

  for (length = 0; length < addedCards.length; length ++) {
    if (!addedCards[length].CardName) break
  }

  for (var i = 0; i < addedCards.length; i ++) {
    if (addedCards[i].CardName) {
      total += addedCards[i].ManaCost
    }
  }

  async function startGame(e) {
    setShowExceedDialog(false)
    setShowSelect2Cards(false)

    if (total > 28) {
      setShowExceedDialog(true)
      return
    }

    if (length < 2) {
      setShowSelect2Cards(true)
      return
    }

    var tmp = []

    for (var i = 0; i < length; i ++) {
      tmp.push(addedCards[i].ID)
    }

    connect(async (account) => {
      setShowStartGame(false)

      var res = (await axios.post(baseURL + '/startGame', {
        address: account,
        deck: JSON.stringify(tmp),
        battleID: battleInfo.battle_id
      })).data

      if (res.message == 'done') {
        router.push('/gameboard?battle=' + res.data)
      } else {
        clearInterval(timerID)
        setShowWaitOpponent(true)
        // $('*').css('pointer-events', 'none')
      }
    }, () => {
      router.push('/signin')
    })
  }

  if (addedCards.length > 1) {
    captain.push(addedCards[0])

    for (var i = 1; i < addedCards.length; i ++) {
      monsters.push(addedCards[i])
    }
  }

  return (
    <>
      <div className={classes.deckCardList}>
        <div className="dialogTitle">Choose Cards to Play!</div>
        <div className={classes.deckCardListHeader}>
          <h1 style={{ color: 'white', margin: '0px', textAlign: 'center' }}>
            28 /
            <div className={total > 28 ? "red-mana" : "green-mana"}>{total}</div>
          </h1>
        </div>
        <div className={classes.deckCardListBody + ' deck-card-list-body'}>
          <div className="deck-title">Captain</div>
          <div className="deck-cards-container">
            { captain.map((card, index) => (<Card
              CardShowType="small"
              Type={card.Type ? card.Type : 1}
              Image={card.Image}
              CardName={card.CardName}
              AttackPoint={card.AttackPoint}
              DefensePoint={card.DefensePoint}
              ManaCost={card.ManaCost}
              Speed={card.Speed}
              Health={card.Health}
              Ability={card.Ability}
              key={index}
              CardID={index}
              addedCards={addedCards}
              setAddedCards={setAddedCards}
              ID={card.ID}
            />))}
          </div>
          <div className="deck-title">Monsters</div>
          <div className="deck-cards-container">
            { monsters.map((card, index) => (<Card
              CardShowType="small"
              Type={card.Type ? card.Type : 2}
              Image={card.Image}
              CardName={card.CardName}
              AttackPoint={card.AttackPoint}
              DefensePoint={card.DefensePoint}
              ManaCost={card.ManaCost}
              Speed={card.Speed}
              Health={card.Health}
              Ability={card.Ability}
              key={index}
              CardID={index + 1}
              addedCards={addedCards}
              setAddedCards={setAddedCards}
              ID={card.ID}
            />))}
          </div>
        </div>
        <div className={classes.deckCardListFooter}>
          {showStartGame == true &&
          <div style={{display: 'block', width: 'fit-content', margin: '0px auto', height: '50px'}}>
            <div id="startButton" className={classes.button} onClick={() => startGame()}>
              <p>Start Battle</p>
            </div>
          </div>}
        </div>
      </div>
    </>
  )
}

export default MakeDeckPage;