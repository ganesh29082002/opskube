import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import routers from './routes/Routes';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
  <>
    <RouterProvider  router ={routers}/>
    <ToastContainer/>
  </>
  );
}

export default App;
