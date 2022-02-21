
import React from 'react';
import MakeDeckPage from '../../src/pages/makedeck';
import Layout from '../../src/layouts';

function MakeDeck(props) {

  return (
    <Layout>
      <MakeDeckPage socket={props.socket}/>
    </Layout>
  );
}

export default MakeDeck;