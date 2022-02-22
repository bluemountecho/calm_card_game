import React, {useState} from 'react';
import { makeStyles, Tooltip } from '@material-ui/core'
import styles from './style'
import $ from "jquery"
import { LocalConvenienceStoreOutlined } from '@material-ui/icons';
import toastr from "toastr"

const useStyles = makeStyles(styles);

export default (props) => {
    const classes = useStyles();

    function onClick(e) {
        var elem = $(e.target)
        var parentElem = $(e.target).closest('.b-game-card')

        $('*').removeClass('new-small-card')

        if (props.addedCards.length == 40) return

        setTimeout(() => {
            $('#small_' + props.CardName).addClass('new-small-card')
        }, 500)

        props.SetAddedCards({
            Type: props.Type,
            Card: props.Card,
            CardName: props.CardName,
            AttackPoint: props.AttackPoint,
            DefensePoint: props.DefensePoint,
            ManaCost: props.ManaCost,
            IsNew: true,
            TokenID: props.TokenID
        })

        if (!$(e.target).hasClass('explore-effect')) {
            elem = $(e.target).find('.explore-effect')
        }

        $(parentElem).addClass('disabled-card')

        var effectElem = $(parentElem).clone()

        $(effectElem).css('position', 'fixed')
        $(effectElem).css('left', $(parentElem)[0].offsetLeft)
        $(effectElem).css('top', $(parentElem)[0].offsetTop - window.scrollY)
        $(effectElem).css('width', $(parentElem)[0].offsetWidth)
        $(effectElem).css('height', $(parentElem)[0].offsetHeight)
        $(effectElem).css('perspective', 'initial')
        $(effectElem).css('padding-bottom', '0px')
        $(effectElem).find('.cover').css('transform', '')
        $(effectElem).find('.explore-effect').css('opacity', '0.9')
        
        $(elem)
        .animate({ opacity: '0.9' }, 250, function () {
            var left = $('.deck-card-list-body')[0].offsetParent.offsetLeft
            var top = $('.deck-card-list-body')[0].offsetParent.offsetTop + 120

            $('body').append($(effectElem))
            $(effectElem).animate({
                opacity: '0',
                left: left + 'px',
                top: top + 'px'
            }, 250, function () {
                $(effectElem).remove()
            })
        })
        .animate({ opacity: '0' }, 250, function () {
            $(parentElem).addClass('disabled-card-opacity')
        })
    }

    function onClickPlaySmall(e) {
        if (props.isSelf == false) return
        var tmp = props.battleInfo[1][0] == props.playerInfo[0] ? props.battleInfo[1] : props.battleInfo[2]

        if (tmp[3].length) return
        if (props.playerInfo[4].length) return
        var tmpInfo = JSON.parse(JSON.stringify(props.playerInfo))
        var tmpArr = []
        var i

        if (tmpInfo[3].length == 8) return

        if (props.battleInfo.playerState == 1 && props.Type == "Monster") {
            var monsterCnt = 0

            for (var i = 0; i < props.playerInfo[5].length; i ++) {
                if ($('#DeckCard_' + props.playerInfo[5][i]).attr('card-type') == 'Monster') {
                    monsterCnt ++
                }
            }

            if (monsterCnt <= (5 - props.battleInfo.turn) * 2) {
                toastr.error('Please leave at least ' + ((5 - props.battleInfo.turn) * 2) + ' monster cards to deck!')
                return
            }
        }

        for (i = 0; i < tmpInfo[5].length; i ++) {
            if (tmpInfo[5][i] == props.TokenID) {
                break;
            }

            tmpArr.push(tmpInfo[5][i])
        }

        i ++

        for (; i < tmpInfo[5].length; i ++) {
            tmpArr.push(tmpInfo[5][i])
        }

        tmpInfo[5] = tmpArr
        tmpInfo[3].push(props.TokenID)
        props.setPlayerInfo(tmpInfo)
    }

    function onClickPlayBig(e) {
        var flag = true
        if ($(e.target).hasClass('close-button')) flag = false
        if (props.isSelf == false) return

        var tmp = props.battleInfo[1][0] == props.playerInfo[0] ? props.battleInfo[1] : props.battleInfo[2]

        if (tmp[4].length) return

        if (flag == false) {
            var tmpInfo = JSON.parse(JSON.stringify(props.playerInfo))
            var tmpArr = []
            var i

            for (i = 0; i < tmpInfo[3].length; i ++) {
                if (tmpInfo[3][i] == props.TokenID) {
                    break;
                }

                tmpArr.push(tmpInfo[3][i])
            }

            i ++

            for (; i < tmpInfo[3].length; i ++) {
                tmpArr.push(tmpInfo[3][i])
            }

            tmpInfo[3] = tmpArr
            tmpInfo[5].push(props.TokenID)
            props.setPlayerInfo(tmpInfo)
        } else {
            var tmpInfo = JSON.parse(JSON.stringify(props.playerInfo))
            var tmpArr = []
            var i

            if (props.playerInfo[3].length + props.playerInfo[4].length != 8 && tmp[3].length == 0) {
                toastr.error('Please select 8 cards to play!')
                return
            }

            if (props.battleInfo.playerState == 1) {
                var monsterCnt = 0

                for (var i = 0; i < props.playerInfo[3].length; i ++) {
                    if ($('#Card_' + props.playerInfo[3][i]).attr('card-type') == 'Monster') {
                        monsterCnt ++
                    }
                }

                monsterCnt += props.playerInfo[4].length

                if (monsterCnt < 2) {
                    toastr.error('Please select at least 2 monster cards to play!')
                    return
                }
            }

            if (!((props.playerInfo[4].length == 0 && props.Type == 'Monster') || (props.playerInfo[4].length == 1 && props.Type != 'Monster'))) {
                toastr.error('Please select one monster card first and then select one spell or equip card!')
                return
            }

            for (i = 0; i < tmpInfo[3].length; i ++) {
                if (tmpInfo[3][i] == props.TokenID) {
                    break;
                }

                tmpArr.push(tmpInfo[3][i])
            }

            i ++

            for (; i < tmpInfo[3].length; i ++) {
                tmpArr.push(tmpInfo[3][i])
            }

            tmpInfo[3] = tmpArr
            tmpInfo[4].push(props.TokenID)
            props.setPlayerInfo(tmpInfo)
        }
    }

    function onClickPlayReal(e) {
        if (props.isSelf == false) return
        if (!((props.playerInfo[4].length == 2 && props.Type != 'Monster') || (props.playerInfo[4].length == 1 && props.Type == 'Monster'))) return
        
        var tmp = props.battleInfo[1][0] == props.playerInfo[0] ? props.battleInfo[1] : props.battleInfo[2]

        if (tmp[4].length) return

        var tmpInfo = JSON.parse(JSON.stringify(props.playerInfo))
        var tmpArr = []
        var i

        for (i = 0; i < tmpInfo[4].length; i ++) {
            if (tmpInfo[4][i] == props.TokenID) {
                break;
            }

            tmpArr.push(tmpInfo[4][i])
        }

        i ++

        for (; i < tmpInfo[4].length; i ++) {
            tmpArr.push(tmpInfo[4][i])
        }

        tmpInfo[4] = tmpArr
        tmpInfo[3].push(props.TokenID)
        props.setPlayerInfo(tmpInfo)
    }

    function onClickSmall(e) {
        var tmpCards = []
        var i

        for (i = 0; i < props.addedCards.length; i ++) {
            if (props.addedCards[i].TokenID == props.TokenID) {
                break
            }
            
            tmpCards.push(props.addedCards[i])
        }

        i ++

        for ( ; i < props.addedCards.length; i ++) {
            tmpCards.push(props.addedCards[i])
        }

        props.setAddedCards(tmpCards)
        $('#Card_' + props.TokenID).removeClass('disabled-card')
        $('#Card_' + props.TokenID).removeClass('disabled-card-opacity')
    }

    const Description = () => {return (<><h3>{props.CardName}</h3> Type: <jvalue>{props.Type}</jvalue><br/> Attack: <jvalue>{props.AttackPoint}</jvalue><br/> Defense: <jvalue>{props.DefensePoint}</jvalue><br/> Mana: <jvalue>{props.ManaCost}</jvalue><br/></>)}

    if (props.CardShowType == 'big') {
        return (
            <>
                <div id={"Card_" + props.TokenID} className={classes['b-game-card'] + ' b-game-card '} onClick={(e) => {onClick(e)}}>
                    <div className='cover' style={{backgroundImage: 'url(/images/' + props.Card + ')'}}>
                        <div className='gloss'></div>
                        <div className="description">
                            <h3>{props.CardName}</h3>
                            Card Type: <jvalue>{props.Type}</jvalue><br/>
                            Attack Point: <jvalue>{props.AttackPoint}</jvalue><br/>
                            Defense Point: <jvalue>{props.DefensePoint}</jvalue><br/>
                            Mana Cost: <jvalue>{props.ManaCost}</jvalue><br/>
                        </div>
                        <div className="explore-effect"></div>
                    </div>
                </div>
            </>
        );
    } else if (props.CardShowType == 'small') {
        if (props.IsNew == true) {
            props.SetAddedCards({
                Type: props.Type,
                Card: props.Card,
                CardName: props.CardName,
                AttackPoint: props.AttackPoint,
                DefensePoint: props.DefensePoint,
                ManaCost: props.ManaCost,
                IsNew: false,
                TokenID: props.TokenID
            }, props.CardID)
        }

        return (
            <>
                <Tooltip title={Description()} placement="left">
                <div id={"small_" + props.CardName} className={classes.smallCard}>
                    <div className="CardRow">
                        <span className="overlay" style={{backgroundImage: 'url(/images/' + props.Card + ')'}}></span>
                        <span className="cardRow-Cost">{props.ManaCost}</span>
                        <span className="cardRow-Name">{props.CardName}</span>
                        <div className="cardRow-fill"></div>
                        <div className="cardRow-cropImage" style={{backgroundImage: 'url(/images/' + props.Card + ')'}}></div>
                        <div className="cardRow-cropMask"></div>
                        <span className="cardRow-Count "></span>
                        <div className="CardControls">
                            <div className="CardControlItem" onClick={(e) => onClickSmall(e)}>
                                <svg viewBox="0 0 100 100"><rect x="13.37" y="43" width="73.27" height="14" fill="rgb(252, 209, 68)"></rect></svg>
                            </div>
                        </div>
                    </div>
                </div>
                </Tooltip>
            </>
        )
    } else if (props.CardShowType == 'play_small') {
        return (
            <>
                <Tooltip title={Description()} placement="left">
                <div id={"DeckCard_" + props.TokenID} card-type={props.Type} className={classes.smallCard} onClick={(e) => onClickPlaySmall(e)}>
                    <div className="CardRow">
                        <span className="overlay" style={{backgroundImage: 'url(/images/' + props.Card + ')'}}></span>
                        <span className="cardRow-Cost">{props.ManaCost}</span>
                        <span className="cardRow-Name">{props.CardName}</span>
                        <div className="cardRow-fill"></div>
                        <div className="cardRow-cropImage" style={{backgroundImage: 'url(/images/' + props.Card + ')'}}></div>
                        <div className="cardRow-cropMask"></div>
                        <span className="cardRow-Count "></span>
                    </div>
                </div>
                </Tooltip>
            </>
        )
    } else if (props.CardShowType == 'play_big') {
        var tmp = props.battleInfo[1][0] == props.playerInfo[0] ? props.battleInfo[1] : props.battleInfo[2]
        
        return (
            <>
                <Tooltip title={Description()} placement="top">
                <div id={"Card_" + props.TokenID} card-type={props.Type} className={classes['b-game-card'] + ' b-game-card '} onClick={(e) => onClickPlayBig(e)}>
                    <div className='cover' style={{backgroundImage: 'url(/images/' + props.Card + ')'}}>
                        <div className='gloss'></div>
                        <div className="explore-effect"></div>
                        {props.playerInfo[4].length == 0 && props.isSelf == true && !tmp[3].length &&
                        <div className="close-button" onClick={(e) => onClickPlayBig(e)}>X</div>}
                    </div>
                </div>
                </Tooltip>
            </>
        );
    } else if (props.CardShowType == 'play_real') {
        return (
            <>
                <Tooltip title={Description()} placement="top">
                <div id={"Card_" + props.TokenID} className={classes['b-game-card'] + ' b-game-card '} onClick={(e) => onClickPlayReal(e)}>
                    <div className='cover' style={{backgroundImage: 'url(/images/' + props.Card + ')'}}>
                        <div className='gloss'></div>
                        <div className="explore-effect"></div>
                    </div>
                </div>
                </Tooltip>
            </>
        );
    } else if (props.CardShowType == 'history_card') {
        return (
            <>
                <Tooltip title={Description()} placement="top">
                <div id={"Card_" + props.TokenID} className={classes['b-game-card'] + ' b-game-card '}>
                    <div className='cover' style={{backgroundImage: 'url(/images/' + props.Card + ')'}}>
                        <div className='gloss'></div>
                        <div className="explore-effect"></div>
                    </div>
                </div>
                </Tooltip>
            </>
        );
    }
};