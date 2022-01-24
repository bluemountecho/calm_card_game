import { createStyles } from '@material-ui/styles'
import theme from '../../theme'

const styles = createStyles({
  deckContainer: {
    position: 'relative',
    display: 'block',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '100vh',
    backgroundImage: 'url("/images/makedeck-background.jpg")',
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

  deckCardList: {
    display: 'inline-block',
    width: '400px',
    marginLeft: '20px',
    background: 'url(/images/deckCardListBackground.png) center top / cover no-repeat',
    position: 'fixed',
    height: 'calc(100vh - 170px)',
    [theme.breakpoints.down('1280')]: {
      display: 'none'
    }
  },

  'l-container': {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridGap: '30px',
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
    backgroundImage: 'url(/images/deckCardListTop.png)',
    backgroundSize: 'cover',
    height: '142px'
  },

  deckCardListBody: {
    backgroundImage: 'url(/images/deckCardListMiddle.png)',
    height: 'calc(100% - 251px)'
  },

  deckCardListFooter: {
    backgroundImage: 'url(/images/deckCardListBottom.png)',
    backgroundSize: 'cover',
    height: '109px'
  },
});

export default styles;
