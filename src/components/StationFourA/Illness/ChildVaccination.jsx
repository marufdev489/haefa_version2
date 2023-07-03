import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../helper/Constants";

const PatientIllness = () => {
  const [isShown, setIsShown] = useState(false);
  const handleClick = (event) => {
    setIsShown((current) => !current);
  };

  //ChildVaccination
  const [ChildVaccination, setChildVaccination] = useState([]);
  const getChildVaccinationData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/child-vaccination`);

      if (response.status === 200) {
        setChildVaccination(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getChildVaccinationData();
  }, []);

  return (
    <>
      <div className="col-lg-12 d-flex">
        <div className="form-check form-switch btn">
          <input
            className="form-check-input"
            type="checkbox"
            onClick={handleClick}
            role="switch"
            id="flexSwitchCheckChecked"
            defaultChecked=""
          />
        </div>
      </div>

      {isShown && (
        <div className="col-lg-12">
          <div className="d-flex justify-content-end">
            <p className="text-center font-12 mb-2 lh-1">
              Given by
              <br />
              nirog team?
            </p>
          </div>
          
          {ChildVaccination.map((item) => (
            <div className="d-flex justify-content-between">
              <div className="">
                <p className="font-16">{item.VaccineCode}</p>
              </div>
              <div className="">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={item.VaccineCode}
                    id="bcg1"
                    value="option1"
                    onDoubleClick={(e) => {
                      e.target.checked = false;
                      e.target.value = null;
                    }}
                  />
                  <label
                    className="form-check-label text-capitalize"
                    htmlFor="bcg1"
                  >
                    no
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={item.VaccineCode}
                    id="bcg2"
                    value="option2"
                    onDoubleClick={(e) => {
                      e.target.checked = false;
                      e.target.value = null;
                    }}
                  />
                  <label
                    className="form-check-label text-capitalize"
                    htmlFor="bcg2"
                  >
                    yes
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value=""
                  />
                  <label
                    className="form-check-label text-capitalize"
                    htmlFor="inlineRadio2"
                  ></label>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* show component on click  */}
      {isShown || (
        <div>
          <h2></h2>
        </div>
      )}
    </>
  );
};

export default PatientIllness;
