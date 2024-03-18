import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from '../../Components/CustomInput';
import { SelectBox } from "../../Components/CustomSelect";
import { useNavigate } from "react-router";

import CustomButton from "../../Components/CustomButton";
export const EditRefund = () => {
    const [status , setStatus] = useState()
    const { id } = useParams();
    const [initalRole, setrole] = useState({});
    const [initialunit, setUnit] = useState({});
    const [merchant, setMerchant] = useState()
    const [successStatus, setSuccessStatus] = useState('Server Error!');

    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({});

    const refundType = [
        {
            id: 'Partial',
            name: 'Partial'
        },
        {
            id: 'Full',
            name: 'Full'
        }
    ]

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1)
      };
    const fetchMerchantData = () => {
        const LogoutData = localStorage.getItem('login');
        document.querySelector('.loaderBox').classList.remove("d-none");

        fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/merchant-listing`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${LogoutData}`
                },
            }
        )

            .then(response =>
                response.json()
            )
            .then((data) => {
                document.querySelector('.loaderBox').classList.add("d-none");
               
                setMerchant(data?.data);
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                 
            })
    }



 

    const getUserData = () => {
        const LogoutData = localStorage.getItem('login');
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/get-refund/${id}`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${LogoutData}`
                },
            }
        )

            .then(response =>
                response.json()
            )
            .then((data) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                setFormData(data?.data);
                setViewleads(data?.data?.lead_code);
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                
            })
    }



    const LogoutData = localStorage.getItem('login');


    const handleSubmit = (event) => {
        event.preventDefault();

 
        for (const key in formData) {
            if (
           
                formData.brand === '' ||
                formData.product === '' ||
                formData.email === '' ||
                formData.name === '' ||
                formData.phone === '' ||
                formData.description === '' 
   
            ) {
              
 
                return;
            }
        }
        const formDataMethod = new FormData();
        for (const key in formData) {
            formDataMethod.append(key, formData[key]);
        }

         
        document.querySelector('.loaderBox').classList.remove("d-none");
        // Make the fetch request
        fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/refund-add-edit/${id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${LogoutData}`
            },
            body: formDataMethod // Use the FormData object as the request body
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                
                data?.status ? setSuccessStatus(data?.msg) : setSuccessStatus(data?.msg)
                setShowModal(true)
                setStatus(data?.status)
                 
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                 
            })
    };


    useEffect(() => {
        getUserData()
        fetchMerchantData()
    }, [])



    const [unitid, setUnitid] = useState();



    const userData = (uniID) => {
         
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/user-units/${uniID}`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${LogoutData}`
                },
            }
        )

            .then(response =>
                response.json()
            )
            .then((data) => {
                 
                document.querySelector('.loaderBox').classList.add("d-none");
                setUnitid(data?.data)
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                 
            })
    }



    const [viewleads, setViewleads] = useState('');
   

    const fetchData = async () => {
        
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/view-leads/${viewleads}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${LogoutData}`
                },
            });

            const data = await response.json();
         
            userData(data?.leads.unit_id);  
            
        } catch (error) {
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;


        if (name === 'lead_code') {
            setViewleads(value);
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        //  ;
    };

 
    useEffect(() => {
        fetchData();
    }, [viewleads]);
















console.log("formData" , formData?.leaddetail)

    return (
        <>
            <DashboardLayout>
                <div className="dashCard mb-4">
                    <div className="row mb-3">
                        <div className="col-12 mb-2">
                            <h2 className="mainTitle">
                                <BackButton />
                                Edit Refund Detail
                            </h2>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="row">
                                            <div className="col-md-4 mb-4">
                                                <CustomInput
                                                    label='Lead ID'
                                                    required
                                                    id='name'
                                                    disabled
                                                    type='text'
                                                    placeholder='Enter Lead Code'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="lead_code"
                                                    value={formData.lead_code}
                                                />
                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <CustomInput
                                                    label='Name'
                                                    id='name'
                                                    type='text'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="name"
                                                    disabled
                                                    value={formData.leaddetail?.name}
                                                />
                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <CustomInput
                                                    label='Email'
                                                    id='name'
                                                    type='email'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="email"
                                                    disabled
                                                    value={formData.leaddetail?.email}
                                                />
                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <CustomInput
                                                    label='Received Amount'
                                                    id='name'
                                                    type='number'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="received"
                                                    disabled
                                                    value={formData.leaddetail?.gross}
                                                />
                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <CustomInput
                                                    label='Refund Amount'
                                                    required
                                                    id='amount'
                                                    type='number'
                                                    placeholder='Enter Refund Amount'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="refund_amount"
                                                    value={formData.refund_amount}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <CustomInput
                                                    label='Refund Date'
                                                    // required
                                                    id='date'
                                                    type='date'
                                                    placeholder='Enter Refund Date'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="refund_date"
                                                    value={formData.refund_date}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                         
                                            <div className="col-md-4 mb-4">
                                                <SelectBox
                                                    selectClass="mainInput"
                                                    name="refund_type"
                                                    label="Refund Type"
                                                    required
                                                    value={formData.refund_type}
                                                    option={refundType}
                                                    onChange={handleChange}
                                                />

                                            </div>

                                            <div className="col-md-4 mb-4">
                                                <SelectBox
                                                    selectClass="mainInput"
                                                    name="merchant_id"
                                                    label="Merchant"
                                                    required
                                                    value={formData.merchant_id}
                                                    option={merchant}
                                                    onChange={handleChange}
                                                />

                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <SelectBox
                                                    selectClass="mainInput"
                                                    name="refund_user_id"
                                                    label="User Id"
                                                    required
                                                    value={formData.refund_user_id}
                                                    option={unitid}
                                                    onChange={handleChange}
                                                />

                                            </div>
                                            <div className="col-md-12 mb-4">
                                                <div className="inputWrapper">
                                                    <label>Reason*</label>
                                                    <textarea value={formData?.reason} name="reason" className="mainInput" onChange={handleChange}></textarea>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <CustomButton variant='primaryButton' text='Submit' type='Add User' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <CustomModal show={showModal} status={status} close={() => { setShowModal(false) ; goBack() }} success heading={successStatus}  />

            </DashboardLayout>
        </>
    );
};
