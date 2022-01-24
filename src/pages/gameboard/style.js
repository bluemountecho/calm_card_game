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
    },
  },
  avatar: {
    width: '40%',
    display: 'flex',
    alignItems: 'center',
    '& > div': {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      '& > img:first-child': {
        width: '8vw',
      },
      '& > img:last-child': {
        width: '6vw',
        margin: '1vw',
        position: 'absolute',
      },
    },
    '& > p': {
      fontFamily: 'RajdhaniBold',
      fontSize: '2vw',
      fontWeight: '600',
      color: 'white',
    },
  },
  life: {
    display: 'flex',
    alignItems: 'center',
    width: '40%',
    '& > img': {
      width: '12%',
      zIndex: '1',
    },
    '& > div': {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      width: '30%',
      '& > img:first-child': {
        width: '100%',
      },
      '& > img:last-child': {
        position: 'absolute',
        right: '7%',
        height: '45%',
      },
    },
    '& > *:first-child': {
      transform: 'translateX(3px)',
    },
  },
  cards_inhand: {
    position: 'relative',
    width: '20%',
    display: 'flex',
    justifyContent: 'center',
    '& > img': {
      width: '25%',
      position: 'absolute',
      '&:nth-child(2)': {
        transform: 'rotate(45deg) translate(70%, -15%)',
      },
      '&:nth-child(3)': {
        transform: 'rotate(-45deg) translate(-70%, -10%)',
      },
    },
  },
  cards_side: {
    position: 'relative',
    width: '20%',
    display: 'flex',
    '& > img:first-child': {
      width: '40%',
    },
    '& > img:not(:first-child)': {
      width: '25%',
      position: 'absolute',
      '&:nth-last-child(3)': {
        transform: 'rotate(45deg) translate(20%, -10%)',
      },
      '&:nth-last-child(2)': {
        transform: 'rotate(-45deg) translate(-50%, -20%)',
      },
    },
  },
  side_card_left: {
    top: '5%',
    left: '10%',
  },
  side_card_right: {
    top: '10%',
    right: '5%',
  },
  rotate: {
    transform: 'rotate(180deg)',
  },
  cards_five: {
    position: 'relative',
    width: '60%',
    display: 'flex',
    justifyContent: 'center',
    '& > img:first-child': {
      width: '90%',
      position: 'absolute',
      zIndex: '1',
    },
    '& > img:not(:first-child)': {
      width: '10%',
      height: 'fit-content',
      margin: '0 3%',
      zIndex: '2',
      transform: 'translateY(15%)',
    },
  },
  cards_three: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    justifyContent: 'center !important',
    marginBottom: '3vh',
    '& > img:first-child': {
      width: '30%',
      position: 'absolute',
      zIndex: '1',
    },
    '& > img:not(:first-child)': {
      width: '5%',
      height: 'fit-content',
      margin: '0 2%',
      zIndex: '2',
      transform: 'translateY(15%)',
    },
  },
});

export default styles;