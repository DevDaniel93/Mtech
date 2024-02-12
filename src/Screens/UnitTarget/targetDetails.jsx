import { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faPencil, faRemove, faTimes, faFilter, faEye } from "@fortawesome/free-solid-svg-icons";
import { useParams, Link } from "react-router-dom";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomButton from "../../Components/CustomButton";
import CustomTable from "../../Components/CustomTable";
import { SelectBox } from "../../Components/CustomSelect";
import CustomInput from "../../Components/CustomInput";
import { useApi } from "../../Api";

export const TargetDetails = () => {

    const { id } = useParams();



    const [lead, setLead] = useState({});

    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [showModal4, setShowModal4] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [leadData, setLeadData] = useState(false);
    const [formData, setFormData] = useState({});
    const [units, setUnits] = useState({});
    const { apiData: unitListing, loading: unitLoading } = useApi('admin/unit-listing');

    const unitValue = [];

    useEffect(() => {
        setUnits(unitListing?.units)
    }, [unitListing])


    for (const key in units) {
        const option = {
            code: units[key].id,
            name: units[key].name
        }

        unitValue.push(option)

    }


    const month = [
        "",
        "January",
        "Febuary",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "Octuber",
        "November",
        "December"
    ]



    const inActive = () => {
        setShowModal(false)
        setShowModal2(true)
    }
    const Active = () => {
        setShowModal3(false)
        setShowModal4(true)
    }

    const editDetailData = () => {
        const LogoutData = localStorage.getItem('login');
        document.title = 'Tim Admin | Chapter  Detail';
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch(`https://mtrecordflow.com/mtrecords-api/public/api/admin/get-unit-targets_details/${id}`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${LogoutData}`
                },
            }
        )
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                document.querySelector('.loaderBox').classList.add("d-none");
             

                setLeadData(data?.data)
                setFormData(data?.data?.current_month_target)

            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
            
            })
    }

    useEffect(() => {
        editDetailData()
    }, []);


   

    const monthList = [
        {
            code: 1,
            name: 'January'
        },
        {
            code: 2,
            name: 'Feburay'
        }, {
            code: 3,
            name: 'March'
        },
        {
            code: 4,
            name: 'April'
        },
        {
            code: 5,
            name: 'May'
        },
        {
            code: 6,
            name: 'June'
        },
        {
            code: 7,
            name: 'July'
        },
        {
            code: 8,
            name: 'August'
        },
        {
            code: 9,
            name: 'September'
        },
        {
            code: 10,
            name: 'Octuber'
        },
        {
            code: 11,
            name: 'November'
        },
        {
            code: 12,
            name: 'December'
        }
    ]

    const maleHeaders = [
        {
            key: "id",
            title: "S.No",
        },
        {
            key: "username",
            title: "Unit Name",
        },
        {
            key: "target",
            title: "Target",
        },
        // {
        //     key: "targetscore",
        //     title: "Target Score",
        // },
        {
            key: "month",
            title: "Month"
        },
        {
            key: "year",
            title: "Year"
        },
        // {
        //     key: "status",
        //     title: "Status",
        // },
        // {
        //     key: "action",
        //     title: "Action",
        // },

    ];


    const handleEdit = (event) => {
        event.preventDefault();
        const userId = leadData?.id
        const LogoutData = localStorage.getItem('login');
        fetch(`https://mtrecordflow.com/mtrecords-api/public/api/admin/unit-targets-edit/${id}`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${LogoutData}`
                },
                body: JSON.stringify(formData)
            },
        )
            .then((response) => {
                return response.json()
            })
            .then((data) => {
          
                editDetailData()
                setEditModal(false)
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
        
            })
    }



    return (
        <>
            <DashboardLayout>
                <div className="dashCard mb-4">
                    <div className="row mb-3 justify-content-between">
                        <div className="col-md-4">
                            <h2 className="mainTitle">
                                <BackButton />
                                Current Target Details
                            </h2>
                        </div>
                        <div className="col-md-3">
                            <CustomButton variant='primaryButton' text="Edit Target" onClick={() => {
                                setEditModal(true)
                                editDetailData()
                            }} />
                        </div>
                    </div>


                    {/*  <div className="col-md-4 mb-4">
                                    <p className="secondaryText">User Name:</p>
                                    <p>{leadData?.user_detail?.name}</p>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Unit Name:</p>
                                    <p>{leadData?.unit_detail?.name}</p>
                                </div> */}


                    <div className="row mb-3">
                        <div className="col-12">

                            <div className="row">
                                {/* <div className="col-md-4 mb-4">
                                    <p className="secondaryText">User Name:</p>
                                    <p>{leadData?.user_detail?.name}</p>
                                </div> */}
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Unit Name:</p>
                                    <p>{leadData?.name}</p>  
                                </div>
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Current Month Target</p>
                                    <p>{leadData?.current_month_target?.target}</p>
                                </div>
                                {/* <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Score Target</p>
                                    <p>{`$ ${leadData?.total_sales}`}</p>
                                </div> */}
                                {/* <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Score Target</p>
                                    <p>${`$ ${leadData?.score_target}`}</p>
                                </div> */}
                                {/* current_month_target */}
                                {/* <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Month</p>
                                    <p>{month[leadData?.month]}</p>
                                </div> */}



                                {/* <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Year</p>
                                    <p>{leadData?.year}</p>

                                </div> */}
                                {/* <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Total Amount</p>
                                    <p>{`$ ${leadData?.total_sales}`}</p>

                                </div> */}
                            </div>


                        </div>
                    </div>
                </div>

                <CustomModal show={showModal} close={() => { setShowModal(false) }} action={inActive} heading='Are you sure you want to mark this user as inactive?' />
                <CustomModal show={showModal2} close={() => { setShowModal2(false) }} success heading='Marked as Inactive' />

                <CustomModal show={showModal3} close={() => { setShowModal3(false) }} action={Active} heading='Are you sure you want to mark this user as Active?' />
                <CustomModal show={showModal4} close={() => { setShowModal4(false) }} success heading='Marked as Active' />

                <CustomModal show={editModal} close={() => { setEditModal(false) }} heading="Edit Target" >



                    <SelectBox
                        selectClass="mainInput"
                        name="unit_id"
                        label="Select Unit"
                        labelClass='mainLabel'
                        required
                        value={formData?.id}
                        disabled
                        option={unitValue}
                        onChange={(event) => {
                            setFormData({ ...formData, id: event.target.value });

                        }}

                    />
                    {/* <CustomInput
                        label="Score Target"
                        type="number"
                        placeholder="Score Target"
                        required
                        name="target"
                        labelClass='mainLabel'
                        inputClass='mainInput'
                        disabled

                        value={formData?.total_sales}
                        onChange={(event) => {
                            setFormData({ ...formData, total_sales: event.target.value });

                        }}


                    /> */}


                    <CustomInput
                        label="Current Month Target"
                        type="number"
                        placeholder="Current Month Target"
                        required
                        name="target"
                        labelClass='mainLabel'
                        inputClass='mainInput'
                        
                        value={parseInt(formData?.target)}
                        onChange={(event) => {
                            setFormData({ ...formData, target: event.target.value });

                        }}


                    />
                    {/* <SelectBox
                        selectClass="mainInput"
                        name="month"
                        labelClass='mainLabel'
                        label="cURRENT Month"
                        required
                        disabled
                        value={formData?.current_month_target}
                        option={monthList}
                        onChange={(event) => {
                            setFormData({ ...formData, current_month_target: event.target.value });
                        }}

                    /> */}


                    <CustomButton variant='primaryButton' text='Edit' type='button' onClick={handleEdit} />
                </CustomModal>
            </DashboardLayout>
        </>
    );
};

