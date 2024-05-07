import React, { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import About from './pages/About';
import Cart from './pages/Cart';
import Error from './pages/Error';
import Home from './pages/Home';
import Register from './pages/Register';
import Restaurant from './pages/Restaurant';
import Search from './pages/Search';
import store from './store/store';
import './styles.css';
import Login from './pages/Login';
import { AuthProvider } from './context/Auth';

const Contact = lazy(() => import('./pages/Contact'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'search',
        element: <Search />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'contact',
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path:'login' ,
        element : <Login/>,
      },
      {
        path: 'restaurants/:id',
        element: <Restaurant />,
      },
    ],
    errorElement: <Error />,
  },
]);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <AuthProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </AuthProvider>
);
