import React, { useEffect, useState } from "react";
import OthersField from "../Illness/OthersField";
import axios from "axios";
import { API_URL } from "../../../helper/Constants";
import { useSelector } from "react-redux";

const PatientIllness = ({ formData, setFormData }) => {
  const [isShown, setIsShown] = useState(false);
  const { patient } = useSelector((state) => state.patients);

  const [PatientId] = useState(patient?.PatientId);
  const [OrgId] = useState(patient?.OrgId);

  const handleClick = (event) => {
    setIsShown((current) => !current);
  };

  // PresentIllness
  const [PresentIllness, setPresentIllness] = useState([]);
  
  const getPresentIllnessData = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/patient-ho-present-illness`
      );
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

  const handleChangeRadio = (illnessId, value) => {
    let myFormData = { ...formData };

    const index = myFormData.PatientHOPresentIllness.findIndex(
      (object) => object.illnessId === illnessId
    );

    if (index === -1) {
      myFormData.PatientHOPresentIllness.push({
        PatientId: PatientId,
        illnessId: illnessId,
        otherIllness: "Test Present Other illness",
        Status: value,
        CreateUser: "Nazmul",
        UpdateUser: "Nazmul1",
        OrgId: OrgId,
      });
    }

    if (index === 0) {
      myFormData.PatientHOPresentIllness =
        myFormData.PatientHOPresentIllness.filter((item) => {
          if (item.illnessId == illnessId) {
            item.Status = value;
          }
          return item;
        });
    }

    setFormData(myFormData);
  };

  const handleRemove = (illnessId) => {
    let myFormData = { ...formData };

    myFormData.PatientHOPresentIllness =
      myFormData.PatientHOPresentIllness.filter((item) => {
        return item.illnessId != illnessId;
      });

    setFormData(myFormData);
  };

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
          {PresentIllness.map((item, key) => (
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
                    name={item.IllnessId}
                    id="inlineRadio1"
                    value="0"
                    onChange={(e) =>
                      handleChangeRadio(item.IllnessId, e.target.value)
                    }
                    onDoubleClick={(e) => {
                      e.target.checked = false;
                      e.target.value = null;
                      handleRemove(item.IllnessId);
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
                    name={item.IllnessId}
                    id="inlineRadio2"
                    value="1"
                    onChange={(e) =>
                      handleChangeRadio(item.IllnessId, e.target.value)
                    }
                    onDoubleClick={(e) => {
                      e.target.checked = false;
                      e.target.value = null;
                      handleRemove(item.IllnessId);
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
