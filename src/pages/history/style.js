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
    backgroundImage: 'url("/images/back_player.png")',
    backgroundSize: 'cover',
    padding: '120px 0 40px',
    [theme.breakpoints.down('768')]: {
      backgroundPosition: '50%',
    },
  },
  main: {
    display: 'flex',
    width: '100%',
    padding: '50px 0',
    '& > div': {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      '&:first-child': {
        flexBasis: '30%',
        alignItems: 'center',
        '& > img': {
          width: '50%',
          maxWidth: '300px',
          border: '5px solid white',
          borderRadius: '50%',
        },
        '& > h3': {
          margin: '-10px 0 10px',
          fontFamily: 'RajdhaniBold',
          lineHeight: '1.2',
          fontSize: '64px',
          color: 'white',
          [theme.breakpoints.down('930')]: {
            fontSize: '42px',
          },
        },
        '& > p': {
          margin: '0',
          padding: '2px 30px',
          fontSize: '32px',
          color: 'white',
          backgroundColor: 'rgba(255,255,255,0.4)',
          borderRadius: '30px',
          '&:nth-child(2)': {
            fontFamily: 'RajdhaniBold',
            backgroundColor: 'orange',
            transform: 'translateY(-20px)',
          },
          [theme.breakpoints.down('930')]: {
            fontSize: '20px',
          },
        },
        [theme.breakpoints.down('1280')]: {
          marginBottom: '50px',
        },
      },
      '&:last-child': {
        flexBasis: '70%',
        '& > div': {
          display: 'flex',
          '& > div': {
            display: 'flex',
            padding: '0 20px',
            marginRight: '5%',
            minWidth: '25%',
            flexDirection: 'column',
            border: '3px solid white',
            borderRadius: '30px',
            '& > h3': {
              margin: '0',
              paddingTop: '20px',
              fontSize: '96px',
              fontWeight: 'normal',
              lineHeight: '1.1',
              color: 'white',
              [theme.breakpoints.down('930')]: {
                fontSize: '64px',
                paddingTop: '10px',
              },
              [theme.breakpoints.down('768')]: {
                fontSize: '48px',
              },
            },
            '& > p': {
              margin: '0',
              paddingBottom: '20px',
              fontFamily: 'RajdhaniBold',
              fontSize: '36px',
              lineHeight: '1.1',
              color: 'white',
              [theme.breakpoints.down('930')]: {
                fontSize: '24px',
                paddingBottom: '10px',
              },
              [theme.breakpoints.down('768')]: {
                fontSize: '20px',
              },
            },
            [theme.breakpoints.down('1280')]: {
              marginRight: '0',
              minWidth: '30%',
            },
            [theme.breakpoints.down('930')]: {
              padding: '0 10px',
              borderRadius: '20px',
              borderWidth: '2px',
            },
          },
          '& > img': {
            width: '10%',
            marginRight: '3%',
            objectFit: 'contain',
            [theme.breakpoints.down('930')]: {
              width: '15%',
            },
          },
          [theme.breakpoints.down('1280')]: {
            '&:first-child': {
              justifyContent: 'space-between',
            },
          },
        },
        '& > p': {
          fontFamily: 'RajdhaniBold',
          fontSize: '36px',
          lineHeight: '1.1',
          color: 'white',
          [theme.breakpoints.down('930')]: {
            fontSize: '24px',
          },
        },
      },
    },
    [theme.breakpoints.down('1280')]: {
      flexDirection: 'column',
      padding: '30px 30px 50px',
    },
  },
});

export default styles;