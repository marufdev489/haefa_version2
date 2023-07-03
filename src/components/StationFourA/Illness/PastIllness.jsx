import React, { useEffect, useState } from "react";
import OthersField from "./OthersField";
import axios from "axios";
import { API_URL } from "../../../helper/Constants";
const PatientIllness = () => {
  const [isShown, setIsShown] = useState(false);
  const handleClick = (event) => {
    setIsShown((current) => !current);
  };

  //PresentIllness
  const [PresentIllness, setPresentIllness] = useState([]);
  const getPresentIllnessData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/patient-ho-past-illness`);

      if (response.status === 200) {
        setPresentIllness(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPresentIllnessData();
  }, []);

  return (
    <>
      <div className="col-lg-12">
        <div className="form-check form-switch">
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
          {PresentIllness.map((item) => (
            <div
              key={item.IllnessId}
              value={item.IllnessId}
              className="d-flex justify-content-between"
            >
              <div className="">
                <p className="font-16"> {item.IllnessCode}</p>
              </div>
              <div className="">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={item.IllnessCode}
                    id="inlineRadio1"
                    value="past"
                    onDoubleClick={(e) => {
                      e.target.checked = false;
                      e.target.value = null;
                    }}
                  />
                  <label
                    className="form-check-label text-capitalize"
                    htmlFor="inlineRadio1"
                  >
                    no
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={item.IllnessCode}
                    id="inlineRadio2"
                    value="option2"
                    onDoubleClick={(e) => {
                      e.target.checked = false;
                      e.target.value = null;
                    }}
                  />
                  <label
                    className="form-check-label text-capitalize"
                    htmlFor="inlineRadio2"
                  >
                    yes
                  </label>
                </div>
              </div>
            </div>
          ))}

          {/* Other */}
          <div className="mb-1">
            <p className="font-16 mb-1">Others</p>
            <div className="position-relative onBtn">
              <OthersField />
            </div>
          </div>
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
