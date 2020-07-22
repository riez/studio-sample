import { FunctionComponent } from "react";
import { Grid, Segment, Container, Button } from "semantic-ui-react";
import styled from 'styled-components';

const StyledSegment = styled(Segment)`
    background: transparent !important;
    > div.row, button {
        padding-bottom: 1.5rem;
        &:last-child: {
            padding-bottom: 0;
        }
    }
`;

const TitleText = styled(Grid.Row)`
    text-align: left;
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
`;

const DescriptionText = styled(Grid.Row)`
    text-align: left;
    color: white;
`;

const IntroHeader: FunctionComponent<{}> = () => {
    return (
        <Container>
            <Grid columns={2} stackable>
                <Grid.Column>
                    <StyledSegment>
                        <TitleText>Rampage</TitleText>
                        <DescriptionText>This is Film Description</DescriptionText>
                        <Button floated="left" color="red">Details</Button>
                    </StyledSegment>
                </Grid.Column>
            </Grid>
        </Container>
    )
}

export default IntroHeader;