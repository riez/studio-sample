import { FunctionComponent } from 'react';
import useSwr from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const Homepage: FunctionComponent<PageProps> = ({
  renderLoadingPage,
  renderErrorPage
}) => {
  const { data, error } = useSwr('/api/films', fetcher);
  if(!data){
    return renderLoadingPage();
  }
  if(error){
    return renderErrorPage();
  }
  return (
    <div>
      Nicesss
    </div>
  )
}

export default Homepage;
