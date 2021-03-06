import React from 'react'
import Document, {
  Html, Head, Main, NextScript
} from 'next/document'

class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  // eslint-disable-next-line class-methods-use-this
  render () {
    return (
      <Html>
        <Head>
          <meta name='color-scheme' content='dark light' />
        </Head>
        <body>
          <script dangerouslySetInnerHTML={{
            __html: "if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) document.body.classList.add('dark-mode');"
          }}
          />
          <script dangerouslySetInnerHTML={{
            __html: "if (window.matchMedia) window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => e.matches ? document.body.classList.add('dark-mode') : document.body.classList.remove('dark-mode'));"
          }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
