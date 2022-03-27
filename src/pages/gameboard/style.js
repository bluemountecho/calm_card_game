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
      },

      '& > .cards-pos': {
        display: 'inline-flex',
        width: '60%',
        textAlign: 'center',
        position: 'relative',
        padding: '20px 0px',

        '& > .monster-div': {
          width: '25%',
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
            border: '2px solid white',
            borderRadius: '3px',
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
        fontFamily: 'Caesar Dressing',
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
  }
});

export default styles;