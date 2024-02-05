import './App.css';
import "bootstrap/dist/css/bootstrap.css"
import AdminRouter from './Routers';
import "./Assets/css/style.css";
import { useEffect } from 'react';

function App() {
  // useEffect(() => {
  //   const disableRightClick = (event) => {
  //     event.preventDefault();
  //   };
  //   document.body.addEventListener('contextmenu', disableRightClick);
  //   return () => {
  //     document.body.removeEventListener('contextmenu', disableRightClick);
  //   };
  // }, []);
  return (
    <AdminRouter />
  );
}

export default App;
