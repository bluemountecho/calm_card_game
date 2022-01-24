import { makeStyles } from '@material-ui/core';
import React from 'react';
import styles from '../TopButtons/style';

const useStyles = makeStyles(styles);

export default function BottomButtons(props) {
  const classes = useStyles();

  return (
    <div className={classes.root} {...props}>
      <div>
        <img src="/images/button_user.png" alt="" />
      </div>
      <div>
        <img src="/images/button_tool.png" alt="" />
      </div>
      <div>
        <img src="/images/button_video.png" alt="" />
      </div>
      <div>
        <img src="/images/button_cup.png" alt="" />
      </div>
    </div>
  );
}