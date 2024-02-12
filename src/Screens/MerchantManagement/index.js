import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faPencil, faCheck, faTimes, faFilter } from "@fortawesome/free-solid-svg-icons";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import CustomTable from "../../Components/CustomTable";
import CustomModal from "../../Components/CustomModal";

import CustomPagination from "../../Components/CustomPagination"
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import { SelectBox } from "../../Components/CustomSelect";


import "./style.css";

export const MerchantManagement = () => {

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [inputValue, setInputValue] = useState('');
  const [addUser, setUser] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [status , setStatus] = useState()
  const [userForm, setUserFrom] = useState(false);
  const [idUser, setIdUser] = useState(0);
  const [permission, setPermission] = useState()
  const [formData, setFormData] = useState({
    name: '',
   });

  

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };



  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

  const filterData = data.filter(item =>
    item.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterData.slice(indexOfFirstItem, indexOfLastItem);


  const fetchData = () =>  {
    const LogoutData = localStorage.getItem('login');
    document.querySelector('.loaderBox').classList.remove("d-none");

    fetch(`https://mtrecordflow.com/mtrecords-api/public/api/admin/merchant-listing`,
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
        setItemsPerPage(data?.data.length);
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        
      })
  }

  useEffect(() => {
    document.title = 'Mt Records | Merchant Management';
   
    fetchData()

  }, []);

  const maleHeaders = [
    {
      key: "id",
      title: "S.No",
    },
    {
      key: "name",
      title: "Merchant Name",
    },
    {
      key: "CreatedOn",
      title: "Created On",
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
    fetch(`https://mtrecordflow.com/mtrecords-api/public/api/admin/merchant-add-edit`,
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
        setStatus(data.status)
        setUser(false)
        setFormData({
          name: ''
        })
        fetchData()

      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        ;
      })
  }

  const brandID = (unitID) => {
    document.querySelector('.loaderBox').classList.remove("d-none");
    const LogoutData = localStorage.getItem('login');
    fetch(`https://mtrecordflow.com/mtrecords-api/public/api/admin/get-merchant/${unitID}`,
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
          // status: data.status
        });
        setEditUser(true)

      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        ;
      })
  }

  const handleEditSubmit = (event) => {
    event.preventDefault();
     
    document.querySelector('.loaderBox').classList.remove("d-none");
    const LogoutData = localStorage.getItem('login');
    fetch(`https://mtrecordflow.com/mtrecords-api/public/api/admin/merchant-add-edit/${idUser}`,
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
        ;
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
                    <h2 className="mainTitle">Merchant Management</h2>
                  </div>
                  <div className="col-md-6 mb-2">
                    <div className="addUser">
                    {permission?.merchant.create === true ? <CustomButton text="Add Merchant" variant='primaryButton' onClick={() => {
                        setUser(true)
                      }} /> : " "}
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
                            <td>{item?.created_at}</td>
                            <td>
                              <Dropdown className="tableDropdown">
                                <Dropdown.Toggle variant="transparent" className="notButton classicToggle">
                                  <FontAwesomeIcon icon={faEllipsisV} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu align="end" className="tableDropdownMenu">
                                {permission?.merchant.update === true ?  <button onClick={() => {
                                    brandID(item.id)
                                    setUserFrom(true)
                                  }} className="tableAction"><FontAwesomeIcon icon={faPencil} className="tableActionIcon" />Edit</button> : ""}
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </CustomTable>
                    <CustomPagination
                      itemsPerPage={itemsPerPage}
                      totalItems={data.length}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* add Brand  */}

          <CustomModal show={addUser} close={() => { setUser(false) }} >
            <CustomInput
              label="Add Merchant"
              type="text"
              placeholder="Add Merchant"
              required
              name="name"
              labelClass='mainLabel'
              inputClass='mainInput'
              value={formData.name}
              onChange={(event) => {
                setFormData({ ...formData, name: event.target.value });
                 ;
              }}

            />
            <CustomButton variant='primaryButton' text='Add' type='button' onClick={handleSubmit} />
          </CustomModal>

          <CustomModal show={editUser} close={() => { setEditUser(false) }} >
            <CustomInput
              label="Edit Merchant"
              type="text"
              placeholder="Edit Merchant"
              required
              name="name"
              labelClass='mainLabel'
              inputClass='mainInput'
              value={formData.name}
              onChange={(event) => {
                setFormData({ ...formData, name: event.target.value });
                 ;
              }}

            />

          
            <CustomButton variant='primaryButton' text='Add' type='button' onClick={handleEditSubmit} />
          </CustomModal>

          <CustomModal status={status}  show={showModal} close={() => { setShowModal(false) }} success heading='Merchant added Successfully.' />


        </div>
      </DashboardLayout>
    </>
  );
};
