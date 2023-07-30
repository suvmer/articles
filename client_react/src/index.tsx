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
import { Index } from './pages/Index';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        loader: async () => document.title = "Список статей",
        element: <MainPage/>,
        index: true
      },
      {
        path: "/post/:id",
        loader: async () => document.title = "Статья",
        element: <PostPage/>
      }
    ]
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