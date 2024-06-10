import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faEye, faCheck, faTimes, faFilter, faEdit, faTrash, faCopy, faMagnifyingGlass, faFile, faRefresh, faChain } from "@fortawesome/free-solid-svg-icons";


import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import CustomTable from "../../Components/CustomTable";
import CustomModal from "../../Components/CustomModal";
import { Dropdown } from "react-bootstrap";

import CustomPagination from "../../Components/CustomPagination"
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";

import { SelectBox } from "../../Components/CustomSelect";
// import "./style.css";

export const AccountManagement = () => {
    window.close();
    const [permission, setPermission] = useState()
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({})
    const [showModal, setShowModal] = useState(false);
    const [desc, setDesc] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const [showtable, setShowtable] = useState(false)
    const [clear, setClear] = useState(false)

    const [extra_data, setExtra_Data] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(100);
    const [inputValue, setInputValue] = useState('');
    const [copied, setCopied] = useState(false)
    const [copiedId, setCopiedId] = useState(null);
    const navigate = useNavigate();
    const LogoutData = localStorage.getItem('login');

    console.log("itemsPerPage", itemsPerPage)


    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        leadlist(pageNumber)
    };





    // const filterData = data?.filter(item =>
    //   item?.name.toLowerCase().includes(inputValue.toLowerCase())
    // );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

    const [unit, setUnit] = useState({});
    const [totalRecord, setTotalRecord] = useState();




    const searchType = [
        {
            code: 'account_rep',
            name: 'Account Rep'
        },
        {
            code: 'sales_rep',
            name: 'Sales Rep'
        },
        {
            code: 'customer',
            name: 'Customer'
        },
        {
            code: 'status',
            name: 'Status'
        },
    ]


    const searchData = (e) => {
        e.preventDefault();
        const LogoutData = localStorage.getItem('login');
        document.querySelector('.loaderBox').classList.remove("d-none");

        fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/getAccountsData?search=${formData?.search}&page=1&search_type=${formData?.search_type}${formData?.search_type == 'status' ? `&status=${formData?.status}` : ''}`,
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
                return (
                    response.json()

                )
            }

            )

            .then((data) => {

                document.querySelector('.loaderBox').classList.add("d-none");

                setData(data?.data?.data);
                setTotalRecord(data?.total_records);

                setExtra_Data(data?.extra_fileds)
                setPermission(data?.permission)
                setClear(true)

            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                setShowtable(false)
            })

    }


    const leadlist = (page) => {
        const LogoutData = localStorage.getItem('login');
        document.querySelector('.loaderBox').classList.remove("d-none");

        fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/getAccountsData?page=${page}`,
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
                return (
                    response.json()

                )
            }

            )

            .then((data) => {

                document.querySelector('.loaderBox').classList.add("d-none");

                setData(data?.data?.data);
                setTotalRecord(data?.total_records);

                setExtra_Data(data?.extra_fileds)
                setPermission(data?.permission)
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");

            })

    }




    console.log("showtable", showtable)



    const [statusList, setStatusList] = useState();
    const getStatus = () => {
        const LogoutData = localStorage.getItem('login');
        document.querySelector('.loaderBox').classList.remove("d-none");

        fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/getAccountStatus`,
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
                return (
                    response.json()
                )
            })

            .then((data) => {

                document.querySelector('.loaderBox').classList.add("d-none");

                setStatusList(data?.data);
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");

            })

    }


    useEffect(() => {
        document.title = 'Mt Records | Account Management';
        leadlist()
        getStatus()

    }, []);















    const AccountHeaders = [
        {
            key: "id",
            title: "S.No",
        },
        {
            key: "username",
            title: "Customer Name",
        },
        {
            key: "email",
            title: "Email Address",
        },
        // {
        //     key: "desc",
        //     title: "Description",
        // },
        {
            key: "toal",
            title: "Total Amount",
        },
        {
            key: "seles rep",
            title: "SALES REP",
        },
        {
            key: "account rep",
            title: "ACCOUNT REP",
        },
        {
            key: "status",
            title: "Status",
        },
        {
            key: "action",
            title: "Action",
        },

    ];


    const clearFilter = () => {

        setClear(false);
        window.location.reload()
    };




    const YearList = [
        {
            code: 2020,
            name: '2020'
        }, {
            code: 2021,
            name: '2021'
        },
        {
            code: 2022,
            name: '2022'
        },
        {
            code: 2023,
            name: '2023'
        },
        {
            code: 2024,
            name: '2024'
        }

    ]



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
            name: 'October'
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



    const fetchUnitData = () => {

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

    useEffect(() => {
        fetchUnitData()
    }, [])


    const [commentBox, setCommentBox] = useState(false)
    const openComment = (commentID) => {
        setCommentBox(true);
        setFormData({
            ...formData,
            id: commentID
        })
    }






    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        console.log(formData)
    };


    const handleSubmit = (event) => {
        event.preventDefault();

        const formDataMethod = new FormData();
        for (const key in formData) {
            formDataMethod.append(key, formData[key]);
        }


        document.querySelector('.loaderBox').classList.remove("d-none");
        // Make the fetch request
        fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/addAccountComment`, {
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
                setCommentBox(false)
                // data?.status ? setSuccessStatus(data?.msg) : setSuccessStatus(data?.msg)
                // setShowModal(true)
                // setStatus(data?.status)

            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");

            })
    };




    return (
        <>
            <DashboardLayout>
                <div className="container-fluid">
                    <div className="row mb-3">
                        <div className="col-12">
                            <div className="dashCard">
                                <div className="row mb-0">
                                    <div className="col-md-2 mb-2">
                                        <h2 className="mainTitle">Account Management</h2>
                                    </div>
                                    <div className="col-md-10 mb-2">
                                        <div className="row align-items-center">
                                            <div className="col-md-12">
                                                <form onSubmit={searchData}>
                                                    <div className="row align-items-end justify-content-end ">
                                                        <div className="col-md-2 mb-2">

                                                            <CustomInput type="text"
                                                                placeholder="Search Here..."
                                                                label="Search"
                                                                name="search"
                                                                inputClass="mainInput"
                                                                // required
                                                                onChange={handleChange} />
                                                        </div>
                                                        <div className="col-md-2 mb-2">

                                                            <SelectBox
                                                                selectClass="mainInput"
                                                                name="search_type"
                                                                label="Search Type"
                                                                required
                                                                value={formData.search_type}
                                                                option={searchType}
                                                                onChange={(event) => {
                                                                    setFormData({ ...formData, search_type: event.target.value });

                                                                }}
                                                            />

                                                        </div>

                                                        {
                                                            formData?.search_type == 'status' ? (
                                                                <div className="col-md-2 mb-2">

                                                                    <SelectBox
                                                                        selectClass="mainInput"
                                                                        name="status"
                                                                        label="Select Status"
                                                                        required
                                                                        value={formData.status}
                                                                        option={statusList}
                                                                        onChange={(event) => {
                                                                            setFormData({ ...formData, status: event.target.value });

                                                                        }}
                                                                    />

                                                                </div>
                                                            ) : ''
                                                        }

                                                        <div className="col-md-1 px-md-0 mb-2">
                                                            {
                                                                clear && (
                                                                    <button className="clearFilter bg-transparent border-0" onClick={clearFilter}><FontAwesomeIcon icon={faRefresh}></FontAwesomeIcon></button>
                                                                )
                                                            }
                                                            <CustomButton variant='primaryButton' className="searchBtn" type='submit' icon={faMagnifyingGlass} />
                                                        </div>

                                                    </div>
                                                </form>

                                            </div>



                                        </div>

                                    </div>


                                </div>
                                <div className="align-items-end row mb-0 border-bottom pb-0">



                                    {/* <div className="col-md-5 ">
                    <div className="row align-items-end md-0">

                    </div>
                  </div> */}

                                </div>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <CustomTable
                                            headers={AccountHeaders}

                                        >
                                            <tbody>
                                                {data?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td className="text-capitalize">
                                                            {item?.customer_name}
                                                        </td>

                                                        {/* <td>{item?.username}</td> */}
                                                        <td className="emailFiled"><span>{item?.customer_email}</span></td>
                                                        {/* <td className="descField"><span onClick={() => { showDescription(item?.descriptions) }} className="btnLabel">Show Description</span></td> */}
                                                        <td>{`$${item?.all_payments}`}</td>
                                                        <td>{item?.salesrep?.name}</td>
                                                        <td>{item?.accountrep === null ? 'No Account Rep' : item?.accountrep?.name}</td>
                                                        <td className={item?.accountstatus?.name == 'In Progress' ? 'text-success' : item?.accountstatus?.name == 'Completed' ? 'text-success' : item?.accountstatus?.name == 'Out of Contact' ? 'text-warning' : item?.accountstatus?.name == 'Disputed' ? 'text-danger' : 'text-danger'}>{item?.accountstatus?.name}</td>
                                                        <td className="">
                                                            <Link to={`/account-management/account-detail/${item?.id}`} className="">
                                                                <FontAwesomeIcon icon={faEye} className="tableActionIcon text-dark" />

                                                            </Link>
                                                            {/* <Dropdown className="tableDropdown">
                                                                <Dropdown.Toggle variant="transparent" className="notButton classicToggle">
                                                                    <FontAwesomeIcon icon={faEllipsisV} />
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu align="end" className="tableDropdownMenu">
                                                                    <button type="button" className="tableAction" onClick={() => { openComment(item?.id) }}>  <FontAwesomeIcon icon={faEdit} style={{ decoration: 'line-through' }} /> Write Comment </button>

                                                                    <div>
                                                                        
                                                                    </div>
                                                                </Dropdown.Menu>
                                                            </Dropdown> */}

                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </CustomTable>
                                        <CustomPagination
                                            itemsPerPage={itemsPerPage}
                                            totalItems={totalRecord}
                                            currentPage={currentPage}
                                            onPageChange={handlePageChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <CustomModal show={showModal} close={() => { setShowModal(false) }}>
                        <h6 className="font-weight-bold">Description:</h6>
                        <ul>
                            {desc &&
                                desc.map((description, index) => (
                                    <li key={index}>{description.split(', ').join('\n')}</li>
                                ))}
                        </ul>

                    </CustomModal>

                    <CustomModal show={commentBox} close={() => { setCommentBox(false) }} handleSubmit={handleSubmit}>

                        <label className="mainLabel">Write Comment</label>
                        <textarea name="comment" required className="mainInput" rows={6} onChange={handleChange}>

                        </textarea>

                        <CustomButton variant='primaryButton' text='Submit' type='submit' />

                    </CustomModal>






                </div>


            </DashboardLayout>
        </>
    );
};





