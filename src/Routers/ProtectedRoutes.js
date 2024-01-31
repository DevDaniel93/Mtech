import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
export const ProtectedRoutes = (props) => {
    const { Components } = props;
    const navigate = useNavigate();

    const loginToken = localStorage.getItem('login');

    const copyPaste = () => {
        document.addEventListener("DOMContentLoaded", function() {
            var ctrlDown = false,
                ctrlKey = 17,
                cmdKey = 91,
                vKey = 86,
                cKey = 67;
        
        
           document.addEventListener("keydown", function(e) {
                if (e.keyCode == ctrlKey || e.keyCode == cmdKey) ctrlDown = true;
            });
        
        
           document.addEventListener("keyup", function(e) {
                if (e.keyCode == ctrlKey || e.keyCode == cmdKey) ctrlDown = false;
            });
        
        
           var elements = document.querySelector("body");
        
        
           elements.forEach(function(element) {
                element.addEventListener("keydown", function(e) {
                    if (ctrlDown && (e.keyCode == vKey || e.keyCode == cKey)) e.preventDefault();
                });
            });
        });
        
    }

    const apiStatus = () => {
        const formDataMethod =  new FormData();
        formDataMethod.append('token', loginToken);
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch(`https://custom3.mystagingserver.site/mtrecords/public/api/auth/check-token`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: formDataMethod  
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if(data?.status === false) {
                    localStorage.removeItem('login');
                    navigate('/')
                }
                document.querySelector('.loaderBox').classList.add("d-none");
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");

            })
    }

    useEffect(() => {
        let login = localStorage.getItem('login');
        if (!login) {
            navigate('/');
           
        }

        apiStatus()
        copyPaste()

       
    })
    return (
        <>
            <Components />
        </>
    )
}
