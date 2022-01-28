import { createStyles } from '@material-ui/styles'
import theme from '../../theme'

const styles = createStyles({
  deckContainer: {
    position: 'relative',
    display: 'block',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '100vh',
    backgroundImage: 'url("/images/deck/makedeck-background.jpg")',
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
    }
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
    background: 'url(/images/deck/deckCardListBackground.png) center top / cover no-repeat',
    position: 'fixed',
    height: 'calc(100vh - 170px)',
    [theme.breakpoints.down('1280')]: {
      display: 'none'
    }
  },

  'l-container': {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridGap: '50px',
    width: '100%',
    maxWidth: '1200px',
    padding: '30px',
    [theme.breakpoints.down('1500')]: {
      gridTemplateColumns: 'repeat(4, 1fr)',
      padding: '0px'
    },
    [theme.breakpoints.down('1280')]: {
      gridTemplateColumns: 'repeat(5, 1fr)',
      padding: '0px'
    },
    [theme.breakpoints.down('960')]: {
      gridTemplateColumns: 'repeat(4, 1fr)',
      padding: '0px'
    },
    [theme.breakpoints.down('880')]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
      padding: '0px'
    },
    [theme.breakpoints.down('660')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
      padding: '0px'
    }
  },

  deckCardListHeader: {
    backgroundImage: 'url(/images/deck/deckCardListTop.png)',
    backgroundSize: 'cover',
    height: '142px'
  },

  deckCardListBody: {
    backgroundImage: 'url(/images/deck/deckCardListMiddle.png)',
    height: 'calc(100% - 251px)'
  },

  deckCardListFooter: {
    backgroundImage: 'url(/images/deck/deckCardListBottom.png)',
    backgroundSize: 'cover',
    height: '109px'
  },
});

export default styles;
