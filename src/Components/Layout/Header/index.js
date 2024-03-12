import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logo, userImage, mtech, mtechlogo } from './../../../Assets/images/'


import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomModal from "../../CustomModal";
import { useNavigate } from "react-router-dom";
import {
  faBell,
  faUser,
  faBars,
  faEllipsisV,

  faUserPlus,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";

import { notifications } from "../../../Config/Data";

import "./style.css";
// import { faUserPlus   } from "@fortawesome/react-fontawesome";

export const Header = (props) => {
  const [status, setStatus] = useState()
  const [notificationState, setNotificationState] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const navigate = useNavigate();

  const Continue = () => {
    setShowModal(false)
    setShowModal2(true)
    setStatus(true)
  }

  const handleClickPopup = () => {
    setShowModal(true)
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
        setStatus(data?.status)
        console.log("data?.status", data?.status)

        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      })

  }


  useEffect(() => {
    setNotificationState(notifications)
  }, [])

  return (
    <header>
      <Navbar className="customHeader" expand="md">
        <Container fluid>
          <Link to={"/dashboard"} className="siteLogo order-2 order-lg-3 text-decoration-none">
            {/* <h1>Project <span>Camp</span></h1> */}
            <img src={mtechlogo} className="mw-100 authLogo" />
          </Link>
          <Navbar.Toggle className="order-4 order-lg-2 notButton">
            <FontAwesomeIcon className="bell-icon" icon={faEllipsisV} />
          </Navbar.Toggle>
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="customCollapse order-3"
          >
            <Nav className="ms-auto">
              <Dropdown className="notiDropdown me-2">
                <Dropdown.Toggle variant="transparent" className="notButton">
                  <FontAwesomeIcon className="bellIcon" icon={faBell} />
                </Dropdown.Toggle>
                <Dropdown.Menu className="notiMenu" align="end">
                  <div className="notiHead p-3 pb-0">
                    <h4 className="mainTitle">Notifications</h4>
                  </div>
                  <div className="notificationsBody">
                    {notificationState.slice(0, 5).map((notification) => (
                      <>
                        <Link className="singleNoti" key={notification.id}>
                          <div className="singleNotiIcon">
                            <FontAwesomeIcon
                              className="notiIcon"
                              icon={faBell}
                            />
                          </div>
                          <div className="singleNotiContent">
                            <p className="notiText">{notification.text}</p>
                            <p className="notiDateTime">
                              {notification.date} | {notification.time}
                            </p>
                          </div>
                        </Link>
                      </>
                    ))}
                  </div>
                  <div className="notiFooter">
                    <Link to={"/notifications"}>View All</Link>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown className="userDropdown">
                <Dropdown.Toggle
                  variant="transparent"
                  className="notButton toggleButton"
                >
                  <div className="userImage">
                    <FontAwesomeIcon
                      className="me-2 yellow-text"
                      icon={faUser}
                    />{" "}
                    {/* <img
                      src={userImage}
                      alt=""
                      className="img-fluid"
                    /> */}
                  </div>
                  {/* <img src={images.profilePic} alt="" className="img-fluid" /> */}
                </Dropdown.Toggle>
                <Dropdown.Menu className="userMenu" align="end">
                  {/* <Link className="userMenuItem" to={'/profile'}>
                    <FontAwesomeIcon
                      className="me-2 yellow-text"
                      icon={faUser}
                    />{" "}
                    Profile
                  </Link> */}
                  <Link to="#" className="userMenuItem" onClick={handleClickPopup}>
                    <FontAwesomeIcon
                      className="me-1 yellow-text"
                      icon={faSignOut}

                    />{" "}
                    Logout
                  </Link>

                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        
        </Container>
      </Navbar>

      <CustomModal status={status} show={showModal} close={() => { setShowModal(false) }} action={Continue} heading='Are you sure you want to logout?' />
      <CustomModal status={status} show={showModal2} close={handleRedirect} success heading='Successfully Logged Out' />
    </header>
  );
};
