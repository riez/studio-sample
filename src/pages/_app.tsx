import Document from 'next/document';
import React from 'react';
import App from 'next/app';
const renderLoadingPage = (): any => (
    <div>
        Loading...
    </div>
)
const renderErrorPage = (): any => (
    <div>
        Error!
    </div>
)
class Root extends App {
    static async getInitialProps(ctx) {
        const appProps = await App.getInitialProps(ctx);
        return {...appProps, query: ctx.ctx.query || {}}
      }
    
  render(): React.ReactElement {
    const { Component, pageProps } = this.props;
    return (
        <React.Fragment>
              <Component
                {...pageProps}
                renderErrorPage={renderErrorPage}
                renderLoadingPage={renderLoadingPage}
              />
        </React.Fragment>
    );
  }
}

export default Root;
