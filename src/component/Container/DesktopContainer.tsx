import { FunctionComponent, useState, useCallback } from "react";
import { Responsive, Visibility, Segment, Menu, Button, Container, Image } from "semantic-ui-react";
import { getWidth } from "../../utils";
import styled from 'styled-components';
import IntroHeader from "../IntroHeader";
import { Link } from "../../routes";
import { FilmModel } from "../../models/film";

interface Props{
    children: React.ReactNode;
    dataFilm: FilmModel;
    hideIntroHeader?: boolean;
}

const Logo = styled(Image)`
    margin-right: 1.5rem;
`;

const MenuItem = styled(Menu.Item)`
    background: red;
`;

const StyledSegment = styled(Segment)`
    ${props => props.hideintroheader === 'true' && "min-height: 400px"}
    padding: 1em 0em;
`;

const DesktopContainer: FunctionComponent<Props> = ({
    children,
    dataFilm,
    hideIntroHeader
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
                    hideintroheader={hideIntroHeader?.toString()}
                >
                    <Menu
                        fixed={fixed ? 'top' : null}
                        inverted={!fixed}
                        pointing={!fixed}
                        secondary={!fixed}
                        size='large'
                    >
                        <Container>
                            <Link route="/">
                                <MenuItem className="item" as='a'>
                                    Studio Sample
                                </MenuItem>
                            </Link>
                            <Link route="/lists">
                                <MenuItem className="item" position='right'>
                                    All Films
                                </MenuItem>
                            </Link>
                        </Container>
                    </Menu>
                    {!hideIntroHeader && <IntroHeader dataFilm={dataFilm} />}
                </StyledSegment>
                </Visibility>
                {children}
        </Responsive>
    )
}

export default DesktopContainer;