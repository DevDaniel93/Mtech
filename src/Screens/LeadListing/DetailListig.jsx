import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomButton from "../../Components/CustomButton";

export const DetailListing = () => {

    const { id } = useParams();



    const [lead, setLead] = useState({});

    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [showModal4, setShowModal4] = useState(false);
    const [message, setMessage] = useState(false)


    const inActive = () => {
        setShowModal(false)
        setShowModal2(true)
    }
    const Active = () => {
        setShowModal3(false)
        setShowModal4(true)
    }

    useEffect(() => {
        const LogoutData = localStorage.getItem('login');
        document.title = 'Mt Records | Lead Management Detail';
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/view-leads/${id}`,
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
               

                setLead(data.leads)

            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
             
            })
    }, [id]);


    return (
        <>
            <DashboardLayout>
                <div className="dashCard mb-4">
                    <div className="row mb-3">
                        <div className="col-12 mb-2">
                            <h2 className="mainTitle">
                                <BackButton />
                                Lead Details
                            </h2>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12">
                        


                            <div className="row">
                                <div className="col-md-4 mb-4">
                                   <p className="secondaryText">Source Name</p>
                                   <p>{lead?.getsource?.name}</p>
                                </div>
                                <div className="col-md-4 mb-4">
                                   <p className="secondaryText">Product Name</p>
                                   <p>{lead?.product}</p>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Email Address</p>
                                    <p>{lead?.email}</p>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Customer Name</p>
                                    <p>{lead?.name}</p>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Phone No</p>
                                    <p>{lead?.phone}</p>
                                  
                                </div>
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Quoted Amount</p>
                                    <p>{`$ ${lead?.quoted_amount}`}</p>
                                    
                                </div>
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Amount Recevied</p>
                                    <p>{`$ ${lead?.received}`}</p>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Amount Recovery</p>
                                    <p>{`$ ${lead?.recovery}`}</p>
                                
                                </div>
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Brand Name</p>
                                    <p>{lead?.getbrand?.name}</p>
                                   

                                </div>
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Unit Name</p>
                                    <p>{lead?.unitdetail?.name}</p>
                                
                                </div>
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Account Rep</p>
                                    <p>{lead?.accountrepdetail?.name}</p>
                                
                                </div>
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Sales Rep</p>
                                    <p>{lead?.salesrep?.name}</p>
                                
                                </div>
                                <div className="col-md-8 mb-4">
                                   <p className="secondaryText">Description:</p>
                                   <p>{lead?.description}</p>


                                </div>
                                <div className="col-md-8 mb-4">
                                   <p className="secondaryText">LEAD Code:</p>
                                   <p>{lead?.code}</p>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <CustomModal show={showModal} close={() => { setShowModal(false) }} action={inActive} heading='Are you sure you want to mark this user as inactive?' />
                <CustomModal show={showModal2} close={() => { setShowModal2(false) }} success heading='Marked as Inactive' />

                <CustomModal show={showModal3} close={() => { setShowModal3(false) }} action={Active} heading='Are you sure you want to mark this user as Active?' />
                <CustomModal show={showModal4} close={() => { setShowModal4(false) }} success heading='Marked as Active' />
            </DashboardLayout>
        </>
    );
};

