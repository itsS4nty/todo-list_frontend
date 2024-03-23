import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import List from '../pages/List';

const Router = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <List />,
        },
        {
            path: '*',
            element: <span>Not found</span>,
        },
    ]);
    return <RouterProvider router={router} />;
};

export default Router;
