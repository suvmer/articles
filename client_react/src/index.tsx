import ReactDOM from 'react-dom/client';
import { store } from "./store/index";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { MainPage } from './pages/MainPage';
import { ErrorPage } from './pages/ErrorPage';
import { PostPage } from './pages/PostPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/post/:id",
    element: <PostPage/>
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);