import './App.css';
import "bootstrap/dist/css/bootstrap.css"
import AdminRouter from './Routers';
import "./Assets/css/style.css";
import { useEffect, useRef, useCallback, useState } from 'react';
import hotkeys from 'hotkeys-js';
import { useNavigate } from 'react-router';

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


  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes in seconds
  const LogoutData = localStorage.getItem('login');

  const logout = useCallback(() => {
    if (!LogoutData) {
      return;
    }

    console.log('User is inactive. Logging out...');
    fetch(`${process.env.REACT_APP_API_URL}/public/api/auth/logout`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LogoutData}`
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        localStorage.removeItem('login');
        localStorage.removeItem('rolesPermission');
        window.location.replace('/mtRecordFlow');
      })
      .catch(error => {
        console.log(error);
      });
  }, [LogoutData]);

  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Reset the countdown
    setTimeLeft(10 * 60); // 10 minutes in seconds

    // Update the countdown every second
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    timeoutRef.current = setTimeout(() => {
      clearInterval(intervalRef.current);
      logout();
    }, 10 * 60 * 1000); // 10 minutes
  }, [logout]);

  useEffect(() => {
    const events = ['load', 'mousemove', 'mousedown', 'click', 'scroll', 'keypress'];

    const handleEvent = () => {
      resetTimeout();
    };

    events.forEach(event => window.addEventListener(event, handleEvent));

    resetTimeout(); // Initialize the timer when the component mounts

    return () => {
      events.forEach(event => window.removeEventListener(event, handleEvent));
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [resetTimeout]);

  // useEffect(() => {
  //   console.log(`Time left: ${Math.floor(timeLeft / 60)} minutes ${timeLeft % 60} seconds`);
  // }, [timeLeft]);




  return (
    <AdminRouter />
  );
}

export default App;
