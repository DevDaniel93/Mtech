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
        unit_id: [],
        user_role: '',
        show_reports: '',
        sub_unit_id: []
    });
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1)
    };







    // Assuming formData.unit_id and initialunit are arrays of objects
    var SelectOptions = [];

    if (initialunit.length > 0) {
        SelectOptions = initialunit?.filter(item => {
            // Check if the item.id is not present in formData.unit_id
            return !formData?.unit_id?.some(data => data?.value == item?.id);
        });
    }



    const SelectOptionsFilter = []
    for (const key in SelectOptions) {
        if (SelectOptions.hasOwnProperty(key)) {
            const item = SelectOptions[key];

            const option = {
                label: item.name,
                value: item.id,
            };


            SelectOptionsFilter.push(option);


        }
    }



    var SelectSubOptions = [];

    if (initialunit.length > 0) {
        SelectSubOptions = initialunit?.filter(item => {
            // Check if the item.id is not present in formData.unit_id
            return !formData?.sub_unit_id?.some(data => data?.value == item?.id);
        });
    }


    const SelectOptionsSubFilter = []
    for (const key in SelectSubOptions) {
        if (SelectSubOptions.hasOwnProperty(key)) {
            const item = SelectSubOptions[key];

            const option = {
                label: item.name,
                value: item.id,
            };


            SelectOptionsSubFilter.push(option);


        }
    }


    console.log("SelectOptions", SelectOptionsFilter);
    console.log("filter", formData?.unit_id)

    const handleChangeSelect = (selected) => {
        setFormData({
            ...formData, unit_id: selected
        })
    };


    const handleChangeSubSelect = (selected) => {
        setFormData({
            ...formData, sub_unit_id: selected
        })
    };


    const prevSelectOptions = []
    for (const key in initialunit) {
        if (initialunit.hasOwnProperty(key)) {
            const item = initialunit[key];

            const option = {
                value: item.id,
                label: item.name,
            };

            prevSelectOptions.push(option);
        }
    }


    const handleChangePrevSubSelect = (selectedData) => {
        setFormData({
            ...formData, prev_unit_id: selectedData
        })
    };


    const editBrandList = [];

    const getUserData = () => {
        const LogoutData = localStorage.getItem('login');
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/get-user/${id}`,
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
                setFormData(data?.users);
                data?.users?.permission != null ? setPermission(true) : setPermission(false)
                // const abac = SelectOptions.filter(dataItem => data?.users?.unit_id?.includes(dataItem.id))



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
            if (key == 'unit_id' || key == 'sub_unit_id' || key == 'prev_unit_id') {
                formDataMethod.append(key, JSON.stringify(formData[key]))
            } else {
                formDataMethod.append(key, formData[key]);
            }
        }



        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/user-add-edit/${id}`, {
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

    const roleData = [
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
    const [userRole, setUserRole] = useState(roleData)

    const [checkpermission, setCheckPermission] = useState(false);

    console.log("checkpermission", checkpermission)



    const handleChange = (event) => {
        const { name, value, checked } = event.target;
        setUserRole(roleData)
        if (name === 'currently_working_check') {
            setFormData((prevData) => ({
                ...prevData,
                currently_working_check: checked,
            }));

            setCheckPermission(checked);
        }

        else if (name == 'user_role' && value == 2 || name == 'user_role' && value == 4 || name == 'user_role' && value == 11) {
            setPermission(true);
        } else if (name === 'user_role' && (value === '1' || value === '3' || value === '6' || value === '7' || value === '8')) {
            setPermission(false);
        } else if (name == 'user_role' && value == 9 || name == 'user_role' && value == 10) {
            setUserRole([roleData[1]])
            setPermission(true);
        }


        if (name === 'currently_working_check' && !checked) {
            setFormData((prevData) => ({
                ...prevData,
                currently_working_check: false,
            }));
            setCheckPermission(false);
        }

        // For other input fields, update the form data
        if (name !== 'currently_working_check') {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                leave_date: '',
            }));
        }
        console.log(formData);
    };


    const handleChecked = (event) => {
        console.log('date', formData?.leave_date)
        const { name, checked } = event.target;

        // Update formData based on the checkbox state
        setFormData((prevData) => ({
            ...prevData,
            show_reports: checked ? 1 : 0,
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
                                            {/* <div className="col-md-4 mb-4">
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
                                            </div> */}
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
                                                        options={SelectOptionsFilter}
                                                        onChange={handleChangeSelect}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-4 mb-4">
                                                <div class="inputWrapper">
                                                    <label class="mainLabel">Edit Sub Units</label>
                                                    <Select
                                                        value={formData?.sub_unit_id}
                                                        isMulti
                                                        options={SelectOptionsSubFilter}
                                                        onChange={handleChangeSubSelect}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-4 mb-4">
                                                <div class="inputWrapper">
                                                    <label class="mainLabel">Edit Previous Units</label>

                                                    <Select
                                                        value={formData?.prev_unit_id}
                                                        isMulti
                                                        options={prevSelectOptions}
                                                        onChange={handleChangePrevSubSelect}
                                                    />
                                                </div>
                                            </div>




                                            <div className="col-md-4 mb-4">
                                                <CustomInput
                                                    label='Joining Date'
                                                    required
                                                    id='joining_date'
                                                    type='date'
                                                    placeholder='Joining Date'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="join_date"
                                                    value={formData.join_date}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            {/* if user Want to uncheck doit   */}


                                            <div className="col-md-4 mb-4">
                                                Currently Working
                                                <input
                                                    className="m-lg-2"
                                                    onClick={handleChange}
                                                    type="checkbox"
                                                    id="currently_working_check"
                                                    name="currently_working_check"
                                                    // checked={checkpermission}
                                                    checked={formData?.currently_working_check}

                                                />
                                            </div>

                                            <div className="col-md-4 mb-4">
                                                Show Reports
                                                <input
                                                    className="m-lg-2"
                                                    onChange={handleChecked}
                                                    type="checkbox"
                                                    id="show_reports"
                                                    name="show_reports"
                                                    checked={formData?.show_reports == 1 ? true : false}
                                                />
                                            </div>

                                            {formData?.currently_working_check === false ? (<div className="col-md-4 mb-4">
                                                <CustomInput
                                                    label='Leaving Date'
                                                    required
                                                    id='joining_date'
                                                    type='date'
                                                    placeholder='Leaving Date'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="leave_date"
                                                    value={formData.leave_date}
                                                    onChange={handleChange}
                                                />
                                            </div>) : ""}

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

