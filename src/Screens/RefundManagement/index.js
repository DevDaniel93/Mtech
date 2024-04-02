import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 
import { faEllipsisV, faEye, faCheck, faTimes, faFilter, faPencil, faTrash, faCopy , faFile } from "@fortawesome/free-solid-svg-icons";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import CustomTable from "../../Components/CustomTable";
import CustomModal from "../../Components/CustomModal";

import CustomPagination from "../../Components/CustomPagination"
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";


import "./style.css";

export const RefundManagement = () => {

  const [permission, setPermission] = useState()
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [inputValue, setInputValue] = useState('');
  const [copied, setCopied] = useState(false)
  const [copiedId, setCopiedId] = useState(null);
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const hanldeRoute = () => {
    navigate('/add-refund')
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
    (item?.refunduser?.name && item.refunduser.name.toLowerCase().includes(inputValue.toLowerCase())) ||
    (item?.leaddetail?.name && item?.leaddetail?.name.toLowerCase().includes(inputValue.toLowerCase()))
  );
  

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterData.slice(indexOfFirstItem, indexOfLastItem);

  const refund = () => {
    const LogoutData = localStorage.getItem('login');
    document.querySelector('.loaderBox').classList.remove("d-none");
    fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/refund-listing`,
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
        setItemsPerPage(data.data.length);
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");

      })


  }


  useEffect(() => {
    document.title = 'Mt Records | Refund Management';
    refund()
  }, []);

  const maleHeaders = [
    {
      key: "id",
      title: "S.No",
    },
    {
      key: "leadid",
      title: "Lead Code",
    },
    {
      key: "refundAmount",
      title: "Refund Amount",
    },
    {
      key: "refundDate",
      title: "Refund Date",
    },
    {
      key: "refundUser",
      title: "Refund User",
    },
    {
      key: "refundType",
      title: "Refund Type",
    },

    {
      key: "merchant",
      title: "Merchant",
    },
    {
      key: "customer",
      title: "Customer Name",
    },
    {
      key: "unit",
      title: "Unit",
    },
    {
      key: "action",
      title: "Action",
    },
  ];
  const removeItem = (catId) => {
    const LogoutData = localStorage.getItem('login');
    document.querySelector('.loaderBox').classList.remove("d-none");
    fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/refund-delete/${catId}`,
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
        refund()
        document.querySelector('.loaderBox').classList.add("d-none");

      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");

      })
  }


  const coppied = (id, lead_code) => {
    navigator.clipboard.writeText(`${lead_code}`);
    setCopied(true);
    setCopiedId(id);
    setTimeout(() => {
      setCopied(false);
      setCopiedId(null);
    }, 1000);
  };




  function handleChanges(event) {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('csv', file);

      fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/refund-csv-data-handle`, {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          refund()
          console.log('Upload successful:', data);
        })
        .catch(error => {

          console.error('Error uploading file:', error);
        });
    }
  }
  console.log("currentItems", currentItems)

  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="row mb-3 justify-content-between">
                  <div className="col-md-4 mb-2">
                    <h2 className="mainTitle">Refund Management</h2>
                  </div>
                  {/* <div className="col-md-6 mb-2">
                    <div className="addUser">
                      {permission?.refund.create === true ?
                        <CustomButton text="Add New Refund" variant='primaryButton' onClick={hanldeRoute} /> : ""}
                      <CustomInput type="text" placeholder="Search Here..." value={inputValue} inputClass="mainInput" onChange={handleChange} />
                    </div>
                  </div> */}




                  <div className="col-md-8 mb-2">
                    <div className="row   align-items-center  justify-content-end ">
                      <div className=" col-md-4 ">
                      {/* {permission?.refund.create === true ? <CustomInput className="w-100" icon={faFile} type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,text/comma-separated-values, text/csv, application/csv" placeholder="" onChange={handleChanges} /> : " "} */}
                      </div>
                      <div className=" col-md-4 ">
                        <CustomInput type="text" placeholder="Search by user, customer name..." name="search" value={inputValue} inputClass="mainInput" onChange={handleChange} />
                      </div>

                      <div className=" col-md-4 ">
                      {permission?.refund.create === true ?
                          <CustomButton text="Add New Refund" variant='primaryButton' onClick={hanldeRoute} /> : " "}
                      </div>

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
                              {item?.lead_code}
                              <button
                                onClick={() => coppied(item.id, item.lead_code)}
                                className="bg-transparent border-0 text-secondary"
                              >
                                <FontAwesomeIcon icon={faCopy}></FontAwesomeIcon>
                              </button>

                              {copied && copiedId === item.id && (
                                <span className="text-success px-3 py-1 rounded-pill">Copied</span>
                              )}

                            </td>
                            < td > {`$ ${item?.refund_amount}`}</td>
                            <td>{item?.refund_date}</td>
                            <td>{item?.refunduser?.name}</td>
                            <td>{item?.refund_type}</td>
                            <td>{item?.merchantdetail?.name}</td>
                            <td>{item?.leaddetail?.name}</td>
                            <td>{item?.unit?.name}</td>
                            <td>
                              <Dropdown className="tableDropdown">
                                <Dropdown.Toggle variant="transparent" className="notButton classicToggle">
                                  <FontAwesomeIcon icon={faEllipsisV} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu align="end" className="tableDropdownMenu">
                                  {permission?.refund.read === true ?

                                    <Link to={`/refund-detail/${item?.id}`} className="tableAction"><FontAwesomeIcon icon={faEye} className="tableActionIcon" />View</Link> : ""}
                                  {permission?.refund.update === true ?
                                    <Link to={`/edit-refund/${item?.id}`} className="tableAction"><FontAwesomeIcon icon={faPencil} className="tableActionIcon" />Edit</Link> : ""}
                                  {permission?.refund.delete === true ?

                                    <button type="button" className="bg-transparent border-0 ps-lg-3 pt-1" onClick={() => { removeItem(item?.id) }}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon> Delete</button> : ""}
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



        </div >
      </DashboardLayout >
    </>
  );
};
