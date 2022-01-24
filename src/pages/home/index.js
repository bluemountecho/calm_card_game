
import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router';
import styles from './style';
import TopButtons from '../../components/TopButtons';
import BottomButtons from '../../components/BottomButtons';

const useStyles = makeStyles(styles);

function HomePage() {
  const classes = useStyles();
  const router = useRouter();

  return (
    <>
      <div className={classes.hero}>
        <TopButtons />
        <div className={classes.button} onClick={() => router.push('/bet')}>
          <p>Play</p>
        </div>
        <BottomButtons />
      </div>
    </>
  );
}

export default HomePage;