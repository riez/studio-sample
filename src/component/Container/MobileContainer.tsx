import { FunctionComponent, useState, useCallback } from "react";
import { Responsive, Sidebar, Menu, Segment, Container, Icon, Button } from "semantic-ui-react";
import { getWidth } from "../../utils";
import IntroHeader from "../IntroHeader";
import { Link } from "../../routes";
import { FilmModel } from "../../models/film";

interface Props{
    children: React.ReactNode;
    dataFilm: FilmModel;
    hideIntroHeader?: boolean;
}

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
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 300, padding: '1em 0em' }}
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
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    )
}

export default MobileContainer;