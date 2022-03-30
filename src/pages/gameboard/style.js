import { Autorenew } from '@material-ui/icons';
import { createStyles } from '@material-ui/styles';
import theme from '../../theme';

const styles = createStyles({
  hero: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: '100vh',
    backgroundImage: 'url("/images/game_back.png")',
    backgroundSize: 'cover',
    padding: '5vh 0px',
    overflow: 'hidden',
    [theme.breakpoints.down('930')]: {
      flexDirection: 'column',
      padding: '100px 0 20px',
    },
    '& button': {
      backgroundImage: 'url("/images/attack.png")',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      width: '17vh',
      height: '6vh',
      margin: '2vh 0',
      '& > span': {
        fontFamily: 'RajdhaniBold',
        fontSize: '3vh',
        fontWeight: '600',
        textTransform: 'none',
        color: 'white',
      },
    },
    '& .endTurn': {
      float: 'right'
    },

    '& > .cards-row': {
      display: 'flex',
      width: '100%',
      height: '30vh',

      '& > .cards-side': {
        display: 'inline-flex',
        width: '20%',
        textAlign: 'center',
        position: 'relative',

        '& > label': {
          fontSize: '40px',
          position: 'absolute',
          width: '100%',
          textAlign: 'center',
        },

        '& > .speed-div': {
          display: 'flex',

          '& > button': {
            fontSize: '3vw',
            width: '6vw',
            color: 'white',
            borderRadius: '10px',
            border: '2px solid white',
            background: 'none',
            height: '6vw',
            margin: '20px 2vw',
            lineHeight: '3vw',
            fontWeight: 'bolder',
            padding: '1.5vw 0px',
            textAlign: 'center',
            cursor: 'pointer',

            '&:hover': {
              background: 'white',
              color: 'black',
            }
          },
        },
      },

      '& > .cards-pos': {
        display: 'inline-flex',
        width: '60%',
        textAlign: 'center',
        position: 'relative',
        padding: '20px 0px',

        '& > .monster-div': {
          width: '20%',
          display: 'inline-flex',
          padding: '20px',
          alignItems: 'center',

          '& > label': {
            width: '100%',
            textAlign: 'center',
            color: 'white',
            fontSize: '50px',
          },

          '&.has-border': {
            backgroundImage: 'url(/images/card_back_1.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          },

          '&.has-border-1': {
            backgroundImage: 'url(/images/card_back_2.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }
        }
      }
    }
  },
  
  vsDiv: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.7)',
    left: '0px',
    top: '0px',
    zIndex: '200',

    '& > .player1-vs, & > .player2-vs': {
      width: '50%',
      height: '100%',
      display: 'inline-flex',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      position: 'absolute',
      alignItems: 'center',

      '& .fire': {
        width: '100%',
        textAlign: 'center',
        fontWeight: 'bolder',
        fontSize: '100px',
        fontFamily: 'Belwe Bold',

        '& p': {
          color: 'white',
          textShadow: 'none',
          fontSize: '30px',
          WebkitTextStrokeWidth: '1px',
          fontWeight: 'bolder',
          fontFamily: 'Belwe Bold',
        },
      },
    },

    '& > .player1-vs': {
      left: '-50vw',
    },

    '& > .player2-vs': {
      right: '-50vw',
    },

    '& > .vs-div': {
      width: '100px',
      height: '120vh',
      display: 'inline-flex',
      color: 'white',
      position: 'absolute',
      backgroundImage: 'linear-gradient(90deg, #00d7e1, #c7fcff, #c7fcff, #00d7e1)',
      transform: 'skew(-15deg, 0deg)',
      paddingTop: 'calc(50vh - 100px)',
      left: 'calc(50vw - 50px)',
      top: '-120vh',
      zIndex: '2',

      '&::after': {
        content: "'VS'",
        textShadow: '#8fd90f 10px 0 0, #8fd90f 10px 10px 0, #8fd90f 10px 10px 0, #8fd90f 10px 10px 0, #8fd90f 10px 10px 0, #8fd90f 10px 10px 0, #8fd90f 10px 10px 0, #8fd90f 10px 10px 0, #8fd90f 10px 10px 0, #8fd90f 10px 10px 0, #8fd90f 10px 10px 0, #8fd90f 10px 10px 0, #8fd90f 10px 10px 0',
        fontFamily: 'Belwe Bold',
        position: 'absolute',
        fontWeight: 'bolder',
        textAlign: 'center',
        fontSize: '200px',
        left: '-90px',
        top: 'calc(60vh - 100px)',
        lineHeight: '200px',
      }
    },
  },

  battleDialog: {
    background: 'rgba(0, 0, 0, 0.95)',
    borderRadius: '20px',
    position: 'fixed',
    minWidth: '40vw',
    width: 'fit-content',
    height: 'fit-content',
    top: '30vh',
    border: '2px solid #f5d88e',
    padding: '30px',
    maxWidth: '40vw',
    left: '30vw',
    animation: '$scaleAppear 0.2s ease-in',
    transform: 'scale(1.0)',
    zIndex: '1000000',
    margin: 'auto',

    '& > .closeButton': {
      border: '2px solid #f5d88e',
      borderRadius: '20px',
      width: '30px',
      height: '30px',
      fontSize: '20px',
      fontWeight: 'bolder',
      color: '#f5d88e',
      position: 'absolute',
      right: '-15px',
      textAlign: 'center',
      cursor: 'pointer',
      top: '-15px',
      background: 'rgba(0, 0, 0, 0.95)',
    },

    '&::after': {
      backgroundImage: 'url(/images/logo.png)',
      backgroundSize: '70px 70px',
      display: 'inline-block',
      width: "70px",
      height: "70px",
      position: 'absolute',
      top: '-35px',
      content: "''",
      left: '-15px',
    },

    '& > .dialogTitle': {
      background: '#f5d88e',
      height: '30px',
      fontSize: '20px',
      padding: '2px 5px 2px 15px',
      fontWeight: 'bolder',
      width: 'fit-content',
      borderRadius: '3px',
      position: 'absolute',
      top: '-15px',
      left: '50px',
    },

    '& > p, & > p *': {
      color: '#f5d88e',
      fontSize: '15px',
      fontWeight: 'bold',
    },
  },
});

export default styles;