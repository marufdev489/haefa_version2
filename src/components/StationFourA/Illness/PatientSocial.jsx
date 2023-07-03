import React, { useEffect, useState } from "react";
import OthersField from "../Illness/OthersField";
import axios from "axios";
import { API_URL } from "../../../helper/Constants";
const PatientIllness = () => {
  const [isShown, setIsShown] = useState(false);
  const handleClick = (event) => {
    setIsShown((current) => !current);
  };

  //SocialHistory
  const [SocialHistory, setSocialHistory] = useState([]);
  const getSocialHistoryData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/social-history`);

      if (response.status === 200) {
        setSocialHistory(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSocialHistoryData();
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
          {SocialHistory.map((item) => (
            <div
              key={item.SocialBehaviorId}
              className="d-flex justify-content-between"
            >
              <div className="">
                <p className="font-16">{item.SocialBehaviorCode}</p>
              </div>
              <div className="">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={item.SocialBehaviorId}
                    id="smoking1"
                    value="option3"
                    onDoubleClick={(e) => {
                      e.target.checked = false;
                      e.target.value = null;
                    }}
                  />
                  <label
                    className="form-check-label text-capitalize"
                    htmlFor="smoking1"
                  >
                    no
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={item.SocialBehaviorId}
                    id="smoking2"
                    value="option4"
                    onDoubleClick={(e) => {
                      e.target.checked = false;
                      e.target.value = null;
                    }}
                  />
                  <label
                    className="form-check-label text-capitalize"
                    htmlFor="smoking2"
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
          {/* </div> */}
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
