import React, { useEffect, useState } from "react";
import OthersField from "../Illness/OthersField";
import axios from "axios";
import { API_URL } from "../../../helper/Constants";
const PatientIllness = () => {
  const [isShown, setIsShown] = useState(false);
  const handleClick = (event) => {
    setIsShown((current) => !current);
  };

  //FamilyIllness
  const [FamilyIllness, setFamilyIllness] = useState([]);
  const getFamilyIllnessData = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/patient-ho-family-illness`
      );

      if (response.status === 200) {
        setFamilyIllness(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFamilyIllnessData();
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
          {FamilyIllness.map((item,i) => (
            <div 
              key={item.IllnessId}
              value={item.IllnessId}
              className="d-flex justify-content-between">
              <div className="">
                <p className="font-16">{item.IllnessCode}</p>
              </div>
              <div className="">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name= {i}
                    id="Hypertension1"
                    value="option1"
                    onDoubleClick={(e) => {
                      e.target.checked = false;
                      e.target.value = null;
                    }}
                  />
                  <label
                    className="form-check-label text-capitalize"
                    htmlFor="Hypertension1"
                  >
                    no
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name= {i}
                    id="Hypertension2"
                    value="option2"
                    onDoubleClick={(e) => {
                      e.target.checked = false;
                      e.target.value = null;
                    }}
                  />
                  <label
                    className="form-check-label text-capitalize"
                    htmlFor="Hypertension2"
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
