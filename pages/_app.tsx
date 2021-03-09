import React from 'react';
import type { AppProps } from 'next/app';

import 'halfmoon/css/halfmoon-variables.min.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <div className="page-wrapper"><Component {...pageProps} /></div>;
}

export default MyApp;
