import { NoEncryption } from '@material-ui/icons';
import { createStyles } from '@material-ui/styles'
import theme from '../../theme'

const styles = createStyles({
  deckContainer: {
    position: 'relative',
    display: 'block',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '100vh',
    backgroundImage: 'url("/images/game_back.png")',
    backgroundSize: 'cover',
    padding: '120px 20px 40px 20px',
    [theme.breakpoints.down('1280')]: {
      padding: '120px 0px 40px',
    }
  },

  container: {
    maxWidth: '1600px',
    margin: '0px auto',
    padding: '0px 10px',
    [theme.breakpoints.down('1280')]: {
      padding: '0px 20px',
    }
  },
  
  cardList: {
    display: 'inline-block',
    padding: '10px',
    width: 'calc(100% - 422px)',
    [theme.breakpoints.down('1280')]: {
      width: '100%',
      padding: '0px'
    },

    '& > .toolbar': {
      borderRadius: '10px',
      border: '2px solid #f5d88e',
      background: 'rgba(0, 0, 0, 0.9)',
      padding: '10px 30px',
      position: 'fixed',
      zIndex: '100',
      height: '110px',

      '& > div': {
        height: '45px',

        '& > h1': {
          display: 'inline-block',
          color: 'white',
          margin: '0px',
          width: 'fit-content',
        },

        '& > input': {
          float: 'right',
          border: '2px solid #f5d88e',
          borderRadius: '5px',
          height: '35px',
          padding: '10px',
          color: '#f5d88e',
          fontSize: '25px',
          lineHeight: '25px',
          background: 'none',
        }
      },

      '& .filter': {
        display: 'inline-flex',
        borderRight: '2px solid #f5d88e',
        height: '40px',

        '& > div': {
          padding: '0px 5px 0px 0px',
          height: '40px',
          textAlign: 'center',
          display: 'inline-flex',
          cursor: 'pointer',
          opacity: '0.5',

          '& > img': {
            width: '40px',
            height: '40px',
          }
        },
      },

      '& .manas': {
        display: 'inline-flex',
        height: '40px',
        float: 'right',

        '& > div': {
          padding: '0px 5px 0px 0px',
          height: '40px',
          width: '40px',
          textAlign: 'center',
          display: 'block',
          cursor: 'pointer',
          background: 'url(/images/deck/mana.png)',
          backgroundSize: 'cover',
          textAlign: 'center',
          fontSize: '25px',
          fontWeight: 'bolder',
          lineHeight: '25px',
          padding: '8px 0px',
          color: 'white',
          opacity: '0.5',
          textShadow: '#000 2px 0 0, #000 1.75517px 0.95885px 0, #000 1.0806px 1.68294px 0, #000 0.14147px 1.99499px 0, #000 -0.83229px 1.81859px 0, #000 -1.60229px 1.19694px 0, #000 -1.97998px 0.28224px 0, #000 -1.87291px -0.70157px 0, #000 -1.30729px -1.5136px 0, #000 -0.42159px -1.95506px 0, #000 0.56732px -1.91785px 0, #000 1.41734px -1.41108px 0, #000 1.92034px -0.55883px 0',
        },
      },

      '& .sort': {
        display: 'inline-flex',
        height: '40px',
        fontWeight: 'bolder',

        '& > div': {
          padding: '0px 0px 0px 5px',
          height: '40px',
          textAlign: 'center',
          display: 'inline-flex',
          cursor: 'pointer',
          opacity: '0.5',
          width: '50px',

          '& > img': {
            width: '40px',
            height: '40px',
            margin: 'auto',
          },

          '& > label': {
            color: '#f5d88e',
            fontSize: '40px',
            position: 'relative',
            left: '-10px',
            top: '-4px',
          }
        },
      },
    },
  },

  cardListHeader: {
    display: 'block',
    padding: '10px',

    '& > ul.titleContainer': {
      padding: '0px',
      margin: '0px',
      listStyle: 'none',
      display: 'flex',
      WebkitBoxPack: 'center',
      justifyContent: 'center',

      '& > li.titleLeftStart': {
        opacity: '0.4',
        background: 'url(/images/deck/titleleftstart.png) center top no-repeat',
        WebkitBoxFlex: '0',
        flexGrow: '0',
        width: '20px',
        minWidth: '20px',
        paddingBottom: '30px',
        height: '1.125rem',
        lineHeight: '1.125rem'
      },

      '& > li.titleLeftMiddle': {
        opacity: '0.4',
        background: 'url(/images/deck/titleleftmiddle.png) center top / 100% 62.66% no-repeat',
        WebkitBoxFlex: '2',
        flexGrow: '2',
        minWidth: '70px',
        height: '1.125rem',
        lineHeight: '1.125rem'
      },

      '& > li.titleLeftEnd': {
        opacity: '0.4',
        background: 'url(/images/deck/titleleftend.png) center top no-repeat',
        marginLeft: '0px',
        WebkitBoxFlex: '0',
        flexGrow: '0',
        width: '20px',
        minWidth: '20px',
        paddingBottom:  '30px',
        height: '1.125rem',
        lineHeight: '1.125rem'
      },

      '& > li.titleContent': {
        padding: "0px 30px",
        marginTop: "-5px",
        minWidth: "fit-content",

        '& > div': {
          width: "300px",
          height: "75px",
          margin: "0px 40px",
          position: "relative",
          top: "-30px",
          transition: "all 0.125s ease-out 0s",
          fill: "rgb(97, 67, 38)",
          fillOpacity: "0.4",

          '& > h5': {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            adding: "0px",
            margin: "0px",
            width: "130px",
            textAlign: "center",
            color: "rgb(97, 67, 38)",
            whiteSpace: "nowrap",
            transition: "all 0.125s ease-out 0s"
          }
        }
      },

      '& > li.titleRightStart': {
        opacity: '0.4',
        background: 'url(/images/deck/titlerightstart.png) center top no-repeat',
        WebkitBoxFlex: '0',
        flexGrow: '0',
        width: '20px',
        minWidth: '20px',
        paddingBottom: '30px',
        height: '1.125rem',
        lineHeight: '1.125rem'
      },

      '& > li.titleRightMiddle': {
        opacity: '0.4',
        background: 'url(/images/deck/titlerightmiddle.png) center top / 100% 62.66% no-repeat',
        WebkitBoxFlex: '2',
        flexGrow: '2',
        minWidth: '70px',
        height: '1.125rem',
        lineHeight: '1.125rem'
      },

      '& > li.titleRightEnd': {
        opacity: '0.4',
        background: 'url(/images/deck/titlerightend.png) center top no-repeat',
        marginLeft: '0px',
        WebkitBoxFlex: '0',
        flexGrow: '0',
        width: '20px',
        minWidth: '20px',
        paddingBottom:  '30px',
        height: '1.125rem',
        lineHeight: '1.125rem'
      },
    }
  },

  deckCardList: {
    display: 'inline-block',
    width: '400px',
    marginLeft: '20px',
    borderRadius: '20px',
    border: '2px solid #f5d88e',
    background: 'rgba(0, 0, 0, 0.9)',
    position: 'fixed',
    padding: '20px',
    marginTop: '20px',
    [theme.breakpoints.down('1280')]: {
      display: 'none'
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
  },

  'l-container': {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridGap: '50px',
    width: '100%',
    maxWidth: '1200px',
    padding: '30px',
    marginTop: '110px',
    [theme.breakpoints.down('1500')]: {
      gridTemplateColumns: 'repeat(4, 1fr)',
      padding: '30px 0px'
    },
    [theme.breakpoints.down('1280')]: {
      gridTemplateColumns: 'repeat(5, 1fr)',
      padding: '30px 0px'
    },
    [theme.breakpoints.down('960')]: {
      gridTemplateColumns: 'repeat(4, 1fr)',
      padding: '30px 0px'
    },
    [theme.breakpoints.down('880')]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
      padding: '30px 0px'
    },
    [theme.breakpoints.down('660')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
      padding: '30px 0px'
    }
  },

  deckCardListHeader: {
    padding: '20px 0px',

    '& .red-mana': {
      background: '#b42405',
      padding: '0px 20px',
      color: 'white',
      display: 'inline-block',
      marginLeft: '15px',
      borderRadius: '3px',
    },

    '& .green-mana': {
      background: '#24bb12',
      padding: '0px 20px',
      color: 'white',
      display: 'inline-block',
      marginLeft: '15px',
      borderRadius: '3px',
    }
  },

  deckCardListBody: {
    height: 'calc(100% - 251px)',

    '& > .deck-cards-container': {
      height: '100%',
    },

    '& .deck-title': {
      padding: '5px 20px',
      borderBottom: '2px solid #f5d88e',
      fontSize: '20px',
      color: '#f5d88e',
      marginBottom: '10px',
      marginTop: '10px',
      fontWeight: 'bolder',
    },
  },

  deckCardListFooter: {
    padding: '20px 0px'
  },
  
  button: {
    cursor: 'pointer',
    width: '160px',
    height: '100%',
    backgroundImage: 'url("/images/button_startgame.png")',
    backgroundSize: 'cover',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0px auto',

    '&:hover': {
      opacity: '0.8',
    },
    '& > p': {
      margin: '0',
      fontFamily: 'RajdhaniBold',
      fontSize: '20px',
      textTransform: 'uppercase',
    },
    [theme.breakpoints.down('930')]: {
      width: '75vw',
      height: '24vw',
      '& > p': {
        fontSize: '10vw',
      },
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
