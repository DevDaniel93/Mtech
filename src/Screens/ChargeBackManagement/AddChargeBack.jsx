import { useState, useEffect } from "react";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from '../../Components/CustomInput';
import { SelectBox } from "../../Components/CustomSelect";
import CustomButton from "../../Components/CustomButton";
import { useNavigate } from "react-router";

export const AddChargeBack = () => {
    const [initalRole, setrole] = useState({});
    const [initialunit, setUnit] = useState({});
    const [merchant, setMerchant] = useState()
    const [status, setStatus] = useState()
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({});
    const [successStatus, setSuccessStatus] = useState('Server Error!');
    const [messgaeShow, setMessageShow] = useState();
    const [leadStatus, setLeadStatus] = useState(false);

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

    const chargebackType = [
        {
            id: 'Fraudulent',
            name: 'Fraudulent'
        },
        {
            id: 'Product Unacceptable',
            name: 'Product Unacceptable'
        },
        {
            id: 'Product Not Received',
            name: 'Product Not Received'
        },
        {
            id: 'Credit Not Processed',
            name: 'Credit Not Processed'
        }
    ]


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


    const fectchBrandData = () => {
        const LogoutData = localStorage.getItem('login');
        document.querySelector('.loaderBox').classList.remove("d-none");

        fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/role-listing`,
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

                setrole(data.roles);
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");

            })
    }


    const fetchUnitData = () => {
        const LogoutData = localStorage.getItem('login');
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/unit-listing`,
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
                setUnit(data.units);
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");

            })
    }



    const LogoutData = localStorage.getItem('login');


    const handleSubmit = (event) => {
        event.preventDefault();

        // Create a new FormData object
        const formDataMethod = new FormData();
        for (const key in formData) {
            formDataMethod.append(key, formData[key]);
        }


        document.querySelector('.loaderBox').classList.remove("d-none");
        // Make the fetch request
        fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/chargeback-add-edit`, {
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
                ;
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
        fectchBrandData()
        fetchUnitData()
        fetchMerchantData()
    }, [])














    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1)
    };














    const [unitid, setUnitid] = useState();


    const userData = (uniID) => {

        // document.querySelector('.loaderBox').classList.remove("d-none");
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
    const [viewl, setView] = useState('');
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

            if (data?.status) {
                setMessageShow('Lead Verified')
                setLeadStatus(true)
                setFormData((prevData) => ({
                    ...prevData,
                    email: data?.leads?.email,
                    name: data?.leads?.name,
                    gross: data?.leads?.gross

                }));
                // setView(data)
            } else {
                setMessageShow('Lead not exist')
                setLeadStatus(false);
            }


            userData(data?.leads.unit_id);
            ;
        } catch (error) {
            console.error('Error fetching data:', error);
            // userData(0);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        ;
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




    return (
        <>
            <DashboardLayout>
                <div className="dashCard mb-4">
                    <div className="row mb-3">
                        <div className="col-12 mb-2">
                            <h2 className="mainTitle">
                                <BackButton />
                                Add ChargeBack
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
                                                    value={formData?.name}
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
                                                    value={formData?.email}
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
                                                    value={formData?.gross}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <CustomInput
                                                    label='Charge Back Amount'
                                                    required
                                                    id='amount'
                                                    type='number'
                                                    placeholder='Enter Charge Back Amount'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="chargeback_amount"
                                                    value={formData.chargeback_amount}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <CustomInput
                                                    label='Charge Back Date'
                                                    // required
                                                    id='date'
                                                    type='date'
                                                    placeholder='Enter Charge Back Date'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="chargeback_date"
                                                    value={formData.chargeback_date}
                                                    onChange={handleChange}
                                                />
                                            </div>


                                            <div className="col-md-4 mb-4">
                                                <SelectBox
                                                    selectClass="mainInput"
                                                    name="chargeback_type"
                                                    label="Charge Back Type"
                                                    required
                                                    value={formData.chargeback_type}
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
                                                    name="reason"
                                                    label="Reason Type"
                                                    required
                                                    value={formData.reason}
                                                    option={chargebackType}
                                                    onChange={handleChange}
                                                />

                                            </div>


                                            <div className="col-md-4 mb-4">
                                                <SelectBox
                                                    selectClass="mainInput"
                                                    name="chargeback_user_id"
                                                    label="User Id"
                                                    required
                                                    value={formData.chargeback_user_id}
                                                    option={unitid}
                                                    onChange={handleChange}
                                                />

                                            </div>
                                            <div className="col-md-12 mb-4">
                                                <div className="inputWrapper">
                                                    <label>Reason*</label>
                                                    <textarea value={formData?.description} name="description" className="mainInput" onChange={handleChange} required></textarea>
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
                <CustomModal status={status} show={showModal} close={() => {
                    setShowModal(false);
                    goBack();
                }} success heading={successStatus} />


            </DashboardLayout>
        </>
    );
};

