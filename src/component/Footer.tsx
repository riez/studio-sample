import { FunctionComponent } from "react";
import { Segment, Container, Grid, Header, List, Icon } from "semantic-ui-react";
import styled from "styled-components";

const StyledSegment = styled(Segment)`
    padding: 2rem 0 !important;
    margin-top: 2rem !important;
`;
const Page: FunctionComponent = () => {
    return (
        <StyledSegment inverted vertical>
            <Container>
                <Grid centered>
                    Created with <Icon name="heart" color="red" fitted/> by Farrizal Alchudry Mutaqien
                </Grid>
            </Container>
        </StyledSegment>
    )
}

export default Page;