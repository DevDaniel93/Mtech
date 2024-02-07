import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';

import { DashboardLayout } from "./../../Components/Layout/DashboardLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowCircleDown,
} from "@fortawesome/free-solid-svg-icons";
import { CChart } from "@coreui/react-chartjs";
import { SelectBox } from "../../Components/CustomSelect";
import { useApi } from "../../Api";
import CustomModal from "../../Components/CustomModal";
import "./style.css";
import { useNavigate } from "react-router";
import Form from 'react-bootstrap/Form';
export const Permission = () => {
    const [showModal, setShowModal] = useState(false);
    const [status, setStatus] = useState()


    const [childpermission, setChildpermission] = useState(false)

    const [successStatus, setSuccessStatus] = useState('Server Error!');
    const [formData, setFormData] = useState({
        user_role: ''
    })
    const [initalRole, setrole] = useState({});
    const [initalRoles, setroles] = useState({});
    const [data, setData] = useState('');
    const [lead, setLead] = useState('');
    const [permissions, setPermission] = useState()
    const [recived, setReceived] = useState('');
    const [amount, setAmount] = useState('');
    const { apiData: leadsAmountData, loading: dataLoading } = useApi('admin/leads-amount');
    const { apiData: leadsAmountMonthlyData, loading: leadLoading } = useApi('admin/leads-amount-monthly');
    const { apiData: leadsAmountReceivedData, loading: receivedLoading } = useApi('admin/leads-amount-received');
    const { apiData: leadsAmountReceivedMonthlyData, loading: AmountLoading } = useApi('admin/leads-amount-received-monthly');
    // const [getPermission, setGetPermission] = useState([]);


    const handleCheckboxChange = (index, category, permissionKey) => {
        console.log(getpermission)
        setGetpermission((prevPermissions) => {
            const newPermissions = [...prevPermissions];
            const item = { ...newPermissions[index] };

            if (permissionKey) {
                // If a permission key is provided, toggle the corresponding permission value
                if (typeof item[category][permissionKey] === "boolean") {
                    // If it's a boolean value, toggle it
                    item[category] = { ...item[category], [permissionKey]: !item[category][permissionKey] };
                } else {
                    // If it's a string value, toggle between 'true' and 'false'
                    item[category] = { ...item[category], [permissionKey]: item[category][permissionKey] === "true" ? "false" : "true" };
                }
            } else {
                // If no permission key, toggle the entire category value
                if (typeof item[category] === "boolean") {
                    // If it's a boolean value, toggle it
                    item[category] = !item[category];
                } else {
                    // If it's a string value, toggle between 'true' and 'false'
                    item[category] = item[category] === "true" ? "false" : "true";
                }
            }

            newPermissions[index] = item;
            return newPermissions;
        });
    };


    console.log("initalRole", initalRole)


    const leadData = () => {



        const LogoutData = localStorage.getItem('login');
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch('https://custom3.mystagingserver.site/mtrecords/public/api/get-permissions?role=4&child_role=1',
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
                setData(data.leads);
                setPermission(data?.permission)
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
                console.log("data.roles", data.roles)
                setrole(data.roles);
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");

            })
    }


    const [role, setRole] = useState()
    const [childrole, setChrildrole] = useState()
    const [getpermission, setGetpermission] = useState()

    console.log("initalRoles", initalRoles)
    const fectchDATAData = () => {
        const LogoutData = localStorage.getItem('login');
        document.querySelector('.loaderBox').classList.remove("d-none");

        fetch(`https://custom3.mystagingserver.site/mtrecords/public/api/get-permissions?role=${initalRoles}&child_role=${childrole}`,
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
                console.log("data.roles", data)
                setGetpermission(data?.permissions);
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");

            })

    }


    useEffect(() => {
        fectchBrandData()

    }, [])


    useEffect(() => {

        fectchDATAData()


    }, [initalRoles, childrole])



    console.log("getpermission", getpermission)
    useEffect(() => {
        setData(leadsAmountData)
        setLead(leadsAmountMonthlyData)
        setReceived(leadsAmountReceivedData)
        setAmount(leadsAmountReceivedMonthlyData)

    }, [leadsAmountData, leadsAmountMonthlyData, leadsAmountReceivedData, leadsAmountReceivedMonthlyData])


    const LogoutData = localStorage.getItem('login');





    const handleupdate = () => {
        const formDataMethod = new FormData();
        formDataMethod.append('permissions', JSON.stringify(getpermission));

        formDataMethod.append('role', initalRoles);
        formDataMethod.append('child_role', childrole);
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch(`https://custom3.mystagingserver.site/mtrecords/public/api/permission-modifiy`, {
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
                setShowModal(true)
                setStatus(data?.status)
                data?.status ? setSuccessStatus(data?.msg) : setSuccessStatus(data?.msg)
                setStatus(data?.status)
                document.querySelector('.loaderBox').classList.add("d-none");
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");

            })
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        document.querySelector('.loaderBox').classList.remove("d-none");
        for (const key in formData) {
            if (

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

        fetch(`https://custom3.mystagingserver.site/mtrecords/public/api/admin/user-add-edit`, {
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
                // setShowModal(true)
                data?.status ? setSuccessStatus(data?.msg) : setSuccessStatus(data?.msg)
                setStatus(data?.status)
                document.querySelector('.loaderBox').classList.add("d-none");
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");

            })
    };

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
            setChildpermission(true)

            setroles(value)
            console.log("permissionname ", name)

        }
        if (name == 'permission' && value == 1 || name == 'permission' && value == 2 || name == 'permission' && value == 3) {

            setChrildrole(value)
        }

        if (name == 'user_role' && value == 1 || name == 'user_role' && value == 3) {
            setChildpermission(false)
            setroles(value)
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,

        }
        ));
    };

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1)
    };


    return (
        <>
            <DashboardLayout>
                <div className="container-fluid">

                    <div className="row mb-3">
                        <div className="col-12">
                            <div className="dashCard">
                                <div className="d-flex flex-wrap justify-content-between">
                                    <h3 className="mainTitle">Permission</h3>
                                    <div className="col-md-4 mb-4">
                                        <SelectBox
                                            selectClass="mainInput"
                                            name="user_role"
                                            label="User Role"
                                            required
                                            value={formData.user_role}
                                            option={initalRole}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {
                                        childpermission && (
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

                                </div>

                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            {/* <th>Child Role</th> */}
                                            <th>   Create</th>
                                            <th>Read</th>
                                            <th>Update</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>

                                    {
                                        getpermission &&
                                        getpermission.map((item, index) => (
                                            <tbody key={index}>
                                                {Object.entries(item).map(([category, permissions]) => (
                                                    <tr key={category}>
                                                        <td className="text-capitalize">{category}</td>
                                                        {typeof permissions === "object" ? (
                                                            Object.entries(permissions).map(([permissionKey, permissionValue], i) => (
                                                                <td key={i}>
                                                                    {typeof permissionValue === "boolean" ? (
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={permissionValue}
                                                                            onChange={() => handleCheckboxChange(index, category, permissionKey)}
                                                                        />
                                                                    ) : (
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={permissionValue.toLowerCase() === "true"}
                                                                            onChange={() => handleCheckboxChange(index, category, permissionKey)}
                                                                        />
                                                                    )}
                                                                </td>
                                                            ))
                                                        ) : (
                                                            <td>
                                                                {permissions.toLowerCase() === "true" ? (
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={true}
                                                                        onChange={() => handleCheckboxChange(index, category)}
                                                                    />
                                                                ) : (

                                                                    <input
                                                                        type="checkbox"
                                                                        checked={false}
                                                                        onChange={() => handleCheckboxChange(index, category)}
                                                                    />

                                                                )}

                                                            </td>
                                                        )}

                                                    </tr>
                                                ))}

                                                <div className="updated_table_btn mt-4">     <button onClick={handleupdate}> Update</button>
                                                </div>

                                            </tbody>

                                        ))
                                    }

                                </Table>

                            </div>
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
            </DashboardLayout >
        </>
    );
};


