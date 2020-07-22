import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import App, { AppContext } from 'next/app';
import styled from 'styled-components';
import { Segment, Dimmer, Loader, Image } from 'semantic-ui-react';

const StyledSegment = styled(Segment)`
    height: 100vh;
`;

const renderLoadingPage = (): any => (
    <StyledSegment >
      <Dimmer active inverted>
        <Loader size='large'>Loading</Loader>
      </Dimmer>
    </StyledSegment>
)
const renderErrorPage = (): any => (
    <div>
        Error!
    </div>
)
class Root extends App {
    static async getInitialProps(ctx: AppContext) {
        const appProps = await App.getInitialProps(ctx);
        return {...appProps, query: ctx.ctx.query || {}}
    }
    
  render(): React.ReactElement {
        const { Component, pageProps } = this.props;
        return (
            <Component
                {...pageProps}
                renderErrorPage={renderErrorPage}
                renderLoadingPage={renderLoadingPage}
            />
        );
    }
}

export default Root;
