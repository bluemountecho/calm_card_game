import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core'
import styles from './style';
import $ from "jquery"

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

        $(parentElem).addClass(classes['disabled-card'])

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
            $(parentElem).addClass(classes['disabled-card-opacity'])
        })
    }

    function onClickPlaySmall(e) {
        var tmpInfo = props.playerInfo
        var i

        for (i = 0; i < tmpInfo.cardsDeck.length; i ++) {
            if (tmpInfo.cardsDeck[i] == props.TokenID) {
                break;
            }
        }

        for (; i < tmpInfo.cardsDeck.length; i ++) {
            tmpInfo.cardsDeck[i] = tmpInfo.cardsDeck[i + 1]
        }

        delete tmpInfo.cardsDeck[i]
        tmpInfo.cardsInHand.push(props.TokenID)

        props.setPlayerInfo(tmpInfo)
    }

    if (props.CardShowType == 'big') {
        return (
            <>
                <div id={"Card_" + props.TokenID} className={classes['b-game-card'] + ' b-game-card '} onClick={(e) => {onClick(e)}}>
                    <div className='cover' style={{backgroundImage: 'url(' + props.Card + ')'}}>
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
                IsNew: false
            }, props.CardID)
        }

        return (
            <>
                <div id={"small_" + props.CardName} className={classes.smallCard}>
                    <div className="CardRow">
                        <span className="overlay" style={{backgroundImage: 'url(' + props.Card + ')'}}></span>
                        <span className="cardRow-Cost">{props.ManaCost}</span>
                        <span className="cardRow-Name">{props.CardName}</span>
                        <div className="cardRow-fill"></div>
                        <div className="cardRow-cropImage" style={{backgroundImage: 'url(' + props.Card + ')'}}></div>
                        <div className="cardRow-cropMask"></div>
                        <span className="cardRow-Count "></span>
                        <div className="CardControls">
                            <div className="CardControlItem">
                                <svg viewBox="0 0 100 100"><path fill="rgb(252, 209, 68)" d="M59.86,30.23h.77q-.27,3.58-.41,5.88c-.1,1.53-.14,2.81-.14,3.84V80.32H64v7H36v-7h3.92V42.43L36,43.1V36.8ZM52,12.67a10.39,10.39,0,0,1,6.48,1.87A5.81,5.81,0,0,1,61,19.35q0,4-4.06,6.79A16.62,16.62,0,0,1,47.16,29a8.37,8.37,0,0,1-5.58-1.77,5.82,5.82,0,0,1-2.1-4.69c0-2.54,1.27-4.82,3.81-6.82A13.67,13.67,0,0,1,52,12.67Z"></path></svg>
                            </div>
                            <div className="CardControlItem">
                                <svg viewBox="0 0 100 100"><path fill="rgb(252, 209, 68)" d="M42.34,13H57.66V42.94h31v14h-31V87H42.34V56.94h-31v-14h31Z"></path></svg>
                            </div>
                            <div className="CardControlItem">
                                <svg viewBox="0 0 100 100"><rect x="13.37" y="43" width="73.27" height="14" fill="rgb(252, 209, 68)"></rect></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    } else if (props.CardShowType == 'play_small') {
        return (
            <>
                <div className={classes.smallCard} onClick={onClickPlaySmall()}>
                    <div className="CardRow">
                        <span className="overlay" style={{backgroundImage: 'url(' + props.Card + ')'}}></span>
                        <span className="cardRow-Cost">{props.ManaCost}</span>
                        <span className="cardRow-Name">{props.CardName}</span>
                        <div className="cardRow-fill"></div>
                        <div className="cardRow-cropImage" style={{backgroundImage: 'url(' + props.Card + ')'}}></div>
                        <div className="cardRow-cropMask"></div>
                        <span className="cardRow-Count "></span>
                    </div>
                </div>
            </>
        )
    }
};