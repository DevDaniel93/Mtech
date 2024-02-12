import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faPencil, faRemove, faTimes, faFilter, faEye } from "@fortawesome/free-solid-svg-icons";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import CustomTable from "../../Components/CustomTable";
import CustomModal from "../../Components/CustomModal";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import CustomPagination from "../../Components/CustomPagination"
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import { SelectBox } from "../../Components/CustomSelect";
import Select from 'react-select'
import { useApi, usePost, usePostUpdate } from "../../Api";




import "./style.css";

export const UnitTarget = () => {
  const [userdata, setUserdata] = useState([]);
  const [data, setData] = useState([]);
  const [userinputValue, setuserInputValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const [userValue, setuserValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [units, setUnits] = useState({});
  const [addUser, setUser] = useState(false);
  const [addUsers, setUsers] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [idUser, setIdUser] = useState();
  const { apiData: unitListing, loading: unitLoading } = useApi('admin/unit-listing');
  const { apiData: TargetListing, loading: TargetLoding } = useApi('admin/unit-Target-List');
  const { apiData: TargetResponseData, loading: TragetResponseLoading, error: TargetResponseError, updateDataForm: targetUpdateData, editParam: TargetEditData } = usePostUpdate('admin/unit-targets-edit/');
  const [unitpermission, setUnitpermission] = useState()
  const [userpermission, setUserpermission] = useState()
  const [editFormData, SetEditFormData] = useState({
    unit_id: '',
    target: '',
    year: '2023',
    status: '1',
    month: ''

  });

  const handleEditTarget = (event) => {
    event.preventDefault();


    TargetEditData(idUser);
    targetUpdateData(editFormData);
  }



  const unitValue = [];

  useEffect(() => {
    setUnits(unitListing?.units)
  }, [unitListing])


  for (const key in units) {
    const option = {
      code: units[key].id,
      name: units[key].name
    }

    unitValue.push(option)

  }



  const [formData, setFormData] = useState({
    unit_id: '',
    target: '',
    year: '2023',
    status: '1',
    month: ''
  });


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
      name: 'Octuber'
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



  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };




  // const handleChange = (e) => {
  //   setInputValue(e.target.value);
  // }

  const filterData = data.filter(item =>
    item?.name.toLowerCase().includes(userValue.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterData.slice(indexOfFirstItem, indexOfLastItem);

  const filterUserdata = userdata.filter(item =>
    item?.unit_detail?.name?.toLowerCase().includes(userValue.toLowerCase())
  );


  const userindexOfLastItem = currentPage * itemsPerPage;
  const userindexOfFirstItem = indexOfLastItem - itemsPerPage;
  const usercurrentItems = filterUserdata.slice(userindexOfFirstItem, userindexOfLastItem);





  const fetchData = () => {
    const LogoutData = localStorage.getItem('login');
    document.querySelector('.loaderBox').classList.remove("d-none");
    fetch(`https://mtrecordflow.com/mtrecords-api/public/api/admin/unit-Target-List`,
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


        setUnitpermission(data?.permission)
        setItemsPerPage(data?.data.length);
        setData(data?.data);
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");


      })
  }



  const fetchuserData = () => {
    const LogoutData = localStorage.getItem('login');
    document.querySelector('.loaderBox').classList.remove("d-none");
    fetch(`https://mtrecordflow.com/mtrecords-api/public/api/admin/usertarget-listing`,
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

        setUserpermission(data?.permission)
        setItemsPerPage(data?.length);
        setUserdata(data?.data);
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");

      })
  }

  useEffect(() => {
    document.title = 'Mt Records | Unit Target';

    fetchData()
    fetchuserData()
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
      key: "target",
      title: "Target",
    },
    // {
    //   key: "targetscore",
    //   title: "Target Score",
    // },
    // {
    //   key: "status",
    //   title: "Status",
    // },

    {
      key: "action",
      title: "Action",
    },

  ];






  const userHeaders = [
    {
      key: "id",
      title: "S.No",
    },
    {
      key: "username",
      title: "User Name",
    },
    {
      key: "unitname",
      title: "Unit Name",
    },
    {
      key: "target",
      title: "Target",
    },
    // {
    //   key: "targetscore",
    //   title: "Target Score",
    // },

    // {
    //   key: "status",
    //   title: "Status",
    // },
    // {
    //   key: "score_target",
    //   title: "SCORE TARGET",
    // },
    {
      key: "action",
      title: "Action",
    },

  ];

  const handleChange = (event) => {
    setInputValue(event.target.value);
    setuserInputValue(event.target.value)
    const { name, value } = event.target;
    if (name === 'unit_id') {
      setViewleads(value);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  const handleuserChange = (event) => {
    setuserValue(event.target.value);
    setuserInputValue(event.target.value)
    const { name, value } = event.target;
    if (name === 'unit_id') {
      setViewleads(value);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = (event) => {
    event.preventDefault();



    const LogoutData = localStorage.getItem('login');
    fetch(`https://mtrecordflow.com/mtrecords-api/public/api/admin/set-unit-target`,
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

        fetchData()
        setUser(false)



      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");

      })
  }

  const handleuserSubmit = (event) => {
    event.preventDefault();



    const LogoutData = localStorage.getItem('login');
    fetch(`https://mtrecordflow.com/mtrecords-api/public/api/admin/usertarget-add-edit`,
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

        fetchData()
        fetchuserData()
        setUsers(false)



      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");

      })
  }











  const LogoutData = localStorage.getItem('login');
  const deleteTarget = async (id) => {
    try {

      const response = await fetch(`https://mtrecordflow.com/mtrecords-api/public/api/admin/unit-targets-delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${LogoutData}`
        },
      });

      const data = await response.json();


      await fetchData();

      setUser(false);
    } catch (error) {
      document.querySelector('.loaderBox').classList.add("d-none");
    }
  };

  const [viewleads, setViewleads] = useState('');
  const [useresdata, setUserData] = useState();




  const fetchUserData = () => {

    document.querySelector('.loaderBox').classList.remove("d-none");
    fetch(`https://mtrecordflow.com/mtrecords-api/public/api/admin/user-units/${viewleads}`,
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
        setUserData(data?.data)
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");

      })
  }

  useEffect(() => {
    fetchUserData();
  }, [viewleads]);



  return (
    <>
      <DashboardLayout>

        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="row mb-3 justify-content-between">
                  <div className="col-md-6 mb-2">
                    <h2 className="mainTitle">Target Listing</h2>
                  </div>

                </div>
                <div className="row mb-3">
                  <div className="col-12">


                    <Tabs
                      defaultActiveKey="unit"
                      id="uncontrolled-tab-example"
                      className="mb-3"
                    >
                      <Tab eventKey="unit" title="Unit">

                        <div className="d-flex justify-content-between align-items-center">
                          <h2 className="mainTitle">Unit Listing</h2>
                          <div className="col-md-6 mb-2">
                            <div className="addUser">
                              {unitpermission?.unit_targets.create === true ? <CustomButton text="Add Unit Target" variant='primaryButton' onClick={() => {
                                setUser(true)
                              }} /> : " "}
                              <CustomInput type="text" placeholder="Search Here..." value={userValue} inputClass="mainInput" onChange={handleuserChange} />
                            </div>
                          </div>
                        </div>
                        <CustomTable
                          headers={maleHeaders}

                        >
                          <tbody>
                            {currentItems.map((item, index) => (
                              <tr key={index}>

                                <td>{index + 1}</td>
                                <td className="text-uppercase">
                                  {item?.name}
                                </td>
                                <td>{item?.target_amount ? `$ ${item?.target_amount}` : '$0'}</td>
                                <td>
                                  <Dropdown className="tableDropdown">
                                    <Dropdown.Toggle variant="transparent" className="notButton classicToggle">
                                      <FontAwesomeIcon icon={faEllipsisV} />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu align="end" className="tableDropdownMenu">

                                      {unitpermission?.unit_targets.create === true ? <Link className="tableAction" to={`target-detail/${item?.id}`}><FontAwesomeIcon icon={faEye} className="tableActionIcon" />View Details</Link> : ""}
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



                        <CustomModal show={addUser} close={() => { setUser(false) }} heading="Set Target" >

                          <SelectBox
                            selectClass="mainInput"
                            name="unit_id"
                            label="Select Unit"
                            labelClass='mainLabel'
                            required
                            value={formData.unit_id}
                            option={unitValue}
                            onChange={handleChange}

                          />
                          <CustomInput
                            label="Set Target"
                            type="number"
                            placeholder="Set Target"
                            required
                            name="target"
                            labelClass='mainLabel'
                            inputClass='mainInput'
                            value={formData.target}
                            onChange={(event) => {
                              setFormData({ ...formData, target: event.target.value });

                            }}


                          />
                          <SelectBox
                            selectClass="mainInput"
                            name="month"
                            labelClass='mainLabel'
                            label="Select Month"
                            required
                            value={formData.month}
                            option={monthList}
                            onChange={handleChange}

                          />


                          <CustomButton variant='primaryButton' text='Add' type='button' onClick={handleSubmit} />
                        </CustomModal>
                      </Tab>



                      <Tab eventKey="user" title="User">

                        <div className="d-flex justify-content-between align-items-center">
                          <h2 className="mainTitle">User Listing</h2>
                          <div className="col-md-6 mb-2">
                            <div className="addUser">
                              {userpermission?.user_targets.create === true ? <CustomButton text="Add User Target" variant='primaryButton' onClick={() => {
                                setUsers(true)
                              }} /> : ""}
                              <CustomInput type="text" placeholder="Search Here..." value={userValue} inputClass="mainInput" onChange={handleuserChange} />
                            </div>
                          </div>
                        </div>
                        <CustomTable
                          headers={userHeaders}

                        >
                          <tbody>
                            {usercurrentItems?.map((item, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td className="text-uppercase">
                                  {item?.user_detail?.name}
                                </td>
                                <td className="text-uppercase">
                                  {item?.unit_detail?.name}
                                </td>

                                <td>{item?.target ? `$ ${item?.target}` : '$0'}</td>
                                <td>
                                  <Dropdown className="tableDropdown">
                                    <Dropdown.Toggle variant="transparent" className="notButton classicToggle">
                                      <FontAwesomeIcon icon={faEllipsisV} />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu align="end" className="tableDropdownMenu">


                                      { userpermission?.user_targets.reade === true ? <Link className="tableAction" to={`usertarget-detail/${item?.id}`}><FontAwesomeIcon icon={faEye} className="tableActionIcon" />View Details</Link> : ""}
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </CustomTable>
                        <CustomPagination
                          itemsPerPage={itemsPerPage}
                          totalItems={userdata.length}
                          currentPage={currentPage}
                          onPageChange={handlePageChange}
                        />

                        <CustomModal show={addUsers} close={() => { setUsers(false) }} heading="Set Target" >

                          <SelectBox
                            selectClass="mainInput"
                            name="unit_id"
                            label="Select Unit"
                            labelClass='mainLabel'
                            required
                            value={formData.unit_id}
                            option={unitValue}
                            onChange={handleChange}

                          />
                          <CustomInput
                            label="Set Target"
                            type="number"
                            placeholder="Set Target"
                            required
                            name="target"
                            labelClass='mainLabel'
                            inputClass='mainInput'
                            value={formData.target}
                            onChange={(event) => {
                              setFormData({ ...formData, target: event.target.value });

                            }}


                          />
                          <SelectBox
                            selectClass="mainInput"
                            name="month"
                            labelClass='mainLabel'
                            label="Select Month"
                            required
                            value={formData.month}
                            option={monthList}
                            onChange={handleChange}

                          />
                          <SelectBox
                            selectClass="mainInput"
                            name="user_id"
                            labelClass='mainLabel'
                            label="Select User"
                            required
                            value={formData.user_id}
                            option={useresdata}
                            onChange={handleChange}
                          />


                          <CustomButton variant='primaryButton' text='Add' type='button' onClick={handleuserSubmit} />
                        </CustomModal>
                      </Tab>

                    </Tabs>





                  </div>
                </div>
              </div>
            </div>
          </div>



        </div>


      </DashboardLayout>
    </>
  );
};
