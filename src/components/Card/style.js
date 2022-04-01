import { createStyles } from '@material-ui/styles'

const styles = createStyles({
    'b-game-card': {
        position: 'relative',
        zIndex: '1',
        width: '100%',
        paddingBottom: '150%',
        perspective: '1000px',
        transition: 'transform 0.35s',
        cursor: 'pointer',

        '&.card-type-1.active > .cover': {
            boxShadow: '0px 0px 12px 7px #f722ab',
            transition: 'none',
        },

        '&.card-type-2.active > .cover': {
            boxShadow: '0px 0px 12px 7px #6624c8',
            transition: 'none',
        },

        '&.card-type-3.active > .cover': {
            boxShadow: '0px 0px 12px 7px #368d4e',
            transition: 'none',
        },

        '&.card-type-4.active > .cover': {
            boxShadow: '0px 0px 12px 7px #1d69ef',
            transition: 'none',
        },

        '&.captain-card': {
            width: '11vw',
            maxWidth: 'calc(20vh - 27px)',
            height: '16vw',
            maxHeight: 'calc(30vh - 40px)',
            paddingBottom: '0px',
            margin: 'auto',
            pointerEvents: 'none',

            '& .ability': {
                pointerEvents: 'initial !important',
            },

            '&:hover': {
                transform: 'scale(1)',
                zIndex: 'initial',
            },

            '&:hover .cover': {
                boxShadow: '0px 0px 8px 8px #000000',
            }
        },

        '&.monster-card': {
            width: '11vw',
            maxWidth: 'calc(20vh - 27px)',
            height: '16vw',
            maxHeight: 'calc(30vh - 40px)',
            paddingBottom: '0px',
            margin: 'auto',
            transition: "none !important",
            pointerEvents: 'none',

            '& .ability': {
                pointerEvents: 'initial !important',
            },

            '&:hover': {
                transform: 'scale(1)',
                zIndex: 'initial',
            },

            '&:hover .cover': {
                boxShadow: '0px 0px 8px 8px #000000',
            }
        },

        '&.disabled-card': {
            pointerEvents: 'none'
        },

        '&.disabled-card-opacity': {
            opacity: '0.5'
        },

        '& .close-button': {
            background: "rgba(0, 0, 0, 0.8)",
            color: 'white',
            fontWeight: 'bolder',
            padding: '5px 10px',
            borderRadius: '30px',
            width: 'fit-content',
            zIndex: '4',
            position: 'absolute',
            right: '0px'
        },

        '& > .cover': {
            position: 'absolute',
            zIndex: '1',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            overflow: 'visible',
            backgroundImage: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
            backgroundSize: 'cover',
            boxShadow: '0px 0px 8px 8px #000000',
            perspectiveOrigin: '50% 50%',
            transformStyle: 'preserve-3d',
            transformOrigin: 'center',
            willChange: 'transform',
            transition: 'transform 0.5s, filter 0.35s',
            backgroundPosition: "center",
            borderRadius: "5%",

            '& > .explore-effect': {
                background: 'white',
                position: 'absolute',
                width: '100%',
                height: '100%',
                zIndex: '1000',
                opacity: 0,
                top: 0,
                left: 0,
                boxShadow: '0px 0px 15px 9px #ffffff',
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

            '&.card-type-1 > .cover': {
                boxShadow: '0px 0px 12px 7px #f722ab',
                transition: 'none',
            },

            '&.card-type-2 > .cover': {
                boxShadow: '0px 0px 12px 7px #6624c8',
                transition: 'none',
            },

            '&.card-type-3 > .cover': {
                boxShadow: '0px 0px 12px 7px #368d4e',
                transition: 'none',
            },

            '&.card-type-4 > .cover': {
                boxShadow: '0px 0px 12px 7px #1d69ef',
                transition: 'none',
            },

            '& .mana-box': {
                backgroundImage: 'url(/images/deck/mana_shine.png), url(/images/deck/mana.png)',
                backgroundSize: '40px 40px, 40px 40px',
            }
        },

        '& .mana-box': {
            position: 'absolute',
            left: '-15px',
            top: '-15px',
            backgroundImage: 'url(/images/deck/mana.png)',
            backgroundSize: '40px 40px',
            textAlign: 'center',
            width: '40px',
            height: '40px',
            color: "white",
            padding: '9px',
            fontSize: '25px',
            lineHeight: "25px",
            flexShrink: "0",
            textShadow: "#000 2px 0 0, #000 1.75517px 0.95885px 0, #000 1.0806px 1.68294px 0, #000 0.14147px 1.99499px 0, #000 -0.83229px 1.81859px 0, #000 -1.60229px 1.19694px 0, #000 -1.97998px 0.28224px 0, #000 -1.87291px -0.70157px 0, #000 -1.30729px -1.5136px 0, #000 -0.42159px -1.95506px 0, #000 0.56732px -1.91785px 0, #000 1.41734px -1.41108px 0, #000 1.92034px -0.55883px 0",
            fontWeight: "bolder",
        },

        '& .attack-box': {
            position: 'absolute',
            left: '-15px',
            top: 'calc(40% - 20px)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            textAlign: 'center',
            width: '40px',
            height: '40px',
            color: "white",
            padding: '10px',
            fontSize: '20px',
            lineHeight: "20px",
            flexShrink: "0",
            textShadow: "#000 2px 0 0, #000 1.75517px 0.95885px 0, #000 1.0806px 1.68294px 0, #000 0.14147px 1.99499px 0, #000 -0.83229px 1.81859px 0, #000 -1.60229px 1.19694px 0, #000 -1.97998px 0.28224px 0, #000 -1.87291px -0.70157px 0, #000 -1.30729px -1.5136px 0, #000 -0.42159px -1.95506px 0, #000 0.56732px -1.91785px 0, #000 1.41734px -1.41108px 0, #000 1.92034px -0.55883px 0",
            fontWeight: "bolder",
        },

        '& .attack-box.melee': {
            backgroundImage: 'url(/images/deck/melee-attack.png)',
        },

        '& .attack-box.ranged': {
            backgroundImage: 'url(/images/deck/ranged-attack.png)',
        },

        '& .attack-box.magic': {
            backgroundImage: 'url(/images/deck/magic-attack.png)',
        },

        '& .speed-box': {
            backgroundImage: 'url(/images/deck/speed.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            position: 'absolute',
            left: '-15px',
            top: 'calc(40% + 30px)',
            textAlign: 'center',
            width: '40px',
            height: '40px',
            color: "white",
            padding: '10px',
            fontSize: '20px',
            lineHeight: "20px",
            flexShrink: "0",
            textShadow: "#000 2px 0 0, #000 1.75517px 0.95885px 0, #000 1.0806px 1.68294px 0, #000 0.14147px 1.99499px 0, #000 -0.83229px 1.81859px 0, #000 -1.60229px 1.19694px 0, #000 -1.97998px 0.28224px 0, #000 -1.87291px -0.70157px 0, #000 -1.30729px -1.5136px 0, #000 -0.42159px -1.95506px 0, #000 0.56732px -1.91785px 0, #000 1.41734px -1.41108px 0, #000 1.92034px -0.55883px 0",
            fontWeight: "bolder",
        },

        '& .defense-box': {
            backgroundImage: 'url(/images/deck/defense.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            position: 'absolute',
            right: '-15px',
            top: 'calc(40% - 20px)',
            textAlign: 'center',
            width: '40px',
            height: '40px',
            color: "white",
            padding: '10px',
            fontSize: '20px',
            lineHeight: "20px",
            flexShrink: "0",
            textShadow: "#000 2px 0 0, #000 1.75517px 0.95885px 0, #000 1.0806px 1.68294px 0, #000 0.14147px 1.99499px 0, #000 -0.83229px 1.81859px 0, #000 -1.60229px 1.19694px 0, #000 -1.97998px 0.28224px 0, #000 -1.87291px -0.70157px 0, #000 -1.30729px -1.5136px 0, #000 -0.42159px -1.95506px 0, #000 0.56732px -1.91785px 0, #000 1.41734px -1.41108px 0, #000 1.92034px -0.55883px 0",
            fontWeight: "bolder",
        },

        '& .health-box': {
            backgroundImage: 'url(/images/deck/health.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            position: 'absolute',
            right: '-15px',
            top: 'calc(40% + 30px)',
            textAlign: 'center',
            width: '40px',
            height: '40px',
            color: "white",
            padding: '10px',
            fontSize: '20px',
            lineHeight: "20px",
            flexShrink: "0",
            textShadow: "#000 2px 0 0, #000 1.75517px 0.95885px 0, #000 1.0806px 1.68294px 0, #000 0.14147px 1.99499px 0, #000 -0.83229px 1.81859px 0, #000 -1.60229px 1.19694px 0, #000 -1.97998px 0.28224px 0, #000 -1.87291px -0.70157px 0, #000 -1.30729px -1.5136px 0, #000 -0.42159px -1.95506px 0, #000 0.56732px -1.91785px 0, #000 1.41734px -1.41108px 0, #000 1.92034px -0.55883px 0",
            fontWeight: "bolder",
        },

        '& .ability-box': {
            display: 'flex',
            position: 'absolute',
            left: '0px',
            bottom: '20%',
            width: '100%',
            textAlign: 'center',
            zIndex: '100',
            
            '& .ability': {
                zIndex: '100',
                display: 'inline-block',
                backgroundSize: 'cover',
                width: '40px',
                height: '40px',
                color: 'white',
                textShadow: "#000 2px 0 0, #000 1.75517px 0.95885px 0, #000 1.0806px 1.68294px 0, #000 0.14147px 1.99499px 0, #000 -0.83229px 1.81859px 0, #000 -1.60229px 1.19694px 0, #000 -1.97998px 0.28224px 0, #000 -1.87291px -0.70157px 0, #000 -1.30729px -1.5136px 0, #000 -0.42159px -1.95506px 0, #000 0.56732px -1.91785px 0, #000 1.41734px -1.41108px 0, #000 1.92034px -0.55883px 0",
                fontSize: '20px',
                padding: '8px 0px',
                textAlign: 'center',
                fontWeight: 'bolder',
                lineHeight: '20px',
                backgroundColor: 'white',
                borderRadius: '20px',
                margin: '0px 5px',
            },

            '& > div': {
                margin: 'auto',
                display: 'flex',
            },
        },

        '&.card-type-1 .ability': {
            border: '3px solid #f722ab',
        },

        '&.card-type-2 .ability': {
            border: '3px solid #6624c8',
        },

        '&.card-type-3 .ability': {
            border: '3px solid #368d4e',
        },

        '&.card-type-4 .ability': {
            border: '3px solid #1d69ef',
        },
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
            "width": "50px",
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