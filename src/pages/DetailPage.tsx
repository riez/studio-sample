import useSwr from 'swr';
import { getRouter, Link } from '../routes';
import { NextPage } from 'next';
import Page from '../component/Page';
import { Segment, Container, Header, Grid, Card, Image, Icon, Table, Breadcrumb } from 'semantic-ui-react';
import { FilmModel } from '../models/film';
import styled from 'styled-components';
import { generateBase64InitialImage } from '../utils';

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const StyledSegment = styled(Segment)`
  ${props => props.hideshadow === 'true' && `
    box-shadow: none !important;
    border: none !important;
  `}
`;

const StyledContainer = styled(Container)`
  padding: 1.5rem 0;
`;

const RelatedContainer = styled(Grid.Column)`
  cursor: pointer;
`;

const StyledCard = styled(Card)`
  margin: 0 auto !important;
`;

const DetailPage: NextPage<PageProps> = ({
  renderLoadingPage,
  renderErrorPage,
}) => {
  const router = getRouter();
  const { data, error }: {data?: FilmModel; error?: any}  = useSwr(`/api/film/${router?.query?.id}`, fetcher);
  const { data: dataRelatedFilms, error: errorRelatedFilms } = useSwr('/api/films?limit=5', fetcher);
  if(error || errorRelatedFilms){
    return renderErrorPage();
  }
  if(!data || !dataRelatedFilms){
    return renderLoadingPage();
  }
  return (
    <Page dataFilm={data}>
      <StyledContainer>
        {/* TODO: Get from GlobalState Routing History */}
        <Segment>
          You are here:
          {' '}
          <Breadcrumb>
            <Link route="/">
              <Breadcrumb.Section link>Home</Breadcrumb.Section>
            </Link>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>{data?.title}</Breadcrumb.Section>
          </Breadcrumb>
        </Segment>
        <StyledSegment>
          <Header as='h2' textAlign='left'>
            <Header.Content>
              Description
            </Header.Content>
          </Header>
          <Container as="text">
            {data?.description}
          </Container>
          <Table definition>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Producer</Table.Cell>
                <Table.Cell>{data?.producer}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Director</Table.Cell>
                <Table.Cell>{data?.director}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Release Data</Table.Cell>
                <Table.Cell>{data?.release_date}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Header as='h2' textAlign='left'>
            <Header.Content>
              Related Films
              <Header.Subheader>You might like these list too</Header.Subheader>
            </Header.Content>
          </Header>
          <Grid columns={5} doubling stackable>
            {dataRelatedFilms.map((item: FilmModel) => 
              <Link key={item?.id} route={`/films/${item.id}`}>
                <RelatedContainer>
                  <StyledCard>
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
                    </Card.Content>
                  </StyledCard>
                </RelatedContainer>
              </Link>
            )}
          </Grid>
        </StyledSegment>
      </StyledContainer>
    </Page>
  )
}



export default DetailPage;
