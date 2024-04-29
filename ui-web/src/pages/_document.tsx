/* eslint-disable @next/next/no-title-in-document-head */
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet='utf-8' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <title>Iot Dashboard PlatForm</title>
          <link
            rel='shortcut icon'
            href='https://static.crozdesk.com/web_app_library/providers/logos/000/010/154/original/bevywise-iot-dashboard-1669212741-logo.png?1669212741'
            type='image/x-icon'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
