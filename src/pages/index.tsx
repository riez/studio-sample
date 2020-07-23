import { FunctionComponent } from 'react';
import useSwr from 'swr';
import { Grid, Segment, Header, Card, Popup, Image, Icon, Container} from 'semantic-ui-react'
import Page from '../component/Page';
import styled from 'styled-components';
import { generateBase64InitialImage } from '../utils';
import { PeopleModel } from '../models/people';
import { FilmModel } from '../models/film';
import { Link } from '../routes';

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const StyledSegment = styled(Segment)`
  box-shadow: none !important;
  border: none !important;
`;

const Homepage: FunctionComponent<PageProps> = ({
  renderLoadingPage,
  renderErrorPage
}) => {
  const { data: dataFilms, error: errorFilms } = useSwr('/api/films?limit=12', fetcher);
  const { data: dataActors, error: errorActors } = useSwr('/api/peoples?limit=10', fetcher);
  if(errorFilms || errorActors){
    return renderErrorPage();
  }
  if(!dataFilms || !dataActors){
    return renderLoadingPage();
  }
  return (
    <Page hideIntroHeader>
      <Container>
        <StyledSegment>
          <Header as='h2' textAlign='left'>
            <Header.Content>
            Films
              <Header.Subheader>Top rated films from our studio</Header.Subheader>
            </Header.Content>
          </Header>
          <Grid columns={4} doubling stackable>
          {dataFilms.map((item: FilmModel) => 
            <Grid.Column key={item?.id} >
              <Card>
                <Image src={generateBase64InitialImage(item?.title || '')} wrapped ui={false} />
                <Card.Content>
                  <Card.Header>{item?.title}</Card.Header>
                  <Card.Meta>
                    <div>
                      <Icon name='user' />
                      <span>{item?.producer}</span>
                    </div>
                    <div>
                      <Icon name='calendar' />
                      <span>{item?.release_date}</span>
                    </div>
                  </Card.Meta>
                  <Card.Description>
                    {item?.description?.substr(0, 150)}
                  </Card.Description>
                </Card.Content>
                <Card.Content extra textAlign="right">
                  <Link route={`/films/${item?.id}`}>
                    <a>
                      Read More
                      <Icon name='arrow right' />
                    </a>
                  </Link>
                </Card.Content>
              </Card>
            </Grid.Column>
          )}
          </Grid>
        </StyledSegment>
      </Container>
      <Container>
        <StyledSegment>
          <Header as='h2' textAlign='left'>
            <Header.Content>
              Actors
              <Header.Subheader>Your favourite actors is here</Header.Subheader>
            </Header.Content>
          </Header>
          <Grid columns={5} doubling stackable>
            {dataActors.map((item: PeopleModel) => 
              <Grid.Column key={item?.id} textAlign="center">
                <Popup
                  content={`${item?.gender} Actors whom has ${item?.eye_color} Eye, ${item?.hair_color} Hair and in age of ${item?.age}`}
                  position="bottom center"
                  header={item?.name}
                  trigger={<Image src={generateBase64InitialImage(item?.name)} size="small" avatar/>}
                  
                />
              </Grid.Column>
            )}
          </Grid>
        </StyledSegment>
      </Container>
    </Page>
  )
}

export default Homepage;
