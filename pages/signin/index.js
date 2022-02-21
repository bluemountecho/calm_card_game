
import React from 'react';
import SigninPage from '../../src/pages/signin';
import Layout from '../../src/layouts';

function Home(props) {

  return (
    <Layout>
      <SigninPage socket={props.socket} />
    </Layout>
  );
}

export default Home;