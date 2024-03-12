import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomButton from "../../Components/CustomButton";

export const ReversalDetail = () => {

    const { id } = useParams();



    const [user, SetUser] = useState({});

    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [showModal4, setShowModal4] = useState(false);


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
        document.title = 'Mt Records | Reversal Detail';
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/get-reversal/${id}`,
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
                SetUser(data.data)

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
                                Reversal  Details
                            </h2>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12">


                            <div className="row">
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">User Name</p>
                                    <p>{user?.reversaluser?.name}</p>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Email Address</p>
                                    <p>{user?.reversaluser?.email}</p>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Reversal Date</p>
                                    <p>{user?.reversal_date}</p>
                                </div>

                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Reversal Type</p>
                                    <p>{user?.reversal_type}</p>
                                </div>

                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Reversal Amount</p>
                                    <p>{`$ ${user?.reversal_amount}`}</p>
                                </div>

                                <div className="col-md-4 mb-4">
                                    <p className="secondaryText">Merchant</p>
                                    <p>{user?.merchantdetail?.name}</p>
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

