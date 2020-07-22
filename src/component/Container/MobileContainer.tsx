import { FunctionComponent, useState, useCallback } from "react";
import { Responsive, Sidebar, Menu, Segment, Container, Icon, Button } from "semantic-ui-react";
import { getWidth } from "../../utils";
import IntroHeader from "../IntroHeader";

interface Props{
    children: React.ReactNode;
}

const MobileContainer: FunctionComponent<Props> = ({
    children
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
          <Menu.Item as='a' active>
            Home
          </Menu.Item>
          <Menu.Item as='a'>Work</Menu.Item>
          <Menu.Item as='a'>Company</Menu.Item>
          <Menu.Item as='a'>Careers</Menu.Item>
          <Menu.Item as='a'>Log in</Menu.Item>
          <Menu.Item as='a'>Sign Up</Menu.Item>
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
            <IntroHeader />
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    )
}

export default MobileContainer;