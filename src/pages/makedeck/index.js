import React, {useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core'
import { useRouter } from 'next/router'
import styles from './style'
import Card from '../../components/Card/Card';
import {connect, addCardsToPlayer, getCardsOfPlayer, addCardsToDeck, getCardsFromDeck, findBattle, getBattle} from '../../components/connector'
import $ from 'jquery'
import axios from 'axios'
import toastr from "toastr"

const useStyles = makeStyles(styles);
var socket

toastr.options = {
  positionClass: 'toast-top-left'
}

function MakeDeckPage(props) {
  const classes = useStyles();
  const router = useRouter();
  const [addedCards, setAddedCards] = useState([])
  const [monsterCards, setMonsterCards] = useState([])
  const [spellCards, setSpellCards] = useState([])
  const [equipCards, setEquipCards] = useState([])
  socket = props.socket

  function SetAddedCards(cardObj, idx = -1) {
    if (idx == -1) {
      setAddedCards([cardObj, ...addedCards])
    } else {
      addedCards[idx] = cardObj
    }
  }

  useEffect(() => {
    if (!socket._callbacks || !socket._callbacks['$deck-list-saved'] || socket._callbacks['$deck-list-saved'].length == 0) {
      socket.on('deck-list-saved', async (res) => {
        if (res.status == 'Success') {
          toastr.success(res.message)
        } else {
          toastr.error(res.message)
          $('#startButton p').text('Start Game')
          return
        }
        
        connect((account) => {
          socket.emit('find-battle', {
            address: account
          })
        })
      })
    }

    if (!socket._callbacks || !socket._callbacks['$found-battle'] || socket._callbacks['$found-battle'].length == 0) {
      socket.on('found-battle', (res) => {
        router.push('/gameboard')
      })
    }

    connect(async (account) => {
      var username = (await axios.get('http://localhost/getPlayerName/' + account)).data
      var battleInfo = (await axios.get('http://localhost/getBattleInfo/' + account)).data

      if (username == '') {
        toastr.error('Sign in first!')
        router.push('/signin')
        return
      }

      if (battleInfo != '') {
        toastr.error('You already have a playing game')
        router.push('/gameboard')
        return
      }

      var res = (await axios.get('http://localhost/getDefaultCards')).data
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

      await setMonsterCards(arr1)

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

      await setSpellCards(arr2)

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

      await setEquipCards(arr3)

      res = (await axios.get('http://localhost/getCardsFromDeck/' + account)).data
      
      var arr = []

      for (var i = 0; i < arr1.length; i ++) {
        if (res.includes(arr1[i].TokenID)) {
          arr.push({
            Type: arr1[i].Type,
            Card: arr1[i].Card,
            CardName: arr1[i].CardName,
            AttackPoint: arr1[i].AttackPoint,
            DefensePoint: arr1[i].DefensePoint,
            ManaCost: arr1[i].ManaCost,
            IsNew: true,
            TokenID: arr1[i].TokenID
          })
        }
      }

      for (var i = 0; i < arr2.length; i ++) {
        if (res.includes(arr2[i].TokenID)) {
          arr.push({
            Type: arr2[i].Type,
            Card: arr2[i].Card,
            CardName: arr2[i].CardName,
            AttackPoint: arr2[i].AttackPoint,
            DefensePoint: arr2[i].DefensePoint,
            ManaCost: arr2[i].ManaCost,
            IsNew: true,
            TokenID: arr2[i].TokenID
          })
        }
      }

      for (var i = 0; i < arr3.length; i ++) {
        if (res.includes(arr3[i].TokenID)) {
          arr.push({
            Type: arr3[i].Type,
            Card: arr3[i].Card,
            CardName: arr3[i].CardName,
            AttackPoint: arr3[i].AttackPoint,
            DefensePoint: arr3[i].DefensePoint,
            ManaCost: arr3[i].ManaCost,
            IsNew: true,
            TokenID: arr3[i].TokenID
          })
        }
      }

      for (var i = 0; i < arr.length; i ++) {
        $('#Card_' + arr[i].TokenID).addClass('disabled-card')
        $('#Card_' + arr[i].TokenID).addClass('disabled-card-opacity')
      }

      setAddedCards(arr)
    })

    const maxTilt = 30;

    $(document).on('mousemove', ".b-game-card", function(evt) {
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
  }, []);

  return (
    <>
      <div className={classes.deckContainer}>
        <div className={classes.container}>
          <CardList
            monsterCards={monsterCards}
            spellCards={spellCards}
            equipCards={equipCards}
            addedCards={addedCards}
            SetAddedCards={SetAddedCards}
          />
          <DeckCardList
            addedCards={addedCards}
            SetAddedCards={SetAddedCards}
            setAddedCards={setAddedCards}
          />
        </div>
      </div>
    </>
  );
}

function CardList(props) {
  const classes = useStyles()
  const router = useRouter()

  return (
    <>
      <div className={classes.cardList}>
        <CardListTitle title="Monster Cards" haveTopSpace="false" />
        <div className={classes['l-container']}>
          { props.monsterCards.map((card, index) => (<Card
            CardShowType="big"
            Type={card.Type}
            Card={card.Card}
            CardName={card.CardName}
            AttackPoint={card.AttackPoint}
            DefensePoint={card.DefensePoint}
            ManaCost={card.ManaCost}
            key={index}
            CardID={'Monster_' + index}
            addedCards={props.addedCards}
            SetAddedCards={props.SetAddedCards}
            TokenID={card.TokenID}
          />))}
        </div>
        <CardListTitle title="Spell Cards" haveTopSpace="true" />
        <div className={classes['l-container']}>
          { props.spellCards.map((card, index) => (<Card
            CardShowType="big"
            Type={card.Type}
            Card={card.Card}
            CardName={card.CardName}
            AttackPoint={card.AttackPoint}
            DefensePoint={card.DefensePoint}
            ManaCost={card.ManaCost}
            key={index}
            CardID={'Spell_' + index}
            addedCards={props.addedCards}
            SetAddedCards={props.SetAddedCards}
            TokenID={card.TokenID}
          />))}
        </div>
        <CardListTitle title="Equip Cards" haveTopSpace="true" />
        <div className={classes['l-container']}>
          { props.equipCards.map((card, index) => (<Card
            CardShowType="big"
            Type={card.Type}
            Card={card.Card}
            CardName={card.CardName}
            AttackPoint={card.AttackPoint}
            DefensePoint={card.DefensePoint}
            ManaCost={card.ManaCost}
            key={index}
            CardID={'Equip_' + index}
            addedCards={props.addedCards}
            SetAddedCards={props.SetAddedCards}
            TokenID={card.TokenID}
          />))}
        </div>
      </div>
    </>
  )
}

function CardListTitle(props) {
  const classes = useStyles()
  const router = useRouter()

  return (
    <>
      <div className={classes.cardListHeader} style={props.haveTopSpace == "true" ? {marginTop: "60px"} : {}}>
        <ul className="titleContainer">
          <li className="titleLeftStart dark"></li>
          <li className="titleLeftMiddle dark"></li>
          <li className="titleLeftEnd dark"></li>
          <li className="titleContent">
            <div>
              <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 82">
                <path d="M220.69,56.17H79.31l-.15-.8c0-.2-1-4.82-5.18-6.09l-.7-.2V28.56l.7-.2c4.26-1.28,5.17-6,5.18-6.09l.15-.8H220.69l.15.8c0,.2.95,4.81,5.18,6.09l.7.2V49.08l-.7.2c-4.26,1.28-5.17,6-5.18,6.08Zm-139.81-2H219.12a10,10,0,0,1,5.64-6.56V30a10,10,0,0,1-5.64-6.56H80.88A10,10,0,0,1,75.24,30V47.65A10,10,0,0,1,80.88,54.21Z"></path>
                <path d="M217.66,52.42H82l-.1-.35a9,9,0,0,0-4.79-5.2l-.31-.12V30.89l.31-.12a9,9,0,0,0,4.79-5.2l.1-.35H218l.1.35a9,9,0,0,0,4.79,5.2l.31.12V46.75l-.31.12a9,9,0,0,0-4.79,5.2l-.1.35Zm-135-1H217.31a9.76,9.76,0,0,1,4.93-5.34V31.54a9.76,9.76,0,0,1-4.93-5.34H82.69a9.76,9.76,0,0,1-4.93,5.34V46.1A9.76,9.76,0,0,1,82.69,51.44Z"></path>
                <path d="M68.87,30.3c1.37.16,1.07-1.47.34-2.36s-.33-4.32,1.71-6.28c1.59-1.52,5.7-2.1,7.44-2.29h62.75c.45,0,4.14.23,8.79-3.68,4,3.38,7.32,3.7,8.43,3.7l.36,0h62.95c1.74.19,5.85.77,7.44,2.29,2,2,2.44,5.38,1.71,6.28s-1,2.52.34,2.36,8.7-3.1,12-6.36,7.66-8.87,7.41-10.26-1.22-1.14-2.36,0-12.31,4.73-20.2,4.4l-.42.07h-69s-3.69.33-8.29-3.73l-.41-.36-.4.36c-4.61,4.06-8.26,3.73-8.29,3.73H72.4L72,18.08c-7.89.33-19.06-3.26-20.2-4.4s-2.12-1.38-2.36,0,4.07,7,7.41,10.26S67.5,30.13,68.87,30.3Z"></path>
                <path d="M231.13,47.39c-1.37-.17-1.07,1.46-.34,2.36s.33,4.32-1.71,6.27-8.22,2.36-8.22,2.36H158.69c-.44,0-4.14-.23-8.79,3.68-4.65-3.91-8.34-3.72-8.79-3.68h-62S73,58,70.92,56s-2.44-5.37-1.71-6.27,1-2.53-.34-2.36-8.7,3.09-12,6.35S49.17,62.62,49.42,64s1.22,1.14,2.36,0S64.09,59.28,72,59.6h69.23s3.68-.33,8.29,3.72l.4.36.41-.36c4.6-4,8.25-3.73,8.28-3.72h69.23v0l.2,0c7.89-.32,19.06,3.26,20.2,4.4s2.12,1.39,2.36,0-4.07-7-7.41-10.26S232.5,47.55,231.13,47.39Z"></path>
                <path d="M45.69,45s-8.43-2.58-10-6.61c1.59-4,10-6.61,10-6.61-2.38-.63-7.52-6.08-7.52-6.08C32,24,22.72,27,19.24,28.75s-10,9.65-10,9.65,6.49,7.88,10,9.65,12.77,4.8,18.93,3C38.17,51.09,43.31,45.64,45.69,45Z"></path>
                <path d="M60.1,40.46a.44.44,0,0,0-.37.11c-.24.28-1.38.81-6.47.76A24.41,24.41,0,0,1,41.72,38.4a24.41,24.41,0,0,1,11.54-2.93c5.09,0,6.23.48,6.47.76a.44.44,0,0,0,.37.11,1,1,0,0,0,1.1-.75c.17-.75-.08-1.3-1.28-1.89-1.5-.74-8.37-3.85-10.57-5.29S40.86,22,40.19,20,39,18.43,39,18.43a5.82,5.82,0,0,0-.49,3.36c.37,1.61,3.12,6.65,9.41,11,0,0-8.62.86-11,5.62,2.38,4.76,11,5.62,11,5.62-6.29,4.34-9,9.39-9.41,11A5.82,5.82,0,0,0,39,58.37s.55.55,1.22-1.52,7-7,9.16-8.46,9.07-4.55,10.57-5.29c1.2-.59,1.45-1.14,1.28-1.89A1.05,1.05,0,0,0,60.1,40.46Z"></path>
                <path d="M254.31,45s8.43-2.58,10-6.61c-1.59-4-10-6.61-10-6.61,2.38-.63,7.52-6.08,7.52-6.08,6.16-1.76,15.45,1.27,18.93,3s10,9.65,10,9.65-6.49,7.88-10,9.65-12.77,4.8-18.93,3C261.83,51.09,256.69,45.64,254.31,45Z"></path>
                <path d="M239.9,40.46a.44.44,0,0,1,.37.11c.24.28,1.38.81,6.47.76a24.41,24.41,0,0,0,11.54-2.93,24.41,24.41,0,0,0-11.54-2.93c-5.09,0-6.23.48-6.47.76a.44.44,0,0,1-.37.11,1,1,0,0,1-1.1-.75c-.17-.75.08-1.3,1.28-1.89,1.5-.74,8.37-3.85,10.57-5.29S259.14,22,259.81,20,261,18.43,261,18.43a5.82,5.82,0,0,1,.49,3.36c-.37,1.61-3.12,6.65-9.41,11,0,0,8.62.86,11,5.62-2.38,4.76-11,5.62-11,5.62,6.29,4.34,9,9.39,9.41,11a5.82,5.82,0,0,1-.49,3.36s-.55.55-1.22-1.52-7-7-9.16-8.46-9.07-4.55-10.57-5.29c-1.2-.59-1.45-1.14-1.28-1.89A1.05,1.05,0,0,1,239.9,40.46Z"></path>
                <path d="M149.9,17.29a13.58,13.58,0,0,1-3.1,1.87.16.16,0,0,0,.06.31h6.28a.16.16,0,0,0,.06-.31,13.58,13.58,0,0,1-3.1-1.87A.15.15,0,0,0,149.9,17.29Z"></path>
                <path d="M149.9,60.48a13.23,13.23,0,0,0-3.1-1.87.16.16,0,0,1,.06-.31h6.28a.16.16,0,0,1,.06.31,13.23,13.23,0,0,0-3.1,1.87A.18.18,0,0,1,149.9,60.48Z"></path>
              </svg>
              <h5>
                <div style={{fontSize: "20px"}}>
                  <div style={{display: "block", whiteSpace: "nowrap", color: "rgb(97, 67, 38)"}}>{props.title}</div>
                </div>
              </h5>
            </div>
          </li>
          <li className="titleRightStart dark"></li>
          <li className="titleRightMiddle dark"></li>
          <li className="titleRightEnd dark"></li>
        </ul>
      </div>
    </>
  )
}

function DeckCardList(props) {
  const classes = useStyles()
  const router = useRouter()

  return (
    <>
      <div className={classes.deckCardList}>
        <DeckCardListHeader
          addedCards = {props.addedCards}
        />
        <DeckCardListBody
          addedCards={props.addedCards}
          SetAddedCards={props.SetAddedCards}
          setAddedCards={props.setAddedCards}
        />
        <DeckCardListFooter
          addedCards={props.addedCards}
        />
      </div>
    </>
  )
}

function DeckCardListHeader(props) {
  const classes = useStyles()
  const router = useRouter()

  return (
    <>
      <div className={classes.deckCardListHeader}>
        <h1 style={{
          color: 'white',
          margin: '0px',
          top: '50px',
          left: '50px',
          position: "absolute"
        }}>40 / {props.addedCards.length}</h1>
      </div>
    </>
  )
}

function DeckCardListBody(props) {
  const classes = useStyles()
  const router = useRouter()

  return (
    <>
      <div className={classes.deckCardListBody + ' deck-card-list-body'}>
        <div className="deck-cards-container">
          { props.addedCards.map((card, index) => (<Card
            CardShowType="small"
            Type={card.Type}
            Card={card.Card}
            CardName={card.CardName}
            AttackPoint={card.AttackPoint}
            DefensePoint={card.DefensePoint}
            ManaCost={card.ManaCost}
            key={index}
            CardID={card.Type + '_' + index}
            IsNew={card.IsNew}
            SetAddedCards={props.SetAddedCards}
            addedCards={props.addedCards}
            setAddedCards={props.setAddedCards}
            TokenID={card.TokenID}
          />))}
        </div>
      </div>
    </>
  )
}

function DeckCardListFooter(props) {
  const classes = useStyles()
  const router = useRouter()

  async function startGame(e) {
    if ($('#startButton p').text() == 'Wait...') {
      toastr.error('Please wait...')
      return
    }

    if (props.addedCards.length != 40) {
      toastr.error('Please select 40 cards!')
      return
    }

    $('#startButton p').text('Wait...')

    connect(async (account) => {
      var username = (await axios.get('http://localhost/getPlayerName/' + account)).data

      if (username == '') {
        toastr.error('Sign in first!')
        router.push('/signin')
        return
      }

      var cardIDs = []

      for (var i = 0; i < props.addedCards.length; i ++) {
        cardIDs.push(props.addedCards[i].TokenID)
      }

      socket.emit('save-deck-list', {
        address: account,
        data: cardIDs
      })
    })
  }

  return (
    <>
      <div className={classes.deckCardListFooter}>
        <div style={{display: 'block', width: 'fit-content', margin: '0px auto', height: '50px'}}>
          <div id="startButton" className={classes.button} onClick={(e) => startGame(e)}>
            <p>Start Game</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default MakeDeckPage;