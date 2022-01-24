
import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router';
import styles from './style';
import TopButtons from '../../components/TopButtons';
import BottomButtons from '../../components/BottomButtons';

const useStyles = makeStyles(styles);

function PlayPage() {
  const classes = useStyles();
  const router = useRouter();

  return (
    <>
      <div className={classes.hero}>
        <TopButtons />
        <div className={classes.button_group} id="play_btns">
          <div id="play_btn" onClick={() => router.push('/startgame')}>
            <img src="/images/button_casual.png" alt="" />
            <p>Casual</p>
          </div>
          <div id="play_btn" onClick={() => router.push('/startgame')}>
            <img src="/images/button_competition.png" alt="" />
            <p>Competition</p>
          </div>
          <div id="play_btn" onClick={() => router.push('/startgame')}>
            <img src="/images/button_tournament.png" alt="" />
            <p>Tournament</p>
          </div>
        </div>
        <BottomButtons />
      </div>
    </>
  );
}

export default PlayPage;