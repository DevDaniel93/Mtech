import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';

export const ProtectedRoutes = (props) => {
    const { Components } = props; // Changed from "Components" to "Component" for consistency
    const navigate = useNavigate();
    const location = useLocation()
    console.log('params', location.pathname);
    let login = localStorage.getItem('login');
    // https://custom3.mystagingserver.site/mtrecords/public/api/auth/check-token





    useEffect(() => {
        if (!login) {
            navigate('/login');
        } else if(!login) {
            navigate('/customProject');
          }

        else if(login && location.pathname === '/') {
            navigate('/dashboard');
          }
    }, [navigate,login , location.pathname]);
    return (
        <>
            <Components />
        </>
    );
    }




    // useEffect(() => {
    //     const checkToken = async () => {
    //         try {
    //             if (!login) {
    //                 navigate('/login');
    //             } else {
    //                 const token = login
    //                 console.log("login", token)
    //                 const response = await fetch('https://custom3.mystagingserver.site/mtrecords/public/api/auth/check-token', {
    //                     method: 'POST',
    //                     body: token

    //                 });
    //                 const data = await response.json();
    //                 console.log("data" , data)
                   
    //                 console.log("data" , data?.data.status)
    //                 console.log("dashboard", data.status)
    //                 if (data?.status === true) {
    //                     navigate('/dashboard');
    //                 } else {

    //                     localStorage.removeItem('login');
    //                     navigate('/login');
    //                 }
    //             }
    //         } catch (error) {
    //             console.error('Error checking token:', error);
    //         }
    //     };

    //     checkToken();
    // }, [navigate, login]);




    








    return (
        <>
            <Components />
        </>
    );
};