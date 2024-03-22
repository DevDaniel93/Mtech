import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import "./style.css";


import { AuthLayout } from '../../Components/Layout/AuthLayout';
import CustomInput from "../../Components/CustomInput"
import CustomButton from '../../Components/CustomButton';


const ForgetPassword = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({})
    const [validate, setValidate] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        document.title = 'Project Camp | Password Recovery';
    }, [])




    // const handleSubmit = (event) => {
    //     event.preventDefault();
    
    //     const formData = new FormData();
    //     formData.append('email', formData.email);
    
    //     document.querySelector('.loaderBox').classList.remove("d-none");
    
    //     const apiUrl = `${process.env.REACT_APP_API_URL}/public/api/forgot_password`;
    
    //     fetch(apiUrl, {
    //         method: 'POST',
    //         body: formData
    //     })
    //     .then(response => {
    //         if (response.ok) {
    //             return response.json();
    //         } else {
    //             document.querySelector('.loaderBox').classList.add("d-none");
    //             throw new Error('Network response was not ok.');
    //         }
    //     })
    //     .then(data => {
    //         localStorage.setItem('email', data.data.email);
    //         document.querySelector('.loaderBox').classList.add("d-none");
    //         if (data.status === true) {
    //             setValidate(false);
    //             navigate('/forget-password2');
    //         } else {
    //             setValidate(true);
    //             setError(data.message);
    //             console.log(data);
    //         }
    //     })
    //     .catch(error => {
    //         document.querySelector('.loaderBox').classList.add("d-none");
    //         console.error('Error:', error);
    //         alert('Invalid Credentials');
    //     });
    // };



    const handleSubmit = (event) => {
        event.preventDefault();

        setValidate(false);
        console.log(formData)
        const formDataMethod = new FormData();
        formDataMethod.append('email', formData.email);
    
        document.querySelector('.loaderBox').classList.remove("d-none");
    
        const apiUrl = `${process.env.REACT_APP_API_URL}/public/api/forgot_password`;
    
        fetch(apiUrl, {
            method: 'POST',
            body: formDataMethod
        })
        .then(response => {
            if (response.ok) {
                document.querySelector('.loaderBox').classList.add("d-none");
                return response.json();
            } else {
                document.querySelector('.loaderBox').classList.add("d-none");
                throw new Error('Network response was not ok.');
            }
        })
        .then(data => {

            localStorage.setItem('email', data.data.email);
            
            if (data.status === true) {
                setValidate(false);
                navigate('/forget-password2');
            } else {
                setValidate(true);
                setError(data.message);
                console.log(data);
            }
        })
        .catch(error => {
            document.querySelector('.loaderBox').classList.add("d-none");
            console.error('Error:', error);
            alert('Invalid Code');
        });
    };
    


    const handleClick = (e) => {
        e.preventDefault()
        navigate('/forget-password2')
    }

    return (
        <>
            <AuthLayout authTitle='Password Recovery' authPara='Enter your email address to receive a verification code.' backOption={true}>
                <form onSubmit={handleSubmit}>
                    <CustomInput label='Email Address' required id='userEmail' type='email' placeholder='Enter Your Email Address' labelClass='mainLabel' inputClass='mainInput' onChange={(event) => {
                        setFormData({ ...formData, email: event.target.value })
                    }} />
                    {
                        validate && (
                            <p className='text-danger'>{error}</p>
                        )
                    }
                    <div className="mt-4 text-center">
                        <CustomButton variant='primaryButton' text='Continue' type="submit" />
                    </div>
                </form>

            </AuthLayout>
        </>
    )
}



export default ForgetPassword
