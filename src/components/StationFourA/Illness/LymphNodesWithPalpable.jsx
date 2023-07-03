import React, { useEffect } from "react";
import { useState } from "react";

const LymphNodesWithPalpable = ({ formData, setFormData }) => {
  const [isLymphNodesWithPalpable, setIsLymphNodesWithPalpable] =
    useState(false);
  const [lymphNodesWithPalpableSite, setLymphNodesWithPalpableSite] =
    useState("");

  const handleClick = () => {
    setIsLymphNodesWithPalpable((current) => !current);
  };

  useEffect(() => {
    if (!isLymphNodesWithPalpable) {
      setLymphNodesWithPalpableSite("");
    }
  }, [isLymphNodesWithPalpable]);

  useEffect(() => {
    let myFormData = { ...formData };
    myFormData.GeneralExamination[0].isLymphNodesWithPalpable =
      isLymphNodesWithPalpable;
    myFormData.GeneralExamination[0].lymphNodesWithPalpableSite =
      lymphNodesWithPalpableSite;

    setFormData(myFormData);
  }, [isLymphNodesWithPalpable, lymphNodesWithPalpableSite]);

  return (
    <>
      <div className="col-lg-12">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            onClick={handleClick}
            checked={isLymphNodesWithPalpable}
            role="switch"
            id="flexSwitchCheckChecked"
            defaultChecked=""
          />
        </div>
      </div>

      {isLymphNodesWithPalpable && (
        <div className="col-lg-12">
          <textarea
            rows="3"
            className="comment form-control"
            placeholder="type here"
            value={lymphNodesWithPalpableSite}
            onChange={(e) => setLymphNodesWithPalpableSite(e.target.value)}
          ></textarea>
        </div>
      )}
    </>
  );
};

export default LymphNodesWithPalpable;
