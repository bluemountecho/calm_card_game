
import React, {useEffect} from 'react'
import { Button, makeStyles } from '@material-ui/core'
import { useRouter } from 'next/router'
import styles from './style'
import Card from '../../components/Card/Card';

const useStyles = makeStyles(styles);

function MakeDeckPage() {
  const classes = useStyles();
  const router = useRouter();

  useEffect(() => {
    window.jQuery = require('../../../public/js/jquery.min');

    const maxTilt = 30;

    window.jQuery(".b-game-card")
      .mousemove(function(evt) {
          let bounding = mouseOverBoundingElem(evt);

          let posX = bounding.width / 2 - bounding.x;
          let posY = bounding.height / 2 - bounding.y;
          let hypotenuseCursor = Math.sqrt(Math.pow(posX, 2) + Math.pow(posY, 2));
          let hypotenuseMax = Math.sqrt(Math.pow(bounding.width / 2, 2) + Math.pow(bounding.height / 2, 2));
          let ratio = hypotenuseCursor / hypotenuseMax;

          window.jQuery(".cover", this).css({
              transform: `rotate3d(${posY / hypotenuseCursor}, ${-posX / hypotenuseCursor}, 0, ${ratio * maxTilt}deg)`,
              // filter: `brightness(${1.6 - bounding.y / bounding.height})` // 0.6 = offset, brightness will be from 0.6 to 1.6
          });
          window.jQuery(".gloss", this).css({
              transform: `translateX(${posX * ratio * 0.75}px) translateY(${posY * ratio}px)` // 0.75 = offset
          });
      })
      .mouseleave(function() {
          let css = {
              transform: "",
              filter: ""
          };
          window.jQuery(".cover, .gloss", this).css(css);
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
          <CardList />
          <DeckCardList />
        </div>
      </div>
    </>
  );
}

function CardList() {
  const classes = useStyles()
  const router = useRouter()

  var cards = []

  for (var i = 1; i <= 100; i ++) {
    cards.push({
      Type: "Monster",
      Card: "card0a",
      CardName: "Monster1",
      AttackPoint: 20 + i % 10,
      DefensePoint: 20 - i % 10,
      ManaCost: Math.floor(i / 20 + 1),
    })
  }

  return (
    <>
      <div className={classes.cardList}>
        <div className={classes['l-container']}>
          { cards.map((card, index) => (<Card
            Type={card.Type}
            Card={card.Card}
            CardName={card.CardName}
            AttackPoint={card.AttackPoint}
            DefensePoint={card.DefensePoint}
            ManaCost={card.ManaCost}
            key={index}
          />))}
        </div>
      </div>
    </>
  )
}

function DeckCardList() {
  const classes = useStyles()
  const router = useRouter()

  return (
    <>
      <div className={classes.deckCardList}>
        <DeckCardListHeader />
        <DeckCardListBody />
        <DeckCardListFooter />
      </div>
    </>
  )
}

function DeckCardListHeader() {
  const classes = useStyles()
  const router = useRouter()

  return (
    <>
      <div className={classes.deckCardListHeader}>

      </div>
    </>
  )
}

function DeckCardListBody() {
  const classes = useStyles()
  const router = useRouter()

  return (
    <>
      <div className={classes.deckCardListBody}>

      </div>
    </>
  )
}

function DeckCardListFooter() {
  const classes = useStyles()
  const router = useRouter()

  return (
    <>
      <div className={classes.deckCardListFooter}>

      </div>
    </>
  )
}

export default MakeDeckPage;