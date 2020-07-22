import route from 'next-routes';

interface RouteType {
  name: string;
  page: string;
  pattern: string;
}

const isClient = typeof window !== 'undefined';

export const routes: RouteType[] = [
  { name: 'home', page: 'index', pattern: '/' },
  { name: 'filter', page: 'Filter', pattern: '/filter/:id' },
];

const nextRoutes = new route();
routes.forEach((item: RouteType) => {
  return nextRoutes.add(item);
});

export const Link = nextRoutes.Link;
export const Router = nextRoutes.Router;
export const getRouter = (): typeof Router => {
  if (isClient) {
    return Router;
  }
  return null;
};

export default nextRoutes;
