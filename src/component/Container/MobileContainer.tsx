import { FunctionComponent, useState, useCallback } from "react";
import { Responsive, Sidebar, Menu, Segment, Container, Icon, Button } from "semantic-ui-react";
import styled from 'styled-components';

import { getWidth } from "../../utils";
import IntroHeader from "../IntroHeader";
import Footer from "../Footer";
import { Link } from "../../routes";
import { FilmModel } from "../../models/film";

interface Props{
    children: React.ReactNode;
    dataFilm: FilmModel;
    hideIntroHeader?: boolean;
}

const StyledSegment = styled(Segment)`
    ${props => props.hideintroheader === 'true' && "min-height: 350px"}
    padding: 1em 0em;
`;

const MobileContainer: FunctionComponent<Props> = ({
    children,
    dataFilm,
    hideIntroHeader
}) => {
    const [sidebarOpened, setSidebarOpened] = useState(false);
    const handleSidebarHide = useCallback(() => {
        setSidebarOpened(false)
    }, []);
    const handleToggle = useCallback(() => {
        setSidebarOpened(true)
    }, []);
    return (
        <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation='push'
          inverted
          onHide={handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Link route="/">
            <Menu.Item as='a' active>
              Home
            </Menu.Item>
          </Link>
          <Link route="/lists">
            <Menu.Item as='a'>All Films</Menu.Item>
          </Link>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <StyledSegment
            inverted
            textAlign='center'
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size='large'>
                <Menu.Item onClick={handleToggle}>
                  <Icon name='sidebar' />
                </Menu.Item>
                <Menu.Item position='right'>
                  Studio Sample
                </Menu.Item>
              </Menu>
            </Container>
            {!hideIntroHeader && <IntroHeader dataFilm={dataFilm} />}
          </StyledSegment>
          {children}
          <Footer />
        </Sidebar.Pusher>
      </Responsive>
    )
}

export default MobileContainer;