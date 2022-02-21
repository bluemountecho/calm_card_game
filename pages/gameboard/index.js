
import React from 'react';
import GameBoardPage from '../../src/pages/gameboard';
import Layout from '../../src/layouts';

function GameBoard(props) {

  return (
    <Layout>
      <GameBoardPage socket={props.socket} />
    </Layout>
  );
}

export default GameBoard;