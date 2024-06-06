import './App.css';
import "bootstrap/dist/css/bootstrap.css"
import AdminRouter from './Routers';
import "./Assets/css/style.css";
import { useEffect } from 'react';
import hotkeys from 'hotkeys-js';

function App() {
  // useEffect(() => {
  //   const disableRightClick = (event) => {
  //     event.preventDefault();
  //   };

  //   const handleKeyDown = (event) => {
  //     if ((event.ctrlKey && event.shiftKey && event.keyCode === 73) ||  // Ctrl + Shift + I
  //         (event.ctrlKey && event.keyCode === 85)) { // Ctrl + U (view source)
  //       event.preventDefault();
  //     }
  //   };

  //   const handleContextMenu = (event) => {
  //     event.preventDefault();
  //   };

  //   document.body.addEventListener('contextmenu', disableRightClick);
  //   document.addEventListener('keydown', handleKeyDown);
  //   document.addEventListener('contextmenu', handleContextMenu);

  //   return () => {
  //     document.body.removeEventListener('contextmenu', disableRightClick);
  //     document.removeEventListener('keydown', handleKeyDown);
  //     document.removeEventListener('contextmenu', handleContextMenu);
  //   };
  // }, []);


 
  return (
    <AdminRouter />
  );
}

export default App;
