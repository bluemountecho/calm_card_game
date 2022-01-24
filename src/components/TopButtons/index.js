import { makeStyles } from '@material-ui/core';
import React from 'react';
import { useRouter } from 'next/router';
import styles from './style';

const useStyles = makeStyles(styles);

export default function TopButtons(props) {
  const classes = useStyles();
  const router = useRouter();

  return (
    <div className={classes.root} {...props}>
      <div>
        <img src="/images/button_setting.png" alt="" />
      </div>
      <div>
        <img src="/images/button_mail.png" alt="" />
      </div>
      <div onClick={() => router.push('/notifications')}>
        <span>23</span>
        <img src="/images/button_alarm.png" alt="" />
      </div>
    </div>
  );
}