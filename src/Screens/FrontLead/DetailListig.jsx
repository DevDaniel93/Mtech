import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomButton from "../../Components/CustomButton";
import FormatDateTime from "../../Components/DateFormate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export const FrontDetailListing = () => {

    const { id } = useParams();



    const [lead, setLead] = useState({});

    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [showModal4, setShowModal4] = useState(false);
    const LogoutData = localStorage.getItem('login');
    const [message, setMessage] = useState(false)
    const [formData, setFormData] = useState({})


    const inActive = () => {
        setShowModal(false)
        setShowModal2(true)
    }
    const Active = () => {
        setShowModal3(false)
        setShowModal4(true)
    }


    const detailLeadData = () => {
        fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/getFrontLeadView?code=${id}`,
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

        document.title = 'Mt Records | Lead Management Detail';
        document.querySelector('.loaderBox').classList.remove("d-none");
        detailLeadData();
    }, [id]);


    const openComment = () => {
        setCommentBox(true);
    }


    const [commentBox, setCommentBox] = useState(false)



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
        formDataMethod.append('code', id);

        document.querySelector('.loaderBox').classList.remove("d-none");
        // Make the fetch request
        fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/addFrontLeadComment`, {
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
                detailLeadData();

            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");

            })
    };

    return (
        <>
            <DashboardLayout>
                <div className="dashCard mb-4">
                    <div className="row mb-3">
                        <div className="col-12 mb-2">
                            <h2 className="mainTitle">
                                <BackButton />
                                Front Lead Details
                            </h2>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12">



                            <div className="row">
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Lead Code:</p>
                                    <p>{lead?.code}</p>


                                </div>
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Date:</p>
                                    <p>{lead?.date}</p>


                                </div>
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Source Name</p>
                                    <p>{lead?.source?.name}</p>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Service Name</p>
                                    <p>{lead?.service}</p>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Email Address</p>
                                    <p>{lead?.email}</p>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Name</p>
                                    <p>{lead?.name}</p>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Phone No</p>
                                    <p>{lead?.phone}</p>

                                </div>
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Amount</p>
                                    <p>{`$ ${lead?.amount}`}</p>

                                </div>
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Date</p>
                                    <p>{`${lead?.date}`}</p>

                                </div>
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Coverted Date</p>
                                    <p>{lead?.date_converted}</p>


                                </div>
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Unit Name</p>
                                    <p>{lead?.unit?.name}</p>

                                </div>
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Brand Name</p>
                                    <p>{lead?.brand?.name}</p>

                                </div>
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Agent</p>
                                    <p>{lead?.agent?.name}</p>

                                </div>
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Allocated To</p>
                                    <p>{lead?.allocated_to?.name}</p>

                                </div>
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Region</p>
                                    <p>{lead?.region?.name}</p>
                                </div>

                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Status</p>
                                    <p>{lead?.status?.name}</p>
                                </div>

                                <div className="col-md-12 mb-4">
                                    <div className="d-flex align-items-center gap-3 mb-4">
                                        <h6>Comments:</h6>
                                        {/* <button type="button" className="customButton primaryButton" onClick={openComment}><FontAwesomeIcon icon={faEdit} ></FontAwesomeIcon> Add Comment</button> */}
                                    </div>

                                    <div className="commentAreaBox">
                                        {lead?.comments && lead?.comments?.map((item, index) => (
                                            <div className="commentData shadow p-2 mb-4 rounded-4">
                                                <div className="dateTime d-flex align-items-center gap-3 mb-2">
                                                    <h6 className="mb-0">{item?.user_name}</h6>
                                                    <FormatDateTime isoDateString={item?.created_at} />
                                                </div>
                                                <p>{item?.comment}</p>

                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <CustomModal show={showModal} close={() => { setShowModal(false) }} action={inActive} heading='Are you sure you want to mark this user as inactive?' />
                <CustomModal show={showModal2} close={() => { setShowModal2(false) }} success heading='Marked as Inactive' />

                <CustomModal show={showModal3} close={() => { setShowModal3(false) }} action={Active} heading='Are you sure you want to mark this user as Active?' />
                <CustomModal show={showModal4} close={() => { setShowModal4(false) }} success heading='Marked as Active' />


                <CustomModal show={commentBox} close={() => { setCommentBox(false) }} handleSubmit={handleSubmit}>

                    <label className="mainLabel">Write Comment</label>
                    <textarea name="comment" required className="mainInput" rows={6} onChange={handleChange}>

                    </textarea>

                    <CustomButton variant='primaryButton' text='Submit' type='submit' />

                </CustomModal>
            </DashboardLayout>
        </>
    );
};

