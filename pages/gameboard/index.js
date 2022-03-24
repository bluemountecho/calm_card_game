
import React from 'react';
import GameBoardPage from '../../src/pages/gameboard';

function GameBoard(props) {

  return (
    <GameBoardPage socket={props.socket} baseURL={props.baseURL} />
  );
}

export default GameBoard;