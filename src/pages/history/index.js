
import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router';
import styles from './style';
import TopButtons from '../../components/TopButtons';
import BottomButtons from '../../components/BottomButtons';

const useStyles = makeStyles(styles);

function HistoryPage() {
  const classes = useStyles();
  const router = useRouter();

  const playerInfo = {
    image: 'avatar_big.png',
    level: 2,
    name: 'Red Reaper',
    email: 'redreaper@gmail.com',
    days: 36,
    victories: 5689,
    losses: 254,
    badges: [ 'badge1.png', 'badge2.png', 'badge3.png', 'badge4.png' ],
  };

  return (
    <>
      <div className={classes.hero}>
        <TopButtons />
        <div className={classes.main}>
          <div>
            <img src={`images/${playerInfo.image}`} alt="" />
            <p>Lvl. {playerInfo.level}</p>
            <h3>{playerInfo.name}</h3>
            <p>{playerInfo.email}</p>
          </div>
          <div>
            <div>
              <div>
                <h3>{playerInfo.days}</h3>
                <p>Days Played</p>
              </div>
              <div>
                <h3>{playerInfo.victories}</h3>
                <p>Victories</p>
              </div>
              <div>
                <h3>{playerInfo.losses}</h3>
                <p>Losses</p>
              </div>
            </div>
            <p>Badges</p>
            <div>
              {playerInfo.badges.map((badge, i) => ( <img key={i} src={`images/${badge}`} alt="" /> ))}
            </div>
          </div>
        </div>
        <BottomButtons />
      </div>
    </>
  );
}

export default HistoryPage;