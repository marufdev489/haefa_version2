import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../FourCuserInput.css";
import axios from "axios";
import { API_URL } from "../../../helper/Constants";
import { useSelector } from "react-redux";

function MyVerticallyCenteredModal({ show, onHide, formData, setFormData }) {
  const { patient } = useSelector((state) => state.patients);

  const [PatientId] = useState(patient?.PatientId);

  const [drugCode, setDrugCode] = useState("");
  const [drugId, setDrugId] = useState("");
  const [instruction, setInstruction] = useState();
  const [durationId, setDurationId] = useState("");

  const [drugDurationValue, setDrugDurationValue] = useState("");
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [drugCodeList, setDrugCodeList] = useState([]);

  const [frequencyHour, setFrequencyHour] = useState("");
  const [frequencyValue, setFrequencyValue] = useState("");

  useEffect(() => {
    let result;
    if (frequencyHour == 4) {
      result = '1+1+1+1+1+1';
    } else if (frequencyHour == 6) {
      result = "1+1+1+1";
    } else if (frequencyHour == 8) {
      result = "1+1+1";
    } else if (frequencyHour == 12) {
      result = "1+0+1";
    } else if (frequencyHour == 24) {
      result = "0+0+1";
    } else  {
      result = 'N/A';
    }
    setFrequencyValue(result);
  }, [frequencyHour]);

  // console.log(frequencyValue)

  useEffect(() => {
    if (drugCode) {
      axios
        .get(`${API_URL}/api/treatment-suggestins`, {
          params: {
            keyword: drugCode,
            limit: 5,
          },
        })
        .then((response) => {
          setDrugCodeList(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [drugCode]);

  const [specialInstruction, setSpecialInstruction] = useState("");
  const [specialInstructionList, setSpecialInstructionList] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/special-instruction`, {})
      .then((response) => {
        setSpecialInstructionList(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    let myFormData = { ...formData };

    myFormData.TreatmentSuggestion.push({
      PatientId: PatientId,
      drugId: drugId,
      instruction,
      durationId: "D796D547-1815-4EB7-A74D-03AB1342A625",
      frequencyId: "143927E4-67BC-41FD-B092-063033E34366",
      frequency: frequencyValue,
      refInstructionId: specialInstruction,
      drugDurationValue: drugDurationValue,
      otherDrug: "tab amaryl 1mg",
      drugDose: "",
      specialInstruction: "",
      comment: "test",
      Status: "A",
      CreateUser: "nazmul",
      OrgId: "73CA453C-5F08-4BE7-A8B8-A2FDDA006A2B",
    });

    setFormData(myFormData);

    setDrugId("");
    setInstruction("");
    setDrugCode("");
    setDurationId("");
    setFrequencyValue("");
    setDrugDurationValue("");
    onHide();
    setShowSuggestion("");
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
          Treatment Suggestions
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-3 ">
        <div className="mb-3 pb-0 m-0 input-shadow rounded-pill">
          <input
            type="text"
            value={drugCode}
            onChange={(e) => {
              setDrugCode(e.target.value);
              setShowSuggestion(true);
            }}
            className="form-control input-padding rounded-pill py-2 border-0"
            placeholder="Drug"
          />

          <ul className="autocompleteDataList">
            {showSuggestion &&
              drugCodeList.map((item, key) => {
                return (
                  <li
                    key={key}
                    onClick={() => {
                      setDrugId(item.DrugId);
                      setInstruction(item.Description);
                      setDrugCode(item.DrugCode);
                      setDrugCodeList([]);
                      setShowSuggestion(false);
                    }}
                  >
                    {item.DrugCode}
                  </li>
                );
              })}
          </ul>
        </div>

        <div className="mb-3 input-shadow rounded-pill">
          <select
            id="Select"
            
            onChange={(e) =>  setFrequencyHour(e.target.value)}
            className="form-select input-padding rounded-pill select-form-padding"
          >
        
            <option>Frequency Hours</option>
            <option>0</option>
            <option>4</option>
            <option>6</option>
            <option>8</option>
            <option>12</option>
            <option>24</option>
          </select>
        </div>

        <div className="mb-3 input-shadow rounded-pill">
          <input
            type="text"
            value={durationId}
            onChange={(e) => setDurationId(e.target.value)}
            className="form-control input-padding rounded-pill py-2 border-0"
            placeholder="Dos : 10mg, 20ml"
          />
        </div>
        {/* <div className="mb-3 input-shadow rounded-pill">
          <select
            id="Select"
            value={durationId}
            onChange={(e) => setDurationId(e.target.value)}
            className="form-select input-padding rounded-pill select-form-padding"
          >
            <option selected value="" disabled>
              Frequency Hours
            </option>
            <option value="0">0</option>
            <option value="4">4</option>
            <option value="6">6</option>
            <option value="8">8</option>
            <option value="12">12</option>
            <option value="24">24</option>
          </select>
        </div> */}

        <div className="mb-3 input-shadow rounded-pill">
          <input
            type="text"
            value={drugDurationValue}
            onChange={(e) => setDrugDurationValue(e.target.value)}
            className="form-control input-padding rounded-pill py-2 border-0"
            placeholder="Duration : 2 D,M,Y"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="" className="form-label text-capitalize"></label>
          <select
            id="Select"
            value={specialInstruction}
            onChange={(e) => setSpecialInstruction(e.target.value)}
            className="form-control input-padding rounded-pill py-2 border-0"
          >
            <option selected value="">
              -- Select --
            </option>
            {specialInstructionList.map((item) => (
              <option key={item.RefInstructionId} value={item.RefInstructionId}>
                {item.InstructionInBangla}
              </option>
            ))}
          </select>
        </div>

        {/* <div className="mb-3 pb-0 m-0 input-shadow rounded-pill">
          <input
            type="text"
            value={specialInstruction}
            onChange={(e) => setSpecialInstruction(e.target.value)}
            className="form-control input-padding rounded-pill py-2 border-0"
            placeholder="Special instruction"
          />
        </div> */}
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
