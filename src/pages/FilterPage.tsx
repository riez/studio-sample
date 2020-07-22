import useSwr from 'swr';
import { getRouter } from '../routes';
import { NextPage } from 'next';

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const Filterpage: NextPage<PageProps> = ({
  renderLoadingPage,
  renderErrorPage,
}) => {
  const router = getRouter();
  const { data, error } = useSwr(`/api/film/${router?.query?.id}`, fetcher);
  if(error){
    return renderErrorPage();
  }
  if(!data){
    return renderLoadingPage();
  }
  return (
    <div>
      {JSON.stringify(data)}
    </div>
  )
}



export default Filterpage;
