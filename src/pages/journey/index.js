
import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import styles from './style';

const useStyles = makeStyles(styles);

function JourneyPage() {
  const classes = useStyles();
  const router = useRouter();

  return (
    <>
      <div className={classes.hero}>
        <div className={classes.arrow}>
          <BsArrowLeft />
        </div>
        <div className={classes.button_group}>
          <div className={classes.button} onClick={() => router.push('/play')}>
            <p>1</p>
            <span>Journey</span>
          </div>
          <div className={classes.button} onClick={() => router.push('/play')}>
            <p>2</p>
            <span>Journey</span>
          </div>
          <div className={classes.button} onClick={() => router.push('/play')}>
            <p>3</p>
            <span>Journey</span>
          </div>
          <div className={classes.button} onClick={() => router.push('/play')}>
            <img src="/images/backward.png" alt="" />
            <span>Previous</span>
          </div>
        </div>
        <div className={classes.arrow}>
          <BsArrowRight />
        </div>
      </div>
    </>
  );
}

export default JourneyPage;