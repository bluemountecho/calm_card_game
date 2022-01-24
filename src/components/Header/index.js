
import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Link from '../../Link';
import styles from './style';
import { FaCaretDown, FaCaretUp, FaBars, FaTimes } from 'react-icons/fa';

import { Box, Drawer, Button, List, ListItem, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';

const useStyles = makeStyles(styles);

export default function Header() {
  const classes = useStyles();

  const [subMenu, setSubMenu] = React.useState('');

  React.useEffect(() => {
    ['play', 'profile', 'tutorial', 'settings'].forEach(type => {
      const menu = document.getElementById(type);
      menu.style.display = "none";
    })
    if(subMenu) {
      const element = [...document.getElementsByTagName('span')].filter(val => val.textContent.toLowerCase().includes(subMenu))[0];
      const menu = document.getElementById(subMenu);
      menu.style.left = element.offsetLeft  - (150 - element.clientWidth) / 2 + 'px';
      menu.style.display = "flex";

      element.childNodes[1].style.display = 'none';
      element.childNodes[2].style.display = 'block';
    } else {
      const els = [...document.getElementsByTagName('span')].filter(el => el.children.length === 2);
      els.forEach(el => {
        el.children[0].style.display = 'block';
        el.children[1].style.display = 'none';
      });
    }
  }, [ subMenu ])

  const [show, setShow] = React.useState(false);

  const openDrawer = () => {
    setShow(!show);
    document.body.style.overflow = 'auto';
    const el = document.getElementById('drawer_btn');
    el.childNodes[0].childNodes[0].style.display = show ? 'block' : 'none';
    el.childNodes[0].childNodes[1].style.display = show ? 'none' : 'block';
  }

  const list = () => (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        background: 'rgb(15, 27, 39)',
      }}
      role="presentation"
    >
      <List>
        <ListItem>
          <Accordion>
            <AccordionSummary>
              Play <FaCaretDown/>
            </AccordionSummary>
            <AccordionDetails>
              <Link href="#">Casual Mode</Link>
              <Link href="#">Competitive Mode</Link>
              <Link href="#">Tournaments</Link>
            </AccordionDetails>
          </Accordion>
        </ListItem>
        <ListItem>
          <Link href="/notifications" >Notifications</Link>
        </ListItem>
        <ListItem>
          <Link href="/leaderboard" >Leaderboard</Link>
        </ListItem>
        <ListItem>
          <Accordion>
            <AccordionSummary>
              My Profile <FaCaretDown/>
            </AccordionSummary>
            <AccordionDetails>
              <Link href="#">Quests</Link>
              <Link href="/history">Match History</Link>
              <Link href="/achievements">Achievements</Link>
              <Link href="#">My Cards</Link>
            </AccordionDetails>
          </Accordion>
        </ListItem>
        <ListItem>
          <Link href="#" >Deck Builder Menu</Link>
        </ListItem>
        <ListItem>
          <Accordion>
            <AccordionSummary>
              Tutorial Menu <FaCaretDown/>
            </AccordionSummary>
            <AccordionDetails>
              <Link href="#">FAQ</Link>
              <Link href="#">Tutorials</Link>
            </AccordionDetails>
          </Accordion>
        </ListItem>
        <ListItem>
          <Link href="#" >Contact Us</Link>
        </ListItem>
        <ListItem>
          <Accordion>
            <AccordionSummary>
              Settings <FaCaretDown/>
            </AccordionSummary>
            <AccordionDetails>
              <Link href="#">Update Preferences</Link>
            </AccordionDetails>
          </Accordion>
        </ListItem>
        <ListItem>
          <Link href="#" >Legal(TOS & Privacy Policy)</Link>
        </ListItem>
        <ListItem>
          <Link href="#" >Credits</Link>
        </ListItem>
      </List>
    </Box>
  )

  return (
    <Container className={classes.root} maxWidth="xl">
      <div>
        <Link href="/">
          <img src="/images/logo.png" alt="Logo" width="40px" />
        </Link>
        <Button onClick={() => openDrawer()} id="drawer_btn">
          <FaBars />
          <FaTimes style={{display: 'none'}} />
        </Button>
        <Drawer 
          className={classes.drawer}
          open={show}
          onClose={() => setShow(false)}
          variant="persistent"
        >
          {list()}
        </Drawer>
        <div className={classes.linkPanel} onMouseLeave={() => setSubMenu('')}>
          <span onMouseEnter={() => setSubMenu('play')}>Play<FaCaretDown /><FaCaretUp /></span>
          <Link href="/notifications" onMouseEnter={() => setSubMenu('')}>Notifications</Link>
          <Link href="/leaderboard" onMouseEnter={() => setSubMenu('')}>Leaderboard</Link>
          <span onMouseEnter={() => setSubMenu('profile')}>My Profile<FaCaretDown /><FaCaretUp /></span>
          <Link href="#" onMouseEnter={() => setSubMenu('')}>Deck Builder Menu</Link>
          <span onMouseEnter={() => setSubMenu('tutorial')}>Tutorial Menu<FaCaretDown /><FaCaretUp /></span>
          <Link href="#" onMouseEnter={() => setSubMenu('')}>Contact Us</Link>
          <span onMouseEnter={() => setSubMenu('settings')}>Settings<FaCaretDown /><FaCaretUp /></span>
          <Link href="#" onMouseEnter={() => setSubMenu('')}>Legal(TOS & Privacy Policy)</Link>
          <Link href="#" onMouseEnter={() => setSubMenu('')}>Credits</Link>
        </div>
        <div className={classes.subMenu} id="play" onMouseEnter={() => setSubMenu('play')}  onMouseLeave={() => setSubMenu('')}>
          <div>
            <Link href="#">Casual Mode</Link>
            <Link href="#">Competitive Mode</Link>
            <Link href="#">Tournaments</Link>
          </div>
        </div>
        <div className={classes.subMenu} id="profile" onMouseEnter={() => setSubMenu('profile')}  onMouseLeave={() => setSubMenu('')}>
          <div>
            <Link href="#">Quests</Link>
            <Link href="/history">Match History</Link>
            <Link href="/achievements">Achievements</Link>
            <Link href="#">My Cards</Link>
          </div>
        </div>
        <div className={classes.subMenu} id="tutorial" onMouseEnter={() => setSubMenu('tutorial')}  onMouseLeave={() => setSubMenu('')}>
          <div>
            <Link href="#">FAQ</Link>
            <Link href="#">Tutorials</Link>
          </div>
        </div>
        <div className={classes.subMenu} id="settings" onMouseEnter={() => setSubMenu('settings')}  onMouseLeave={() => setSubMenu('')}>
          <div>
            <Link href="#">Update Preferences</Link>
          </div>
        </div>
      </div>
      <div className={classes.titlePanel}>
        <img src="favicon.ico" alt="Logo" width="32px" />
        <h3>Test</h3>
      </div>
      <div>
        <Link href="/signin">
          Sign In
        </Link>
      </div>
    </Container>
  );
}