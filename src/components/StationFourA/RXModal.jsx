import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./TPuserInput.css";
import axios from "axios";
import { API_URL } from "../../helper/Constants";
import { useSelector } from 'react-redux';

function MyVerticallyCenteredModal({ show, onHide, formData, setFormData }) {
  const {patient} = useSelector((state) => state.patients);

  const [PatientId] = useState(patient?.PatientId);
  const [OrgId] = useState(patient?.OrgId);

  const [medicineName, setMedicineName] = useState("");
  const [doseValue, setDoseValue] = useState("");
  const [status, setStatus] = useState("");

  const [medicineNameList, setMedicineNameList] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/current-medication-token`)
      .then((response) => {
        setMedicineNameList(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    let myFormData = { ...formData };

    myFormData.CurrentMedicationTaken.push({
      PatientId: PatientId,
      medicineName: medicineName,
      durationId: "D796D547-1815-4EB7-A74D-03AB1342A625",
      doseValue: doseValue,
      Status: status,
      CreateUser: "Nazmul",
      UpdateUser: "Nazmul1",
      OrgId: OrgId,
    });

    setFormData(myFormData);
    setMedicineName("");
    setDoseValue("");
    setStatus("");
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
          Current Medication Taken
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-3 pb-0">
        <div className="mb-2 pb-0 m-0">
          <div className="mb-2 pb-0 m-0">
            <input
              type="text"
              value={medicineName}
              onChange={(e) => setMedicineName(e.target.value)}
              className="form-control input-padding rounded-pill py-2 border-0"
              placeholder="Enter Medicine Name"
              list="browsers"
            />
            <datalist id="browsers">
              {medicineNameList.map((item, key) => {
                return <option key={key} value={item.DrugCode} />;
              })}
            </datalist>
          </div>
        </div>

        <div className="form-check mb-3 ms-3 mt-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="medicineSelect"
            // value={allergyToMedication}
            // onChange={(e) => setAllergyToMedication(e.target.value)}
          />
          <label className="form-check-label" htmlFor="allergy" for="medicineSelect">
            Allergy to medication
          </label>
        </div>
        <div className="mb-3 input-shadow rounded-pill">
          <select
            id="Select"
            // onChange={(e) => setFrequencyHour(e.target.value)}
            // value={frequencyHour}
            className="form-select input-padding rounded-pill select-form-padding"
          >
            <option value="" selected>
              Frequency Hours
            </option>
            <option value="0">0</option>
            <option value="4">4</option>
            <option value="6">6</option>
            <option value="8">8</option>
            <option value="12">12</option>
            <option value="24">24</option>
          </select>
        </div>
        <div className="mb-3 input-shadow rounded-pill">
          <input
            type="text"
            // onChange={(e) => setDose(e.target.value)}
            // value={dose}
            className="form-control input-padding rounded-pill py-2 border-0"
            placeholder="Dos : 10mg, 20ml"
          />
        </div>
        <div className="mb-3 input-shadow rounded-pill">
          <input
            type="text"
            onChange={(e) => setDoseValue(e.target.value)}
            value={doseValue}
            className="form-control input-padding rounded-pill py-2 border-0"
            placeholder="Duration : 2 D,M,Y"
          />
        </div>
        <div className="mb-3 input-shadow rounded-pill">
          <input
            type="text"
            onChange={(e) => setStatus(e.target.value)}
            value={status}
            className="form-control input-padding rounded-pill py-2 border-0"
            placeholder="Status"
          />
        </div>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center border-0 pt-0">
        <Button
          type="button"
          onClick={(e) => handleSubmit(e)}
          className="border-0 text-capitalize add-button rounded add-button-padding font-16"
        >
          save
        </Button>
        <Button
          onClick={onHide}
          className="bg-danger border-0 text-capitalize rounded add-button-padding font-16"
        >
          cancel
        </Button>
        {/* </div> */}
      </Modal.Footer>
    </Modal>
  );
}

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
