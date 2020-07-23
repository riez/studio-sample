import useSwr from 'swr';
import { useCallback, useState } from 'react';
import { getRouter, Router, Link } from '../routes';
import { NextPage } from 'next';
import { Container, List, Image, Grid, Button, Icon, Input, Select } from 'semantic-ui-react';
import styled from 'styled-components';

import { serialize, generateBase64InitialImage } from '../utils';
import { FilmModel } from '../models/film';
import Page from '../component/Page';
import SearchInput from '../component/SearchInput';


const fetcher = (url: string) => fetch(url).then((res) => res.json())

const StyledContainer = styled(Container)`
  padding: 2rem 0;
`;

const ListPage: NextPage<PageProps> = ({
  renderLoadingPage,
  renderErrorPage,
}) => {
  const router = getRouter();
  const { data, error } = useSwr(`/api/films?${serialize(router?.query)}`, fetcher);
  const handleSearch = useCallback((params: string) => {
    Router.replaceRoute(`/lists?${params}`)
  }, []);
  const prepareData = useCallback(() => {
    const sort = router?.query?.sort;
    const direction = router?.query?.direction;
    if(sort && direction === 'asc'){
      return data?.sort((a: FilmModel, b: FilmModel) => {
        if (a[sort.toString()] < b[sort.toString()]){
          return -1;
        }
        return 1;
      })
    }
    if(sort && direction === 'desc'){
      return data?.sort((a: FilmModel, b: FilmModel) => {
        if (a[sort.toString()] < b[sort.toString()]){
          return 1;
        }
        return -1;
      })
    }
    return data;
  }, [data]);
  const preparedData = prepareData();
  const handleSortReleaseDateDown = useCallback(() => {
   Router.replaceRoute(`/lists?sort=release_date&direction=asc`)
  }, []);
  const handleSortReleaseDateUp = useCallback(() => {
    Router.replaceRoute(`/lists?sort=release_date&direction=desc`)
  }, []);
  const handleSortRatingDown = useCallback(() => {
    Router.replaceRoute(`/lists?sort=rt_score&direction=asc`)
   }, []);
   const handleSortRatingUp = useCallback(() => {
     Router.replaceRoute(`/lists?sort=rt_score&direction=desc`)
   }, []);
  if(error){
    return renderErrorPage();
  }
  if(!data){
    return renderLoadingPage();
  }
  return (
    <Page hideIntroHeader>
      <StyledContainer>
        <Grid stretched>
          <SearchInput onSearch={handleSearch}/>
        </Grid>
        <Grid columns={4} stackable>
          <Grid.Column stretched>
            <Button icon labelPosition='left' onClick={handleSortReleaseDateDown}>
              <Icon name='sort amount down' />
              Sort by Release Date
            </Button>
          </Grid.Column>
          <Grid.Column stretched>
            <Button icon labelPosition='left'  onClick={handleSortReleaseDateUp}>
              <Icon name='sort amount up' />
              Sort by Release Date
            </Button>
          </Grid.Column>
          <Grid.Column stretched>
            <Button icon labelPosition='right' onClick={handleSortRatingUp}>
              <Icon name='sort amount down' />
              Sort by Rating
            </Button>
          </Grid.Column>
          <Grid.Column stretched>
            <Button icon labelPosition='right' onClick={handleSortRatingDown}>
              <Icon name='sort amount up' />
              Sort by Rating
            </Button>
          </Grid.Column>
        </Grid>
        <List divided selection verticalAlign='middle'>
          {preparedData.map((item: FilmModel) => 
            <Link key={item?.id} route={`/films/${item?.id}`}>
              <List.Item>
                <Image src={generateBase64InitialImage(item?.title)} size="small"/>
                <List.Content>
                  <List.Header>{item?.title} ({item?.release_date})</List.Header>
                  {item?.producer}
                </List.Content>
              </List.Item>
            </Link>
          )}
        </List>
      </StyledContainer>
    </Page>
  )
}



export default ListPage;
