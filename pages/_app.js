import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import Layout from '../components/Layout'
import { CartProvider } from '../helpers/cart-context/CartContext'


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

    <>
      <ThemeProvider theme={theme}>

        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}

        <CssBaseline />
        <CartProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CartProvider>

      </ThemeProvider>

    </>

  );

}



MyApp.propTypes = {

  Component: PropTypes.elementType.isRequired,

  pageProps: PropTypes.object.isRequired,

};