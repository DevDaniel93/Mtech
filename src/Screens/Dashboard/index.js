import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';

import { DashboardLayout } from "./../../Components/Layout/DashboardLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleDown,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { CChart } from "@coreui/react-chartjs";
import { SelectBox } from "../../Components/CustomSelect";
import { useApi } from "../../Api";
import CustomInput from "../../Components/CustomInput"

import "./style.css";
import CustomButton from "../../Components/CustomButton";

export const Dashboard = () => {
  const [data, setData] = useState('');
  const [formData, setFormData] = useState({
    current_date: false,
    last_date: false,
  });

  const currentData = () => {

    if (!formData.last_date) {
      setFormData({
        ...formData,
        last_date: formData?.current_date
      });
    }

    const LogoutData = localStorage.getItem('login');
    document.querySelector('.loaderBox').classList.remove("d-none");

    fetch(`${process.env.REACT_APP_API_URL}/public/api/admin/get-dashboard-table?current_date=${formData?.current_date}&last_date=${formData?.last_date}`,
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

        setData(data);
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");

      })
  }



  const handleSearch = () => {
    currentData()
  }


  useEffect(() => {

    document.title = 'Mt Records | Dashboard';
  }, []);


  useEffect(() => {
    currentData()

  }, [])

  const handleChange = (e) => {
    // currentData(e.target.value)
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    console.log(formData);
  }



  return (
    <>
      <DashboardLayout>
        <div className="container-fluid statsBox">
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="row mb-2 align-items-center justify-content-end">
                  <div className="col-md-12 mb-2">
                    <div className="row align-items-end justify-content-between">
                      {data?.start_month && (

                        <div className="col-md-3">
                          <h3 className="mainTitle">{`Month of ${data?.start_month} ${data?.start_year}`} {data?.end_month ? (<span>{`- ${data?.end_month} ${data?.end_year}`}</span>): ''}</h3>
                        </div>
                      )}
                      <div className="col-md-9">
                        <div className="row align-items-end justify-content-end">
                          <div className="col-md-3 mb-2">
                            <CustomInput
                              label="Start Date"
                              id="date"
                              name="current_date"
                              type="date"
                              placeholder="date"
                              labelClass="mainLabel"
                              inputClass="mainInput"
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col-md-3 mb-2">
                            <CustomInput
                              label="End Date"
                              id="date"
                              type="date"
                              placeholder="date"
                              name="last_date"
                              labelClass="mainLabel"
                              inputClass="mainInput"
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col-md-1 px-md-0 mb-2">
                            {/* {
                          clear && (
                            <button className="clearFilter bg-transparent border-0" onClick={clearFilter}><FontAwesomeIcon icon={faRefresh}></FontAwesomeIcon></button>
                          )
                        } */}
                            <CustomButton variant='primaryButton' className="searchBtn" type='button' onClick={handleSearch} icon={faMagnifyingGlass} />
                          </div>
                        </div>

                      </div>

                    </div>
                  </div>

                  <div className="col-md-9">
                    <div className="row">
                      <div className="col">
                        <div className="spaceReduce shadow p-2 rounded-3">
                          <h6 className="text-success">Total Gross</h6>
                          <h5>{`$${data?.totals?.gross_amount}`}</h5>
                        </div>
                      </div>
                      <div className="col">
                        <div className="spaceReduce shadow p-2 rounded-3">
                          <h6 className="text-danger">Total Refund</h6>
                          <h5>{`$${data?.totals?.refund_amount}`}</h5>
                        </div>
                      </div>
                      <div className="col">
                        <div className="spaceReduce shadow p-2 rounded-3">
                          <h6 className="text-ornage">Total CB</h6>
                          <h5>{`$${data?.totals?.charge_back}`}</h5>
                        </div>
                      </div>
                      <div className="col">
                        <div className="spaceReduce shadow p-2 rounded-3">
                          <h6>Total Purchase</h6>
                          <h5>{`$${data?.totals?.purchase}`}</h5>
                        </div>
                      </div>
                      <div className="col">
                        <div className="spaceReduce shadow p-2 rounded-3">
                          <h6>Total Reversal</h6>
                          <h5>{`$${data?.totals?.reversal_amount}`}</h5>
                        </div>
                      </div>
                      <div className="col">
                        <div className="spaceReduce shadow p-2 rounded-3">
                          <h6>Total Net</h6>
                          <h5>{`$${data?.totals?.net}`}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {data?.data && data?.data?.map((item, index) => (
                  <div className={`row mb-2 ${index % 2 === 0 ? '' : ''}`}>
                    <div className="col-md-12">
                      <h3 className="mainTitle mb-1 borderLine">{item?.unit_name}</h3>
                    </div>
                    <div className="col">
                      <div className="spaceReduce shadow p-2 rounded-3">
                        <h6 className="text-success">Gross</h6>
                        <h5>{`$${item?.gross_amount}`}</h5>
                      </div>
                    </div>
                    <div className="col">
                      <div className="spaceReduce shadow p-2 rounded-3">
                        <h6 className="text-danger">Refund</h6>
                        <h5>{`$${item?.refund_amount}`}</h5>
                      </div>
                    </div>
                    <div className="col">
                      <div className="spaceReduce shadow p-2 rounded-3">
                        <h6 className="text-ornage">CB</h6>
                        <h5>{`$${item?.charge_back}`}</h5>
                      </div>
                    </div>
                    <div className="col">
                      <div className="spaceReduce shadow p-2 rounded-3">
                        <h6>Purchase</h6>
                        <h5>{`$${item?.purchase}`}</h5>
                      </div>
                    </div>
                    <div className="col">
                      <div className="spaceReduce shadow p-2 rounded-3">
                        <h6>Reversal</h6>
                        <h5>{`$${item?.reversal_amount}`}</h5>
                      </div>
                    </div>
                    <div className="col">
                      <div className="spaceReduce shadow p-2 rounded-3">
                        <h6>Net</h6>
                        <h5>{`$${item?.net}`}</h5>
                      </div>
                    </div>
                  </div>
                ))}


              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};
