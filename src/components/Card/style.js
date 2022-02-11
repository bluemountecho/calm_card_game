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
    },

    'smallCard': {
        fontFamily: '"Belwe Bold" !important',
        borderRadius: '22px',
        zIndex: '2',

        '&.new-small-card': {
            animation: '$changeStyle 500ms ease'
        },

        '& .CardRow': {
            "lineHeight": "44px",
            "height": "44px",
            "flexShrink": "0",
            "textShadow": "#000 2px 0 0, #000 1.75517px 0.95885px 0, #000 1.0806px 1.68294px 0, #000 0.14147px 1.99499px 0, #000 -0.83229px 1.81859px 0, #000 -1.60229px 1.19694px 0, #000 -1.97998px 0.28224px 0, #000 -1.87291px -0.70157px 0, #000 -1.30729px -1.5136px 0, #000 -0.42159px -1.95506px 0, #000 0.56732px -1.91785px 0, #000 1.41734px -1.41108px 0, #000 1.92034px -0.55883px 0",
            "fontWeight": "400",
            "position": "relative",

            '&:hover': {
                '& .cardRow-Cost': {
                    background: 'url(/images/deck/card_list_hover_left.png) 0% 0% / 50px 44px, url(/images/deck/card_list_left.png) no-repeat'
                },

                '& .cardRow-Name': {
                    background: 'url(/images/deck/card_list_hover_middle.png) 0% 0% / 100% 44px, url(/images/deck/card_list_middle.png) 0% 0% / 100% 44px, no-repeat'
                },

                '& .cardRow-Count ': {
                    background: 'url(/images/deck/card_list_hover_right.png) 0% 0% / 50px 44px, url(/images/deck/card_list_right.png) no-repeat'
                },

                '& .CardControls': {
                    "opacity": "1",
                    "transform": "translate3d(0px, 0px, 0px)"
                }
            }
        },

        '& .cardRow-Cost': {
            zIndex: '2',
            fontFamily: '"Belwe Bold" !important',
            "position": "absolute",
            "top": "0px",
            "left": "0px",
            "fontSize": "26px",
            "textAlign": "center",
            "color": "white",
            "width": "50px",
            "background": "url(/images/deck/card_list_left.png) 0% 0% / 50px 44px no-repeat",
            "fontSize": "26px",
            "whiteSpace": "nowrap",
            "margin": "0px",
            "WebkitFontSmoothing": "antialiased",
            "textDecoration": "none",
            "pointerEvents": "none",
            "color": "white",
            "height": "44px"
        },

        '& .cardRow-Name': {
            zIndex: '2',
            fontFamily: '"Belwe Bold" !important',
            "textOverflow": "ellipsis",
            "position": "absolute",
            "width": "calc(100% - 100px)",
            "top": "0px",
            "left": "50px",
            "fontWeight": "200",
            "background": "url(/images/deck/card_list_middle.png) 0% 0% / 100% 44px no-repeat",
            "padding": "0px 0px 0px 10px",
            "fontSize": "18px",
            "whiteSpace": "nowrap",
            "margin": "0px",
            "WebkitFontSmoothing": "antialiased",
            "textDecoration": "none",
            "pointerEvents": "none",
            "color": "white",
            "height": "44px"
        },

        '& .cardRow-fill': {
            zIndex: '0',
            "position": "absolute",
            "width": "calc(100% - 50px)",
            "height": "100%",
            "top": "0px",
            "left": "30px",
            "backgroundColor": "rgb(41, 46, 60)"
        },

        '& .cardRow-cropImage': {
            "position": "absolute",
            "zIndex": "0",
            "top": "0px",
            "right": "30px",
            "width": "150px",
            "height": "100%",
            "backgroundPosition": "center center",
            "backgroundSize": "cover"
        },

        '& .cardRow-cropMask': {
            "position": "absolute",
            "zIndex": "1",
            "top": "0px",
            "right": "30px",
            "width": "150px",
            "height": "100%",
            "background": "url(/images/deck/card_list_mask.png) left center"
        },

        '& .cardRow-Count': {
            "position": "absolute",
            "color": "rgb(252, 209, 68)",
            "top": "0px",
            "right": "0px",
            "width": "50px",
            "textAlign": "right",
            "background": "url(/images/deck/card_list_right.png) 0% 0% / 50px 44px no-repeat",
            "padding": "0px 13px 0px 0px",
            zIndex: '5',
            right: '1px',
            "height": "44px"
        },

        '& .CardControls': {
            "width": "41%",
            "height": "calc(100% - 12px)",
            "right": "9%",
            "top": "0px",
            "bottom": "0px",
            "margin": "auto",
            "background": "rgba(0, 0, 0, 0.8)",
            "position": "absolute",
            "display": "flex",
            "justifyContent": "space-evenly",
            "WebkitBoxAlign": "center",
            "alignItems": "center",
            "borderLeft": "2px solid rgb(98, 98, 98)",
            "zIndex": "3",
            "transition": "all 0.085s ease-out 0s",
            "opacity": "0",
            "transform": "translate3d(150%, 0px, 0px)"
        },

        '& .CardControlItem': {
            "position": "relative",
            "height": "100%",
            "width": "33.33%",
            "textAlign": "center",
            "display": "flex",
            "WebkitBoxAlign": "center",
            "alignItems": "center",
            "WebkitBoxPack": "center",
            "justifyContent": "center",
            "cursor": "pointer",

            '&:nth-child(2)': {
                "borderLeft": "1px solid rgb(98, 98, 98)",
                "borderRight": "1px solid rgb(98, 98, 98)"
            }
        },

        '& svg': {
            width: "20px"
        }
    },

    '@keyframes changeStyle': {
        'from': {
            boxShadow: "none",
            background: "none"
        },
        '50%': {
            boxShadow: '0px 0px 7px 7px #ffffff',
            background: 'white'
        },
        'to': {
            boxShadow: "none",
            background: "none"
        }
    }
});

export default styles;