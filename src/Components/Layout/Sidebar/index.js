import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

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

  const [permission, setPermission] = useState()

  const leadData = () => {
    const LogoutData = localStorage.getItem('login');
    // document.querySelector('.loaderBox').classList.remove("d-none");
    fetch('https://custom3.mystagingserver.site/mtrecords/public/api/admin/leads-listing',
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

        // document.querySelector('.loaderBox').classList.add("d-none");
        // setData(data.leads);
        setPermission(data?.permission)
      })
      .catch((error) => {
        // document.querySelector('.loaderBox').classList.add("d-none");

      })

  }

  useEffect(() => {
    // document.title = 'Mt Records | Lead Management';
    leadData()

  }, []);

  const role = localStorage.getItem('role');
  console.log("permission", permission)
  const location = useLocation()
  return (
    <div className={`sidebar ${props.sideClass}`} id="sidebar">
      <ul className="list-unstyled">
        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/dashboard') ? 'active' : ''}`} to="/dashboard">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faBorderAll} />
            </span>
            <span className="sideLinkText">Dashboard</span>
          </Link>
        </li>

        {/* {role == 1 || role == 4 ? */}
        <div>


       



        </div>
        {/* : " "} */}

        {/* {role == 1 ? */}
        <div>



        <li className="sidebar-li">
            {permission?.role === 1 ? <Link className={`sideLink ${location.pathname.includes('/permission') ? 'active' : ''}`} to="/permission">
              <span className="sideIcon">
                <FontAwesomeIcon icon={faMessage} />
              </span>
              <span className="sideLinkText">Permission</span>
            </Link> : ""}
          </li>

          <li className="sidebar-li">
            {permission?.leads?.read === true ? <Link className={`sideLink ${location.pathname.includes('/lead-listing') ? 'active' : ''}`} to="/lead-listing">
              <span className="sideIcon">
                <FontAwesomeIcon icon={faEye} />
              </span>
              <span className="sideLinkText">Lead Management</span>
            </Link> : ""}
          </li>
          <li className="sidebar-li">
            {permission?.roles?.read === true ? <Link className={`sideLink ${location.pathname.includes('/role-management') ? 'active' : ''}`} to="/role-management">
              <span className="sideIcon">
                <FontAwesomeIcon icon={faMessage} />
              </span>
              <span className="sideLinkText">Roles Management</span>
            </Link> : ""}
          </li>


       


          <li className="sidebar-li">
            {permission?.brands?.read === true ? <Link className={`sideLink ${location.pathname.includes('/brand-listing') ? 'active' : ''}`} to="/brand-listing">
              <span className="sideIcon">
                <FontAwesomeIcon icon={faTasks} />
              </span>
              <span className="sideLinkText">Brand Management</span>
            </Link> : ""}
          </li>



        </div>
        {/* : ""} */}

        <li className="sidebar-li">

{permission?.refund?.read === true ? <Link className={`sideLink ${location.pathname.includes('/refund-management') ? 'active' : ''}`} to="/refund-management">
  <span className="sideIcon">
    <FontAwesomeIcon icon={faEye} />
  </span>
  <span className="sideLinkText">Refund Management</span>
</Link> : ""}
</li>


        {/* {role == 2 ? */}
        <div>
       
          <li className="sidebar-li">
            {permission?.users?.read === true ? <Link className={`sideLink ${location.pathname.includes('/user-management') ? 'active' : ''}`} to="/user-management">
              <span className="sideIcon">
                <FontAwesomeIcon icon={faUser} />
              </span>
              <span className="sideLinkText">User Management</span>
            </Link> : " "}
          </li>
          <li className="sidebar-li">
            {permission?.purchase?.read === true ? <Link className={`sideLink ${location.pathname.includes('/purchase-management') ? 'active' : ''}`} to="/purchase-management">
              <span className="sideIcon">
                <FontAwesomeIcon icon={faEye} />
              </span>
              <span className="sideLinkText">Purchase Management</span>
            </Link> : ""}
          </li>


          <li className="sidebar-li">
            {permission?.chargeback?.read === true ? <Link className={`sideLink ${location.pathname.includes('/chargeback-management') ? 'active' : ''}`} to="/chargeback-management">
              <span className="sideIcon">
                <FontAwesomeIcon icon={faEye} />
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


        </div>
        {/* : ""} */}



        {/* {role == 3 ? */}
        <div>
 





          <li className="sidebar-li">
            {permission?.reversal.read === true ? <Link className={`sideLink ${location.pathname.includes('/reversal-management') ? 'active' : ''}`} to="/reversal-management">
              <span className="sideIcon">
                <FontAwesomeIcon icon={faEye} />
              </span>
              <span className="sideLinkText">Reversal Management</span>
            </Link> : ""}
          </li>



          <li className="sidebar-li">
            {permission?.unit_report === true ? <Link className={`sideLink ${location.pathname.includes('/unit-report-management') ? 'active' : ''}`} to="/unit-report-management">
              <span className="sideIcon">
                <FontAwesomeIcon icon={faMoneyBill} />
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
                <FontAwesomeIcon icon={faMountainCity} />
              </span>
              <span className="sideLinkText">Merchant Management</span>
            </Link> : " "}
          </li>
          <li className="sidebar-li">
            {permission?.unit_targets.read === true ? <Link className={`sideLink ${location.pathname.includes('/target-listing') ? 'active' : ''}`} to="/target-listing">
              <span className="sideIcon">
                <FontAwesomeIcon icon={faMoneyBill} />
              </span>
              <span className="sideLinkText">Unit Target</span>
            </Link> : ""}
          </li>


          <li className="sidebar-li">
            {permission?.report === true ? <Link className={`sideLink ${location.pathname.includes('/report-management') ? 'active' : ''}`} to="/report-management">
              <span className="sideIcon">
                <FontAwesomeIcon icon={faMoneyBill} />
              </span>
              <span className="sideLinkText">Report Management</span>
            </Link> : " "}
          </li></div>

      </ul>
    </div>
  );
};
