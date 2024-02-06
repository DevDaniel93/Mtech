import React, { useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import AdminRouter from './Routers';
import './Assets/css/style.css';

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
    const handleKeyDown = (event) => {
      if (event.key === 's' && event.shiftKey && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        console.log('Window + Shift + S disabled');
        
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return <AdminRouter />;
}

export default App;
