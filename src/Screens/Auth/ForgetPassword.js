import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import "./style.css";


import { AuthLayout } from '../../Components/Layout/AuthLayout';
import CustomInput from "../../Components/CustomInput"
import CustomButton from '../../Components/CustomButton';


const ForgetPassword = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({})

    useEffect(() => {
        document.title = 'Project Camp | Password Recovery';
    }, [])




    const handleSubmit = async (event) => {
        event.preventDefault();

        const formDataMethod = new FormData();
        formDataMethod.append('email', formData.email);

        document.querySelector('.loaderBox').classList.remove("d-none");

        const apiUrl = `${process.env.REACT_APP_API_URL}/public/api/forgot_password`;


        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                body: formDataMethod
            });
            console.log("umair", response)
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('email', data.data.email);
                document.querySelector('.loaderBox').classList.add("d-none");
                navigate('/forget-password2')

            } else {
                document.querySelector('.loaderBox').classList.add("d-none");
                alert('Invalid Credentials')

                console.error('Login failed');
            }
        } catch (error) {
            document.querySelector('.loaderBox').classList.add("d-none");
            console.error('Error:', error);
        }
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
                    <div className="mt-4 text-center">
                        <CustomButton variant='primaryButton' text='Continue' type="submit" />
                    </div>
                </form>

            </AuthLayout>
        </>
    )
}



export default ForgetPassword
