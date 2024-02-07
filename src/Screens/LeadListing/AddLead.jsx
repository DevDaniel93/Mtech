import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from '../../Components/CustomInput';
import { SelectBox } from "../../Components/CustomSelect";
import CustomButton from "../../Components/CustomButton";
export const AddLead = () => {
    const [showModal, setShowModal] = useState(false);
    const [status, setStatus] = useState()
    const [brands, setBrands] = useState({});
    const [unit, setUnit] = useState({});

    const [user, setUser] = useState();
    const [formData, setFormData] = useState({
        source: '',
        brand: '',
        product: '',
        email: '',
        name: '',
        phone: '',
        description: '',
        amount: '',
        received: '',
        recovery: '',
        sales_rep: '',
        account_rep: '',
        date: ''
    });

    const sourcename = [
        {
            id: '1',
            name: 'PPC'
        },
        {
            id: '2',
            name: 'Organic  '
        },
        {
            id: '3',
            name: 'SMS'
        },
        {
            id: '4',
            name: 'OB'
        },
        {
            id: '5',
            name: 'SMM'
        },
        {
            id: '6',
            name: 'Up-Sell'
        },
        {
            id: '7',
            name: 'Org-Up-Sell'
        },
        {
            id: '8',
            name: 'OB-Up-Sell'
        },
        {
            id: '9',
            name: 'SMM-Up-Sell'
        }
        ,
        {
            id: '10',
            name: 'Other'
        }

    ]
    const [successStatus, setSuccessStatus] = useState('Server Error!');


    const fectchBrandData = (brandID) => {
        const LogoutData = localStorage.getItem('login');
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch(`https://custom3.mystagingserver.site/mtrecords/public/api/admin/unit-brands/${brandID}`,
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
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");

            })
    }


    const fetchUnitData = () => {
        const LogoutData = localStorage.getItem('login');
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch('https://custom3.mystagingserver.site/mtrecords/public/api/admin/unit-listing',
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

    // const handleChange = (event) => {

    //     const { name, value } = event.target;
    //     if (name === 'unit_id') {
    //         userData(value)
    //     }
    //     setFormData((prevData) => ({
    //         ...prevData,
    //         [name]: value,
    //     }));

    //     console.log(formData)
    // };

    const [remainingWords, setRemainingWords] = useState(100);


    const [showRequiredMessage, setShowRequiredMessage] = useState(false);


    const handleChange = (event) => {
        const { name, value } = event.target;

        if (event.target.tagName === "TEXTAREA") {
            const wordLimit = 100;
            const wordCount = value.trim().split(/\s+/).length;

            if (wordCount <= wordLimit) {
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
                }));
                setRemainingWords(wordLimit - wordCount);
            } else {
                const truncatedText = value
                    .trim()
                    .split(/\s+/)
                    .slice(0, wordLimit)
                    .join(' ');

                setFormData((prevData) => ({
                    ...prevData,
                    [name]: truncatedText,
                }));

                setRemainingWords(0);
            }
        } else {
            if (name === 'unit_id') {

                setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
                }));
                userData(value);
                fectchBrandData(value)

            } else if (name === 'email') {
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
                }));
            } else if (
                name === 'phone' ||
                name === 'quoted_amount' ||
                name === 'received' ||
                name === 'recovery'
            ) {
                const characterLimit = 12;

                if (value.length <= characterLimit) {
                    setFormData((prevData) => ({
                        ...prevData,
                        [name]: value,
                    }));
                    setRemainingNumber(characterLimit - value.length);
                } else {
                    setRemainingNumber(0);
                }
            } else {

                const defaultCharacterLimit = 20;

                if (value.length <= defaultCharacterLimit) {
                    setFormData((prevData) => ({
                        ...prevData,
                        [name]: value,
                    }));
                }
            }
        }
    };
    const isReceivedEmpty = formData.received === '';
    const isRecoveryEmpty = formData.recovery === '';


    const [remainingNumber, setRemainingNumber] = useState(12);



    const LogoutData = localStorage.getItem('login');


    const userData = (uniID) => {
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch(`https://custom3.mystagingserver.site/mtrecords/public/api/admin/user-units/${uniID}`,
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
                setUser(data?.data)
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");

            })
    }



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

        fetch(`https://custom3.mystagingserver.site/mtrecords/public/api/admin/leads-add-edit`, {
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
                data?.status ? setSuccessStatus(data?.msg) : setSuccessStatus(data?.msg)
                setStatus(data?.status)
                setShowModal(true)
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
            });
    };


    useEffect(() => {
        fetchUnitData()
    }, [])


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
                                Add Lead Form
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


                                                <SelectBox
                                                    type='text'
                                                    selectClass="mainInput"
                                                    name="source"
                                                    label="Source Name"
                                                    value={formData.source}
                                                    option={sourcename}
                                                    onChange={handleChange}
                                                />

                                            </div>

                                            {/* {showRequiredMessage && <p style={{ color: 'red' }}>{showRequiredMessage}</p>} */}


                                            <div className="col-md-4 mb-4">
                                                <CustomInput
                                                    label='Enter Product'
                                                    required
                                                    id='product'
                                                    type='text'
                                                    placeholder='Enter Product'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="product"
                                                    value={formData.product}
                                                    onChange={handleChange}
                                                />

                                            </div>

                                            <div className="col-md-4 mb-4">
                                                <CustomInput
                                                    label='Email'
                                                    required
                                                    id='email'
                                                    type='email'
                                                    placeholder='Enter Email'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="email"
                                                    value={formData.email}
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
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <CustomInput
                                                    label="Phone"
                                                    required
                                                    id="phone"
                                                    type="number"
                                                    placeholder="Enter phone"
                                                    labelClass="mainLabel"
                                                    inputClass="mainInput"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="col-md-4 mb-4">
                                                <CustomInput
                                                    label=" Amount"
                                                    required
                                                    id="amount"
                                                    type="number"
                                                    placeholder="Enter  Amount"
                                                    labelClass="mainLabel"
                                                    inputClass="mainInput"
                                                    name="quoted_amount"
                                                    value={formData.quoted_amount}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="col-md-4 mb-4">
                                                <CustomInput
                                                    label="Amount Received"
                                                    id="received"
                                                    required
                                                    type="number"
                                                    placeholder="Enter Received Amount"
                                                    labelClass="mainLabel"
                                                    inputClass="mainInput"
                                                    name="received"
                                                    value={formData.received}
                                                    onChange={handleChange}
                                                    disabled={!isRecoveryEmpty}

                                                />
                                            </div>

                                            <div className="col-md-4 mb-4">
                                                <CustomInput
                                                    required
                                                    label="Amount Recovery"
                                                    id="recovery"

                                                    type="number"
                                                    placeholder="Enter Recovery Amount"
                                                    labelClass="mainLabel"
                                                    inputClass="mainInput"
                                                    name="recovery"
                                                    value={formData.recovery}
                                                    onChange={handleChange}
                                                    disabled={!isReceivedEmpty}
                                                />

                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <SelectBox
                                                    selectClass="mainInput"
                                                    name="unit_id"
                                                    label="Unit"
                                                    required
                                                    value={formData.unit_id}
                                                    option={unit}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <SelectBox
                                                    selectClass="mainInput"
                                                    name="brand"
                                                    label="Brand"
                                                    required
                                                    value={formData.brand}
                                                    option={brands}
                                                    onChange={handleChange}
                                                />

                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <SelectBox
                                                    selectClass="mainInput"
                                                    name="sales_rep"
                                                    label="Sales Rep"
                                                    required
                                                    value={formData.sales_rep}
                                                    option={user}
                                                    onChange={handleChange}
                                                />

                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <SelectBox
                                                    required
                                                    selectClass="mainInput"
                                                    name="account_rep"
                                                    label="Account Rep"
                                                    value={formData.account_rep}
                                                    option={user}
                                                    onChange={handleChange}
                                                />

                                            </div>


                                            <div className="col-md-4 mb-4">
                                                <CustomInput
                                                    required
                                                    label="Date"
                                                    id="recovery"

                                                    type="date"
                                                    placeholder="date"
                                                    labelClass="mainLabel"
                                                    inputClass="mainInput"
                                                    name="date"
                                                    value={formData.date}
                                                    onChange={handleChange}
                                                    disabled={!isReceivedEmpty}
                                                />

                                            </div>





                                            <div className="col-md-12 mb-4">
                                                <div className="inputWrapper">


                                                    <div className="form-controls">
                                                        <label htmlFor="description">Description</label>
                                                        <textarea
                                                            name="description"
                                                            className="form-control shadow border-0"
                                                            id="description"
                                                            cols="30"
                                                            rows="10"
                                                            value={formData.description}
                                                            onChange={handleChange}
                                                        // disabled={remainingWords <= 0}
                                                        />
                                                        <p>Remaining words: {remainingWords}</p>
                                                    </div>
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

