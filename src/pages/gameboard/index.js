
import React, {useEffect} from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router';
import styles from './style';

const useStyles = makeStyles(styles);

const PlayerBoard = (props) => {
  const classes = useStyles();
  const { name, avatar, cardsInHand, cardsLeft, cardsRight, cardsFive, cardsThree, isSelf, life } = props;

  return (
    <div className={classes.board}>
      {!isSelf && <div>
        <Avatar name={name} avatar={avatar} isSelf={isSelf} />
        <CardsInHand cards={cardsInHand} isSelf={isSelf} />
        <Life isSelf={isSelf} life={life} />
      </div>}
      <div>
        <CardsThree cards={cardsThree} />
        <CardsSide cards={cardsLeft} side="left" />
        <CardsFive cards={cardsFive} />
        <CardsSide cards={cardsRight} side="right" />
      </div>
      {isSelf && <div>
        <Life isSelf={isSelf} life={life} />
        <CardsInHand cards={cardsInHand} isSelf={isSelf} />
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
  const { isSelf, life } = props;

  return (
    <div className={classes.life} style={isSelf ? {paddingTop: '4%'} : {paddingBottom: '4%'}}>
      {isSelf && <img src="/images/life_mark.png" alt="" />}
      <div>
        <img src="/images/life_back.png" alt="" />
        <img src="/images/life_line.png" alt="" style={{width: `${life * 0.85}%`}} />
      </div>
      {!isSelf && <img src="/images/life_mark.png" alt="" />}
    </div>
  )
}

const CardsInHand = (props) => {
  const classes = useStyles();
  const { cards, isSelf } = props;

  return (
    <div className={`${classes.cards_inhand} ${isSelf ? '' : classes.rotate}`}>
      { cards.map((card, index) => (
        <img src={`/images/card${card}.png`} alt="" key={index} />
      ))}
    </div>
  )
}

const CardsSide = (props) => {
  const classes = useStyles();
  const { cards, side } = props;

  return (
    <div className={classes.cards_side}>
      <img src="/images/card_back.png" alt="" />
      { cards.map((card, index) => (
        <img src={`/images/card${card}.png`} alt="" key={index} className={`${side === "left" ? classes.side_card_left : classes.side_card_right}`} />
      ))}
    </div>
  )
}

const CardsFive = (props) => {
  const classes = useStyles();
  const { cards } = props;
  return (
    <div className={classes.cards_five}>
      <img src="/images/cards5_back.png" alt="" />
      { cards.map((card, index) => (
        <img src={`/images/card${card}.png`} alt="" key={index} />
      ))}
    </div>
  )
}

const CardsThree = (props) => {
  const classes = useStyles();
  const { cards } = props;
  return (
    <div className={classes.cards_three}>
      <img src="/images/cards3_back.png" alt="" />
      { cards.map((card, index) => (
        <img src={`/images/card${card}.png`} alt="" key={index} />
      ))}
    </div>
  )
}

function GameBoardPage() {
  const classes = useStyles();
  const router = useRouter();

  const player2 = {
    name: 'Player Name',
    avatar: 'avatar1.png',
    cards_inhand: ['0a', '0a', '0a'],
    cards_left: ['8c', '8c', '8c'],
    cards_right: ['9d', '9d'],
    cards_five: ['0a', '0a', '0a', '0a', '0a'],
    cards_three: ['0b', '0b', '0b'],
  };

  const player1 = {
    name: 'Player Name',
    avatar: 'avatar2.png',
    cards_inhand: ['0a', '0a', '0a'],
    cards_left: ['8c', '8c', '8c'],
    cards_right: ['9d', '9d'],
    cards_five: ['0a', '0a', '0a', '0a', '0a'],
    cards_three: ['0b', '0b', '0b'],
  };

  const [life1, setLife1] = React.useState(80);
  const [life2, setLife2] = React.useState(100);

  return (
    <>
      <div className={classes.hero}>
        <PlayerBoard
          name={player1.name}
          avatar={player1.avatar}
          cardsInHand={player1.cards_inhand}
          cardsLeft={player1.cards_left}
          cardsRight={player1.cards_right}
          cardsFive={player1.cards_five}
          cardsThree={player1.cards_three}
          life={life1}
          isSelf={false}
        />
        <Button>Attack</Button>
        <PlayerBoard
          name={player2.name}
          avatar={player2.avatar}
          cardsInHand={player2.cards_inhand}
          cardsLeft={player2.cards_left}
          cardsRight={player2.cards_right}
          cardsFive={player2.cards_five}
          cardsThree={player2.cards_three}
          life={life2}
          isSelf={true}
        />
      </div>
    </>
  );
}

export default GameBoardPage;