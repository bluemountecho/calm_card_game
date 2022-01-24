
import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router';
import styles from './style';
import TopButtons from '../../components/TopButtons';
import BottomButtons from '../../components/BottomButtons';

const useStyles = makeStyles(styles);

function AchievementsPage() {
  const classes = useStyles();
  const router = useRouter();

  const playerInfo = {
    image: 'avatar_big.png',
    level: 2,
    name: 'Red Reaper',
    email: 'redreaper@gmail.com',
    progress: 76,
    achievement_images: [ 'achievement1.png', 'achievement2.png', 'achievement3.png', 'achievement4.png' ],
    achievement_names: [ 'instant poison', 'frost damage', 'health restore', 'great fortune' ],
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
            <p>Progress</p>
            <div>
              <div style={{ width: playerInfo.progress + '%' }} />
            </div>
            <span>XP {playerInfo.progress}/100</span>
            <p>Achievements</p>
            <div>
              {playerInfo.achievement_images.map((achievement, i) => (
                <div key={i}>
                  <img src={`images/${achievement}`} alt="" width="100%" /> 
                  <p>{playerInfo.achievement_names[i].split(' ').join('\n')}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <BottomButtons />
      </div>
    </>
  );
}

export default AchievementsPage;