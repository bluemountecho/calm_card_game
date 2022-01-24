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
        '& > div:not(div:last-child)': {
          position: 'relative',
          width: '700px',
          height: '30px',
          backgroundColor: 'white',
          borderRadius: '15px',
          '& > div': {
            position: 'absoulte',
            top: '0',
            left: '0',
            height: '30px',
            backgroundColor: '#FE41D1',
            borderRadius: '15px',
          },
          [theme.breakpoints.down('930')]: {
            width: '100%',
            height: '20px',
            borderRadius: '10px',
            '& > div': {
              height: '20px',
              borderRadius: '10px',
            },
          },
        },
        '& > div:last-child': {
          display: 'flex',
          '& > div': {
            width: '15%',
            maxWidth: '170px',
            marginRight: '3%',
            objectFit: 'contain',
            '& > p': {
              margin: '0',
              textAlign: 'center',
              fontSize: '24px',
              lineHeight: '1',
              color: 'white',
              whiteSpace: 'break-spaces',
            },
            [theme.breakpoints.down('930')]: {
              width: '20%',
              margin: '0',
              '& > p': {
                fontSize: '18px',
              },
            },
          },
          [theme.breakpoints.down('930')]: {
            justifyContent: 'space-between',
          },
        },
        '& > p': {
          margin: '0',
          padding: '15px 0',
          fontFamily: 'RajdhaniBold',
          fontSize: '36px',
          lineHeight: '1.1',
          color: 'white',
          [theme.breakpoints.down('930')]: {
            fontSize: '24px',
          },
        },
        '& > span': {
          display: 'block',
          padding: '10px 0 30px',
          fontFamily: 'RajdhaniBold',
          fontSize: '26px',
          lineHeight: '1',
          color: 'white',
          [theme.breakpoints.down('930')]: {
            fontSize: '18px',
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