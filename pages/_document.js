import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import Helmet from 'react-helmet'
import { ServerStyleSheet } from 'styled-components'


export default class extends Document {
  static async getInitialProps(...args) {
    const documentProps = await super.getInitialProps(...args)
    const sheet = new ServerStyleSheet()
    const page = args[0].renderPage(App => props =>
      sheet.collectStyles(<App {...props} />),
    )
    const styleTags = sheet.getStyleElement()
    return { ...documentProps, helmet: Helmet.renderStatic(), ...page, styleTags }
  }

  // should render on <html>
  get helmetHtmlAttrComponents() {
    return this.props.helmet.htmlAttributes.toComponent()
  }

  // should render on <body>
  get helmetBodyAttrComponents() {
    return this.props.helmet.bodyAttributes.toComponent()
  }

  // should render on <head>
  get helmetHeadComponents() {
    return Object.keys(this.props.helmet).filter(el => el !== 'htmlAttributes' && el !== 'bodyAttributes').map(el => this.props.helmet[el].toComponent())
  }

  get helmetJsx() {
    return (<Helmet
      htmlAttributes={{ lang: 'en' }}
      title="Kiwi Flight Search"
      meta={[
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { property: 'og:title', content: 'Kiwi Flight Search' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://kiwi-flight-search.herokuapp.com' },
        {
          property: 'og:description',
          content: 'Example solution of entry task for Modern JS weekend in Barcelona.',
        },
      ]}
    />)
  }

  render() {
    return (<html {...this.helmetHtmlAttrComponents}>
      <Head>
        <title>Kiwi Flight Search</title>
        <link rel="stylesheet" href="https://cdn.rawgit.com/Chalarangelo/mini.css/v2.3.7/dist/mini-default.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/react-datepicker/1.1.0/react-datepicker.css" type="text/css" />
        {this.props.styleTags}
        {this.helmetJsx}
        {this.helmetHeadComponents}
      </Head>
      <body {...this.helmetBodyAttrComponents}>
        <Main />
        <NextScript />
      </body>
    </html>)
  }
}
