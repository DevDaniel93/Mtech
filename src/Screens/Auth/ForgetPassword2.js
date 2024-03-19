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
        document.title = 'Project Camp | Password Recovery';
    }, [])

    // ${process.env.REACT_APP_API_URL}/public/api/otp_verification



    const handleClick = async (event) => {
        event.preventDefault();

        const formDataMethod = new FormData();
        const email = localStorage.getItem('email');

        formDataMethod.append('otp', formData.code);
        formDataMethod.append('email', email);
        localStorage.setItem('otp', formData.code);
        document.querySelector('.loaderBox').classList.remove("d-none");

        const apiUrl = `${process.env.REACT_APP_API_URL}/public/api/otp_verification`;


        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                body: formDataMethod
            });

            if (response.ok) {

 
                document.querySelector('.loaderBox').classList.add("d-none");
                navigate('/forget-password3')

            } else {
                document.querySelector('.loaderBox').classList.add("d-none");
                alert('Invalid Code')

                console.error('Login failed');
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
                    <div className='verification-box justify-content-between'>
                        <CustomInput required id='verificationCode' type='number' labelClass='mainLabel' inputClass='mainInput    ' onChange={(event) => {
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