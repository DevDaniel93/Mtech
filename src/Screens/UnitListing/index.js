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
import Select from 'react-select'

import "./style.css";

export const UnitListing = () => {
  const [permission, setPermission] = useState()
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [inputValue, setInputValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [addUser, setUser] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [userForm, setUserFrom] = useState(false);
  const [idUser, setIdUser] = useState(0);
  const [brands, setBrands] = useState({});
  const [status , setStatus] = useState() 
  const editBrandList = [];
  const [formData, setFormData] = useState({
    name: '',
    // status: 1,
    brands: []
  });

  const handleChangeSelect = (selected) => {
    setFormData({
      ...formData, brands: selected
    })
  };

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

  const fectchBrandData = () => {
    const LogoutData = localStorage.getItem('login');
    document.querySelector('.loaderBox').classList.remove("d-none");

    fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/brand-listing`,
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
        setBrands(data.brands);
        setItemsPerPage(data?.brands.length);
        setPermission(data.permission)
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
      })
  }


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
    fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/unit-listing`,
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
        setItemsPerPage(data?.units.length);
        setData(data.units);
        
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
   
      })
  }

  const SelectOptions = [];
  useEffect(() => {
    document.title = 'Mt Records | Units Management';

    fetchData()
    fectchBrandData();



  }, []);

  const maleHeaders = [
    {
      key: "id",
      title: "S.No",
    },
    {
      key: "username",
      title: "Unit Name",
    },
    {
      key: "brands",
      title: "Brands Associate",
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



  for (const key in brands) {
    if (brands.hasOwnProperty(key)) {
      const item = brands[key];

   
      const option = {
        value: item.id, 
        label: item.name, 
      };

    SelectOptions.push(option);
    }
  }


  const handleSubmit = (event) => {
    event.preventDefault();

    document.querySelector('.loaderBox').classList.remove("d-none");
    const LogoutData = localStorage.getItem('login');
    fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/unit-add-edit`,
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

  const editUnit = (unitID) => {
    const LogoutData = localStorage.getItem('login');
    fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/view-unit/${unitID}`,
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
    
        setIdUser(unitID)
 
        data.unit[0].unit_brands.map((item)=>{
          const editData = {
            value: item.brands.id, 
            label: item.brands.name, 
          };
          editBrandList.push(editData)
        })
        setFormData({
          ...formData,
          name: data.unit[0].name,
          status: data.status,
          brands: editBrandList
        });

        setEditUser(true)

      })
      .catch((error) => {
      })
  }

  const handleEditSubmit = (event) => {
    event.preventDefault();

    const LogoutData = localStorage.getItem('login');
    fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/unit-add-edit/${idUser}`,
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




  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="row mb-3 justify-content-between">
                  <div className="col-md-6 mb-2">
                    <h2 className="mainTitle">Unit Management</h2>
                  </div>
                  <div className="col-md-6 mb-2">
                    <div className="addUser">
                     {permission?.units.create === true ? 
                      <CustomButton text="Add Unit" variant='primaryButton' onClick={() => {
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
                            <td className="text-capitalize">
                              {item?.unit__brands.map((brandItem, i, array) => (
                                <span className={i === array.length - 1 && i != 0 ? '' : 'p-2'} key={i}>{brandItem.brands.name}</span>
                              )

                              )}
                            </td>
                            <td className={item.status == 1 ? 'greenColor' : 'redColor'}>{item.status == 1 ? 'Active' : 'Inactive'}</td>
                            <td>
                              <Dropdown className="tableDropdown">
                                <Dropdown.Toggle variant="transparent" className="notButton classicToggle">
                                  <FontAwesomeIcon icon={faEllipsisV} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu align="end" className="tableDropdownMenu">
{permission?.units.update ?                                  <button onClick={() => {
                                    editUnit(item.id)
                                    setUserFrom(true)
                                  }} className="tableAction"><FontAwesomeIcon icon={faPencil} className="tableActionIcon" />Edit</button>:" "}
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

          {/* add unit  */}

          <CustomModal show={addUser} close={() => { setUser(false) }} >
            <CustomInput
              label="Add Unit"
              type="text"
              placeholder="Add Unit"
              required
              name="name"
              labelClass='mainLabel'
              inputClass='mainInput'
              value={formData.name}
              onChange={(event) => {
                setFormData({ ...formData, name: event.target.value });
        
              }}


            />
            <div class="inputWrapper">
              <label class="mainLabel">Add brands<span>*</span></label>
              <Select
                value={formData.brands}
                isMulti
                required
                options={SelectOptions}
                onChange={handleChangeSelect}
              />
            </div>

            <CustomButton variant='primaryButton' text='Add' type='button' onClick={handleSubmit} />
          </CustomModal>

          <CustomModal show={editUser} close={() => { setEditUser(false) }} >
            <CustomInput
              label="Edit Unit"
              type="text"
              placeholder="Edit Unit"
              required
              name="name"
              labelClass='mainLabel'
              inputClass='mainInput'
              value={formData.name}
              onChange={(event) => {
                setFormData({ ...formData, name: event.target.value });
        
              }}

            />

            <div class="inputWrapper">
              <label class="mainLabel">Edit brands<span>*</span></label>
              <Select
                value={formData.brands}
                isMulti
                required
                options={SelectOptions}
                onChange={handleChangeSelect}
              />
            </div>
            <CustomButton variant='primaryButton' text='Add' type='button' onClick={handleEditSubmit} />
          </CustomModal>


          <CustomModal show={showModal} status={status}  close={() => { setShowModal(false) }} success heading='Unit added Successfully.' />

        </div>
      </DashboardLayout>
    </>
  );
};
