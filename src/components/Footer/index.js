import { Container, makeStyles } from '@material-ui/core';
import React from 'react';
import styles from './style';
import Link from '../../Link';
import { FaTwitter, FaRedditAlien, FaFacebook, FaInstagram, FaDiscord, FaYoutube, FaTwitch } from 'react-icons/fa';

const useStyles = makeStyles(styles);

export default function Footer() {
  const classes = useStyles();

  return (
    <Container className={classes.root} maxWidth="xl">
      <div className={classes.info}>
        <p>2021 © Test. All Rights Reserved.</p>
      </div>
    </Container>
  );
}