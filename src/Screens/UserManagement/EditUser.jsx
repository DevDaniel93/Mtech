import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from '../../Components/CustomInput';
import { SelectBox } from "../../Components/CustomSelect";
import { useNavigate } from "react-router";

import CustomButton from "../../Components/CustomButton";
import Select from 'react-select'
export const EditUser = () => {
    const { id } = useParams();
    const [successStatus, setSuccessStatus] = useState('Server Error!');
    const [initalRole, setrole] = useState({});
    const [initialunit, setUnit] = useState({});
    const [status, setStatus] = useState()
    const [showModal, setShowModal] = useState(false);
    const [permission, setPermission] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        unit_id: [],
        user_role: ''
    });
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1)
    };


    const SelectOptions = []
    for (const key in initialunit) {
        if (initialunit.hasOwnProperty(key)) {
            const item = initialunit[key];



            const option = {
                label: item.name,
                value: item.id,
            };

            SelectOptions.push(option);
        }
    }


    const handleChangeSelect = (selected) => {
        setFormData({
            ...formData, unit_id: selected
        })
    };

    const editBrandList = [];

    const getUserData = () => {
        const LogoutData = localStorage.getItem('login');
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch(`https://custom3.mystagingserver.site/mtrecords/public/api/admin/get-user/${id}`,
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
                setFormData(data.users);
                data.users?.permission != null ? setPermission(true) : setPermission(false)
                const abac = SelectOptions.filter(dataItem => data?.users?.unit_id?.includes(dataItem.id))



            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");

            })
    }


    const fectchBrandData = () => {
        const LogoutData = localStorage.getItem('login');
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch('https://custom3.mystagingserver.site/mtrecords/public/api/admin/role-listing',
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



    const LogoutData = localStorage.getItem('login');


    const handleSubmit = (event) => {
        event.preventDefault();

        for (const key in formData) {
            if (

                formData.name === '' ||
                formData.product === '' ||
                formData.email === '' ||
                formData.user_role === ''


            ) {


                return;
            }
        }

        const formDataMethod = new FormData();
        for (const key in formData) {
            if (key == 'unit_id') {
                formDataMethod.append(key, JSON.stringify(formData[key]))
            } else {
                formDataMethod.append(key, formData[key]);
            }
        }



        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch(`https://custom3.mystagingserver.site/mtrecords/public/api/admin/user-add-edit/${id}`, {
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
                data?.status ? setSuccessStatus(data?.msg) : setSuccessStatus(data?.msg)
                setStatus(data?.status)
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");

            })
    };


    useEffect(() => {
        getUserData()
        fectchBrandData()
        fetchUnitData()
        setFormData({
            ...formData, unit_id: editBrandList
        })
    }, [])

    const userRole = [
        {
            code: 1,
            name: 'Lead'
        },
        {
            code: 2,
            name: 'Executive'
        },
        {
            code: 3,
            name: 'Sub Executive'
        }
    ]

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name == 'user_role' && value == 2 || name == 'user_role' && value == 4) {
            setPermission(true)
        }

        if (name == 'user_role' && value == 1 || name == 'user_role' && value == 3) {
            setPermission(false)
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

    };


    return (
        <>
            <DashboardLayout>
                <div className="dashCard mb-4">
                    <div className="row mb-3">
                        <div className="col-12 mb-2">
                            <h2 className="mainTitle">
                                <BackButton />
                                Edit User Detail
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
                                                    label='User Name'
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
                                                    label='Email'
                                                    required
                                                    disabled
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
                                                    label='Password'
                                                    id='password'
                                                    type='password'
                                                    placeholder='Enter password'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <SelectBox
                                                    selectClass="mainInput"
                                                    name="user_role"
                                                    label="User Role"
                                                    required
                                                    value={formData?.user_role}
                                                    option={initalRole}
                                                    onChange={handleChange}
                                                />

                                            </div>
                                            {
                                                permission && (
                                                    <div className="col-md-4 mb-4">
                                                        <SelectBox
                                                            selectClass="mainInput"
                                                            name="permission"
                                                            label="Permission"
                                                            required
                                                            value={formData.permission}
                                                            option={userRole}
                                                            onChange={handleChange}
                                                        />

                                                    </div>
                                                )
                                            }
                                            <div className="col-md-4 mb-4">
                                                <div class="inputWrapper">
                                                    <label class="mainLabel">Edit Units<span>*</span></label>
                                                    <Select
                                                        value={formData?.unit_id}
                                                        isMulti
                                                        required
                                                        options={SelectOptions}
                                                        onChange={handleChangeSelect}
                                                    />
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
                <CustomModal status={status} show={showModal} close={() => { setShowModal(false); goBack() }} success heading={successStatus} />

            </DashboardLayout>
        </>
    );
};

