import { memo } from 'react';
import { useRoutes } from 'react-router-dom';
import { lazy } from 'react';
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));

const App = () => {
  return (
    <>
      {
        useRoutes([
          {
            path: '/',
            element: <Home />,
          },
          {
            path: '/about',
            element: <About />,
          },
        ])
      }
    </>    
  );
};

export default memo(App);