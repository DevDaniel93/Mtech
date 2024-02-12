import { useState, useEffect } from "react";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from '../../Components/CustomInput';
import { SelectBox } from "../../Components/CustomSelect";
import { useNavigate } from "react-router";

import CustomButton from "../../Components/CustomButton";
export const AddReversal = () => {
    const [initalRole, setrole] = useState({});
    const [initialunit, setUnit] = useState({});
    const [successStatus, setSuccessStatus] = useState('Server Error!');
    const [merchant, setMerchant] = useState()
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({});
const [status , setStatus]  = useState()
    const [messgaeShow, setMessageShow] = useState();
    const [leadStatus, setLeadStatus] = useState(false);

    const reversalType = [
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

        fetch(`https://mtrecordflow.com/mtrecords-api/public/api/admin/merchant-listing`,
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
        fetch(`https://mtrecordflow.com/mtrecords-api/public/api/admin/reversal-add-edit`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${LogoutData}`
            },
            body: formDataMethod 
        })
            .then((response) => {
            
                return response.json();
            })
            .then((data) => {
              document.querySelector('.loaderBox').classList.add("d-none");
                data?.status ? setSuccessStatus(data?.msg) : setSuccessStatus(data?.msg)
                setStatus(data?.status)
                setShowModal(true)
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
           
            })
    };
 

    useEffect(() => {
        fetchMerchantData()
    }, [])


    const [viewleads, setViewleads] = useState('');


    const fetchData = async () => {
       
        try {
            const response = await fetch(`https://mtrecordflow.com/mtrecords-api/public/api/admin/view-leads/${viewleads}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${LogoutData}`
                },
            });

            const data = await response.json();
        
            if (data?.status) {
                setMessageShow('Lead Verified')
                setLeadStatus(true)
                setView(data)
            } else {
                setMessageShow('Lead not exist')
                setLeadStatus(false);
            }

          
            
            userData(data?.leads.unit_id);
      
        } catch (error) {
         
        }
    };
    
    const handleChange = (event) => {
        const { name, value } = event.target;

    


        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
  
    };

    const handleFetch = (event) => {
        const { name, value } = event.target;
        if (name === 'lead_code') {
            setViewleads(value);
        }
    };

    useEffect(() => {
        fetchData();
    }, [viewleads]);





    const [unitid, setUnitid] = useState();



    const userData = (uniID) => {
      
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch(`https://mtrecordflow.com/mtrecords-api/public/api/admin/user-units/${uniID}`,
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
  const [viewl, setView] = useState('');




    return (
        <>
            <DashboardLayout>
                <div className="dashCard mb-4">
                    <div className="row mb-3">
                        <div className="col-12 mb-2">
                            <h2 className="mainTitle">
                                <BackButton />
                                Add Reversal
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
                                                    label='Lead Code'
                                                    required
                                                    id='name'
                                                    type='text'
                                                    placeholder='Enter Lead Code'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="lead_code"
                                                    value={formData.lead_code}
                                                    onChange={handleChange}
                                                    onBlur={handleFetch}
                                                />
                                                {
                                                    messgaeShow && (
                                                        <p className={leadStatus ? 'text-dark' : 'text-danger'}>{messgaeShow}</p>
                                                    )
                                                }
                                            </div>
                                           



                                            <div className="col-md-4 mb-4">
                                                <CustomInput
                                                    label='Name'
                                                    required
                                                    id='name'
                                                    type='text'
                                                    placeholder='Enter Name'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="name"
                                                    value={viewl?.leads?.name}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <CustomInput
                                                    label='Enter Email'
                                                    required
                                                    id='amount'
                                                     
                                                    type='email'
                                                    placeholder='Enter Email'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="email"
                                                    value={viewl?.leads?.email}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <CustomInput
                                                    label='Net Amount'
                                                    required
                                                    id='netamount'
                                                    type='number'
                                                    placeholder='Enter Net Amount'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="net_amount"
                                                    value={viewl?.leads?.gross}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <CustomInput
                                                    label='Reversal Amount'
                                                    required
                                                    id='amount'
                                                    type='number'
                                                    placeholder='Enter Reversal Amount'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="reversal_amount"
                                                    value={formData.reversal_amount}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <CustomInput
                                                    label='Reversal Date'
                                                    // required
                                                    id='date'
                                                    type='date'
                                                    placeholder='Enter Reversal Date'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="reversal_date"
                                                    value={formData.reversal_date}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                         

                                            <div className="col-md-4 mb-4">
                                                <SelectBox
                                                    selectClass="mainInput"
                                                    name="reversal_type"
                                                    label="Reversal Type"
                                                    required
                                                    value={formData.reversal_type}
                                                    option={reversalType}
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
                                                    name="reversal_user_id"
                                                    label="User Id"
                                                    required
                                                    value={formData.reversal_user_id}
                                                    option={unitid}
                                                    onChange={handleChange}
                                                />

                                            </div>
                                       
                                            <div className="col-md-12">
                                                <CustomButton variant='primaryButton' text='Submit' type='submit' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <CustomModal status={status} show={showModal} close={() => { setShowModal(false) ; goBack() }} success  heading={successStatus} />


            </DashboardLayout>
        </>
    );
};

