import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import './app.css';
import './toastr.css'
import socketIOClient from "socket.io-client"
import {connect} from '../src/components/connector'
import toastr from "toastr"

toastr.options = {
  positionClass: 'toast-top-left'
}

// const ENDPOINT = "http://167.86.120.197";
const ENDPOINT = "http://ftp.uas.gis.mybluehost.me";
// const socket = socketIOClient(ENDPOINT)

// socket.on('send-to-winner', (res) => {
//   connect((account) => {
//     if (res.address == account) {
//       if (res.status == false) {
//         toastr.success('You will recieve GNLR prize soon!')
//       } else {
//         toastr.success('You recieved GNLR prize. Please check your wallet!')
//       }
//     }
//   })
// })

export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Test</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} socket={null} baseURL={ENDPOINT} />
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
