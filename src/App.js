import './App.css';
import "bootstrap/dist/css/bootstrap.css"
import AdminRouter from './Routers';
import "./Assets/css/style.css";
import { useEffect } from 'react';
import hotkeys from 'hotkeys-js';

function App() {
  useEffect(() => {
    const disableRightClick = (event) => {
      event.preventDefault();
    };
    document.body.addEventListener('contextmenu', disableRightClick);
    return () => {
      document.body.removeEventListener('contextmenu', disableRightClick);
    };

  }, []);


  useEffect(() => {
    const handleKeyUp = (e) => {
      const keyCode = e.keyCode ? e.keyCode : e.which;
      if (keyCode === 44) {
        stopPrntScr();
      }
    };

    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const stopPrntScr = () => {
    const inpFld = document.createElement("input");
    inpFld.setAttribute("value", ".");
    inpFld.setAttribute("width", "0");
    inpFld.style.height = "0px";
    inpFld.style.width = "0px";
    inpFld.style.border = "0px";
    document.body.appendChild(inpFld);
    inpFld.select();
    document.execCommand("copy");
    inpFld.remove(inpFld);
  };

  const accessClipboardData = () => {
    try {
      window.clipboardData.setData('text', "Access Restricted");
    } catch (err) {
      console.error(err);
    }
  };

  setInterval(accessClipboardData, 300);


 
  return (
    <AdminRouter />
  );
}

export default App;
