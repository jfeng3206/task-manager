import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {HomeLayout, Landing, Register,  Login,}  from './pages';
import './App.css'
import{action as registerAction} from './pages/Register';
import{action as loginAction} from './pages/Login';
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction,

      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction,
      },
      
        ],
      },
    ],
 );
function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
