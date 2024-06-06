import { useState, useEffect, useRef } from "react";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

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
  const [total, setTotal] = useState();
  const [allTotal, setAllTotal] = useState();

  const [userList, setUserList] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showList, setShowList] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowList(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);


  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex < filteredUsers.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    } else if (event.key === 'Enter' && selectedIndex !== -1) {
      event.preventDefault();
      handleUserSelect(filteredUsers[selectedIndex]);
    }
  };


  useEffect(() => {
    const LogoutData = localStorage.getItem('login');
    document.querySelector('.loaderBox').classList.remove("d-none");
    fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/user-listing`,
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
        setUserList(data.users);
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");


      })
  }, []);

  useEffect(() => {
    // Filter user list based on input value
    const filtered = userList.filter(user =>
      user.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [inputValue, userList]);

  // const handleInputChange = event => {
  //   setInputValue(event.target.value);
  // };

  const handleUserSelect = user => {
    // setInputValue(user.name); // Set input value to the selected user name

    setFormData({
      ...formData, search: user.name
    })
    // Do something with the selected user, such as displaying more details or triggering an action
  };

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




  const handleChange = (event) => {
    const { name, value } = event.target;

    setInputValue(event.target.value);


    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

  };




  const fetchData = () => {
    const LogoutData = localStorage.getItem('login');
    document.querySelector('.loaderBox').classList.remove("d-none");

    const formDataMethod = new FormData();
    formDataMethod.append('user_name', formData.search);



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
        setTotal(data?.total);
        setAllTotal(data?.total_all);
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");

      })
  }

  useEffect(() => {
    document.title = 'Mt Records | Report Management';
    // fectchBrandData()
    // fetchUnitData()

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
    // {
    //   key: "should_be_at",
    //   title: "SHOULD BE AT",
    // },




  ];




  console.log("data user", data)
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
                    <div className="addUser align-items-center" ref={inputRef}>
                      <CustomInput
                        type="text"
                        placeholder="Search Here..."
                        name="search"
                        value={formData.search}
                        inputClass="mainInput"
                        onChange={handleChange}
                        onFocus={() => setShowList(true)}
                        onKeyDown={handleKeyDown} // Add keydown event handler
                      />
                      <CustomButton
                        variant="primaryButton"
                        text="Search"
                        type="button"
                        onClick={fetchData}
                      />
                    </div>
                    <div className="position-relative">
                      {showList && (
                        <ul className="searchList">
                          {filteredUsers.map((user, index) => (
                            <li
                              key={user.id}
                              onClick={() => handleUserSelect(user)}
                              className={selectedIndex === index ? 'selected' : ''}
                            >
                              {user.name}
                            </li>
                          ))}
                        </ul>
                      )}
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
                            {/* <td>{item?.should_be_at}</td> */}
                          </tr>
                        ))}
                      </tbody>

                      <tbody>
                        {allTotal?.map((item, index) => (
                          <tr>
                            <td className="text-capitalize">
                              <p className="totalAmountWorth"><span className="font-weight-bold">Total</span></p>
                            </td>


                            <td>{`$ ${item?.target_total}`}</td>
                            <td>{`$ ${item?.gross_sum_total}`}</td>
                            <td>{`$ ${item?.refunds_total + item?.chargeback_total}`}</td>
                            <td>{`$ ${item?.reversal_total}`}</td>
                            <td>{`$ ${item?.purchase_total}`}</td>
                            <td>{`$ ${item?.net_total}`}</td>
                            <td></td>
                            <td></td>
                          </tr>
                        ))}
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
