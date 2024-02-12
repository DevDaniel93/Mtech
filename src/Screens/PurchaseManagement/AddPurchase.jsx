import { useState, useEffect } from "react";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from '../../Components/CustomInput';
import { useNavigate } from "react-router";

import { SelectBox } from "../../Components/CustomSelect";
import CustomButton from "../../Components/CustomButton";

export const AddPurchase = () => {
    const [successStatus, setSuccessStatus] = useState('Server Error!');
    const [initalRole, setrole] = useState({});
    const [initialunit, setUnit] = useState({});
    const [status , setStatus] = useState()
    const [merchant, setMerchant] = useState()
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({});
    const [messgaeShow, setMessageShow] = useState();
    const [leadStatus, setLeadStatus] = useState(false);
    const purchaseType = [
        {
            id: 'Partial',
            name: 'Partial'
        },
        {
            id: 'Full',
            name: 'Full'
        }
    ]


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
        fetch(`https://mtrecordflow.com/mtrecords-api/public/api/admin/purchase-add-edit`, {
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
                setShowModal(true)
                setStatus(data?.status)
                data?.status ? setSuccessStatus(data?.msg) : setSuccessStatus(data?.msg)
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                 
            })
    };
 
    useEffect(() => {
        fetchMerchantData()
    }, [])







 


    const [viewl, setView] = useState('');










    const handleFetch = (event) => {
        const { name, value } = event.target;
        if (name === 'lead_code') {
            setViewleads(value);
        }
    };




    const [unitid, setUnitid] = useState();



    const userData = (uniID) => {
   console.log("viewleads" , uniID)
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



     











    const [viewleads, setViewleads] = useState('');
 console.log("view-leads" , viewleads)

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
            // Process the data as needed

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;


        if (name === 'lead_id') {
            setViewleads(value);
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
         
    };


    useEffect(() => {
        fetchData();
    }, [viewleads]);





    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1)
    };





    return (
        <>
            <DashboardLayout>
                <div className="dashCard mb-4">
                    <div className="row mb-3">
                        <div className="col-12 mb-2">
                            <h2 className="mainTitle">
                                <BackButton />
                                Add Purchase
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
                                                        <p className={leadStatus ? 'text-dark' : 'text-dark'}>{messgaeShow}</p>
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
                                                    label='Purchase Amount'
                                                    required
                                                    id='amount'
                                                    type='number'
                                                    placeholder='Enter Purchase Amount'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="purchase_amount"
                                                    value={formData.purchase_amount}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <CustomInput
                                                    label='Purchase Date'
                                                    // required
                                                    id='date'
                                                    type='date'
                                                    placeholder='Enter Purchase Date'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="purchase_date"
                                                    value={formData?.purchase_date}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                         

                                            <div className="col-md-4 mb-4">
                                                <SelectBox
                                                    selectClass="mainInput"
                                                    name="purchase_type"
                                                    label="Purchase Type"
                                                    required
                                                    value={formData.purchase_type}
                                                    option={purchaseType}
                                                    onChange={handleChange}
                                                />

                                            </div>

                                      

                                            <div className="col-md-4 mb-4">
                                                <SelectBox
                                                    selectClass="mainInput"
                                                    name="purchase_user_id"
                                                    label="User Id"
                                                    required
                                                    value={formData.purchase_user_id}
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
                                                <CustomButton variant='primaryButton' text='Submit' type='submit' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <CustomModal  status={status} show={showModal} close={() => {
                    setShowModal(false);
                    goBack();
                }} success heading={successStatus}  />


            </DashboardLayout>
        </>
    );
};

