import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faEye, faCheck, faTimes, faFilter, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import CustomTable from "../../Components/CustomTable";
import CustomModal from "../../Components/CustomModal";

import CustomPagination from "../../Components/CustomPagination"
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";


import "./style.css";
import { faCompass } from "@fortawesome/free-solid-svg-icons";
import { text } from "@fortawesome/fontawesome-svg-core";

export const UserManagement = () => {
  const [permission, setPermission] = useState()
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [inputValue, setInputValue] = useState('');
  const [iduser, setIdUser] = useState(0);
  const [userud, setUserud] = useState();
  const [pass, setPass] = useState('');

  const [formData, setFormData] = useState({
    password: '',

  });
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const hanldeRoute = () => {
    navigate('/add-user')
  }


  const inActive = () => {
    setShowModal(false)
    setShowModal2(true)
  }
  const ActiveMale = () => {
    setShowModal3(false)
    setShowModal4(true)
  }

  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

  const filterData = data.filter(item =>
    item?.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterData.slice(indexOfFirstItem, indexOfLastItem);

  const usermanagement = () => {
    const LogoutData = localStorage.getItem('login');
    document.querySelector('.loaderBox').classList.remove("d-none");
    fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/user-listing`,
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
        setData(data.users);
        setItemsPerPage(data?.users.length);
        setPermission(data?.permission)
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");


      })

  }

  useEffect(() => {
    usermanagement()
    document.title = 'Mt Records | User Management';


  }, []);


  const maleHeaders = [
    {
      key: "id",
      title: "S.No",
    },
    {
      key: "username",
      title: "Name",
    },
    {
      key: "email",
      title: "Email Address",
    },
    {
      key: "unit",
      title: "Unit",
    },
    {
      key: "role",
      title: "Role",
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

  const [userForm, setUserFrom] = useState(false);
  const removeItem = (catId) => {
    const LogoutData = localStorage.getItem('login');
    document.querySelector('.loaderBox').classList.remove("d-none");
    fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/user-delete/${catId}`,
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
        usermanagement()
        document.querySelector('.loaderBox').classList.add("d-none");

      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");

      })
  }

  const change_password = (unitID) => {
    setEditUser(true)
    localStorage.setItem('userid', unitID);

  }
  console.log("iduserdsds", userud)





  const handleEditSubmit = (event) => {
    event.preventDefault();

    const formDataMethod = new FormData();

    const userid = localStorage.getItem('userid');
    formDataMethod.append('userid', userid);
    formDataMethod.append('newpassword', pass);

    const LogoutData = localStorage.getItem('login');

    const requestOptions = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LogoutData}`,
      },
      body: formDataMethod,
    };

    document.querySelector('.loaderBox').classList.remove("d-none");

    fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/user-pass-update`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        document.querySelector('.loaderBox').classList.add("d-none");
        setFormData({
          userid: '',
          password: ''
        });
        setEditUser(false);
      })
      .catch(error => {
        document.querySelector('.loaderBox').classList.add("d-none");
        console.error('Error during password update:', error);
        // Handle error as needed
      });

    console.log("pass", pass);
  };
  console.log("pass", formData)
  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="row mb-3 justify-content-between">
                  <div className="col-md-6 mb-2">
                    <h2 className="mainTitle">User Management</h2>
                  </div>
                  <div className="col-md-6 mb-2">
                    <div className="addUser">
                      {permission?.users.create === true ?
                        <CustomButton text="Add User" variant='primaryButton' onClick={hanldeRoute} /> : ""}
                      <CustomInput type="text" placeholder="Search Here..." value={inputValue} inputClass="mainInput" onChange={handleChange} />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12">
                    <CustomTable
                      headers={maleHeaders}

                    >
                      <tbody>
                        {currentItems.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td className="text-capitalize">
                              {item?.name}
                            </td>
                            <td>{item?.email}</td>
                            <td>{
                              item?.unit_id && item?.unit_id.map((item) => (
                                <span className="ps-1">{item?.name}</span>
                              ))
                            }</td>
                            <td>{item?.role?.name}</td>
                            <td className={item?.status == 1 ? 'greenColor' : 'redColor'}>{item?.status == 1 ? 'Active' : 'Inactive'}</td>
                            <td>
                              <Dropdown className="tableDropdown">
                                <Dropdown.Toggle variant="transparent" className="notButton classicToggle">
                                  <FontAwesomeIcon icon={faEllipsisV} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu align="end" className="tableDropdownMenu">
                                  {permission?.users.read === true ?
                                    <Link to={`/user-detail/${item?.id}`} className="tableAction"><FontAwesomeIcon icon={faEye} className="tableActionIcon" />View</Link> : ""}

                                  {permission?.users.update === true ?
                                    <Link to={`/edit-user/${item?.id}`} className="tableAction"><FontAwesomeIcon icon={faPencil} className="tableActionIcon" />Edit</Link> : ""}
                                  {/* {permission?.users.delete === true ?                               */}
                                  {item?.status == 0 ? <button type="button" className="bg-transparent border-0 ps-lg-3 pt-1" onClick={() => { removeItem(item?.id) }}>  <FontAwesomeIcon icon={faCompass} />  Active </button>

                                    : <button type="button" className="bg-transparent border-0 ps-lg-3 pt-1" onClick={() => { removeItem(item?.id) }}>  <FontAwesomeIcon icon={faCompass} style={{ decoration: 'line-through' }} /> Inactive </button>
                                  }
                                  {permission?.users.update === true ?
                                    <>
                                      <button onClick={() => {
                                        change_password(item.id)
                                        setUserud(item.id)
                                        setUserFrom(true)
                                      }} className="tableAction"><FontAwesomeIcon icon={faEye} className="tableActionIcon" />Change Password</button>
                                    </> : ""}

                                </Dropdown.Menu>

                              </Dropdown>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </CustomTable>
                    {/* <CustomPagination
                      itemsPerPage={itemsPerPage}
                      totalItems={data.length}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                    /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <CustomModal show={showModal} close={() => { setShowModal(false) }} action={inActive} heading='Are you sure you want to mark this user as inactive?' />
          <CustomModal show={showModal2} close={() => { setShowModal2(false) }} success heading='Marked as Inactive' />

          <CustomModal show={showModal3} close={() => { setShowModal3(false) }} action={ActiveMale} heading='Are you sure you want to mark this user as Active?' />
          <CustomModal show={showModal4} close={() => { setShowModal4(false) }} success heading='Marked as Active' />


          <CustomModal show={editUser} close={() => { setEditUser(false) }} >
            <CustomInput
              label=" Change Password"
              type="text"
              placeholder="Change Password  "
              required
              name="password"
              id='pass'
              //  type='password'
              labelClass='mainLabel'
              inputClass='mainInput'
              value={pass}
              onChange={(event) => {
                setPass(event.target.value);
              }}

            />

            <CustomButton variant='primaryButton' text='Update Password' type='button' onClick={handleEditSubmit} />
          </CustomModal>



        </div>
      </DashboardLayout>
    </>
  );
};
