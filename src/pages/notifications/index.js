
import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router';
import styles from './style';
import TopButtons from '../../components/TopButtons';
import BottomButtons from '../../components/BottomButtons';

const useStyles = makeStyles(styles);

const Notification = (props) => {
  const classes = useStyles();

  const { user, type, image } = props;
  return (
    <div className={classes.notification} style={{ backgroundColor: type === 0 ? 'black' : '#34be82' }}>
      <img src={'/images/' + image} alt="" />
      <h5>{user}</h5>
      <p>{type === 0 ? 'invited you to game.' : 'accepted your request.'}</p>
    </div>
  )
};

function NotificationsPage() {
  const classes = useStyles();
  const router = useRouter();

  const notifications = [
    {
      user_id: 'xxte345',
      type: 0,
      image: 'avatar1.png',
    },
    {
      user_id: 'yuyt332',
      type: 1,
      image: 'avatar2.png',
    },
    {
      user_id: 'asdk998',
      type: 0,
      image: 'avatar3.png',
    },
  ];

  return (
    <>
      <div className={classes.hero}>
        <TopButtons />
        <div className={classes.main}>
          <h3>Notifications</h3>
          {notifications.map((item, index) => (
            <Notification key={index} user={item.user_id} type={item.type} image={item.image} />
          ))}
        </div>
        <BottomButtons />
      </div>
    </>
  );
}

export default NotificationsPage;