import { createStyles } from '@material-ui/styles';
import theme from '../../theme';

const styles = createStyles({
  root: {
    position: 'fixed',
    zIndex: '9999',
    padding: '0 2.5%',
    backgroundColor: 'rgb(15, 27, 39)',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgb(29, 47, 65)',
    '& > div:first-child': {
      display: 'flex',
      alignItems: 'stretch',
      margin: '20px 0',
      '& > a': {
        margin: '0',
        maxHeight: '40px',
        '& > img': {
          margin: '0',
        },
        [theme.breakpoints.down('1280')]: {
          display: 'none',
        },
      },
      '& > button': {
        display: 'none',
        fontSize: '20px',
        padding: '0',
        minHeight: '40px',
        [theme.breakpoints.down('1280')]: {
          display: 'block',
        },
        '& > span:first-child': {
          display: 'flex',
          justifyContent: 'center',
          '& > svg': {
            fill: 'white',
          },
        },
      },
    },
    '& a': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textTransform: 'uppercase',
      color: 'rgb(113, 146, 176)',
      textDecoration: 'none',
      padding: '0 10px',
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 'bold',
      letterSpacing: '1px',
      minHeight: '40px',
      maxHeight: '40px',
      '& > svg': {
        marginLeft: '5px',
      },
      '&:hover': {
        color: 'white',
        textDecoration: 'none',
      },
    },
    '& > div:last-child': {
      minWidth: '100px',
      '& > a': {
        fontSize: '15px',
        color: 'white',
      }
    }
  },
  linkPanel: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '10px',
    width: '90%',
    [theme.breakpoints.down('1280')]: {
      display: 'none',
    },
    '& > span': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textTransform: 'uppercase',
      color: 'rgb(113, 146, 176)',
      padding: '0 10px',
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 'bold',
      letterSpacing: '1px',
      minHeight: '40px',
      maxHeight: '40px',
      cursor: 'pointer',
      '& > svg': {
        marginLeft: '5px',
        fill: 'rgb(113, 146, 176)',
      },
      '&:hover': {
        color: 'white',
        textDecoration: 'none',
        '& > svg': {
          fill: 'white',
        },
      },
    },
  },
  titlePanel: {
    display: 'none',
    [theme.breakpoints.down('1280')]: {
      display: 'flex',
      alignItems: 'center',
      '& > h3': {
        margin: '0',
        marginLeft: '8px',
        fontSize: '18px',
        lineHeight: '1.2',
        fontWeight: '700',
        color: 'rgb(246, 246, 246)'
      },
    },
  },
  subMenu: {
    paddingTop: '20px',
    position: 'absolute',
    top: '60px',
    display: 'none',
    textAlign: 'center',
    '& > div': {
      backgroundColor: 'rgb(15, 27, 39)',
      borderLeft: '1px solid rgb(29, 47, 65)',
      borderRight: '1px solid rgb(29, 47, 65)',
      borderTop: '1px solid rgb(29, 47, 65)',
      display: 'flex',
      width: '150px',
      flexDirection: 'column',
      justifyContent: 'center',
      '& > a': {
        textTransform: 'capitalize',
        margin: '0',
        padding: '10px',
        borderBottom: '1px solid rgb(29, 47, 65)',
        color: 'white',
        '&:hover': {
          backgroundColor: 'rgb(29, 47, 65)',
        },
      },
    },
  },
  drawer: {
    '& > .MuiBackdrop-root': {
      background: 'none',
    },
    '& > .MuiPaper-root': {
      width: '101%',
      top: '81px',
      '& > div': {
        padding: '0 30px',
        '& a': {
          width: '100%',
          display: 'flex',
          justifyContent: 'left',
          textTransform: 'capitalize',
          fontSize: '20px',
          margin: '0',
          padding: '16px',
          borderBottom: '1px solid rgb(29, 47, 65)',
          color: 'rgb(113, 146, 176)',
        },
      },
      '& .MuiAccordion-root': {
        width: '100%',
        boxShadow: 'none',
        background: 'transparent',
        borderBottom: '1px solid rgb(29, 47, 65)',
        fontSize: '20px',
        color: 'rgb(113, 146, 176)',
        '& a': {
          borderBottom: 'none',
        },
        '& .MuiAccordionDetails-root': {
          flexDirection: 'column',
          padding: '0 16px 16px',
        },
        '& .MuiAccordionSummary-content': {
          alignItems: 'center',
          color: 'rgb(113, 146, 176)',
          fontWeight: 'bold',
        },
        '& svg': {
          marginLeft: '5px',
          fontSize: '15px',
          fill: 'rgb(113, 146, 176)',
        },
        '& > .Mui-expanded': {
          minHeight: 'auto',
        },
        '& > .MuiAccordionSummary-root > .Mui-expanded': {
          margin: '12px 0',
        },
      },
    },
  },
});

export default styles;