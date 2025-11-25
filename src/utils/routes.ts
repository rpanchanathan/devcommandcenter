import { createBrowserRouter } from 'react-router';
import { Summary } from '../pages/Summary';
import { ProjectDetail } from '../pages/ProjectDetail';
import { NotFound } from '../pages/NotFound';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      Component: Summary,
    },
    {
      path: '/project/:id',
      Component: ProjectDetail,
    },
    {
      path: '*',
      Component: NotFound,
    },
  ],
  {
    basename: '/devcommandcenter',
  }
);