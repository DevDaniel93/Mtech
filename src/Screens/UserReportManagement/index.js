import { useState, useEffect } from "react";


import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import CustomTable from "../../Components/CustomTable";
import CustomModal from "../../Components/CustomModal";

import CustomButton from "../../Components/CustomButton";
import { SelectBox } from "../../Components/CustomSelect";
import CustomInput from "../../Components/CustomInput";

import "./style.css";
import Select from 'react-select'

export const UserReportManagement = () => {

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
  const [initialunit, setUnit] = useState({});


  const SelectOptions = []
  for (const key in initialunit) {
    if (initialunit.hasOwnProperty(key)) {
      const item = initialunit[key];


      const option = {
        value: item.id,
        label: item.name,
      };


      SelectOptions.push(option);
    }
  }

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




  const YearList = [
    {
      code: 1,
      name: '2019'
    },
    {
      code: 2,
      name: '2020'
    }, {
      code: 3,
      name: '2021'
    },
    {
      code: 4,
      name: '2022'
    },
    {
      code: 5,
      name: '2023'
    },
    {
      code: 7,
      name: '2024'
    },
    {
      code: 8,
      name: '2025'
    },
    {
      code: 9,
      name: '2026'
    },
    {
      code: 10,
      name: '2027'
    },
    {
      code: 10,
      name: '2028'
    },
    {
      code: 10,
      name: '2029'
    },
    {
      code: 10,
      name: '2030'
    },
    

  ]

  // const handleChange = (e) => {
  //  setFormData(e.target.value);
  // }



  
  const handleChange = (event) => {
    const { name, value } = event.target;

     
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

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
        setItemsPerPage(data.units.length);
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");

      })
  }


 
  const fetchData = () => {
    const LogoutData = localStorage.getItem('login');
    document.querySelector('.loaderBox').classList.remove("d-none");

    const formDataMethod = new FormData();
    formDataMethod.append('user_name', formData.search) ;
  
 

    fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/unit-sheets-generate-users`,
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
      key: "date",
      title: "Date",
    },
    // {
    //   key: "agent",
    //   title: "AGENT",
    // },
    {
      key: "target",
      title: "TARGET",
    },
    {
      key: "gross",
      title: "GROSS",
    },
    {
      key: "refunt",
      title: "REFUNDS & CB",
    },
    {
      key: "reversals",
      title: "REVERSALs",
    },
    {
      key: "purchase",
      title: "PURCHASE",
    },
    {
      key: "net",
      title: "Net",
    },
    {
      key: "acheived",
      title: "ACHEIVED",
    },
    {
      key: "should_be_at",
      title: "SHOULD BE AT",
    },




  ];




console.log("data user" , data)
  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3 align-items-end">
            <div className="col-12">
              <div className="dashCard">
                <div className="row mb-3 justify-content-end">
                  <div className="col-md-6 mb-2">
                    <h2 className="mainTitle">User Reports Management</h2>
                  </div>
                  <div className="col-md-6 mb-2">
                    <div className="addUser align-items-center">
                    <CustomInput type="text" placeholder="Search Here..." name="search" value={formData.search} inputClass="mainInput" onChange={handleChange} />
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
                              {item.date}
                            </td>

 
                            <td>{`$ ${item?.target}`}</td>
                            <td>{`$ ${item?.gross_sum}`}</td>
                            <td>{`$ ${item?.refunds}`}</td>
                            <td>{`$ ${item?.reversal}`}</td>
                            <td>{`$ ${item?.purchase}`}</td>
                            <td>{`$ ${item?.net}`}</td>
                            <td>{item?.achived}</td>
                            <td>{item?.should_be_at}</td>
                          </tr>
                        ))}
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
