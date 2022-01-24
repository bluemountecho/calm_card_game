import React from 'react';
import { makeStyles } from '@material-ui/core'
import styles from './style';
import $ from "jquery"

const useStyles = makeStyles(styles);

export default (props) => {
    const classes = useStyles();

    function onClick(e) {
        $(e.target)
        .animate({ opacity: '0.9' }, 500)
        .animate({ opacity: '0' }, 500)
    }

    return (
        <>
            <div className={classes['b-game-card'] + ' b-game-card'} onClick={(e) => {onClick(e)}}>
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