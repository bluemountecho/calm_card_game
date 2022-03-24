
import React from 'react';
import StartGamePage from '../../src/pages/startgame';
import Layout from '../../src/layouts';

function StartGame(props) {

  return (
    <Layout>
      <StartGamePage socket={props.socket} baseURL={props.baseURL} />
    </Layout>
  );
}

export default StartGame;