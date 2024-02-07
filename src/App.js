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




  // useEffect(() => {
  //   const handleKeyDown = (event) => {

  //     if (event.key === 'S' && event.shiftKey && (event.ctrlKey || event.metaKey)) {
  //       event.preventDefault(); // Prevent the default behavior
  //       console.log('Window + Shift + S disabled');

  //     }
  //   //   if (event.keyCode === 'S' && event.shiftKey && (event.ctrlKey || event.metaKey)) {
  //   //     event.preventDefault();
  //   //     event.stopPropagation();
  //   // }
  //   };
  //   // document.addEventListener('keydown', handleKeyDown, true); 
  //     window.addEventListener('keydown', handleKeyDown , false);

  //     return () => {
  //     window.removeEventListener('keydown', handleKeyDown , false);
  //   };
  // }, []);



  // useEffect(() => {
  //   // const handleKeyPress = (event) => {
  //   //   // Check if the pressed keys are Windows key + Shift + S
  //   //   if (event.metaKey && event.shiftKey && event.key === 'S') {
  //   //     // Prevent the default action (taking a screenshot in Windows)
  //   //     event.preventDefault();

  //   //     // You can add your custom logic here if needed
  //   //     console.log('Windows key + Shift + S pressed. Do something else.');
  //   //   }
  //   // };


  //   const handleKeyPress = (event) => {
  //     if (event.metaKey && event.shiftKey && event.key === 'S') {
  //       // Prevent the default action (taking a screenshot in Windows)
  //       event.preventDefault();

  //       // You can add your custom logic here if needed
  //       console.log('Windows key + Shift + S pressed. Do something else.');
  //     }
  //   };

  //    // window.addEventListener('keydown', handleKeyPress , false);
  //   document.body.addEventListener('keydown', handleKeyPress  , false);
  //   // Remove the event listener when the component unmounts to avoid memory leaks
  //   return () => {
  //     document.body.removeEventListener('keydown', handleKeyPress , false);
  //     // window.removeEventListener('keydown', handleKeyPress );
  //   };
  // }, []);  

  // useEffect(() => {
  //   const handleKeyPress = (event) => {

  //     if (event.shiftKey && event.key === 'S') {
  //         event.preventDefault();

  //         console.log('Shift + S pressed. Do something else.');
  //     }
  //   };

  //     window.addEventListener('keydown', handleKeyPress);

  //     return () => {
  //     window.removeEventListener('keydown', handleKeyPress , false);
  //   };
  // }, []); // Empty dependency array ensures that the effect runs only once when the component mounts

  



  useEffect(() => {
    const handleShortcut = () => {
      // Your custom logic here
      console.log('Windows key + Shift + S pressed. Do something else.');
    };

      hotkeys('shift+s, shift+s', function (event, handler){
        event.preventDefault();
      
 
      handleShortcut();
    });

     return () => {
      hotkeys.unbind('shift+s, shift+s');
    };
  }, []); 

  return (
    <AdminRouter />
  );
}

export default App;
  