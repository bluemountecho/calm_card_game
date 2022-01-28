import React from 'react';
import { makeStyles } from '@material-ui/core'
import styles from './style';
import $ from "jquery"
import { ScatterPlot } from '@material-ui/icons';

const useStyles = makeStyles(styles);

export default (props) => {
    const classes = useStyles();

    function onClick(e) {
        var elem = $(e.target)
        var parentElem = $(e.target).closest('.b-game-card')

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
        .animate({ opacity: '0.9' }, 500, function () {
            var left = $('.deck-card-list-body')[0].offsetParent.offsetLeft
            var top = $('.deck-card-list-body')[0].offsetParent.offsetTop + 120

            console.log(left, top)

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
            $(parentElem).addClass(classes['disabled-card-opacity'])
        })
    }

    return (
        <>
            <div className={classes['b-game-card'] + ' b-game-card '} onClick={(e) => {onClick(e)}}>
                <div className='cover' style={{backgroundImage: 'url(/images/' + props.Card + '.png)'}}>
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
};