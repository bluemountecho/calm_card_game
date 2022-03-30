
import React, {useEffect, useState} from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router';
import styles from './style';
import Card from '../../components/Card/Card'
import $ from 'jquery'
import axios from 'axios'
import { renderToString } from 'react-dom/server'

const useStyles = makeStyles(styles);

var battleInfo
var timeUnit = 300

function GameBoardPage(props) {
  const classes = useStyles();
  const router = useRouter();
  const {baseURL, socket} = props
  const [showVS, setShowVS] = useState(true)
  const [player1Info, setPlayer1Info] = useState([])
  const [player2Info, setPlayer2Info] = useState([])
  const [player1Name, setPlayer1Name] = useState('')
  const [player2Name, setPlayer2Name] = useState('')
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
  var cards, player1Deck, player2Deck, battleLog, stateLog, cardPos, player1Data = [], player2Data = []

  //base functions

  function getTransImageURL(url) {
    var arr = url.split('/')

    return '/images/cards/transImages/' + arr[arr.length - 1]
  }

  async function Animate(elem, data, time) {
    $(elem).animate(data, time)

    if (time.duration) await delay(time.duration)
    else await delay(time)

    $(elem).css('trans', 0)
  }

  async function activeCard(data, type = 'active_self') {
    var duration = timeUnit
    var elem = $('#Card_' + data.Self + '_' + data.Player)
    var newElem

    if (type == 'active_self') {
      newElem = $(renderToString(<img className="effect-image" src="/images/effects/active_card.gif" style={{width: $(elem)[0].offsetWidth, position: 'absolute', bottom: '0px', left: '0px', zIndex: '200'}} />))
    } else if (type == 'change_positive') {
      newElem = $(renderToString(<img className="effect-image" src="/images/effects/change_positive.gif" style={{width: $(elem)[0].offsetWidth, position: 'absolute', top: ($(elem)[0].offsetHeight - $(elem)[0].offsetWidth) / 2 + 'px', left: '0px', zIndex: '200'}} />))
    } else if (type == 'change_negative') {
      newElem = $(renderToString(<img className="effect-image" src="/images/effects/change_negative.gif" style={{width: $(elem)[0].offsetWidth, position: 'absolute', bottom: '0px', left: '0px', zIndex: '200'}} />))
    }

    $(elem).addClass('active')
    $(elem).append($(newElem))

    await Animate($(elem), {
      trans: 1,
    }, {
      step: function(now, fx) {
        $(this).css('transform','scale(' + (1 + 0.2 * now) + ')');  
      },
      duration: duration,
      easing: "linear",
    })

    await delay(timeUnit * 0.5)
  }

  async function inActiveCard(data) {
    var duration = timeUnit
    var elem = $('#Card_' + data.Self + '_' + data.Player)

    await Animate($(elem), {
      trans: 1,
    }, {
      step: function(now, fx) {
        $(this).css('transform','scale(' + (1 + 0.2 * (1 - now)) + ')');  
      },
      duration: duration,
      easing: "linear",
    })

    $(elem).find('.effect-image').remove()
    $(elem).css('transfom', 'scale(1)')
    $(elem).removeClass('active')

    await delay(timeUnit * 0.5)
  }

  async function activeAbility(data) {
    var duration = timeUnit * 0.6

    await Animate($('#Card_' + data.Self + '_' + data.Player + ' .ability')[data.AbilityIndex], {
      trans: 1,
    }, {
      step: function(now, fx) {
        $(this).css('box-shadow','0px 0px ' + (20 * now) +  'px ' + (20 * now) +  'px ' + $(this).css('border-color'));  
      },
      duration: duration,
      easing: "linear",
    })
  }

  async function inActiveAbility(data) {
    var duration = timeUnit * 0.6

    await Animate($('#Card_' + data.Self + '_' + data.Player + ' .ability')[data.AbilityIndex], {
      trans: 1,
    }, {
      step: function(now, fx) {
        $(this).css('box-shadow','0px 0px ' + (20 * (1 - now)) +  'px ' + (20 * (1 - now)) +  'px ' + $(this).css('border-color'));  
      },
      duration: duration,
      easing: "linear",
    })

    $($('#Card_' + data.Self + '_' + data.Player + ' .ability')[data.AbilityIndex]).css('box-shadow', '0px 0px 0px 0px #ffffff')
  }

  //animation functions

  async function vsAnimation() {
    await Animate($(".vs-div")[0], {
      top: '0px',
    }, timeUnit * 0.8)
    
    await Animate($(".vs-div")[0], {
      top: '-20vh',
    }, timeUnit * 0.2)

    await Animate($(".vs-div")[0], {
      top: '-10vh',
    }, timeUnit * 0.2)

    Animate($('.player1-vs')[0], {
      left: '-50px'
    }, timeUnit)

    await Animate($('.player2-vs')[0], {
      right: '-50px'
    }, timeUnit)

    Animate($('.player1-vs')[0], {
      left: '0px'
    }, timeUnit * 6)

    await Animate($('.player2-vs')[0], {
      right: '0px'
    }, timeUnit * 6)

    Animate($('.player1-vs')[0], {
      left: '-50vw'
    }, timeUnit)

    await Animate($('.player2-vs')[0], {
      right: '-50vw'
    }, timeUnit)

    setShowVS(false)

    await delay(timeUnit)
  }

  async function showRoundAnimation(idx) {
    var newElem = $(renderToString(<div style={{width: '100%', height: '200px', fontSize: '100px', fontFamily: 'Belwe Bold', fontWeight: 'bolder', color: 'white', position: 'fixed', left: '-100%', top: 'calc(50vh - 100px)', textAlign: 'center', zIndex: '300', WebkitTextStrokeWidth: '2px', WebkitTextStrokeColor: 'black'}}>Round {idx}</div>))

    $('#gameboard').append($(newElem))

    await delay(timeUnit)
    await Animate($(newElem), {
      left: '-10%'
    }, timeUnit * 2)
    await Animate($(newElem), {
      left: '10%'
    }, timeUnit * 4)    
    await Animate($(newElem), {
      left: '100%'
    }, timeUnit * 2)
    await delay(timeUnit)
  }

  async function appearAnimation(data) {
    const {Self, Player, Position} = data
    var elem = $('#Card_' + Self + '_' + Player)
    var duration = timeUnit * 0.5
    
    if (Position == 1) {
      await activeCard({
        Player: Player,
        Self: Player == 1 ? player1Data[0].card_id : player2Data[0].card_id
      })
      await inActiveCard({
        Player: Player,
        Self: Player == 1 ? player1Data[0].card_id : player2Data[0].card_id
      })
    }

    $(elem).css('position', 'absolute')
    $(elem).css('left', cardPos[Player][Position].left)
    $(elem).css('top', cardPos[Player][Position].top)
    $(elem).css('transform', 'scale(2)')
    $(elem).show()

    await Animate(elem, {
      trans: 1,
    }, {
      step: function(now, fx) {
        $(this).css('transform','scale(' + (1 + 1 * (1 - now)) + ')');  
      },
      duration: duration,
      easing: "linear",
    })

    if ((Player == 1 && Position == player1Data.length - 1) || (Player == 2 && Position == player2Data.length - 1)) {
      await delay(duration * 4)
    }

    $(elem).css('transform', 'scale(1)')
  }

  async function useAbilityAnimation(data) {
    await activeCard(data)
    await activeAbility(data)
    inActiveAbility(data)
    inActiveCard(data)
  }

  async function changeAttackAnimation(data) {
    var elem = $('#Card_' + data.Self + '_' + data.Player)
    var attackBox = $(elem).find('.attack-box')
    var color = data.Text < 0 ? 'red' : 'green'
    var newElem = $(renderToString(<div style={{width: '100px', height: '50px', fontSize: '30px', fontFamily: 'Belwe Bold', fontWeight: 'bolder', color: color, position: 'absolute', left: -50, top: $(attackBox)[0].offsetTop, textAlign: 'center', zIndex: '200', WebkitTextStrokeWidth: '1px', WebkitTextStrokeColor: 'white'}}>
      {data.Text}
    </div>))

    $('#Card_' + data.Self + '_' + data.Player).append($(newElem))

    if (data.Text > 0) {
      await activeCard(data, 'change_positive')
    } else {
      await activeCard(data, 'change_negative')
    }

    await Animate($(newElem), {
      top: '-=100px',
      fontSize: '50px',
      opacity: '0.2'
    }, timeUnit * 3)

    if (data.Text > 0) {
      $(attackBox).css('color', 'green')
    } else {
      $(attackBox).css('color', 'red')
    }

    await inActiveCard(data)

    $(newElem).remove()
  }

  async function changeSpeedAnimation(data) {
    var elem = $('#Card_' + data.Self + '_' + data.Player)
    var attackBox = $(elem).find('.speed-box')
    var color = data.Text < 0 ? 'red' : 'green'
    var newElem = $(renderToString(<div style={{width: '100px', height: '50px', fontSize: '30px', fontFamily: 'Belwe Bold', fontWeight: 'bolder', color: color, position: 'absolute', left: -50, top: $(attackBox)[0].offsetTop, textAlign: 'center', zIndex: '200', WebkitTextStrokeWidth: '1px', WebkitTextStrokeColor: 'white'}}>
      {data.Text}
    </div>))

    $('#Card_' + data.Self + '_' + data.Player).append($(newElem))

    if (data.Text > 0) {
      await activeCard(data, 'change_positive')
    } else {
      await activeCard(data, 'change_negative')
    }

    await Animate($(newElem), {
      top: '-=100px',
      fontSize: '50px',
      opacity: '0.2'
    }, timeUnit * 3)

    if (data.Text > 0) {
      $(attackBox).css('color', 'green')
    } else {
      $(attackBox).css('color', 'red')
    }

    await inActiveCard(data)

    $(newElem).remove()
  }

  async function changeHealthAnimation(data) {
    var elem = $('#Card_' + data.Self + '_' + data.Player)
    var attackBox = $(elem).find('.health-box')
    var color = data.Text < 0 ? 'red' : 'green'
    var newElem = $(renderToString(<div style={{width: '100px', height: '50px', fontSize: '30px', fontFamily: 'Belwe Bold', fontWeight: 'bolder', color: color, position: 'absolute', right: -50, top: $(attackBox)[0].offsetTop, textAlign: 'center', zIndex: '200', WebkitTextStrokeWidth: '1px', WebkitTextStrokeColor: 'white'}}>
      {data.Text}
    </div>))

    $('#Card_' + data.Self + '_' + data.Player).append($(newElem))

    if (!data.NotShowGif) {
      if (data.Text > 0) {
        await activeCard(data, 'change_positive')
      } else {
        await activeCard(data, 'change_negative')
      }
    }

    await Animate($(newElem), {
      top: '-=100px',
      fontSize: '50px',
      opacity: '0.2'
    }, timeUnit * 3)

    if (data.Text > 0) {
      $(attackBox).css('color', 'green')
    } else {
      $(attackBox).css('color', 'red')
    }
    
    if (!data.NotShowGif) {
      await inActiveCard(data)
    }

    $(newElem).remove()
  }

  async function changeDefenseAnimation(data) {
    var elem = $('#Card_' + data.Self + '_' + data.Player)
    var attackBox = $(elem).find('.defense-box')

    if ($(attackBox).length == 0) {
      await delay(timeUnit * 3)
      return
    }

    var color = data.Text < 0 ? 'red' : 'green'
    var newElem = $(renderToString(<div style={{width: '100px', height: '50px', fontSize: '30px', fontFamily: 'Belwe Bold', fontWeight: 'bolder', color: color, position: 'absolute', right: -50, top: $(attackBox)[0].offsetTop, textAlign: 'center', zIndex: '200', WebkitTextStrokeWidth: '1px', WebkitTextStrokeColor: 'white'}}>
      {data.Text}
    </div>))

    $('#Card_' + data.Self + '_' + data.Player).append($(newElem))

    if (!data.NotShowGif) {
      if (data.Text > 0) {
        await activeCard(data, 'change_positive')
      } else {
        await activeCard(data, 'change_negative')
      }
    }

    await Animate($(newElem), {
      top: '-=100px',
      fontSize: '50px',
      opacity: '0.2'
    }, timeUnit * 3)

    if (data.Text > 0) {
      $(attackBox).css('color', 'green')
    } else {
      $(attackBox).css('color', 'red')
    }
    
    if (!data.NotShowGif) {
      await inActiveCard(data)
    }

    $(newElem).remove()
  }

  async function meleeAttackAnimation(data) {
    var selfElem = $('#Card_' + data.SelfID + '_' + data.SelfPlayer)
    var targetElem = $('#Card_' + data.TargetID + '_' + data.TargetPlayer)
    var deg = 45

    if (cardPos[data.SelfPlayer][data.SelfPosition].left < cardPos[data.TargetPlayer][data.TargetPosition].left) deg = -45
    $(selfElem).css('z-index', '100')
    
    await activeCard({
      Self: data.SelfID,
      Player: data.SelfPlayer
    })
    await Animate(selfElem, {
      trans: 1,
    }, {
      step: function(now, fx) {
        $(this).css('transform','scale(1.2) rotate(' + (deg * now) + 'deg)');
      },
      duration: timeUnit * 2,
      easing: "linear",
    })
    await Animate(selfElem, {
      left: cardPos[data.TargetPlayer][data.TargetPosition].left,
      top: cardPos[data.TargetPlayer][data.TargetPosition].top,
      trans: 1,
    }, {
      step: function(now, fx) {
        if (fx.prop != 'trans') return
        $(this).css('transform','scale(1.2) rotate(' + (deg * (1 - now)) + 'deg)');
      },
      duration: timeUnit * 0.2,
      easing: "linear",
    })
    
    var newElem = $(renderToString(<img className="effect-image" src="/images/effects/melee_defense.gif" style={{width: $(targetElem)[0].offsetWidth, position: 'absolute', top: '0px', left: '0px', zIndex: '200'}} />))

    $(targetElem).append($(newElem))

    await Animate(selfElem, {
      left: cardPos[data.SelfPlayer][data.SelfPosition].left,
      top: cardPos[data.SelfPlayer][data.SelfPosition].top
    }, timeUnit * 0.2)
    await inActiveCard({
      Self: data.SelfID,
      Player: data.SelfPlayer
    })

    $(targetElem).find('.effect-image').remove()
    $(selfElem).css('z-index', '1')
  }

  async function rangedAttackAnimation(data) {
    var selfElem = $('#Card_' + data.SelfID + '_' + data.SelfPlayer)
    var targetElem = $('#Card_' + data.TargetID + '_' + data.TargetPlayer)
    var deg = 180 * Math.atan2(cardPos[data.SelfPlayer][data.SelfPosition].top - cardPos[data.TargetPlayer][data.TargetPosition].top, cardPos[data.SelfPlayer][data.SelfPosition].left - cardPos[data.TargetPlayer][data.TargetPosition].left) / Math.PI + 90
    var newElem = $(renderToString(<img className="effect-image" src="/images/effects/ranged_attack.gif" style={{width: $(targetElem)[0].offsetWidth, position: 'fixed', top: cardPos[data.SelfPlayer][data.SelfPosition].top + ($(selfElem)[0].offsetHeight - $(selfElem)[0].offsetWidth) / 2, left: cardPos[data.SelfPlayer][data.SelfPosition].left, zIndex: '200', transform: 'rotate(' + deg + 'deg)'}} />))

    $('#gameboard').append($(newElem))
    
    await activeCard({
      Self: data.SelfID,
      Player: data.SelfPlayer
    })
    await delay(timeUnit * 2)
    await Animate(newElem, {
      left: cardPos[data.TargetPlayer][data.TargetPosition].left,
      top: cardPos[data.TargetPlayer][data.TargetPosition].top + ($(selfElem)[0].offsetHeight - $(selfElem)[0].offsetWidth) / 2,
    }, timeUnit * 0.2)

    $(newElem).attr('src', '/images/effects/ranged_defense.gif')
    $(newElem).css('transform', 'rotate(' + (deg + 90) + 'deg)')
    setTimeout(() => {
      $(newElem).remove()
    }, 500)

    await inActiveCard({
      Self: data.SelfID,
      Player: data.SelfPlayer
    })
  }

  async function magicAttackAnimation(data) {
    console.log(timeUnit)
    var selfElem = $('#Card_' + data.SelfID + '_' + data.SelfPlayer)
    var targetElem = $('#Card_' + data.TargetID + '_' + data.TargetPlayer)
    var deg = 180 * Math.atan2(cardPos[data.SelfPlayer][data.SelfPosition].top - cardPos[data.TargetPlayer][data.TargetPosition].top, cardPos[data.SelfPlayer][data.SelfPosition].left - cardPos[data.TargetPlayer][data.TargetPosition].left) / Math.PI + 90
    var newElem = $(renderToString(<img className="effect-image" src="/images/effects/magic_attack.gif" style={{width: $(targetElem)[0].offsetWidth, position: 'fixed', top: cardPos[data.SelfPlayer][data.SelfPosition].top + ($(selfElem)[0].offsetHeight - $(selfElem)[0].offsetWidth) / 2, left: cardPos[data.SelfPlayer][data.SelfPosition].left, zIndex: '200', transform: 'rotate(' + deg + 'deg)'}} />))

    $('#gameboard').append($(newElem))
    
    await activeCard({
      Self: data.SelfID,
      Player: data.SelfPlayer
    })
    await delay(timeUnit * 2)
    await Animate(newElem, {
      left: cardPos[data.TargetPlayer][data.TargetPosition].left,
      top: cardPos[data.TargetPlayer][data.TargetPosition].top + ($(selfElem)[0].offsetHeight - $(selfElem)[0].offsetWidth) / 2,
    }, timeUnit * 0.2)

    $(newElem).attr('src', '/images/effects/magic_defense.gif')
    $(newElem).css('transform', 'none')
    setTimeout(() => {
      $(newElem).remove()
    }, 500)

    await inActiveCard({
      Self: data.SelfID,
      Player: data.SelfPlayer
    })
  }

  async function bloodAnimation(data) {
    var elem = $('#Card_' + data.Self + '_' + data.Player)
    var newElem = $(renderToString(<div style={{position: 'fixed', zIndex: '400', left: cardPos[data.Player][data.Position].left, top: cardPos[data.Player][data.Position].top, width: $(elem)[0].offsetWidth, height: $(elem)[0].offsetHeight, background: 'red', opacity: 0.3, boxShadow: '0px 0px 12px 12px red', borderRadius: '10px'}}></div>))
    var newElem1 = $(renderToString(<img style={{position: 'fixed', zIndex: '500', left: cardPos[data.Player][data.Position].left, top: cardPos[data.Player][data.Position].top, width: $(elem)[0].offsetWidth, height: $(elem)[0].offsetHeight, borderRadius: '10px'}} src="/images/effects/blood.gif" />))

    $('#gameboard').append(newElem)
    $('#gameboard').append(newElem1)
    await Animate($(newElem), {
      opacity: 0
    }, timeUnit * 0.7)
    await Animate($(newElem), {
      opacity: 0.3
    }, timeUnit * 0.7)
    await Animate($(newElem), {
      opacity: 0
    }, timeUnit * 0.7)
    $(newElem).remove()
    $(newElem1).remove()
  }

  async function missedAnimation(data) {
    var elem = $('#Card_' + data.Self + '_' + data.Player)
    var newElem = $(renderToString(<img style={{position: 'fixed', zIndex: '400', left: cardPos[data.Player][data.Position].left, top: cardPos[data.Player][data.Position].top, width: $(elem)[0].offsetWidth, height: $(elem)[0].offsetHeight}} src="/images/effects/missed.gif" />))
    var newElem1 = $(renderToString(<div style={{position: 'fixed', zIndex: '500', left: cardPos[data.Player][data.Position].left, top: cardPos[data.Player][data.Position].top + ($(elem)[0].offsetHeight / 2), width: $(elem)[0].offsetWidth, textAlign: 'center', color: 'white', WebkitTextStrokeWidth: '1px', WebkitTextStrokeColor: 'black', fontFamily: 'Belwe Bold', fontSize: '30px'}}>Miss</div>))

    $('#gameboard').append(newElem)
    $('#gameboard').append(newElem1)

    await Animate(newElem1, {
      top: '-=100px',
      opacity: '0',
      trans: 1,
    }, {
      step: function(now, fx) {
        if (fx.prop == 'trans') {
          $(this).css('transform','scale(' + (1 + now) + ')')
        }
      },
      duration: timeUnit * 3,
      easing: "linear",
    })

    $(newElem).remove()
    $(newElem1).remove()
  }

  async function dieAnimation(data) {
    var elem = $('#Card_' + data.Self + '_' + data.Player)
    var newElem = $(renderToString(<img style={{position: 'fixed', zIndex: '500', left: cardPos[data.Player][data.Position].left, top: cardPos[data.Player][data.Position].top + ($(elem)[0].offsetHeight - $(elem)[0].offsetWidth) / 2, width: $(elem)[0].offsetWidth}} src="/images/effects/die.gif" />))

    await Animate(elem, {
      trans: 1,
    }, {
      step: function(now, fx) {
        $(this).css('transform','scale(' + (1 - now) + ')')
      },
      duration: timeUnit * 0.4,
      easing: "linear",
    })
    
    $('#gameboard').append(newElem)

    await delay(timeUnit)

    $(newElem).remove()
  }

  async function moveOne(data) {
    var elem = $('#Card_' + data.Self + '_' + data.Player)

    await Animate(elem, {
      left: cardPos[data.TargetPlayer][data.TargetPosition].left,
      top: cardPos[data.TargetPlayer][data.TargetPosition].top
    }, timeUnit)
  }

  async function removeAnimation(data) {
    return
    var playerInfo = data.Player == 1 ? player1Data : player2Data
    
    for (var i = data.Position + 1; i < playerInfo.length; i ++) {
      moveOne({
        Self: player1Data[i].card_id,
        Player: data.Player,
        TargetPlayer: data.Player,
        TargetPosition: i - 1
      })
    }

    await delay(timeUnit)
  }

  async function winnerAnimation(data) {
    var name = (await axios.get(baseURL + '/getPlayerName/' + data.Address)).data
    var newElem = $(renderToString(<div className={classes.vsDiv} style={{backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
      {data.Player == 1 &&
      <div className='player1-vs' style={player1Data.length ? {backgroundImage: 'url(' + getTransImageURL(player1Data[0].image) + ')', left: '25vw !important'} : {}}><span className="fire">"{name}" won!<p>"{name}" will receive GNLR token in 5 minutes.<br/>{name}! Please check your wallet.</p></span></div>}
      {data.Player == 2 &&
      <div className='player1-vs' style={player2Data.length ? {backgroundImage: 'url(' + getTransImageURL(player2Data[0].image) + ')', left: '25vw !important'} : {}}><span className="fire">"{name}" won!<p>"{name}" will receive GNLR token in 5 minutes.<br/>{name}! Please check your wallet.</p></span></div>}
    </div>))

    $('#gameboard').append(newElem)

    await delay(3000)
  }

  async function roundAnimation(roundIndex) {
    if (roundIndex > 0) {
      await showRoundAnimation(roundIndex)
    }

    for (var i = 0; i < battleLog[roundIndex].length; i ++) {
      for (var j = 0; j < battleLog[roundIndex][i].length; j ++) {
        var data = battleLog[roundIndex][i][j]
        var func = null

        if (data.Type == 'Appear') {
          func = appearAnimation
        } else if (data.Type == 'UseAbility') {
          func = useAbilityAnimation
        } else if (data.Type == 'ChangeAttack') {
          func = changeAttackAnimation
        } else if (data.Type == 'ChangeSpeed') {
          func = changeSpeedAnimation
        } else if (data.Type == 'ChangeHealth') {
          func = changeHealthAnimation
        } else if (data.Type == 'ChangeDefense') {
          func = changeDefenseAnimation
        } else if (data.Type == 'MeleeAttack') {
          func = meleeAttackAnimation
        } else if (data.Type == 'RangedAttack') {
          func = rangedAttackAnimation
        } else if (data.Type == 'MagicAttack') {
          func = magicAttackAnimation
        } else if (data.Type == 'Blood') {
          func = bloodAnimation
        } else if (data.Type == 'Die') {
          func = dieAnimation
        } else if (data.Type == 'Remove') {
          func = removeAnimation
        } else if (data.Type == 'Missed') {
          func = missedAnimation
        } else if (data.Type == 'Winner') {
          func = winnerAnimation
        }

        if (func != null) {
          if (j == battleLog[roundIndex][i].length - 1) {
            await func(data)
          } else {
            func(data)
          }
        }
      }

      for (var j = 0; j < stateLog[roundIndex][i].length; j ++) {
        var data = stateLog[roundIndex][i][j]
        var playerInfo

        if (data.Player == 1) {
          playerInfo = player1Data
        } else {
          playerInfo = player2Data
        }

        if (data.Type == 'remove') {
          playerInfo.splice(data.Position, 1)
        } else {
          playerInfo[data.Position][data.Type] = data.Value
        }

        if (data.Player == 1) {
          setPlayer1Info([...playerInfo])
        } else {
          setPlayer2Info([...playerInfo])
        }

        $('.monster-card').css('transform', 'scale(1)')
      }
      
      await delay(timeUnit)

      if (battleLog[roundIndex][i].length == 0) {
        await delay(timeUnit)
      }
    }

    await delay(timeUnit * 2)
  }

  //main functions

  async function init() {
    var name = (await axios.get(baseURL + '/getPlayerName/' + battleInfo.player1Address)).data

    setPlayer1Name(name)
    name = (await axios.get(baseURL + '/getPlayerName/' + battleInfo.player2Address)).data
    setPlayer2Name(name)

    cards = JSON.parse(battleInfo.cards)
    player1Deck = JSON.parse(battleInfo.player1Deck)
    player2Deck = JSON.parse(battleInfo.player2Deck)
    battleLog = JSON.parse(battleInfo.battleLog)
    stateLog = JSON.parse(battleInfo.stateLog)

    console.log(battleLog)

    for (var i = 0; i < player1Deck.length; i ++) {
      player1Data.push({...cards[player1Deck[i]]})
    }

    for (var i = 0; i < player2Deck.length; i ++) {
      player2Data.push({...cards[player2Deck[i]]})
    }

    setPlayer1Info([...player1Data])
    setPlayer2Info([...player2Data])

    function initCardPos() {
      var cardWidth = $('#Card_' + cards[player1Deck[0]].card_id + '_1')[0].offsetWidth
      var cardHeight = $('#Card_' + cards[player1Deck[0]].card_id + '_1')[0].offsetHeight

      cardPos = []

      for (var i = 1; i <= 2; i ++) {
        if (!cardPos[i]) cardPos[i] = []

        for (var j = 1; j <= 6; j ++) {
          var elem = $('#pos_' + i + '_' + j)

          cardPos[i][j] = {
            left: $(elem)[0].offsetLeft + $(elem).parent()[0].offsetLeft + ($(elem)[0].offsetWidth - cardWidth) / 2,
            top: $(elem)[0].offsetTop + $(elem).parent()[0].offsetTop + ($(elem)[0].offsetHeight - cardHeight) / 2,
          }
        }
      }
    }

    initCardPos()

    $(window).resize(function() {
      initCardPos()
    })
  }

  useEffect(async () => {
    battleInfo = (await axios.post(baseURL + '/getBattleHistory', {
      battleID: window.location.search.substring(8)
    })).data

    if (battleInfo == 'failed') {
      router.push('/signin')
      return
    }

    await init()
    await vsAnimation()
    await roundAnimation(0)

    var round = 1

    while (true) {
      if (!battleLog[round]) break

      await roundAnimation(round ++)
    }

    router.push('/startgame')
  }, [])

  function speedDown() {
    if (timeUnit == 500) return

    timeUnit += 100
  }

  function speedUp() {
    if (timeUnit == 100) return

    timeUnit -= 100
  }

  return (
    <>
      <div className={classes.hero} id="gameboard">
        <div className="cards-row">
          <div className="cards-side">
            {player1Info.length != 0 &&
            <>
              <Card
                CardShowType="captain"
                Type={player1Info[0].type}
                Image={player1Info[0].image}
                CardName={player1Info[0].name}
                AttackPoint={player1Info[0].attack}
                DefensePoint={player1Info[0].defense}
                ManaCost={player1Info[0].mana}
                Speed={player1Info[0].speed}
                Health={player1Info[0].health}
                Ability={player1Info[0].ability}
                CardID={1}
                ID={player1Info[0].card_id}
              />
              <label className="fire" style={{bottom: '-80px'}}>{player1Name}</label>
            </>}
          </div>
          <div className="cards-pos">
          {[2,3,4,5,6].map((value, index) => {
            return <>
              <div className="monster-div has-border" id={"pos_1_" + value}><label>{}</label></div>
            </>
          })}
          </div>
          <div className="cards-side">
            <div className="speed-div">
              <button onClick={speedDown}>{">"}</button>
              <button onClick={speedUp}>{">>"}</button>
            </div>
          </div>
        </div>
        <div className="cards-row">
          <div className="cards-side"></div>
          <div className="cards-pos">
          {[0,1,0,1,0].map((value, index) => {
            return <>
              <div className={"monster-div" + (value ? (index == 1 ? " has-border" : " has-border-1") : "")} id={index < 2 ? "pos_1_" + value : "pos_2_" + value}><label>{}</label></div>
            </>
          })}
          </div>
          <div className="cards-side"></div>
        </div>
        <div className="cards-row">
          <div className="cards-side"></div>
          <div className="cards-pos">
          {[6,5,4,3,2].map((value, index) => {
            return <>
              <div className="monster-div has-border-1" id={"pos_2_" + value}><label>{}</label></div>
            </>
          })}
          </div>
          <div className="cards-side" style={{alignItems: 'flex-end'}}>
          {player2Info.length != 0 &&
          <>
            <label className="fire" style={{top: '-60px'}}>{player2Name}</label>
            <Card
              CardShowType="captain"
              Type={player2Info[0].type}
              Image={player2Info[0].image}
              CardName={player2Info[0].name}
              AttackPoint={player2Info[0].attack}
              DefensePoint={player2Info[0].defense}
              ManaCost={player2Info[0].mana}
              Speed={player2Info[0].speed}
              Health={player2Info[0].health}
              Ability={player2Info[0].ability}
              CardID={2}
              ID={player2Info[0].card_id}
            />
          </>}
          </div>
        </div>
        {player1Info.map((card, index) => {
          if (index > 0) {
            return <Card
              CardShowType="monster"
              Type={card.type}
              Image={card.image}
              CardName={card.name}
              AttackPoint={card.attack}
              DefensePoint={card.defense}
              ManaCost={card.mana}
              Speed={card.speed}
              Health={card.health}
              Ability={card.ability}
              CardID={1}
              ID={card.card_id}
            />
          }
        })}
        {player2Info.map((card, index) => {
          if (index > 0) {
            return <Card
              CardShowType="monster"
              Type={card.type}
              Image={card.image}
              CardName={card.name}
              AttackPoint={card.attack}
              DefensePoint={card.defense}
              ManaCost={card.mana}
              Speed={card.speed}
              Health={card.health}
              Ability={card.ability}
              CardID={2}
              ID={card.card_id}
            />
          }
        })}
      </div>
      {showVS == true &&
      <div className={classes.vsDiv} id="vsDiv">
        <div className='player1-vs' style={player1Info.length ? {backgroundImage: 'url(' + getTransImageURL(player1Info[0].image) + ')'} : {}}><span className="fire">{player1Name}</span></div>
        <div className='vs-div'></div>
        <div className='player2-vs' style={player2Info.length ? {backgroundImage: 'url(' + getTransImageURL(player2Info[0].image) + ')'} : {}}><span className="fire">{player2Name}</span></div>
      </div>}
    </>
  )
}

export default GameBoardPage;