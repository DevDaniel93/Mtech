import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


import "./style.css";


import { AuthLayout } from '../../Components/Layout/AuthLayout';
import CustomInput from "../../Components/CustomInput"
import CustomButton from '../../Components/CustomButton';


const ForgetPassword2 = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({})

    useEffect(() => {
        document.title = 'Mt Record | Password Recovery';
    }, [])

    // ${process.env.REACT_APP_API_URL}/public/api/otp_verification



    const handleClick = async (event) => {
        event.preventDefault();
    
        const formDataMethod = new FormData();
        const email = localStorage.getItem('email');
        const code = formData.code; // Assuming formData.code is defined somewhere
    
        formDataMethod.append('otp', code);
        formDataMethod.append('email', email);
        localStorage.setItem('otp', code);
        document.querySelector('.loaderBox').classList.remove("d-none");
    
        const apiUrl = `${process.env.REACT_APP_API_URL}/public/api/otp_verification`;
    
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                body: formDataMethod
            });
    
            if (response.ok) {
                const responseData = await response.json();
                document.querySelector('.loaderBox').classList.add("d-none");
                if (responseData.status === true) {
                    navigate('/forget-password3');
                } else {
                    alert('Invalid Code');
                    console.error('Login failed');
                }
            } else {
                document.querySelector('.loaderBox').classList.add("d-none");
                alert('Failed to verify OTP');
                console.error('Verification failed');
            }
        } catch (error) {
            document.querySelector('.loaderBox').classList.add("d-none");
            console.error('Error:', error);
        }
    };
    



    return (
        <>
            <AuthLayout authTitle='Verification Code' authPara='Please Check Your Email For Verification Code.' subauthPara='Your Code is 4 digit in Length' backOption={true}>
                <form onSubmit={handleClick}>
                    <div class="inputWrapper"><label for="verificationCode" class="mainLabel">Verification Code<span>*</span></label></div>
                    <div className='verification-box flex-grow-1 flex-column gap-0'>
                        <CustomInput required id='verificationCode' type='number' labelClass='mainLabel' inputClass='mainInput' onChange={(event) => {
                            setFormData({ ...formData, code: event.target.value })
                        }} />

                        {/* <CustomInput required id='verificationCode' type='number' labelClass='mainLabel' inputClass='mainInput text-center' onChange={(event) => {
                            setFormData({ ...formData, code: event.target.value })
                        }} /> */}
                        {/* <CustomInput required id='verificationCode' type='number' labelClass='mainLabel' inputClass='mainInput text-center' onChange={(event) => {
                            setFormData({ ...formData, code: event.target.value })
                        }} />
                        <CustomInput required id='verificationCode' type='number' labelClass='mainLabel' inputClass='mainInput text-center' onChange={(event) => {
                            setFormData({ ...formData, code: event.target.value })
                        }} /> */}
                    </div>
                    {/* <div className="d-flex align-items-baseline justify-content-between mt-1">
                        <p className='text-danger fw-bold'>Resending in 00:50</p>
                        <button type='button' className='notButton primaryColor fw-bold text-decoration-underline'>Resend Code</button>
                    </div> */}
                    <div className="mt-4 text-center">
                        <CustomButton variant='primaryButton' text='Continue' type="submit" />
                    </div>
                </form>
            </AuthLayout>
        </>
    )
}



export default ForgetPassword2