import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faPencil, faCheck, faTimes, faFilter, faTrash } from "@fortawesome/free-solid-svg-icons";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import CustomTable from "../../Components/CustomTable";
import CustomModal from "../../Components/CustomModal";

import CustomPagination from "../../Components/CustomPagination"
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import { SelectBox } from "../../Components/CustomSelect";


import "./style.css";

export const SourceManagement = () => {
  const [permission, setPermission] = useState()
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [inputValue, setInputValue] = useState('');
  const [addUser, setUser] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userForm, setUserFrom] = useState(false);
  const [message, setMessage] = useState('Server Error');
  const [idUser, setIdUser] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
  });

  const optionData = [
    {
      name: "Active",
      code: "1"
    },
    {
      name: "Inactive",
      code: "0"
    },
  ]

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [status, setStatus] = useState()

  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

  const filterData = data.filter(item =>
    item.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterData.slice(indexOfFirstItem, indexOfLastItem);


  const fetchData = () => {
    const LogoutData = localStorage.getItem('login');
    document.querySelector('.loaderBox').classList.remove("d-none");

    fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/leadsource-listing`,
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

        setData(data.data);
        setPermission(data?.permission)
        // setItemsPerPage(data.brands.length);
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");

      })
  }

  useEffect(() => {
    document.title = 'Mt Records | Brands Management';

    fetchData()

  }, []);

  const maleHeaders = [
    {
      key: "id",
      title: "S.No",
    },

    {
      key: "name",
      title: "Source Name",
    },
    // {
    //   key: "status",
    //   title: "Status",
    // },
    {
      key: "action",
      title: "Action",
    },

  ];


  const handleSubmit = (event) => {
    event.preventDefault();


    document.querySelector('.loaderBox').classList.remove("d-none");
    const LogoutData = localStorage.getItem('login');
    fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/leadsource-add-edit`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${LogoutData}`
        },
        body: JSON.stringify(formData)
      },
    )
      .then((response) => {
        return response.json()
      })
      .then((data) => {

        document.querySelector('.loaderBox').classList.add("d-none");
        setShowModal(true)
        setMessage('Source added Successfully.')
         setStatus(data?.status)
        setUser(false)
        setFormData({
          name: ''
        })
        fetchData()

      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");

      })
  }

  const brandID = (unitID) => {
    document.querySelector('.loaderBox').classList.remove("d-none");
    const LogoutData = localStorage.getItem('login');
    fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/get-leadsource/${unitID}`,
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

        document.querySelector('.loaderBox').classList.add("d-none");
        setIdUser(unitID)
        setFormData({
          ...formData,
          name: data.data.name,
        });
        setEditUser(true)

      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");

      })
  }

  const handleEditSubmit = (event) => {
    event.preventDefault();

    document.querySelector('.loaderBox').classList.remove("d-none");
    const LogoutData = localStorage.getItem('login');
    fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/leadsource-add-edit/${idUser}`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${LogoutData}`
        },
        body: JSON.stringify(formData)
      },
    )
      .then((response) => {
        return response.json()
      })
      .then((data) => {

        document.querySelector('.loaderBox').classList.add("d-none");
        setFormData({
          name: ''
        })
        setEditUser(false)
        setShowModal(true)
        setMessage('Source Update Successfully.')
        fetchData()
     


      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
      })
  }





  const removeItem = (catId) => {
    const LogoutData = localStorage.getItem('login');
    document.querySelector('.loaderBox').classList.remove("d-none");
    fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/leadsource-delete/${catId}`,
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
        setShowModal(true)
        setMessage('Source Deleted Successfully.')
        fetchData()
       
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
      })
  }
  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="row mb-3 justify-content-between">
                  <div className="col-md-6 mb-2">
                    <h2 className="mainTitle">Source Management</h2>
                  </div>
                  <div className="col-md-6 mb-2">
                    <div className="addUser">
                      {permission?.brands.create === true ? <CustomButton text="Add Source" variant='primaryButton' onClick={() => {
                        setUser(true)
                      }} /> : ""}
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
                              {item.name}
                            </td>
                            {/* <td className={item.status == 1 ? 'greenColor' : 'redColor'}>{item.status == 1 ? 'Active' : 'Inactive'}</td> */}
                            <td>
                              <Dropdown className="tableDropdown">
                                <Dropdown.Toggle variant="transparent" className="notButton classicToggle">
                                  <FontAwesomeIcon icon={faEllipsisV} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu align="end" className="tableDropdownMenu">
                                  {permission?.brands.update === true ? <button onClick={() => {
                                    brandID(item.id)
                                    setUserFrom(true)
                                  }} className="tableAction"><FontAwesomeIcon icon={faPencil} className="tableActionIcon" />Edit</button> : ""}
                               
                               
                               
                                {permission?.brands.delete === true ?    <button type="button" className="bg-transparent border-0 ps-lg-3 pt-1" onClick={() => { removeItem(item?.id) }}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon> Delete</button> : ""}
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

          {/* add Brand  */}

          <CustomModal show={addUser} close={() => { setUser(false) }} >
            <CustomInput
              label="Add Source Name"
              type="text"
              placeholder="Add Source Name"
              required
              name="name"
              labelClass='mainLabel'
              inputClass='mainInput'
              // value={formData.name}
              onChange={(event) => {
                setFormData({ ...formData, name: event.target.value });
              }}

            />
            <CustomButton variant='primaryButton' text='Add' type='button' onClick={handleSubmit} />
          </CustomModal>

          <CustomModal show={editUser} close={() => { setEditUser(false) }} >
            <CustomInput
              label="Edit Source Name"
              type="text"
              placeholder="Edit Source Name"
              required
              name="name"
              labelClass='mainLabel'
              inputClass='mainInput'
              value={formData?.name}
              onChange={(event) => {
                setFormData({ ...formData, name: event.target.value });
              }}

            />

            {/* <SelectBox
              selectClass="mainInput"
              name="Status"
              label="Status"
              value={formData.status}
              required
              option={optionData}
              onChange={(event) => {
                setFormData({ ...formData, status: event.target.value });
              }}
            /> */}
            <CustomButton variant='primaryButton' text='Add' type='button' onClick={handleEditSubmit} />
          </CustomModal>

          <CustomModal status={true} show={showModal} close={() => { setShowModal(false) }} success heading={message} />


        </div>
      </DashboardLayout>
    </>
  );
};
