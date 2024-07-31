import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from '../../Components/CustomInput';
import { SelectBox } from "../../Components/CustomSelect";
import CustomButton from "../../Components/CustomButton";
export const AddFrontLead = () => {
    const [showModal, setShowModal] = useState(false);
    const [status, setStatus] = useState()
    const [brands, setBrands] = useState({});
    const [unit, setUnit] = useState({});

    const [user, setUser] = useState();
    const [sourcename, setSorceName] = useState();
    const [formData, setFormData] = useState({});
    console.log("lead_cac8a", formData)

    const [successStatus, setSuccessStatus] = useState('Server Error!');

    const [regionData, setRegionData] = useState();

    const getRegion = () => {
        const LogoutData = localStorage.getItem('login');
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/getFrontRegionStatus`,
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
                setRegionData(data?.data);
                console.log('vbb', data)
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");

            })
    }


    const [frontStatus, setFrontLead] = useState();

    const getLeadSatus = () => {
        const LogoutData = localStorage.getItem('login');
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/getFrontLeadStatus`,
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
                setFrontLead(data?.data);
                console.log('vbb', data)
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");

            })
    }

    useEffect(() => {
        getRegion()
        getLeadSatus()
    }, [])




    const fectchBrandData = (brandID) => {
        const LogoutData = localStorage.getItem('login');
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/unit-brands/${brandID}`,
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
                setBrands(data?.data);
                console.log('vbb', data)
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");

            })
    }


    const fetchSourceData = () => {
        const LogoutData = localStorage.getItem('login');
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/getFrontSourceStatus`,
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
                setSorceName(data?.data);
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


    console.log("formDataemail", formData?.email)

    const [remainingWords, setRemainingWords] = useState(1000);


    const [showRequiredMessage, setShowRequiredMessage] = useState(false);


    const handleChange = (event) => {
        const { name, value } = event.target;
            if (name === 'unit') {


                setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
                })); 

                fectchBrandData(value)
                userData(value, true);
                console.log('abc', formData)



            } else {
                 setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
                }));
            }
        }
   
    const [remainingNumber, setRemainingNumber] = useState(12);



    const LogoutData = localStorage.getItem('login');

    const [salesRep, setSalesRep] = useState();
    const userData = (uniID, isChange) => {
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/user-units3/${uniID}`,
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
                console.log('ss', data)
                setUser(data?.account_rep);
                setSalesRep(data?.sales_rep)
                if (isChange === true) {

                    setFormData((prevData) => ({
                        ...prevData,
                        agent: data?.sales_rep[0]?.id,
                        allocated_to: data?.account_rep[0]?.id,
                    }));
                    // setFormData({
                    //     ...formData, 

                    // })
                }


            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");

            })
    }


    const handleSubmit = (event) => {
        event.preventDefault();


        const formDataMethod = new FormData();
        for (const key in formData) {
            formDataMethod.append(key, formData[key]);
        }

        document.querySelector('.loaderBox').classList.remove("d-none");

        fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/addFrontLead`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${LogoutData}`
            },
            body: formDataMethod
        })
            .then((response) => response.json())
            .then((data) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                data?.status ? setSuccessStatus(data?.message) : setSuccessStatus(data?.message)
                setStatus(data?.status)
                setShowModal(true)
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
            });
    };


    useEffect(() => {
        fetchUnitData()
        fetchSourceData()
    }, [])


    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1)
    };


    const [messgaeShow, setMessageShow] = useState();
    const [leadStatus, setLeadStatus] = useState(false);

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
            console.log("data", data)
            if (data?.status) {
                setMessageShow('Lead Verified')
                setLeadStatus(true)
                setFormData((prevData) => ({
                    ...prevData,
                    email: data?.leads?.email,
                    name: data?.leads?.name,
                    phone: data?.leads?.phone,
                    unit: data?.leads?.unit,
                    brand: data?.leads?.brand,
                    agent: data?.leads?.sales_rep,
                    allocated_to: data?.leads?.account_rep,
                }));

                console.log("data", data?.leads?.phone)
                // setFormData(data.name)
                // setFormData(data.email)
                // setFormData(data.phone)
            } else {
                setMessageShow('Lead not exist')
                setLeadStatus(false);
            }


            userData(data?.leads.unit);
            fectchBrandData(data?.leads?.unit)
                ;
        } catch (error) {
            console.error('Error fetching data:', error);
            // userData(0);
        }
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


    console.log("formDataemail", formData)
    return (
        <>
            <DashboardLayout>
                <div className="dashCard mb-4">
                    <div className="row mb-3">
                        <div className="col-8">
                            <div className="d-flex">
                                <div className="col-12 mb-2">
                                    <h2 className="mainTitle">
                                        <BackButton />
                                        Add Front Lead Form
                                    </h2>

                                </div>
                                {/* <div className="col-md-6 mb-4">
                                    <CustomInput
                                        label='Lead Code'
                                        required
                                        id='name'
                                        type='text'
                                        placeholder='Enter Lead Code'
                                        labelClass='mainLabel'
                                        inputClass='mainInput'
                                        name="lead_code"
                                        value={formData?.lead_code}
                                        onChange={handleChange}
                                        onBlur={handleFetch}
                                    />
                                    {
                                        messgaeShow && (
                                            <p className={leadStatus ? 'text-dark' : 'text-danger'}>{messgaeShow}</p>
                                        )
                                    }
                                </div> */}

                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="row">
                                            <div className="col-md-4 mb-4">


                                                <SelectBox
                                                    type='text'
                                                    selectClass="mainInput"
                                                    name="source"
                                                    label="Source Name"
                                                    value={formData?.source}
                                                    option={sourcename}
                                                    required
                                                    onChange={handleChange}
                                                />

                                            </div>




                                            <div className="col-md-4 mb-4">
                                                <CustomInput
                                                    label='Enter Service'
                                                    required
                                                    id='service'
                                                    type='text'
                                                    placeholder='Enter Service'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="service"
                                                    value={formData?.service}
                                                    onChange={handleChange}
                                                />

                                            </div>

                                            <div className="col-md-4 mb-4">
                                                <CustomInput
                                                    label='Enter Genre'
                                                    required
                                                    id='genre'
                                                    type='text'
                                                    placeholder='Enter Genre'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="genre"
                                                    value={formData?.genre}
                                                    onChange={handleChange}
                                                />

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
                                                    value={formData?.name || ""}

                                                    // value={formData?.name == " " ? " " : viewl?.leads?.name}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <CustomInput
                                                    label='Email'
                                                    // required
                                                    id='email'
                                                    type='email'
                                                    placeholder='Enter Email'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="email"
                                                    // value={viewl?.leads?.email}
                                                    value={formData?.email || ""}

                                                    // value={formData?.email == " " ? " " : viewl?.leads?.email}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="col-md-4 mb-4">
                                                <CustomInput
                                                    label="Phone"
                                                    // required
                                                    id="phone"
                                                    type="text"
                                                    placeholder="Enter phone"
                                                    labelClass="mainLabel"
                                                    inputClass="mainInput"
                                                    name="phone"
                                                    value={formData?.phone || ""}
                                                    // value={viewl?.leads?.phone}
                                                    onChange={handleChange}
                                                />
                                                {/* viewl?.leads?.phone */}
                                            </div>

                                            <div className="col-md-4 mb-4">
                                                <CustomInput
                                                    label=" Amount"
                                                    // required
                                                    id="amount"
                                                    type="number"
                                                    placeholder="Enter  Amount"
                                                    labelClass="mainLabel"
                                                    inputClass="mainInput"
                                                    name="amount"
                                                    value={formData?.amount}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            
                                            <div className="col-md-4 mb-4">
                                                <CustomInput
                                                    required
                                                    label="Date"
                                                    id="date"
                                                    type="date"
                                                    placeholder="date"
                                                    labelClass="mainLabel"
                                                    inputClass="mainInput"
                                                    name="date"
                                                    value={formData?.date}
                                                    onChange={handleChange}

                                                />

                                            </div>

                                            
                                            <div className="col-md-4 mb-4">
                                                <CustomInput
                                                    // required
                                                    label="Date Converted"
                                                    id="date"
                                                    type="date"
                                                    placeholder="date"
                                                    labelClass="mainLabel"
                                                    inputClass="mainInput"
                                                    name="date_converted"
                                                    value={formData?.date_converted}
                                                    onChange={handleChange}

                                                />

                                            </div>

                                            <div className="col-md-3 mb-4">
                                                <SelectBox
                                                    selectClass="mainInput"
                                                    name="unit"
                                                    label="Unit"
                                                    required
                                                    value={formData?.unit}
                                                    option={unit}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-3 mb-4">
                                                <SelectBox
                                                    selectClass="mainInput"
                                                    name="brand"
                                                    label="Brand"
                                                    required
                                                    value={formData?.brand}
                                                    option={brands}
                                                    onChange={handleChange}
                                                />

                                            </div>
                                            <div className="col-md-3 mb-4">
                                                <SelectBox
                                                    selectClass="mainInput"
                                                    name="agent"
                                                    label="Agent"
                                                    required
                                                    value={formData?.agent}
                                                    option={salesRep}
                                                    onChange={handleChange}
                                                />

                                            </div>
                                            <div className="col-md-3 mb-4">
                                                <SelectBox
                                                    // required
                                                    selectClass="mainInput"
                                                    name="allocated_to"
                                                    label="Allocated To"
                                                    value={formData?.allocated_to}
                                                    option={user}
                                                    onChange={handleChange}
                                                />

                                            </div>



                                            {/* new fields  */}


                                            <div className="col-md-3 mb-4">
                                                <SelectBox
                                                    required
                                                    selectClass="mainInput"
                                                    name="region"
                                                    label="Region"
                                                    value={formData?.region}
                                                    option={regionData}
                                                    onChange={handleChange}
                                                />

                                            </div>

                                            <div className="col-md-3 mb-4">
                                                <SelectBox
                                                    required
                                                    selectClass="mainInput"
                                                    name="status"
                                                    label="Status"
                                                    value={formData?.status}
                                                    option={frontStatus}
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

                <CustomModal
                    show={showModal}
                    close={() => {
                        setShowModal(false);
                        goBack();
                    }}
                    success
                    status={status}
                    heading={successStatus}
                />
            </DashboardLayout>
        </>
    );
};

