import { createStyles } from '@material-ui/styles'
import theme from '../../theme'

const styles = createStyles({
    'b-game-card': {
        position: 'relative',
        zIndex: '1',
        width: '100%',
        paddingBottom: '150%',
        perspective: '1000px',
        transition: 'transform 0.35s',
        cursor: 'pointer',

        '& > .cover': {
            position: 'absolute',
            zIndex: '1',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            backgroundImage: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
            backgroundSize: 'cover',
            boxShadow: '0px 0px 8px 1px #000000ad',
            perspectiveOrigin: '50% 50%',
            transformStyle: 'preserve-3d',
            transformOrigin: 'center',
            willChange: 'transform',
            transition: 'transform 0.5s, filter 0.35s',

            '& > .explore-effect': {
                background: 'white',
                position: 'absolute',
                width: '100%',
                height: '100%',
                zIndex: '3',
                opacity: 0
            },

            '& > .gloss': {
                position: 'absolute',
                pointerEvents: 'none',
                top: '0',
                left: '0',
                width: '20em',
                height: '20em',
                marginLeft: '-6em',
                marginTop: '-17em',
                background: 'radial-gradient(\
                    circle farthest-corner at 50% 50%,\
                    rgba(255, 255, 255, 0.7) 0%,\
                    rgba(255, 255, 255, 0.5) 33%,\
                    rgba(255, 255, 255, 0) 60%,\
                    rgba(255, 255, 255, 0) 100%\
                )',
                opacity: '0',
                willChange: 'transform',
                transition: 'opacity 0.21s ease-in-out',
            },

            '& > .description': {
                position: 'absolute',
                bottom: '0px',
                width: '100%',
                background: 'rgba(0, 0, 0, 0.7)',
                zIndex: 2,
                color: 'white',
                padding: '20px',
                pointerEvents: 'none',

                '& > jvalue': {
                    float: 'right',
                    color: 'white'
                },

                '& > h3': {
                    color: 'white',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    margin: '0px',
                }
            },
        },

        '&:hover': {
            transform: 'scale(1.1)',
            zIndex: '10',

            '& > .cover': {
                boxShadow: '0px 0px 12px 7px #ffffff',
                transition: 'none',

                gloss: {
                    opacity: 0.5,
                }
            }
        }
    },

    'disabled-card': {
        pointerEvents: 'none'
    },

    'disabled-card-opacity': {
        opacity: '0.7'
    }
});

export default styles;