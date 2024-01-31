import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faEye, faCheck, faTimes, faFilter, faEdit, faTrash, faCopy } from "@fortawesome/free-solid-svg-icons";


import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import CustomTable from "../../Components/CustomTable";
import CustomModal from "../../Components/CustomModal";

import CustomPagination from "../../Components/CustomPagination"
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";


import "./style.css";

export const LeadListing = () => {
  window.close();
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
    navigate('/add-lead')
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
  const filterData = data?.filter(item =>
    item.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterData.slice(indexOfFirstItem, indexOfLastItem);


  const leadData = () => {
    const LogoutData = localStorage.getItem('login');
    document.querySelector('.loaderBox').classList.remove("d-none");
    fetch('https://custom3.mystagingserver.site/mtrecords/public/api/admin/leads-listing',
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
        setData(data.leads);
        setPermission(data?.permission)
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");

      })

  }

  useEffect(() => {
    document.title = 'Mt Records | Lead Management';
    leadData()

  }, []);

  const maleHeaders = [
    {
      key: "id",
      title: "S.No",
    },
    {
      key: "lead code",
      title: "LEAD CODE",
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
      key: "descripction",
      title: "Descripction",
    },
    {
      key: "tamout",
      title: " Amount",
    },
    {
      key: "received",
      title: "RECEIVED Amount",
    },

    {
      key: "recovery",
      title: "RECOVERY Amount",
    },
    {
      key: "gross",
      title: "Gross Amount",
    },
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

  const removeItem = (catId) => {
    const LogoutData = localStorage.getItem('login');
    document.querySelector('.loaderBox').classList.remove("d-none");
    fetch(`https://custom3.mystagingserver.site/mtrecords/public/api/admin/delete-leads/${catId}`,
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

  console.log("permission", permission)

  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="row mb-3 justify-content-between">
                  <div className="col-md-6 mb-2">
                    <h2 className="mainTitle">Lead Management</h2>
                  </div>
                  <div className="col-md-6 mb-2">
                    <div className="addUser">

                      {permission?.leads.create === true ? <CustomButton text="Add Lead" variant='primaryButton' onClick={hanldeRoute} /> : ""}
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
                              {item?.code}
                              <button
                                onClick={() => coppied(item.id, item?.code)}
                                className="bg-transparent border-0 text-secondary"
                              >
                                <FontAwesomeIcon icon={faCopy}></FontAwesomeIcon>
                              </button>

                              {copied && copiedId === item.id && (
                                <span className="text-success px-3 py-1 rounded-pill">Copied</span>
                              )}

                            </td>
                            <td className="text-capitalize">
                              {item?.date}
                            </td>
                            <td>{item?.getsource.name}</td>
                            <td>{item.getbrand?.name}</td>
                            <td>{item?.product}</td>
                            <td className="text-capitalize">
                              {item?.name}
                            </td>
                            {/* <td>{item?.username}</td> */}
                            <td>{item?.email}</td>
                            <td>{item?.phone}</td>
                            <td>{item?.description}</td>
                            <td>{`$ ${item?.quoted_amount}`}</td>

                            <td>{item?.received === null ? '$ 0' : `$ ${item?.received}`}</td>
                            <td>{item?.recovery}</td>
                            <td>{item?.gross}</td>
                            <td>{item?.salesrep?.name}</td>

                            <td>{item?.accountrepdetail?.name}</td>
                            <td>{item?.unitdetail.name}</td>



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
                      totalItems={data.length}
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
