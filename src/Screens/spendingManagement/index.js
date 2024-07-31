import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faPencil, faCheck, faTimes, faFilter, faTrash, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import CustomTable from "../../Components/CustomTable";
import CustomModal from "../../Components/CustomModal";

import CustomPagination from "../../Components/CustomPagination"
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import { SelectBox } from "../../Components/CustomSelect";


import "./style.css";

export const SpendingManagement = () => {
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
  const [brands, setBrands] = useState({});
  const [unit, setUnit] = useState({});
  const [formData, setFormData] = useState({});
  const [searchData, setSearchData] = useState({
    unit_id: "",
    brand_id: "",
    fromDate: "",
    toDate: ""
  })
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

  const handleChange = (event) => {
    const { name, value } = event.target;


    if (name === 'unit_id') {


      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));

      fectchBrandData(value)
      // userData(value, true);
      console.log('abc', formData)



    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    console.log('def', formData)
  };
  const handleSearch = (event) => {
    const { name, value } = event.target;


    if (name === 'unit_id') {


      setSearchData((prevData) => ({
        ...prevData,
        [name]: value,
      }));

      fectchBrandData(value)
      // userData(value, true);
      // console.log('abc', formData)



    }

    else {
      setSearchData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    console.log('def', formData)
  };

  // const filterData = data?.filter(item =>
  //   item?.brand_id?.toLowerCase().includes(inputValue.toLowerCase())
  // );

  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = filterData?.slice(indexOfFirstItem, indexOfLastItem);


  const fetchData = () => {
    const LogoutData = localStorage.getItem('login');
    document.querySelector('.loaderBox').classList.remove("d-none");

    fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/getSpendingCrud`,
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

        setData(data?.data.data);
        setPermission(data?.permission)
        setItemsPerPage(data?.data?.length);
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");

      })
  }

  useEffect(() => {
    document.title = 'Mt Records | Spending Management';

    fetchData()
    fetchUnitData()

  }, []);


  const fetchUnitData = () => {
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
        setUnit(data?.units);

      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");

      })
  }


  const fectchBrandData = (brandID) => {
    const LogoutData = localStorage.getItem('login');
    document.querySelector('.loaderBox').classList.remove("d-none");
    fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/unit-brands/${brandID}`,
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
        setBrands(data?.data);
        console.log('vbb', data)
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");

      })
  }

  const maleHeaders = [
    {
      key: "id",
      title: "S.No",
    },

    {
      key: "Amount Spent",
      title: "Amount Spent",
    },
    {
      key: "unit",
      title: "Unit",
    },
    {
      key: "brand",
      title: "Brand",
    },
    {
      key: "date",
      title: "Date",
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
    fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/addSpendingCrud`,
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
  const handleSearchSubmit2 = (event) => {
    event.preventDefault();
    console.log('lkkkkkk', searchData);
    // event.preventDefault();


    // document.querySelector('.loaderBox').classList.remove("d-none");
    const LogoutData = localStorage.getItem('login');
    fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/getSpendingSearch?unit_id=${searchData.unit_id}${(searchData.brand_id !== '') ? `&brand_id=${searchData.brand_id}` : ``} &fromDate=${searchData.fromDate}&toDate=${searchData.toDate}`,
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
        setShowModal(true)
        setStatus(data?.status)
        setMessage(data?.message)
        setUser(false)
        setFormData({
          name: ''
        })
        setData(data?.data.data)

      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        console.log(error)
      })
  }

  const brandID = (unitID) => {
    document.querySelector('.loaderBox').classList.remove("d-none");
    const LogoutData = localStorage.getItem('login');
    fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/getSpendingCrud?id=${unitID}`,
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
        fectchBrandData(data?.data?.unit_id)
        setFormData({
          ...formData,
          amount_spent: data?.data?.amount_spent,
          unit_id: data?.data?.unit_id,
          brand_id: data?.data?.brand_id,
          date: data?.data?.date
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

    fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/editSpendingCrud`,
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
      fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/deleteSpendingCrud`,
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

  const openBox = (dataID) => {
    brandID(dataID)
    setFormData({
      ...formData,
      id: dataID
    })
    setUserFrom(true)

    console.log('ddd', formData)
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
                    <h2 className="mainTitle">Spending Management</h2>
                  </div>
                  <div className="col-md-6 mb-2">
                    {/* <div className="addUser">
                      {permission?.brands.create === true ? <CustomButton text="Add Front Region Name" variant='primaryButton' onClick={() => {
                        setUser(true)
                      }} /> : ""}
                      <CustomInput type="text" placeholder="Search Here..." value={inputValue} inputClass="mainInput" onChange={handleChange} />
                    </div> */}

                    <div className="addUser">
                      <CustomButton text="Add Spendings" variant='primaryButton' onClick={() => {
                        setUser(true)
                      }} />
                      <CustomInput type="text" placeholder="Search Here..." value={inputValue} inputClass="mainInput" onChange={handleChange} />
                    </div>
                  </div>
                </div>
                <div className="row align-items-end justify-content-center">
                  <div className="col-md-2 mb-4">
                    <SelectBox
                      selectClass="mainInput"
                      name="unit_id"
                      label="Unit"
                      required
                      value={searchData?.unit_id}
                      option={unit}
                      onChange={handleSearch}
                    />
                  </div>
                  <div className="col-md-2 mb-4">
                    <SelectBox
                      selectClass="mainInput"
                      name="brand_id"
                      label="Brand"
                      value={searchData?.brand_id}
                      option={brands}
                      onChange={handleSearch}
                    />

                  </div>

                  <div className="col-md-2 mb-4">
                    <CustomInput
                      label="From"
                      type="date"
                      placeholder="Date"
                      name="fromDate"
                      labelClass='mainLabel'
                      inputClass='mainInput'
                      value={searchData?.date}
                      onChange={handleSearch}

                    />
                  </div>
                  <div className="col-md-2 mb-4">
                    <CustomInput
                      label="To"
                      type="date"
                      placeholder="Date"
                      name="toDate"
                      labelClass='mainLabel'
                      inputClass='mainInput'
                      value={searchData?.date}
                      onChange={handleSearch}

                    />
                  </div>
                  <div className="col-md-2 mb-4">
                    <CustomButton className="searchBtn" variant='primaryButton' type='button' onClick={handleSearchSubmit2} icon={faMagnifyingGlass} />
                  </div>

                </div>
                <div className="row mb-3">
                  <div className="col-12">
                    <CustomTable
                      headers={maleHeaders}

                    >
                      <tbody>
                        {data?.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td className="text-capitalize">
                              {item?.amount_spent}
                            </td>
                            <td className="text-capitalize">
                              {item?.unit?.name}
                            </td>
                            <td className="text-capitalize">
                              {item?.brand?.name}
                            </td>
                            <td className="text-capitalize">
                              {item?.date}
                            </td>
                            {/* <td className={item.status == 1 ? 'greenColor' : 'redColor'}>{item.status == 1 ? 'Active' : 'Inactive'}</td> */}
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
                                    openBox(item?.id)
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
                      totalItems={data?.length}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                    /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Add Front Region Name  */}

          <CustomModal show={addUser} close={() => { setUser(false) }} >
            <div className="col-md-12 mb-4">
              <CustomInput
                label="Amount Spent"
                type="text"
                placeholder="Amount Spent"
                required
                name="amount_spent"
                labelClass='mainLabel'
                inputClass='mainInput'
                value={formData?.amount_spent}
                onChange={handleChange}

              />
            </div>

            <div className="col-md-12 mb-4">
              <SelectBox
                selectClass="mainInput"
                name="unit_id"
                label="Unit"
                required
                value={formData?.unit_id}
                option={unit}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-12 mb-4">
              <SelectBox
                selectClass="mainInput"
                name="brand_id"
                label="Brand"
                required
                value={formData?.brand_id}
                option={brands}
                onChange={handleChange}
              />

            </div>

            <div className="col-md-12 mb-4">
              <CustomInput
                label="Date"
                type="date"
                placeholder="Date"
                required
                name="date"
                labelClass='mainLabel'
                inputClass='mainInput'
                value={formData?.date}
                onChange={handleChange}

              />
            </div>
            <CustomButton variant='primaryButton' text='Add' type='button' onClick={handleSubmit} />
          </CustomModal>

          <CustomModal show={editUser} close={() => { setEditUser(false) }} >
            <div className="col-md-12 mb-4">
              <CustomInput
                label="Amount Spent"
                type="text"
                placeholder="Amount Spent"
                required
                name="amount_spent"
                labelClass='mainLabel'
                inputClass='mainInput'
                value={formData?.amount_spent}
                onChange={handleChange}

              />
            </div>

            <div className="col-md-12 mb-4">
              <SelectBox
                selectClass="mainInput"
                name="unit_id"
                label="Unit"
                required
                value={formData?.unit_id}
                option={unit}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-12 mb-4">
              <SelectBox
                selectClass="mainInput"
                name="brand_id"
                label="Brand"
                required
                value={formData?.brand_id}
                option={brands}
                onChange={handleChange}
              />

            </div>
            <div className="col-md-12 mb-4">
              <CustomInput
                label="Date"
                type="date"
                placeholder="Date"
                required
                name="date"
                labelClass='mainLabel'
                inputClass='mainInput'
                value={formData?.date}
                onChange={handleChange}

              />
            </div>
            <CustomButton variant='primaryButton' text='Update' type='button' onClick={handleEditSubmit} />
          </CustomModal>

          <CustomModal status={status} show={showModal} close={() => { setShowModal(false) }} success heading={message} />


        </div>
      </DashboardLayout>
    </>
  );
};
