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

export const Sidebar = (props) => {
  const role = localStorage.getItem('role');
  console.log("role", role)
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

        {role == 1 || role == 4 ?
          <div>

            <li className="sidebar-li">
              <Link className={`sideLink ${location.pathname.includes('/lead-listing') ? 'active' : ''}`} to="/lead-listing">
                <span className="sideIcon">
                  <FontAwesomeIcon icon={faEye} />
                </span>
                <span className="sideLinkText">Lead Management</span>
              </Link>
            </li>
            <li className="sidebar-li">
              <Link className={`sideLink ${location.pathname.includes('/refund-management') ? 'active' : ''}`} to="/refund-management">
                <span className="sideIcon">
                  <FontAwesomeIcon icon={faEye} />
                </span>
                <span className="sideLinkText">Refund Management</span>
              </Link>
            </li>
            <li className="sidebar-li">
              <Link className={`sideLink ${location.pathname.includes('/chargeback-management') ? 'active' : ''}`} to="/chargeback-management">
                <span className="sideIcon">
                  <FontAwesomeIcon icon={faEye} />
                </span>
                <span className="sideLinkText">Charge Back Management</span>
              </Link>
            </li>



          </div>
          : " "}

        {role == 1 ?
          <div>
            <li className="sidebar-li">
              <Link className={`sideLink ${location.pathname.includes('/role-management') ? 'active' : ''}`} to="/role-management">
                <span className="sideIcon">
                  <FontAwesomeIcon icon={faMessage} />
                </span>
                <span className="sideLinkText">Roles Management</span>
              </Link>
            </li>

            <li className="sidebar-li">
              <Link className={`sideLink ${location.pathname.includes('/purchase-management') ? 'active' : ''}`} to="/purchase-management">
                <span className="sideIcon">
                  <FontAwesomeIcon icon={faEye} />
                </span>
                <span className="sideLinkText">Purchase Management</span>
              </Link>
            </li>

            <li className="sidebar-li">
              <Link className={`sideLink ${location.pathname.includes('/reversal-management') ? 'active' : ''}`} to="/reversal-management">
                <span className="sideIcon">
                  <FontAwesomeIcon icon={faEye} />
                </span>
                <span className="sideLinkText">Reversal Management</span>
              </Link>
            </li>

            <li className="sidebar-li">
              <Link className={`sideLink ${location.pathname.includes('/brand-listing') ? 'active' : ''}`} to="/brand-listing">
                <span className="sideIcon">
                  <FontAwesomeIcon icon={faTasks} />
                </span>
                <span className="sideLinkText">Brand Management</span>
              </Link>
            </li>

            <li className="sidebar-li">
              <Link className={`sideLink ${location.pathname.includes('/user-management') ? 'active' : ''}`} to="/user-management">
                <span className="sideIcon">
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <span className="sideLinkText">User Management</span>
              </Link>
            </li>
            <li className="sidebar-li">
              <Link className={`sideLink ${location.pathname.includes('/unit-report-management') ? 'active' : ''}`} to="/unit-report-management">
                <span className="sideIcon">
                  <FontAwesomeIcon icon={faMoneyBill} />
                </span>
                <span className="sideLinkText">Unit Reports</span>
              </Link>
            </li>
          </div> : ""}



        {role == 2 ?
          <div>
            <li className="sidebar-li">
              <Link className={`sideLink ${location.pathname.includes('/lead-listing') ? 'active' : ''}`} to="/lead-listing">
                <span className="sideIcon">
                  <FontAwesomeIcon icon={faEye} />
                </span>
                <span className="sideLinkText">Lead Management</span>
              </Link>
            </li>

            <li className="sidebar-li">
              <Link className={`sideLink ${location.pathname.includes('/purchase-management') ? 'active' : ''}`} to="/purchase-management">
                <span className="sideIcon">
                  <FontAwesomeIcon icon={faEye} />
                </span>
                <span className="sideLinkText">Purchase Management</span>
              </Link>
            </li>

            <li className="sidebar-li">
              <Link className={`sideLink ${location.pathname.includes('/reversal-management') ? 'active' : ''}`} to="/reversal-management">
                <span className="sideIcon">
                  <FontAwesomeIcon icon={faEye} />
                </span>
                <span className="sideLinkText">Reversal Management</span>
              </Link>
            </li>

            <li className="sidebar-li">
              <Link className={`sideLink ${location.pathname.includes('/refund-management') ? 'active' : ''}`} to="/refund-management">
                <span className="sideIcon">
                  <FontAwesomeIcon icon={faEye} />
                </span>
                <span className="sideLinkText">Refund Management</span>
              </Link>
            </li>
            <li className="sidebar-li">
              <Link className={`sideLink ${location.pathname.includes('/user-management') ? 'active' : ''}`} to="/user-management">
                <span className="sideIcon">
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <span className="sideLinkText">User Management</span>
              </Link>
            </li>

            <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/unit-listing') ? 'active' : ''}`} to="/unit-listing">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faMountainCity} />
            </span>
            <span className="sideLinkText">Unit Management</span>
          </Link>
        </li>
            <li className="sidebar-li">
              <Link className={`sideLink ${location.pathname.includes('/unit-report-management') ? 'active' : ''}`} to="/unit-report-management">
                <span className="sideIcon">
                  <FontAwesomeIcon icon={faMoneyBill} />
                </span>
                <span className="sideLinkText">Unit Reports</span>
              </Link>
            </li>
            
          </div> : ""}



        {role == 3 ?
          <div>

            <li className="sidebar-li">
              <Link className={`sideLink ${location.pathname.includes('/lead-listing') ? 'active' : ''}`} to="/lead-listing">
                <span className="sideIcon">
                  <FontAwesomeIcon icon={faEye} />
                </span>
                <span className="sideLinkText">Lead Management</span>
              </Link>
            </li>
            <li className="sidebar-li">
              <Link className={`sideLink ${location.pathname.includes('/refund-management') ? 'active' : ''}`} to="/refund-management">
                <span className="sideIcon">
                  <FontAwesomeIcon icon={faEye} />
                </span>
                <span className="sideLinkText">Refund Management</span>
              </Link>
            </li>
            <li className="sidebar-li">
              <Link className={`sideLink ${location.pathname.includes('/chargeback-management') ? 'active' : ''}`} to="/chargeback-management">
                <span className="sideIcon">
                  <FontAwesomeIcon icon={faEye} />
                </span>
                <span className="sideLinkText">Charge Back Management</span>
              </Link>
            </li>



            <li className="sidebar-li">
              <Link className={`sideLink ${location.pathname.includes('/purchase-management') ? 'active' : ''}`} to="/purchase-management">
                <span className="sideIcon">
                  <FontAwesomeIcon icon={faEye} />
                </span>
                <span className="sideLinkText">Purchase Management</span>
              </Link>
            </li>

            <li className="sidebar-li">
              <Link className={`sideLink ${location.pathname.includes('/reversal-management') ? 'active' : ''}`} to="/reversal-management">
                <span className="sideIcon">
                  <FontAwesomeIcon icon={faEye} />
                </span>
                <span className="sideLinkText">Reversal Management</span>
              </Link>
            </li>



            <li className="sidebar-li">
              <Link className={`sideLink ${location.pathname.includes('/user-management') ? 'active' : ''}`} to="/user-management">
                <span className="sideIcon">
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <span className="sideLinkText">User Management</span>
              </Link>
            </li>
            <li className="sidebar-li">
              <Link className={`sideLink ${location.pathname.includes('/unit-report-management') ? 'active' : ''}`} to="/unit-report-management">
                <span className="sideIcon">
                  <FontAwesomeIcon icon={faMoneyBill} />
                </span>
                <span className="sideLinkText">Unit Reports</span>
              </Link>
            </li>
          </div> : ""}


        {role == 1 ? <div> 
          <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/unit-listing') ? 'active' : ''}`} to="/unit-listing">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faMountainCity} />
            </span>
            <span className="sideLinkText">Unit Management</span>
          </Link>
        </li>

          <li className="sidebar-li">
            <Link className={`sideLink ${location.pathname.includes('/merchant-management') ? 'active' : ''}`} to="/merchant-management">
              <span className="sideIcon">
                <FontAwesomeIcon icon={faMountainCity} />
              </span>
              <span className="sideLinkText">Merchant Management</span>
            </Link>
          </li>
          <li className="sidebar-li">
            <Link className={`sideLink ${location.pathname.includes('/target-listing') ? 'active' : ''}`} to="/target-listing">
              <span className="sideIcon">
                <FontAwesomeIcon icon={faMoneyBill} />
              </span>
              <span className="sideLinkText">Unit Target</span>
            </Link>
          </li>


          <li className="sidebar-li">
            <Link className={`sideLink ${location.pathname.includes('/report-management') ? 'active' : ''}`} to="/report-management">
              <span className="sideIcon">
                <FontAwesomeIcon icon={faMoneyBill} />
              </span>
              <span className="sideLinkText">Report Management</span>
            </Link>
          </li></div> : " "}

      </ul>
    </div>
  );
};
{/* 
        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/Usertarget-listing') ? 'active' : ''}`} to="/Usertarget-listing">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faMoneyBill} />
            </span>
            <span className="sideLinkText">User Target</span>
          </Link>
        </li> */}