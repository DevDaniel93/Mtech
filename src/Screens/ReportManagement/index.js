import { useState, useEffect } from "react";


import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import CustomTable from "../../Components/CustomTable";
import CustomModal from "../../Components/CustomModal";

import CustomButton from "../../Components/CustomButton";
import { SelectBox } from "../../Components/CustomSelect";


import "./style.css";
import Select from 'react-select'

export const ReportManagement = () => {

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
  const [total, setTotal] = useState();


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
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");

      })
  }


  const fetchUnitData = () => {
    const LogoutData = localStorage.getItem('login');
    document.querySelector('.loaderBox').classList.remove("d-none");
    fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/unit-listing2`,
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


  const [target, setTarget] = useState(0);
  const [gross, setGross] = useState(0);
  const [refund, setRefund] = useState(0);
  const [reversal, setReversal] = useState(0);
  const [purchase, setPurchase] = useState(0);
  const [net, setNet] = useState(0);

  const fetchData = () => {
    const LogoutData = localStorage.getItem('login');
    document.querySelector('.loaderBox').classList.remove("d-none");

    const formDataMethod = new FormData();
    for (const key in formData) {
      if (key == 'month') {
        formDataMethod.append(key, formData[key]);
      }

      if (key == 'year') {
        formDataMethod.append(key, formData[key]);
      }


    }

    formDataMethod.append('unit_id', JSON.stringify(formData?.unit_id));


    fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/unit-sheets-generate`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${LogoutData}`
      },
      body: formDataMethod
    })
      .then(response => response.json())
      .then(data => {
        document.querySelector('.loaderBox').classList.add("d-none");

        setData(data?.data);
        setTotal(data?.total);

        // Calculate total
        setTarget(data?.data.reduce((acc, item) => acc + (item?.target || 0), 0))
        setGross(data?.data.reduce((acc, item) => acc + (item?.gross_sum || 0), 0))
        setRefund(data?.data.reduce((acc, item) => acc + ((item?.refunds || 0) + (item?.chargeback || 0)), 0));
        setPurchase(data?.data.reduce((acc, item) => acc + (item?.purchase || 0), 0))
        setReversal(data?.data.reduce((acc, item) => acc + (item?.reversal || 0), 0))
        setNet(data?.data.reduce((acc, item) => acc + (item?.net || 0), 0))
      })
      .catch(error => {
        document.querySelector('.loaderBox').classList.add("d-none");
      });

      console.log(target)

  }

  useEffect(() => {
    document.title = 'Mt Records | Report Management';
    fectchBrandData()
    fetchUnitData()
    

  }, []);

  const maleHeaders = [
    {
      key: "unit",
      title: "UNIT",
    },
    {
      key: "agent",
      title: "AGENT",
    },
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
    // {
    //   key: "should_be_at",
    //   title: "SHOULD BE AT",
    // },




  ];



  const handleChangeSelect = (selected) => {
    setFormData({
      ...formData, unit_id: selected
    })
    console.log(formData)
  };




  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3 align-items-end">
            <div className="col-12">
              <div className="dashCard">
                <div className="row mb-3 justify-content-end">
                  <div className="col-md-12 mb-2">
                    <h2 className="mainTitle">Unit Sheets Reports</h2>
                  </div>
                  <div className="col-md-12 mb-2">
                    <div className="addUser align-items-end">

                      <div class="inputWrapper alignBox">
                        <label class="mainLabel">Units<span>*</span></label>

                        <Select
                          value={formData.unit_id}
                          isMulti
                          required
                          options={SelectOptions}
                          onChange={handleChangeSelect}
                        />
                      </div>

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

                            <td>{item?.user_name}</td>
                            <td>{`$ ${item?.target}`}</td>
                            <td>{`$ ${item?.gross_sum}`}</td>
                            <td>{`$ ${item?.refunds + item?.chargeback}`}</td>
                            <td>{`$ ${item?.reversal}`}</td>
                            <td>{`$ ${item?.purchase}`}</td>
                            <td>{`$ ${item?.net}`}</td>
                            <td>{item?.achived}</td>
                            {/* <td>{item?.should_be_at}</td> */}
                          </tr>
                        ))}

                        { (
                          <tr>
                            <td><h6 className="font-weight-bold mb-0">Total:</h6></td>
                            <td></td>
                            <td className="font-weight-bold">{`$${target}`}</td>
                            <td className="font-weight-bold">{`$${gross}`}</td>
                            <td className="font-weight-bold">{`$${refund}`}</td>
                            <td className="font-weight-bold">{`$${reversal}`}</td>
                            <td className="font-weight-bold">{`$${purchase}`}</td>
                            <td className="font-weight-bold">{`$${net}`}</td>
                            <td colSpan={2}></td>
                          </tr>
                        )}
                      </tbody>


                    </CustomTable>



                  </div>
                  {/* <div className="d-flex justify-content-center">
                    {
                      total && (
                        <p className="totalAmountWorth"><span className="font-weight-bold">Total</span>{`$${total}`}</p>
                      )
                    }
                  </div> */}
                </div>
              </div>
            </div>
          </div>

        </div>
      </DashboardLayout>
    </>
  );
};
