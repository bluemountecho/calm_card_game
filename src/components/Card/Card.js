import React, {useState} from 'react';
import { Card, makeStyles, Tooltip } from '@material-ui/core'
import styles from './style'
import $ from "jquery"
import { LocalConvenienceStoreOutlined } from '@material-ui/icons';

const useStyles = makeStyles(styles);

export default (props) => {
    const classes = useStyles();

    function onClick(e) {
        var parentElem = $(e.target).closest('.b-game-card')

        $('*').removeClass('new-small-card')

        for (var length = 0; length < props.addedCards.length; length ++) {
            if (!props.addedCards[length].CardName) break
        }

        if (length == 7) return

        setTimeout(() => {
            $('#small_' + props.ID).addClass('new-small-card')
        }, 500)

        props.addedCards[length] = {
            AttackPoint: props.AttackPoint,
            CardID: props.CardID,
            CardName: props.CardName,
            CardShowType: props.CardShowType,
            DefensePoint: props.DefensePoint,
            Health: props.Health,
            Ability: props.Ability,
            ID: props.ID,
            Image: props.Image,
            ManaCost: props.ManaCost,
            Speed: props.Speed,
            Type: props.Type,
        }
        props.setAddedCards([...props.addedCards])
        $(parentElem).addClass('disabled-card')

        var effectElem = $(parentElem).clone()
        
        $(effectElem).find('.cover').append('<div class="explore-effect"></div>')
        
        var elem = $(effectElem).find('.explore-effect')

        $(effectElem).css('position', 'fixed')
        $(effectElem).css('left', $(parentElem)[0].offsetLeft)
        $(effectElem).css('top', $(parentElem)[0].offsetTop - window.scrollY)
        $(effectElem).css('width', $(parentElem)[0].offsetWidth)
        $(effectElem).css('height', $(parentElem)[0].offsetHeight)
        $(effectElem).css('perspective', 'initial')
        $(effectElem).css('padding-bottom', '0px')
        $(effectElem).css('z-index', '100000')
        $(effectElem).find('.cover').css('transform', '')
        $(effectElem).find('.explore-effect').css('opacity', '0')
        
        $(elem)
        .animate({ opacity: '0.9' }, 100, function () {
            var left = $('#small_' + props.ID)[0].offsetParent.offsetLeft + $('#small_' + props.ID)[0].offsetLeft
            var top = $('#small_' + props.ID)[0].offsetParent.offsetTop + $('#small_' + props.ID)[0].offsetTop

            $('body').append($(effectElem))
            $(effectElem).animate({
                opacity: '0',
                left: left + 'px',
                top: top + 'px'
            }, 500, function () {
                $(effectElem).remove()
            })
        })
        .animate({ opacity: '0' }, 500, function () {
            $(parentElem).addClass('disabled-card-opacity')
        })
    }

    function onClickSmall(e) {
        var i

        if (props.Type == 1) {
            var res = confirm('Do you want to restart selecting cards?')

            if (res) {
                props.setAddedCards([{},{},{},{},{},{},{}])
            }

            return
        }

        for (i = 0; i < props.addedCards.length; i ++) {
            if (props.addedCards[i].ID == props.ID) {
                break
            }
        }

        for ( ; i < props.addedCards.length - 1; i ++) {
            props.addedCards[i] = props.addedCards[i + 1]
        }

        props.addedCards[6] = {}

        props.setAddedCards([...props.addedCards])
        $('#Card_' + props.ID).removeClass('disabled-card')
        $('#Card_' + props.ID).removeClass('disabled-card-opacity')
    }

    function onMoveUpSmall(e) {
        var i

        for (i = 0; i < props.addedCards.length; i ++) {
            if (props.addedCards[i].ID == props.ID) {
                break
            }
        }

        var tmp = props.addedCards[i]

        props.addedCards[i] = props.addedCards[i - 1]
        props.addedCards[i - 1] = tmp

        props.setAddedCards([...props.addedCards])
    }

    function onMoveDownSmall(e) {
        var i

        for (i = 0; i < props.addedCards.length; i ++) {
            if (props.addedCards[i].ID == props.ID) {
                break
            }
        }

        var tmp = props.addedCards[i]

        props.addedCards[i] = props.addedCards[i + 1]
        props.addedCards[i + 1] = tmp

        props.setAddedCards([...props.addedCards])
    }

    const types = ['', 'Captain', 'Melee', 'Ranged', 'Magic']

    const CardDescription = () => {return (
        <div className={"tooltip-description deck-description card-type-" + props.Type}>
            <div className="tooltip-image"></div>
            <div className="tooltip-title">{props.CardName}</div>
            {props.Type != 1 &&
            <>
            Type: <jvalue>{types[props.Type]}</jvalue><br/>
            Health: <jvalue>{props.Health}</jvalue><br/>
            Attack: <jvalue>{props.AttackPoint}</jvalue><br/>
            Defense: <jvalue>{props.DefensePoint}</jvalue><br/>
            Speed: <jvalue>{props.Speed}</jvalue><br/></>}
            {props.Ability.map((ability, index) => {
                return (
                    <div className="ability-row">
                        <div className="ability-image" style={ability.image == '' ? {} : {backgroundImage: 'url(' + ability.image + ')'}}>{ability.text}</div>
                        <div className="ability-title">{ability.name}</div>
                        <div className="ability-description">{ability.description}</div>
                    </div>
                )
            })}
        </div>)}

    var name = ''

    if (props.Type == 2) {
        name = 'melee'
    } else if (props.Type == 3) {
        name = 'ranged'
    } else if (props.Type == 4) {
        name = 'magic'
    }

    if (props.addedCards) {
        for (var length = 0; length < props.addedCards.length; length ++) {
            if (!props.addedCards[length].CardName) break
        }
    
        for (var i = 0; i < length; i ++) {
            if (props.addedCards[i].ID == props.ID) break
        }
    }

    if (props.CardShowType == 'big') {
        return (
            <div id={"Card_" + props.ID} className={classes['b-game-card'] + ' b-game-card card-type-' + props.Type + (length != i ? ' disabled-card disabled-card-opacity' : '')} onClick={(e) => {onClick(e)}}>
                <div className='cover' style={{backgroundImage: 'url(' + props.Image  + ')'}}>
                    <div className="mana-box">{props.ManaCost}</div>
                    {props.Type != 1 &&
                    <>
                    <div className={"attack-box " + name}>{props.AttackPoint}</div>
                    <div className={"speed-box "}>{props.Speed}</div>
                    {props.DefensePoint != 0 &&
                    <div className={"defense-box "}>{props.DefensePoint}</div>}
                    <div className={"health-box "}>{props.Health}</div>
                    </>}
                    {props.Ability.length != 0 &&
                    <div className="ability-box">
                        <div>
                        {props.Ability.map((ability, index) => {
                            const AbilityDescription = () => {
                                return (
                                <div className={"tooltip-description card-type-" + props.Type}>
                                    <div className="tooltip-image" style={ability.image == '' ? {} : {backgroundImage: 'url(' + ability.image + ')'}}></div>
                                    <div className="tooltip-title">{ability.name}</div>
                                    {ability.description}
                                </div>)
                            }

                            return (
                                <Tooltip title={AbilityDescription()} placement="top">
                                    <div className="ability" style={ability.image == '' ? {} : {backgroundImage: 'url(' + ability.image + ')'}}>
                                        {ability.text}
                                    </div>
                                </Tooltip>
                            )
                        })}
                        </div>
                    </div>}
                </div>
            </div>
        );
    } else if (props.CardShowType == 'small') {
        var defaultText = 'Select Captain'

        if (props.Type != 1) {
            defaultText = props.CardID

            if (defaultText == 1) defaultText += 'st'
            else if (defaultText == 2) defaultText += 'nd'
            else if (defaultText == 3) defaultText += 'rd'
            else defaultText += 'th'

            defaultText = 'Select ' + defaultText + ' Monster'
        }

        if (props.ID) {
            return (
                <>
                    <Tooltip title={CardDescription()} placement="left">
                    <div id={"small_" + props.ID} className={classes.smallCard}>
                        <div className="CardRow">
                            <span className="overlay" style={{backgroundImage: 'url(' + props.Image + ')'}}></span>
                            <span className="cardRow-Cost">{props.ManaCost}</span>
                            <span className="cardRow-Name">{props.CardName}</span>
                            <div className="cardRow-fill"></div>
                            <div className="cardRow-cropImage" style={{backgroundImage: 'url(' + props.Image + ')'}}></div>
                            <div className="cardRow-cropMask"></div>
                            <span className="cardRow-Count "></span>
                            <div className="CardControls">
                                {props.Type != 1 && props.CardID != 1 &&
                                <div className="CardControlItem" onClick={(e) => onMoveUpSmall(e)}>
                                    <svg viewBox="0 0 490 490"><path d="M480.086,490L245,339.229L9.914,490L245,0L480.086,490z" fill="rgb(252, 209, 68)"/></svg>
                                </div>}
                                {props.Type != 1 && props.CardID != length - 1 &&
                                <div className="CardControlItem" onClick={(e) => onMoveDownSmall(e)}>
                                    <svg viewBox="0 0 490 490"><path d="M9.914,0L245,150.772L480.086,0L245,490L9.914,0z" fill="rgb(252, 209, 68)"/></svg>
                                </div>}
                                <div className="CardControlItem" onClick={(e) => onClickSmall(e)}>
                                    <svg viewBox="0 0 1200 1200"><path d="M0,264.84L335.16,600L0,935.16L264.84,1200L600,864.84L935.16,1200 L1200,935.16L864.84,600L1200,264.84L935.16,0L600,335.16L264.84,0L0,264.84z" fill="rgb(252, 209, 68)"/></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    </Tooltip>
                </>
            )
        } else {
            return (
                <>
                    <div id={"empty_" + props.CardID} className={classes.smallCard}>
                        <div className="CardRow">
                            <span className="overlay"></span>
                            <span className="cardRow-Cost"></span>
                            <span className="cardRow-Name">{defaultText}</span>
                            <div className="cardRow-fill"></div>
                            <div className="cardRow-cropImage"></div>
                            <div className="cardRow-cropMask"></div>
                            <span className="cardRow-Count "></span>
                        </div>
                    </div>
                </>
            )
        }
    } else if (props.CardShowType == 'captain' || props.CardShowType == 'monster') {
        return (
            <div id={"Card_" + props.ID + '_' + props.CardID} className={classes['b-game-card'] + ' b-game-card card-type-' + props.Type + (props.CardShowType == 'captain' ? ' captain-card' : ' monster-card')} style={props.CardShowType == 'monster' ? {display: 'none'} : {} }>
                <div className='cover' style={{backgroundImage: 'url(' + props.Image  + ')'}}>
                    <div className="mana-box">{props.ManaCost}</div>
                    {props.Type != 1 &&
                    <>
                    <div className={"attack-box " + name}>{props.AttackPoint}</div>
                    <div className={"speed-box "}>{props.Speed}</div>
                    {props.DefensePoint != 0 &&
                    <div className={"defense-box "}>{props.DefensePoint}</div>}
                    <div className={"health-box "}>{props.Health}</div>
                    </>}
                    {props.Ability.length != 0 &&
                    <div className="ability-box">
                        <div>
                        {props.Ability.map((ability, index) => {
                            const AbilityDescription = () => {
                                return (
                                <div className={"tooltip-description card-type-" + props.Type}>
                                    {/* <div className="tooltip-image" style={ability.image == '' ? {} : {backgroundImage: 'url(' + ability.image + ')'}}></div> */}
                                    <div className="tooltip-image" style={{backgroundImage: 'url(/images/deck/ability.png)'}}></div>
                                    <div className="tooltip-title">{ability.name}</div>
                                    {ability.description}
                                </div>)
                            }

                            return (
                                <Tooltip title={AbilityDescription()} placement="top">
                                    {/* <div className="ability" style={ability.image == '' ? {} : {backgroundImage: 'url(' + ability.image + ')'}}> */}
                                    <div className="ability" style={{backgroundImage: 'url(/images/deck/ability.png)'}}>
                                        {ability.text}
                                    </div>
                                </Tooltip>
                            )
                        })}
                        </div>
                    </div>}
                </div>
            </div>
        );
    }
};