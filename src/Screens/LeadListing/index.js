import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faEye, faCheck, faTimes, faFilter, faEdit, faTrash, faCopy, faMagnifyingGlass, faFile, faRefresh } from "@fortawesome/free-solid-svg-icons";


import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import CustomTable from "../../Components/CustomTable";
import CustomModal from "../../Components/CustomModal";

import CustomPagination from "../../Components/CustomPagination"
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";

import { SelectBox } from "../../Components/CustomSelect";
import Select from 'react-select'
import "./style.css";

export const LeadListing = () => {
  window.close();
  const [permission, setPermission] = useState()
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({})
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [showtable, setShowtable] = useState(false)
  const [clear, setClear] = useState(false)

  const [extra_data, setExtra_Data] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(100);
  const [inputValue, setInputValue] = useState('');
  const [copied, setCopied] = useState(false)
  const [copiedId, setCopiedId] = useState(null);
  const navigate = useNavigate();

  console.log("itemsPerPage", itemsPerPage)


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    leadlist(pageNumber)
  };

  const hanldeRoute = () => {
    navigate('/add-lead')
  }
  // const coppied = (id, lead_code) => {
  //   navigator.clipboard.writeText(`${lead_code}`);
  //   setCopied(true);
  //   setCopiedId(id);
  //   setTimeout(() => {
  //     setCopied(false);
  //     setCopiedId(null);
  //   }, 1000);
  // };


  const coppied = (id, lead_code) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${lead_code}`).then(() => {
        setCopied(true);
        setCopiedId(id);
        setTimeout(() => {
          setCopied(false);
          setCopiedId(null);
        }, 1000);
      }).catch(error => {
        console.error('Failed to copy: ', error);
      });
    } else {
      // Fallback for browsers that don't support navigator.clipboard
      const textarea = document.createElement('textarea');
      textarea.value = lead_code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);

      // Set copied state and timeout as usual
      setCopied(true);
      setCopiedId(id);
      setTimeout(() => {
        setCopied(false);
        setCopiedId(null);
      }, 1000);
    }
  };


  const role = localStorage.getItem('role');
  const inActive = () => {
    setShowModal(false)
    setShowModal2(true)
  }
  const ActiveMale = () => {
    setShowModal3(false)
    setShowModal4(true)
  }

  // const filterData = data?.filter(item =>
  //   item?.name.toLowerCase().includes(inputValue.toLowerCase())
  // );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

  const [unit, setUnit] = useState({});
  const [totalRecord, setTotalRecord] = useState();

  const [isUsers, setIsUsers] = useState(false);
  const leadData = () => {
    const LogoutData = localStorage.getItem('login');
    document.querySelector('.loaderBox').classList.remove("d-none");

    fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/leads-listing?month=${formData?.month}&unit_id=${formData?.unit_id}&year=${formData?.year}&page=1&search=${formData?.search}&search_type=${formData?.search_type}&users=${userArray}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${LogoutData}`
        },
      }
    )

      .then((response) => {
        return (
          response.json()

        )
      }

      )

      .then((data) => {

        document.querySelector('.loaderBox').classList.add("d-none");

        setData(data?.leads);
        setTotalRecord(data?.total_records);

        // setExtra_Data(data?.extra_fileds)
        setPermission(data?.permission)
        // setItemsPerPage(data?.leads.length);
        setShowtable(true)

        setExtra_Data(data?.extra_fileds);

        setPermission(data?.permission);
        // setItemsPerPage(data?.leads.length);
        if (data?.extra_fileds != "") {


          setShowtable(true);
        } else {
          // If there is no data, set showtable to false
          setShowtable(false);
        }

      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        setShowtable(false)
      })

  }




 
  
  



  const leadlist = (page) => {
    const LogoutData = localStorage.getItem('login');
    document.querySelector('.loaderBox').classList.remove("d-none");

    fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/leads-listing?month=${formData.month}&unit_id=${formData.unit_id}&year=${formData?.year}&page=${page}&search=${formData?.search}&search_type=${formData?.search_type}&users=${JSON.stringify(userArray)}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${LogoutData}`
        },
      }
    )

      .then((response) => {
        return (
          response.json()

        )
      }

      )

      .then((data) => {

        document.querySelector('.loaderBox').classList.add("d-none");

        setData(data?.leads);
        setTotalRecord(data?.total_records);

        setExtra_Data(data?.extra_fileds)
        setPermission(data?.permission)
        // setItemsPerPage(data?.leads.length);
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");

      })

  }

  console.log("showtable", showtable)




  useEffect(() => {
    document.title = 'Mt Records | Lead Management';
    leadlist()

  }, []);

  const clearFilter = () => {
    // // Clearing filter fields in formData
    //  setFormData({
    //     ...formData,
    //     unit_id: '',
    //     month: '',
    //     year: ''
    // });

    // // Triggering leadData function to update or retrieve data based on cleared filters
    //  leadData();
    setClear(false);
    window.location.reload()
  };









  const unitHeaders = [

    {
      key: "net amount ",
      title: "Net Amount",
    },

    {
      key: "unit_target",
      title: "Unit Target",
    },
    {
      key: "gross amount",
      title: "Gross Amount",
    },
    {
      key: "Received",
      title: "Received",
    },
    {
      key: "recovery",
      title: "Recovery",
    },
    {
      key: "Charge Back",
      title: "Charge Back",
    },
    {
      key: "refund_amount",
      title: "Refund Amount  ",
    },
    {
      key: "reversal_amount",
      title: "Reversal Amount  ",
    },
  ]






  const maleHeaders = [
    {
      key: "id",
      title: "S.No",
    },
    {
      key: "lead code",
      title: "ID",
    },

    {
      key: "date",
      title: "DATE",
    },
    {
      key: "source",
      title: "Source",
    },
    {
      key: "brand",
      title: "Brand",
    },
    {
      key: "product",
      title: "Product",
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
      key: "number",
      title: "Phone",
    },
    {
      key: "Description",
      title: "Description",
    },
    {
      key: "tamout",
      title: " Amount",
    },
    {
      key: "received",
      title: "RECEIVED",
    },

    {
      key: "recovery",
      title: "RECOVERY",
    },
    // {
    //   key: "gross",
    //   title: "Gross Amount",
    // },
    {
      key: "seles rep",
      title: "SALES REP",
    },
    {
      key: "account rep",
      title: "ACCOUNT REP",
    },
    // {
    //   key: "amountPaid",
    //   title: "Amount Paid",
    // },
    {
      key: "unit",
      title: "Unit",
    },

    {
      key: "action",
      title: "Action",
    },
  ];

  const YearList = [
    {
      code: 2020,
      name: '2020'
    }, {
      code: 2021,
      name: '2021'
    },
    {
      code: 2022,
      name: '2022'
    },
    {
      code: 2023,
      name: '2023'
    },
    {
      code: 2024,
      name: '2024'
    }

  ]

  const [unitUser, setUnitUser] = useState({});

  const SelectOptions = []
  for (const key in unitUser) {
    if (unitUser.hasOwnProperty(key)) {
      const item = unitUser[key];


      const option = {
        value: item.id,
        label: item.name,
      };


      SelectOptions.push(option);
    }
  }

  const removeItem = (catId) => {
    const LogoutData = localStorage.getItem('login');
    document.querySelector('.loaderBox').classList.remove("d-none");
    fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/delete-leads/${catId}`,
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

        leadData()

      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
      })
  }



  // function handleChanges(event) {
  //   const file = event.target.files[0];

  //   if (file) {
  //     const formData = new FormData();
  //     formData.append('csv', file);

  //     fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/csv-data-handle`, {
  //       method: 'POST',
  //       body: formData,
  //     })
  //       .then(response => response.json())
  //       .then(data => {
  //         leadData()
  //         console.log('Upload successful:', data);
  //       })
  //       .catch(error => {

  //         console.error('Error uploading file:', error);
  //       });
  //   }
  // }


  const monthList = [
    {
      code: 1,
      name: 'January'
    },
    {
      code: 2,
      name: 'Feburay'
    }, {
      code: 3,
      name: 'March'
    },
    {
      code: 4,
      name: 'April'
    },
    {
      code: 5,
      name: 'May'
    },
    {
      code: 6,
      name: 'June'
    },
    {
      code: 7,
      name: 'July'
    },
    {
      code: 8,
      name: 'August'
    },
    {
      code: 9,
      name: 'September'
    },
    {
      code: 10,
      name: 'October'
    },
    {
      code: 11,
      name: 'November'
    },
    {
      code: 12,
      name: 'December'
    }
  ]


  const searchType = [
    {
      code: 'account_rep',
      name: 'Account Rep'
    },
    {
      code: 'sales_rep',
      name: 'Sales Rep'
    },
    {
      code: 'customer',
      name: 'Customer'
    },
  ]

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
        setUnit(data.units);
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");

      })
  }


  const userList = () => {
    const LogoutData = localStorage.getItem('login');
    document.querySelector('.loaderBox').classList.remove("d-none");
    fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/getLeadUsers`,
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
        console.log('user', data?.users)
        setUnitUser(data?.users);
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");

      })
  }

  useEffect(() => {
    fetchUnitData()
    userList()
  }, [])



  const handleChange = (event) => {
    const { name, value } = event.target;
    // searchData(value)

    if (name === "search") {
      setInputValue(value)
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    console.log(formData)
    setClear(true)

  };

  const userArray = [];

  const handleChangeSelect = (selected) => {

   
    selected.map((item, index)=> {
      userArray.push(item?.value);
    })
    setFormData({
      ...formData, users: selected
    })

    console.log('valll', userArray)
  };


  console.log("extra_data", extra_data)
  console.log("currentItems", currentItems)
  const [amountstatus, setAmount] = useState()

  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="row mb-0 justify-content-between">
                  <div className="col-md-4 mb-2">
                    <h2 className="mainTitle">Lead Management</h2>
                  </div>
                  <div className="col mb-2 text-md-end">
                    {permission?.leads.create === true ?
                      <CustomButton text="Add Lead" variant='primaryButton' onClick={hanldeRoute} /> : " "}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mb-2">
                    <div className="row align-items-center">
                      <div className="col-md-12">
                        <div className="row align-items-end justify-content-end ">
                          <div className="col mb-2">
                            <SelectBox
                              selectClass="mainInput"
                              name="unit_id"
                              label="Unit"
                              required
                              value={formData.unit_id}
                              option={unit}
                              onChange={handleChange}
                            />
                          </div>



                          <div className="col mb-2">
                            <div className="addUser align-items-center">
                              <SelectBox
                                selectClass="mainInput"
                                name="month"
                                label="Month"
                                value={formData.month}
                                required
                                option={monthList}
                                onChange={handleChange}
                              />

                            </div>
                          </div>
                          <div className="col mb-2">
                            <SelectBox
                              selectClass="mainInput"
                              name="year"
                              label="Year"
                              value={formData.Year}
                              required
                              option={YearList}
                              onChange={(event) => {
                                setFormData({ ...formData, year: event.target.value });

                              }}
                            />
                          </div>
                          <div className="col mb-2">

                            <CustomInput type="text" placeholder="Search Here..." label="Search" name="search" inputClass="mainInput" onChange={handleChange} />
                          </div>
                          <div className="col mb-2">

                            <SelectBox
                              selectClass="mainInput"
                              name="search_type"
                              label="Search Type"
                              value={formData.search_type}
                              option={searchType}
                              onChange={(event) => {
                                const newValue = event.target.value;
                                setFormData({
                                  ...formData,
                                  search_type: newValue,
                                  ...(newValue == 'customer' && { users: '' })
                                });
                                if (newValue === 'customer') {
                                  setIsUsers(false);
                                } else {
                                  setIsUsers(true);
                                }
                              }}

                            />
                          </div>
                          {/* {isUsers && (
                            <div className="col-md-3 mb-2">

                              <Select
                                value={formData?.users}
                                isMulti
                                required
                                options={SelectOptions}
                                onChange={handleChangeSelect}
                              />

                            </div>
                          )} */}

                          <div className="col px-md-0 mb-2">
                            {
                              clear && (
                                <button className="clearFilter bg-transparent border-0" onClick={clearFilter}><FontAwesomeIcon icon={faRefresh}></FontAwesomeIcon></button>
                              )
                            }
                            <CustomButton variant='primaryButton' className="searchBtn" type='button' onClick={leadData} icon={faMagnifyingGlass} />
                          </div>
                        </div>

                      </div>



                    </div>

                  </div>
                </div>
                <div className="align-items-end row mb-0 border-bottom pb-0">



                  {/* <div className="col-md-5 ">
                    <div className="row align-items-end md-0">

                    </div>
                  </div> */}


                  {showtable == true && extra_data ? (
                    <div className="col-md-12 text-center">
                      <CustomTable headers={unitHeaders}>
                        <tbody>
                          <tr>
                            <td>{`$${extra_data?.net}`}</td>
                            <td className="text-capitalize">  {`$${extra_data?.unit_target}`}</td>
                            <td> {`$${extra_data?.gross_amount}`} </td>
                            <td>{`$${extra_data?.received}`} </td>
                            <td> {`$${extra_data?.recovery}`}</td>
                            <td className="text-capitalize">  {`$${extra_data?.charge_back}`}</td>
                            <td className="text-capitalize">  {`$${extra_data?.refund_amount}`}</td>
                            <td className="text-capitalize">  {`$${extra_data?.reversal_amount}`}</td>
                          </tr>
                        </tbody>
                      </CustomTable>
                    </div>
                  ) : ""}

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
                              {/* {item?.code} */}
                              <button
                                onClick={() => coppied(item.id, item?.code)}
                                className="bg-transparent border-0 text-secondary"
                              >
                                <FontAwesomeIcon icon={faCopy}></FontAwesomeIcon>
                              </button>

                              {copied && copiedId === item.id && (
                                <span className="text-success px-3 py-1 rounded-pill copiedText">Copied</span>
                              )}

                            </td>
                            <td className="text-capitalize">
                              {item?.date}
                            </td>
                            <td  >{item?.getsource?.name}</td>
                            <td >{item.getbrand?.name}</td>
                            <td className="prodDField"><span>{item?.product}</span></td>
                            <td className="nameField">
                              <span className={item?.chargeback === true && item?.refund === true ? "redColorBg" : item?.chargeback === false && item?.refund === false ? '' : item?.refund === true ? 'redColorBg' : 'orangeColorBg'}>   {item?.name}</span>

                            </td>
                            {/* <td>{item?.username}</td> */}
                            <td className="emailFiled"><span>{item?.email}</span></td>
                            <td className="phoneFiled"><span>{item?.phone}</span></td>
                            <td className="descField"><span>{item?.description}</span></td>
                            <td>{`$${item?.quoted_amount}`}</td>

                            <td>{item?.received === null ? '$ 0' : `$${item?.received}`}</td>
                            <td> {`$${item?.recovery}`}</td>
                            {/* <td> {`$${item?.gross}`}</td> */}
                            <td>{item?.salesrep?.name}</td>

                            <td>{item?.accountrepdetail?.name}</td>
                            <td>{item?.unitdetail?.name}</td>



                            {/* <td className={item.status == 1 ? 'greenColor' : "redColor"}>{item.status == 1 ? 'Active' : "Inactive"}</td> */}
                            <td>
                              <Dropdown className="tableDropdown">
                                <Dropdown.Toggle variant="transparent" className="notButton classicToggle">
                                  <FontAwesomeIcon icon={faEllipsisV} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu align="end" className="tableDropdownMenu">
                                  {/* {data?.permission?.leads.create == true ? <Link to={`/lead-detail/${item?.code}`} className="tableAction"><FontAwesomeIcon icon={faEye} className="tableActionIcon" />View</Link> : ""} */}
                                  {permission?.leads.read === true ?
                                    <Link to={`/lead-detail/${item?.code}`} className="tableAction">
                                      <FontAwesomeIcon icon={faEye} className="tableActionIcon" />
                                      View
                                    </Link> :
                                    ""
                                  }
                                  {permission?.leads.update === true ?
                                    <Link to={`/edit-lead/${item?.code}`} className="tableAction"><FontAwesomeIcon icon={faEdit} className="tableActionIcon" />Edit</Link> :
                                    ""
                                  }
                                  {permission?.leads.delete === true ?
                                    <button type="button" className="bg-transparent border-0 ps-lg-3 pt-1" onClick={() => { removeItem(item?.code) }}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon> Delete</button>
                                    :
                                    ""
                                  }
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </CustomTable>
                    <CustomPagination
                      itemsPerPage={itemsPerPage}
                      totalItems={totalRecord}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <CustomModal show={showModal} close={() => { setShowModal(false) }} action={inActive} heading='Are you sure you want to mark this user as inactive?' />
          <CustomModal show={showModal2} close={() => { setShowModal2(false) }} success heading='Marked as Inactive' />

          <CustomModal show={showModal3} close={() => { setShowModal3(false) }} action={ActiveMale} heading='Are you sure you want to mark this user as Active?' />
          <CustomModal show={showModal4} close={() => { setShowModal4(false) }} success heading='Marked as Active' />



        </div>
      </DashboardLayout>
    </>
  );
};





