import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./TPuserInput.css";
import axios from "axios";
import { Button } from "react-bootstrap";
import { API_URL } from "../../helper/Constants";
import { useSelector } from "react-redux";
import { loggedInUserData } from "../../helper/localStorageHelper";

const MyVerticallyCenteredModal = ({ show, onHide, formData, setFormData }) => {
  const userData = loggedInUserData();
  const userName = userData?.name;
  // console.log(userName);

  const { patient } = useSelector((state) => state.patients);
  const [PatientId] = useState(patient?.PatientId);
  const [OrgId] = useState(patient?.OrgId);
  const [chiefComplain, setChiefComplain] = useState("");
  const [durationId, setDurationId] = useState("");
  const [durationText, setDurationText] = useState("");
  const [ccDurationValue, setCcDurationValue] = useState("");
  const [otherCC, setOtherCC] = useState("");
  const [nature, setNature] = useState("");

  const [durationList, setDurationList] = useState([]);
  const [complainList, setComplainList] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/complaints-list-day`)
      .then((response) => {
        setDurationList(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(`${API_URL}/api/complaints-list`)
      .then((response) => {
        setComplainList(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    let myFormData = { ...formData };

    myFormData.Complaints.push({
      PatientId: PatientId,
      illnessId: "72649855-E62A-4662-A7C0-C730271ADEE1",
      chiefComplain: chiefComplain,
      durationId: durationId,
      durationText: durationText,
      ccDurationValue: ccDurationValue,
      otherCC: otherCC,
      nature: nature,
      OrgId: OrgId,
      CreateUser: userName,
      UpdateUser: "",
    });

    setFormData(myFormData);

    setChiefComplain("");
    setDurationId("");
    setDurationText("");
    setCcDurationValue("");
    setOtherCC("");
    setNature("");
    onHide();
  };

  return (
    <Modal
      show={show}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="modal-header" onClick={onHide} closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="text-light font-18"
        >
          Chief Complaints
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-3 ">
        <div className="mb-2 pb-0 m-0 input-shadow">
          <input
            type="text"
            value={chiefComplain}
            onChange={(e) => setChiefComplain(e.target.value)}
            className="form-control input-padding py-2 border-0"
            placeholder="Enter Complaints"
            list="browsers"
          />
          <datalist id="browsers">
            {complainList.map((item, key) => {
              return <option key={key} value={item.CCCode} />;
            })}
          </datalist>
        </div>

        <div className="mb-3 input-shadow">
          <select
            id="Select"
            className="form-select input-padding select-form-padding"
            onChange={(e) => {
              let OptionText =
                e.target.selectedOptions[0].getAttribute("option-text");

              setDurationId(e.target.value);
              setDurationText(OptionText);
            }}
            value={durationId}
          >
            <option selected value="">
              -- Select --
            </option>
            {durationList.map((duration) => (
              <option
                value={duration.DurationId}
                key={duration.DurationId}
                option-text={duration.DurationCode}
              >
                {duration.DurationCode}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3 pb-0 m-0 input-shadow">
          <input
            type="text"
            className="form-control input-padding py-2 border-0"
            placeholder="Enter CcDuration Value"
            onChange={(e) => setCcDurationValue(e.target.value)}
            value={ccDurationValue}
          />
        </div>
        <div className="mb-3 pb-0 m-0 input-shadow">
          <input
            type="text"
            className="form-control input-padding py-2 border-0"
            placeholder="Enter Other CC"
            onChange={(e) => setOtherCC(e.target.value)}
            value={otherCC}
          />
        </div>
        <div className="mb-3 input-shadow">
          <select
            id="Select"
            className="form-select input-padding select-form-padding"
            onChange={(e) => setNature(e.target.value)}
            value={nature}
          >
            <option selected value="">
              -- Select --
            </option>
            <option value="Nature">Nature</option>
            <option value="Continuous">Continuous</option>
            <option value="Episodic">Episodic</option>
          </select>
        </div>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center border-0 pt-0">
        <Button
          onClick={(e) => handleSubmit(e)}
          type="button"
          className="border-0 text-capitalize add-button font-16"
        >
          save
        </Button>
        <Button
          type="button"
          onClick={onHide}
          className="bg-danger border-0 text-capitalize font-16"
        >
          cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const TPuserInputModal = (props) => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button
        variant=""
        onClick={() => setModalShow(true)}
        className="add-button"
      >
        Add
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        {...props}
      />
    </>
  );
};

export default TPuserInputModal;
