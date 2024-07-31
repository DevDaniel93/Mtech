import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

// import dashboard from '../../'
import { useNavigate } from "react-router-dom";
import {
  Brands,
  ChargeBack,
  Leads,
  Merchant,
  Permission,
  Purchase,
  Refund,
  report,
  Reversal,
  Roles,
  Users,
  mtechlogo,
  target,
  logput,
  dashboard
} from "../../../Assets/images";


// import target
import CustomModal from "../../CustomModal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBorderAll,
  faUser,
  faEye,
  faTasks,
  faMountainCity,
  faMoneyBill
} from "@fortawesome/free-solid-svg-icons";
import {
  faMessage,
} from "@fortawesome/free-regular-svg-icons";

import "./style.css";
import { useState, useEffect } from "react";

export const Sidebar = (props) => {

  const [permission, setPermission] = useState();
  const [isShown, setIsShown] = useState(false);
  const navigate = useNavigate()





  useEffect(() => {
    // document.title = 'Mt Records | Lead Management';
    // leadData()
    const permissionData = localStorage.getItem('rolesPermission');

    setPermission(JSON.parse(permissionData))


  }, []);



  const role = localStorage.getItem('role');
  console.log("role", role)
  console.log("permission", permission)



  const location = useLocation()
  const [status, setStatus] = useState()
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const handleClickPopup = () => {
    setShowModal(true)
    setStatus(true)
  }
  const Continue = () => {
    setShowModal(false)
    setShowModal2(true)
    setStatus(true)
  }


  const handleRedirect = () => {
    const LogoutData = localStorage.getItem('login');
    fetch(`${process.env.REACT_APP_API_URL}/public/api/auth/logout`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${LogoutData}`
        },
      },
    )
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data)
        localStorage.removeItem('login');
        localStorage.removeItem('rolesPermission');
        setStatus(data?.status)
        console.log("data?.status", data?.status)

        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      })

  }

  return (
    <>
      <img src={mtechlogo} className="mw-100 authLogo" />
      <div className={`sidebar  ${isShown ? '' : 'collapsed'} ${props.sideClass}`} id="sidebar">
        <ul className="list-unstyled" onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
          {
            role && role != 6 ? (
              <li className="sidebar-li">
                <Link className={`sideLink ${location.pathname.includes('/dashboard') ? 'active' : ''}`} to="/dashboard">
                  <span className="sideIcon">
                    {/* <FontAwesomeIcon icon={faBorderAll} /> */}
                    <img src={dashboard} className="sideBarIcon" />
                  </span>
                  <span className="sideLinkText">Dashboard</span>
                </Link>
              </li>
            ) : ''
          }
          <div>



            <li className="sidebar-li">
              {role == 1 ?
                <Link className={`sideLink ${location.pathname.includes('/permission') ? 'active' : ''}`} to="/permission">
                  <span className="sideIcon">
                    {/* <FontAwesomeIcon icon={faMessage} /> */}
                    <img src={Permission} className="sideBarIcon" />
                  </span>
                  <span className="sideLinkText">Permission</span>
                </Link> : " "}
            </li>

            <li className="sidebar-li">
              {permission?.leads?.read === true ? <Link className={`sideLink ${location.pathname.includes('/lead-listing') ? 'active' : ''}`} to="/lead-listing">
                <span className="sideIcon">
                  {/* <FontAwesomeIcon icon={faEye} /> */}
                  <img src={Leads} className="sideBarIcon" />
                </span>
                <span className="sideLinkText">Lead Management</span>
              </Link> : " "}
            </li>


            <li className="sidebar-li">
              {permission?.leads?.read === true ? <Link className={`sideLink ${location.pathname.includes('/front-lead-listing') ? 'active' : ''}`} to="/front-lead-listing">
                <span className="sideIcon">

                  <img src={Leads} className="sideBarIcon" />
                </span>
                <span className="sideLinkText">Front Lead Management</span>
              </Link> : " "}
            </li>

            <li className="sidebar-li">
              {permission?.roles?.read === true ? <Link className={`sideLink ${location.pathname.includes('/role-management') ? 'active' : ''}`} to="/role-management">
                <span className="sideIcon">
                  {/* <FontAwesomeIcon icon={faMessage} /> */}
                  <img src={Roles} className="sideBarIcon" />
                </span>
                <span className="sideLinkText">Roles Management</span>
              </Link> : ""}
            </li>


            <li className="sidebar-li">
              {permission?.roles?.read === true ? <Link className={`sideLink ${location.pathname.includes('/source-management') ? 'active' : ''}`} to="/source-management">
                <span className="sideIcon">
                  {/* <FontAwesomeIcon icon={faMessage} /> */}
                  <img src={report} className="sideBarIcon" />
                </span>
                <span className="sideLinkText">Source Management</span>
              </Link> : ""}
            </li>





            <li className="sidebar-li">
              {permission?.brands?.read === true ? <Link className={`sideLink ${location.pathname.includes('/brand-listing') ? 'active' : ''}`} to="/brand-listing">
                <span className="sideIcon">
                  {/* <FontAwesomeIcon icon={faTasks} /> */}
                  <img src={Brands} className="sideBarIcon" />
                </span>
                <span className="sideLinkText">Brand Management</span>
              </Link> : ""}
            </li>



          </div>
          {/* : ""} */}

          <li className="sidebar-li">

            {permission?.refund?.read === true ?
              <Link className={`sideLink ${location.pathname.includes('/refund-management') ? 'active' : ''}`} to="/refund-management">
                <span className="sideIcon">
                  {/* <FontAwesomeIcon icon={faEye} /> */}
                  <img src={Refund} className="sideBarIcon" />
                </span>
                <span className="sideLinkText">Refund Management</span>
              </Link> : ""}
          </li>

          {/* {role == 2 ? */}
          <div>

            <li className="sidebar-li">
              {permission?.users?.read === true ? <Link className={`sideLink ${location.pathname.includes('/user-management') ? 'active' : ''}`} to="/user-management">
                <span className="sideIcon">
                  {/* <FontAwesomeIcon icon={faUser} /> */}
                  <img src={Users} className="sideBarIcon" />
                </span>
                <span className="sideLinkText">User Management</span>
              </Link> : " "}
            </li>
            <li className="sidebar-li">
              {permission?.purchase?.read === true ? <Link className={`sideLink ${location.pathname.includes('/purchase-management') ? 'active' : ''}`} to="/purchase-management">
                <span className="sideIcon">
                  {/* <FontAwesomeIcon icon={faEye} /> */}
                  <img src={Purchase} className="sideBarIcon" />
                </span>
                <span className="sideLinkText">Purchase Management</span>
              </Link> : ""}
            </li>


            <li className="sidebar-li">
              {permission?.chargeback?.read === true ? <Link className={`sideLink ${location.pathname.includes('/chargeback-management') ? 'active' : ''}`} to="/chargeback-management">
                <span className="sideIcon">
                  {/* <FontAwesomeIcon icon={faEye} /> */}
                  <img src={ChargeBack} className="sideBarIcon" />
                </span>
                <span className="sideLinkText">Charge Back Management</span>
              </Link> : ""}
            </li>



            <li className="sidebar-li">
              {permission?.units?.read === true ? <Link className={`sideLink ${location.pathname.includes('/unit-listing') ? 'active' : ''}`} to="/unit-listing">
                <span className="sideIcon">
                  <FontAwesomeIcon icon={faMountainCity} />
                </span>
                <span className="sideLinkText">Unit Management</span>
              </Link> : " "}
            </li>



            <li className="sidebar-li">
              {permission?.user_reports == 'true' ? <Link className={`sideLink ${location.pathname.includes('/user-report-management') ? 'active' : ''}`} to="/user-report-management">
                <span className="sideIcon">
                  <img src={report} className="sideBarIcon" />
                </span>
                <span className="sideLinkText">User Report Management</span>
              </Link> : " "}
            </li>


          </div>
          {/* : ""} */}



          {/* {role == 3 ? */}
          <div>






            <li className="sidebar-li">
              {permission?.reversal.read === true ? <Link className={`sideLink ${location.pathname.includes('/reversal-management') ? 'active' : ''}`} to="/reversal-management">
                <span className="sideIcon">
                  {/* <FontAwesomeIcon icon={faEye} /> */}
                  <img src={Reversal} className="sideBarIcon" />
                </span>
                <span className="sideLinkText">Reversal Management</span>
              </Link> : ""}
            </li>



            <li className="sidebar-li">
              {permission?.unit_report === 'true' ? <Link className={`sideLink ${location.pathname.includes('/unit-report-management') ? 'active' : ''}`} to="/unit-report-management">
                <span className="sideIcon">
                  {/* <FontAwesomeIcon icon={faMoneyBill} /> */}
                  <img src={report} className="sideBarIcon" />
                </span>
                <span className="sideLinkText">Unit Reports</span>
              </Link> : ""}
            </li>
          </div>
          {/* : ""} */}


          {/* {role == 1 ?  */}
          <div>


            <li className="sidebar-li">
              {permission?.merchant.read === true ? <Link className={`sideLink ${location.pathname.includes('/merchant-management') ? 'active' : ''}`} to="/merchant-management">
                <span className="sideIcon">
                  {/* <FontAwesomeIcon icon={faMountainCity} /> */}
                  <img src={Merchant} className="sideBarIcon" />
                </span>
                <span className="sideLinkText">Merchant Management</span>
              </Link> : " "}
            </li>
            <li className="sidebar-li">

              {permission?.unit_targets?.read === true || permission?.user_targets?.read === true ?
                <Link className={`sideLink ${location.pathname.includes('/target-listing') ? 'active' : ''}`} to="/target-listing">
                  <span className="sideIcon">
                    {/* <FontAwesomeIcon icon={faMoneyBill} /> */}
                    {/*  */}
                    <img src={target} className="sideBarIcon" />
                  </span>
                  <span className="sideLinkText">Targets</span>
                </Link> : ''}
            </li>


            <li className="sidebar-li">
              {permission?.report === 'true' ? <Link className={`sideLink ${location.pathname.includes('/report-management') ? 'active' : ''}`} to="/report-management">
                <span className="sideIcon">
                  {/* <FontAwesomeIcon icon={faMoneyBill} /> */}
                  <img src={report} className="sideBarIcon" />
                </span>
                <span className="sideLinkText">Report Management</span>
              </Link> : " "}
            </li>

            <li className="sidebar-li">
              {permission?.account_management === 'true' ? <Link className={`sideLink ${location.pathname.includes('/account-management') ? 'active' : ''}`} to="/account-management">
                <span className="sideIcon">
                  {/* <FontAwesomeIcon icon={faMoneyBill} /> */}
                  <img src={Purchase} className="sideBarIcon" />
                </span>
                <span className="sideLinkText">Account Management</span>
              </Link> : " "}
            </li>

            <li className="sidebar-li">
              {permission?.qa_account_management == 'true' ? <Link className={`sideLink ${location.pathname.includes('/qa-management') ? 'active' : ''}`} to="/qa-management">
                <span className="sideIcon">
                  {/* <FontAwesomeIcon icon={faMoneyBill} /> */}
                  <img src={report} className="sideBarIcon" />
                </span>
                <span className="sideLinkText">QA Management</span>
              </Link> : " "}
            </li>

            <li className="sidebar-li">
              {role == '6' ? <Link className={`sideLink ${location.pathname.includes('/logs-management') ? 'active' : ''}`} to="/logs-management">
                <span className="sideIcon">
                  <img src={report} className="sideBarIcon" />
                </span>
                <span className="sideLinkText">Logs Management</span>
              </Link> : " "}
            </li>


            {/* <li className="sidebar-li">
              {permission?.brands?.read === true ? <Link className={`sideLink ${location.pathname.includes('/front-source-management') ? 'active' : ''}`} to="/front-source-management">
                <span className="sideIcon">

                  <img src={Brands} className="sideBarIcon" />
                </span>
                <span className="sideLinkText">Front Source Management</span>
              </Link> : ""}
            </li>

            <li className="sidebar-li">
              {permission?.brands?.read === true ? <Link className={`sideLink ${location.pathname.includes('/front-lead-management') ? 'active' : ''}`} to="/front-lead-management">
                <span className="sideIcon">

                  <img src={Brands} className="sideBarIcon" />
                </span>
                <span className="sideLinkText">Front Lead Status</span>
              </Link> : ""}
            </li>

            <li className="sidebar-li">
              {permission?.brands?.read === true ? <Link className={`sideLink ${location.pathname.includes('/front-region-management') ? 'active' : ''}`} to="/front-region-management">
                <span className="sideIcon">

                  <img src={Brands} className="sideBarIcon" />
                </span>
                <span className="sideLinkText">Front Region Management</span>
              </Link> : ""}
            </li>

           */}

            <li className="sidebar-li">
              {permission?.brands?.read === true ? <Link className={`sideLink ${location.pathname.includes('/spending-management') ? 'active' : ''}`} to="/spending-management">
                <span className="sideIcon">

                  <img src={Brands} className="sideBarIcon" />
                </span>
                <span className="sideLinkText">Spending Management</span>
              </Link> : ""}
            </li>

            <li className="sidebar-li">
              {permission?.report === 'true' ? <Link className={`sideLink ${location.pathname.includes('/front-report-management') ? 'active' : ''}`} to="/front-report-management">
                <span className="sideIcon">
                  {/* <FontAwesomeIcon icon={faMoneyBill} /> */}
                  <img src={report} className="sideBarIcon" />
                </span>
                <span className="sideLinkText">Front Report Management</span>
              </Link> : " "}
            </li>

            <li className="sidebar-li">
              <Link className={`sideLink ${location.pathname.includes('#') ? 'active' : ''}`} onClick={handleClickPopup} >
                <span className="sideIcon">
                  {/* <FontAwesomeIcon icon={faMoneyBill} /> */}
                  <img src={logput} className="sideBarIcon" />
                </span>
                <span className="sideLinkText">Logout</span>
              </Link>
            </li>

          </div>

        </ul>
      </div>


      <CustomModal status={status} show={showModal} close={() => { setShowModal(false) }} action={Continue} heading='Are you sure you want to logout?' />
      <CustomModal status={status} show={showModal2} close={handleRedirect} success heading='Successfully Logged Out' />
    </>
  );
};
