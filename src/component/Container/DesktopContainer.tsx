import { FunctionComponent, useState, useCallback } from "react";
import { Responsive, Visibility, Segment, Menu, Button, Container, Image } from "semantic-ui-react";
import { getWidth } from "../../utils";
import styled from 'styled-components';
import IntroHeader from "../IntroHeader";

interface Props{
    children: React.ReactNode;
}

const Logo = styled(Image)`
    margin-right: 1.5rem;
`;

const MenuItem = styled(Menu.Item)`
    background: red;
`;

const StyledSegment = styled(Segment)`
    min-height: 400px;
    padding: 1em 0em;
`;

const DesktopContainer: FunctionComponent<Props> = ({
    children
}) => {
    const [fixed, changeFixed] = useState(false);
    const handleFixed = useCallback((value: boolean) => {
        changeFixed(value)
    }, [])
    return (
        <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
            <Visibility
                once={false}
                onBottomPassed={() => changeFixed(true)}
                onBottomPassedReverse={() => changeFixed(false)}
                >
                <StyledSegment
                    inverted
                    textAlign='center'
                    vertical
                >
                    <Menu
                        fixed={fixed ? 'top' : null}
                        inverted={!fixed}
                        pointing={!fixed}
                        secondary={!fixed}
                        size='large'
                    >
                        <Container>
                            <MenuItem className="item" as='a'>
                                Studio Sample
                            </MenuItem>
                            <MenuItem className="item" position='right'>
                                Hello
                            </MenuItem>
                        </Container>
                    </Menu>
                    <IntroHeader />
                </StyledSegment>
                </Visibility>
                {children}
        </Responsive>
    )
}

export default DesktopContainer;