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

export const UnitReportManagement = () => {

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [inputValue, setInputValue] = useState('');
  const [addUser, setUser] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userForm, setUserFrom] = useState(false);
  const [idUser, setIdUser] = useState(0);
  const [formData, setFormData] = useState({});
  const [brands, setBrands] = useState({});
  const [unit, setUnit] = useState({});
  const [total, setTotal] = useState();


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


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


  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

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
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
      })
  }


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
        setItemsPerPage(data?.units.length);
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
      })
  }




  const fetchData = () => {
    const LogoutData = localStorage.getItem('login');
    document.querySelector('.loaderBox').classList.remove("d-none");

    const formDataMethod = new FormData();
    for (const key in formData) {
      formDataMethod.append(key, formData[key]);
    }

    fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/unit-report-generate-1`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${LogoutData}`
        },
        body: formDataMethod

      }
    )

      .then(response =>
        response.json()
      )
      .then((data) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        setData(data?.data);
        setTotal(data?.grand_total)
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
      })
  }

  useEffect(() => {
    document.title = 'Mt Records | Report Management';
    fectchBrandData()
    fetchUnitData()

  }, []);

  const maleHeaders = [
    {
      key: "unit_name",
      title: "Unit Name",
    },
    {
      key: "net",
      title: "Net",
    },
  ];

 return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3 align-items-end">
            <div className="col-12">
              <div className="dashCard">
                <div className="row mb-3 justify-content-between">
                  <div className="col-md-12 mb-2">
                    <h2 className="mainTitle">Unit Report</h2>
                  </div>
                </div>
                <div className="row justify-content-end">
                  <div className="col-md-6 mb-2">
                    <div className="addUser align-items-center">
                      <SelectBox
                        selectClass="mainInput"
                        name="month"
                        label="Month"
                        value={formData.month}
                        required
                        option={monthList}
                        onChange={(event) => {
                          setFormData({ ...formData, month: event.target.value });
                       
                        }}
                      />
                      <CustomButton variant='primaryButton' text='Search' type='button' onClick={fetchData} />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12">
                    <CustomTable
                      headers={maleHeaders}

                    >
                      <tbody>
                        {data.map((item, index) => (
                          <tr>
                            <td className="text-capitalize">
                              {item.unit_name}
                            </td>

                            <td>{item?.net}</td>
                          </tr>
                        ))}

                        <tr>
                          <td className="font-weight-bold">Grand Total</td>
                          <td>{`$ ${total}`}</td>
                        </tr>
                      </tbody>

                    </CustomTable>
                 
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
