/* eslint-disable react/prop-types */
import React from 'react'
import 'halfmoon/css/halfmoon-variables.min.css'
import '../styles/globals.css'

function MyApp ({ Component, pageProps }) {
  return (
    <div className='page-wrapper'>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
