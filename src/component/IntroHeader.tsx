import { FunctionComponent } from "react";
import { Grid, Segment, Container, Button, Rating, Image } from "semantic-ui-react";
import styled from 'styled-components';
import { FilmModel } from "../models/film";
import { generateBase64InitialImage } from "../utils";

interface Props {
    dataFilm: FilmModel;
}

const StyledContainer = styled(Container)`
    background: transparent !important;
    padding: 1rem 0;
    > div.row, button {
        padding-bottom: 1.5rem;
        &:last-child: {
            padding-bottom: 0;
        }
    }
`;

const RatingContainer = styled.div`
    .ui.star.rating .icon{
        color: white;
    }
`;

const TitleText = styled(Grid.Row)`
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
`;

const IntroHeader: FunctionComponent<Props> = ({
    dataFilm
}) => {
    return (
        <Container>
            <Grid columns={2} stackable>
                <Grid.Column verticalAlign="middle">
                    <StyledContainer>
                        <TitleText>{dataFilm?.title}</TitleText>
                        <RatingContainer>
                            <Rating icon='star' defaultRating={3} maxRating={5} />
                        </RatingContainer>
                    </StyledContainer>
                </Grid.Column>
                <Grid.Column>
                    <StyledContainer>
                        <Image src={generateBase64InitialImage(dataFilm?.title)} size="small"/>
                    </StyledContainer>
                </Grid.Column>
            </Grid>
        </Container>
    )
}

export default IntroHeader;