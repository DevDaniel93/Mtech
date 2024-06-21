import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomButton from "../../Components/CustomButton";
import CustomTable from "../../Components/CustomTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChain, faEdit } from "@fortawesome/free-solid-svg-icons";
import { SelectBox } from "../../Components/CustomSelect";

export const QaDetail = () => {

    const { id } = useParams();



    const [lead, setLead] = useState({});

    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [showModal4, setShowModal4] = useState(false);
    const [message, setMessage] = useState(false)
    const [statusBox, setStatusBox] = useState(false);
    const LogoutData = localStorage.getItem('login');


    const inActive = () => {
        setShowModal(false)
        setShowModal2(true)
    }
    const Active = () => {
        setShowModal3(false)
        setShowModal4(true)
    }

    const AccountData = () => {
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/getQAAccountData?id=${id}`,
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


                setLead(data?.data)

            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");

            })
    }

    useEffect(() => {

        document.title = 'Mt Records | QA Management Detail';
        AccountData()
        statusList()
    }, [id]);


    const [commentBox, setCommentBox] = useState(false)
    const [formData, setFormData] = useState({})

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        console.log(formData)
    };


    const openComment = () => {
        setCommentBox(true);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const formDataMethod = new FormData();
        for (const key in formData) {
            formDataMethod.append(key, formData[key]);
        }
        formDataMethod.append('id', id);

        document.querySelector('.loaderBox').classList.remove("d-none");
        // Make the fetch request
        fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/addQAAccountComment`, {
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
                AccountData()
                // data?.status ? setSuccessStatus(data?.msg) : setSuccessStatus(data?.msg)
                // setShowModal(true)
                // setStatus(data?.status)

            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");

            })
    };


    const handleStatusSubmit = (event) => {
        event.preventDefault();

        const formDataMethod = new FormData();
        for (const key in formData) {
            formDataMethod.append(key, formData[key]);
        }

        formDataMethod.append('id', id);


        document.querySelector('.loaderBox').classList.remove("d-none");
        // Make the fetch request
        fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/updateQAAccountStatus`, {
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
                setStatusBox(false)
                console.log(data)
                AccountData()

            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");

            })
    };


    const orderHead = [
        {
            key: "id",
            title: "S.No",
        },
        {
            key: "product",
            title: "Product Name",
        },
        {
            key: "username",
            title: "Customer Name",
        },
        {
            key: "desc",
            title: "Description",
        },
        {
            key: "unit",
            title: "Unit",
        },
        {
            key: "brand",
            title: "Brand",
        },
        {
            key: "date",
            title: "Date",
        },
        {
            key: "qr",
            title: "Quoted Amount",
        },
        {
            key: "ar",
            title: "Amount Recevied",
        },
        {
            key: "seles rep",
            title: "SALES REP",
        },
        {
            key: "account rep",
            title: "ACCOUNT REP",
        },

    ];


    const [status, setStatus] = useState();




    const statusList = () => {
        const LogoutData = localStorage.getItem('login');
        document.querySelector('.loaderBox').classList.remove("d-none");

        fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/getQAAccountStatus`,
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
                setStatus(data?.data)
                console.log('status', data?.data)
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");

            })

    }


    return (
        <>
            <DashboardLayout>
                <div className="dashCard mb-4">
                    <div className="row mb-3">
                        <div className="col-12 mb-2">
                            <h2 className="mainTitle">
                                <BackButton />
                                QA Details
                            </h2>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Customer Name:</p>
                                    <p>{lead?.customer_name}</p>


                                </div>
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Email Address:</p>
                                    <p>{lead?.customer_email}</p>


                                </div>
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Total Amount</p>
                                    <p>{`$${lead?.all_payments}`}</p>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Sales Rep</p>
                                    <p>{lead?.salesrep?.name}</p>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Account Rep</p>
                                    <p>{lead?.accountrep?.name}</p>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Unit</p>
                                    <p>{ lead?.account_units && lead.account_units.map((unit, index) => {
                                        const unitName = unit?.unit?.name; // Store unit name for clarity

                                        if (!unitName) return; // Handle potential null unitName

                                        return `${unitName} ${index === lead.account_units.length - 1 ? '' : '  |  '}`;
                                    })}</p>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Status</p>
                                    <p className={lead?.accountstatus?.name == 'In Progress' ? 'text-success' : lead?.accountstatus?.name == 'Completed' ? 'text-success' : lead?.accountstatus?.name == 'Out of Contact' ? 'text-warning' : lead?.accountstatus?.name == 'Disputed' ? 'text-danger' : 'text-danger'}>  <button type="button" className="bg-transparent border-0" onClick={() => { setStatusBox(true); }}>  <FontAwesomeIcon icon={faEdit} style={{ decoration: 'line-through' }} /></button> {lead?.accountstatus?.name}</p>

                                </div>

                                <div className="col-md-12 mb-5">
                                    <h6>Order History:</h6>

                                    <CustomTable
                                        headers={orderHead}

                                    >
                                        <tbody>
                                            {lead?.leads?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td className="text-capitalize">
                                                        {item?.product}
                                                    </td>
                                                    <td className="text-capitalize">
                                                        {item?.name}
                                                    </td>

                                                    {/* <td>{item?.username}</td> */}
                                                    {/* <td className="emailFiled"><span>{item?.email}</span></td> */}
                                                    <td>{item?.description}</td>
                                                    <td>{item?.unitdetail?.name}</td>
                                                    <td>{item?.getbrand?.name}</td>
                                                    <td>{item?.date}</td>
                                                    <td>{`$${item?.quoted_amount}`}</td>
                                                    <td>{`$${item?.received}`}</td>
                                                    <td>{item?.salesrep?.name}</td>
                                                    <td>{item?.accountrepdetail === null ? 'No Account Rep' : item?.accountrepdetail?.name}</td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </CustomTable>
                                </div>

                                <div className="col-md-12 mb-4">
                                    <div className="d-flex align-items-center gap-3 mb-4">
                                        <h6>Comments:</h6>
                                        <button type="button" className="customButton primaryButton" onClick={openComment}><FontAwesomeIcon icon={faEdit} ></FontAwesomeIcon> Add Comment</button>
                                    </div>

                                    <div className="commentAreaBox">
                                        {lead?.comments && lead?.comments?.map((item, index) => (
                                            <div className="commentData shadow p-2 mb-4 rounded-4">
                                                <h6>{item?.user_name}</h6>
                                                <p>{item?.comment}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>

                <CustomModal show={commentBox} close={() => { setCommentBox(false) }} handleSubmit={handleSubmit}>

                    <label className="mainLabel">Write Comment</label>
                    <textarea name="comment" required className="mainInput" rows={6} onChange={handleChange}>

                    </textarea>

                    <CustomButton variant='primaryButton' text='Submit' type='submit' />

                </CustomModal>
                <CustomModal show={showModal} close={() => { setShowModal(false) }} action={inActive} heading='Are you sure you want to mark this user as inactive?' />
                <CustomModal show={showModal2} close={() => { setShowModal2(false) }} success heading='Marked as Inactive' />

                <CustomModal show={showModal3} close={() => { setShowModal3(false) }} action={Active} heading='Are you sure you want to mark this user as Active?' />
                <CustomModal show={showModal4} close={() => { setShowModal4(false) }} success heading='Marked as Active' />

                <CustomModal show={statusBox} close={() => { setStatusBox(false) }} handleSubmit={handleStatusSubmit}>


                    <SelectBox
                        selectClass="mainInput"
                        name="status"
                        label="Account Status"
                        required
                        option={status}
                        onChange={handleChange}
                    />
                    <CustomButton variant='primaryButton' text='Submit' type='submit' />

                </CustomModal>
            </DashboardLayout>


        </>
    );
};

