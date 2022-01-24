
import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router';
import styles from './style';
import TopButtons from '../../components/TopButtons';
import BottomButtons from '../../components/BottomButtons';

const useStyles = makeStyles(styles);

function LeaderboardPage() {
  const classes = useStyles();
  const router = useRouter();

  const members = [
    {
      rank: 1,
      name: 'Player',
      id: '00285130971',
      scores: 960883,
      matches: 7920,
      winrate: '92.04',
      region: 'LOREM',
    },
    {
      rank: 2,
      name: 'Player',
      id: '88019463581',
      scores: 902327,
      matches: 8918,
      winrate: '87.30',
      region: 'LOREM',
    },
    {
      rank: 3,
      name: 'Player',
      id: '67255137771',
      scores: 871006,
      matches: 7840,
      winrate: '81.27',
      region: 'LOREM',
    },
    {
      rank: 4,
      name: 'Player',
      id: '00116130348',
      scores: 620553,
      matches: 2003,
      winrate: '79.03',
      region: 'LOREM',
    },
    {
      rank: 5,
      name: 'Player',
      id: '45185276601',
      scores: 520972,
      matches: 6130,
      winrate: '71.88',
      region: 'LOREM',
    },
  ];

  return (
    <>
      <div className={classes.hero}>
        <TopButtons id="buttons" />
        <div id="table">
          <li id="header">
            {Object.keys(members[0]).map(val => (<div>{val}</div>))}
          </li>
          {members.map((member, index) => (
            <li key={index}>
              <div>
                #{member.rank}
                <img src={`images/blank_avatar${member.rank}.png`} alt="" />
              </div>
              <div>{member.name}</div>
              <div>{member.id}</div>
              <div>{member.scores.toLocaleString()}</div>
              <div>{member.matches.toLocaleString()}</div>
              <div>{member.winrate}%</div>
              <div>{member.region}</div>
            </li>
          ))}
        </div>
        <BottomButtons id="buttons" />
      </div>
    </>
  );
}

export default LeaderboardPage;