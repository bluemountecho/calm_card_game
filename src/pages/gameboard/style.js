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
    padding: '120px 0 40px',
    [theme.breakpoints.down('930')]: {
      flexDirection: 'column',
      padding: '100px 0 20px',
    },
    '& > button': {
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
  },
  board: {
    width: '100%',
    '& > div': {
      width: '90%',
      margin: '0 auto',
      paddingBottom: '2vh',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      '& > div:last-child': {
        justifyContent: 'end',
      },

      '& > div': {
        display: 'flex'
      }
    },
  },
  avatar: {
    width: '20%',
    display: 'flex',
    alignItems: 'center',
    '& > div': {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      '& > img:first-child': {
        width: '6vw',
      },
      '& > img:last-child': {
        width: '4.5vw',
        margin: '0.75vw',
        position: 'absolute',
      },
    },
    '& > p': {
      fontFamily: 'RajdhaniBold',
      fontSize: '1.5vw',
      fontWeight: '600',
      color: 'white',
    },
  },
  life: {
    paddingTop: '1.5vw',
    display: 'block !important',
    alignItems: 'center',
    width: '20%',
    '& > img': {
      width: '14%',
      zIndex: '1',
      display: 'inline-block',
    },
    '& > div': {
      position: 'relative',
      display: 'inline-block',
      alignItems: 'center',
      width: '40%',
      '& > img:first-child': {
        width: '100%',
      },
      '& > img:last-child': {
        position: 'absolute',
        right: '7%',
        height: '45%',
        top: '0.6vw'
      },
    },
    '& > *:first-child': {
      transform: 'translateX(3px)',
    },
  },
  cards_inhand: {
    position: 'relative',
    width: '60%',
    display: 'flex',
    height: '8vw',
    justifyContent: 'left',
    '& > img:first-child': {
      width: '100%',
      position: 'absolute',
      zIndex: '1',
    },
    '& > img:not(:first-child)': {
      width: '8.5%',
      top: '-0.1vw',
      position: "relative",
      height: 'fit-content',
      margin: '0 2%',
      zIndex: '2',
      transform: 'translateY(15%)',
    },
  },
  cards_play: {
    width: '60%'
  },
  cards_deck: {
    width: '20%',

    '& > div': {
      width: '80%',
      overflow: 'auto',
      maxHeight: '10vw',

      '&::-webkit-scrollbar-track': {
        WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
        backgroundColor: 'rgba(255, 153, 1, 0.4)',
        borderRadius: '5px'
      },

      '&::-webkit-scrollbar': {
        width: '10px',
        backgroundColor: 'rgba(255, 153, 1, 0.4)',
        borderRadius: '5px'
      },

      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#F90',
        borderRadius: '5px',
        border: '2px solid black',
        backgroundImage: '-webkit-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent)'
      }
    },
  },
  battle_history: {
    width: '20%',

    '& > div': {
      width: '80%',
      overflow: 'auto',
      maxHeight: '10vw',

      '&::-webkit-scrollbar-track': {
        WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
        backgroundColor: 'rgba(255, 153, 1, 0.4)',
        borderRadius: '5px'
      },

      '&::-webkit-scrollbar': {
        width: '10px',
        backgroundColor: 'rgba(255, 153, 1, 0.4)',
        borderRadius: '5px'
      },

      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#F90',
        borderRadius: '5px',
        border: '2px solid black',
        backgroundImage: '-webkit-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent)'
      }
    },
  }
});

export default styles;