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

export const FrontSourceManagement = () => {
  const [permission, setPermission] = useState()
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [inputValue, setInputValue] = useState('');
  const [addUser, setUser] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userForm, setUserFrom] = useState(false);
  const [idUser, setIdUser] = useState(0);
  const [message, setMessage] = useState('Server Error!');
  const [formData, setFormData] = useState({
    name: '',
    status: 1
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

    fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/getFrontSourceStatus`,
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

        setData(data?.data);
        setPermission(data?.permission)
        setItemsPerPage(data?.data?.length);
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");

      })
  }

  useEffect(() => {
    document.title = 'Mt Records | Front Source Management';

    fetchData()

  }, []);

  const maleHeaders = [
    {
      key: "id",
      title: "S.No",
    },

    {
      key: "name",
      title: "Name",
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


  const handleSubmit = (event) => {
    event.preventDefault();


    document.querySelector('.loaderBox').classList.remove("d-none");
    const LogoutData = localStorage.getItem('login');
    fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/addFrontSourceStatus`,
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
        setStatus(data?.status)
        setMessage(data?.message)
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
    fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/getFrontSourceStatus?id=${unitID}`,
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
          name: data?.data?.name,
          status: data?.data?.status
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

    fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/editFrontSourceStatus`,
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
        fetchData()
        setEditUser(false)


      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
      })
  }




  const [removeID, setRemoveID] = useState();

  useEffect(() => {
    if (removeID) {
      const LogoutData = localStorage.getItem('login');
      document.querySelector('.loaderBox').classList.remove("d-none");
      fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/deleteFrontSourceStatus`,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${LogoutData}`
          },
          body: JSON.stringify(removeID)
        }
      )

        .then(response =>
          response.json()
        )
        .then((data) => {
          fetchData()
          document.querySelector('.loaderBox').classList.add("d-none");
        })
        .catch((error) => {
          document.querySelector('.loaderBox').classList.add("d-none");
        })
    }
  }, [removeID])

  const removeItem = (catId) => {
    setRemoveID({
      ...removeID,
      id: catId
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
                    <h2 className="mainTitle">Front Source Management</h2>
                  </div>
                  <div className="col-md-6 mb-2">
                    {/* <div className="addUser">
                      {permission?.brands.create === true ? <CustomButton text="Add Front Source Name" variant='primaryButton' onClick={() => {
                        setUser(true)
                      }} /> : ""}
                      <CustomInput type="text" placeholder="Search Here..." value={inputValue} inputClass="mainInput" onChange={handleChange} />
                    </div> */}

                    <div className="addUser">
                      <CustomButton text="Add Front Source Name" variant='primaryButton' onClick={() => {
                        setUser(true)
                      }} />
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
                            <td className={item.status == 1 ? 'greenColor' : 'redColor'}>{item.status == 1 ? 'Active' : 'Inactive'}</td>
                            <td>
                              <Dropdown className="tableDropdown">
                                <Dropdown.Toggle variant="transparent" className="notButton classicToggle">
                                  <FontAwesomeIcon icon={faEllipsisV} />
                                </Dropdown.Toggle>
                                {/* <Dropdown.Menu align="end" className="tableDropdownMenu">
                                  {permission?.brands.update === true ? <button onClick={() => {
                                    brandID(item.id)
                                    setUserFrom(true)
                                  }} className="tableAction"><FontAwesomeIcon icon={faPencil} className="tableActionIcon" />Edit</button> : ""}
                               
                               
                               
                                {permission?.brands.delete === true ?    <button type="button" className="tableAction" onClick={() => { removeItem(item?.id) }}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon> Delete</button> : ""}
                                </Dropdown.Menu> */}

                                <Dropdown.Menu align="end" className="tableDropdownMenu">
                                  <button onClick={() => {
                                    brandID(item.id)
                                    setUserFrom(true)
                                  }} className="tableAction"><FontAwesomeIcon icon={faPencil} className="tableActionIcon" />Edit</button>



                                  <button type="button" className="tableAction" onClick={() => { removeItem(item?.id) }}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon> Delete</button>
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

          {/* Add Front Source Name  */}

          <CustomModal show={addUser} close={() => { setUser(false) }} >
            <CustomInput
              label="Add Front Source Name"
              type="text"
              placeholder="Add Front Source Name"
              required
              name="name"
              labelClass='mainLabel'
              inputClass='mainInput'
              value={formData.name}
              onChange={(event) => {
                setFormData({ ...formData, name: event.target.value });
              }}

            />
            <CustomButton variant='primaryButton' text='Add' type='button' onClick={handleSubmit} />
          </CustomModal>

          <CustomModal show={editUser} close={() => { setEditUser(false) }} >
            <CustomInput
              label="Edit Front Source Name"
              type="text"
              placeholder="Edit Front Source Name"
              required
              name="name"
              labelClass='mainLabel'
              inputClass='mainInput'
              value={formData.name}
              onChange={(event) => {
                setFormData({
                  ...formData,
                  name: event.target.value,
                  id: idUser
                });
              }}

            />

            <SelectBox
              selectClass="mainInput"
              name="Status"
              label="Status"
              value={formData.status}
              required
              option={optionData}
              onChange={(event) => {
                setFormData({
                  ...formData,
                  status: event.target.value,
                  id: idUser
                });
              }}
            />
            <CustomButton variant='primaryButton' text='Update' type='button' onClick={handleEditSubmit} />
          </CustomModal>

          <CustomModal status={status} show={showModal} close={() => { setShowModal(false) }} success heading={message} />


        </div>
      </DashboardLayout>
    </>
  );
};
