import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import SectionBanner from "../SectionBannerDemo/SectionBanner";
import GlobalButton from "../GlobalBtn/GlobalButton";
import "./TPuserInput.css";
import TPuserInputModal from "./TPuserInputModal";
import PESModal from "./PESModal";
import RXModal from "./RXModal";
import Anemia from "./Rating/Anemia";
import Cyanosis from "./Rating/Cyanosis";
import Edema from "./Rating/Edema";
import Jaundice from "./Rating/Jaundice";
import PatientIllness from "./Illness/PatientIllness";
import PastIllness from "./Illness/PastIllness";
import FamilyIllness from "./Illness/FamilyIllness";
import HeartWithNAD from "./Illness/HeartWithNAD";
import LungsWithNAD from "./Illness/LungsWithNAD";
import LymphNodesWithPalpable from "./Illness/LymphNodesWithPalpable";
import ChildVaccination from "./Illness/ChildVaccination";
import AdultVaccination from "./Illness/AdultVaccination";
import PatientSocial from "./Illness/PatientSocial";
import PatientWellbeing from "./Illness/PatientWellbeing";
import SingleButton from "./../Buttons/SingleButton/SingleButton";
import StationButton from "./../Buttons/StationButton/StationButton";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";  
import { GrFormClose } from 'react-icons/gr';
import Swal from "sweetalert2";
import { API_URL } from "../../helper/Constants";
import { useSelector } from "react-redux";
import PatientShortInfo from "../Common/PatientShortInfo";
import { AiOutlineClose  } from 'react-icons/ai';
import { loggedInUserData } from "../../helper/localStorageHelper";

const TPuserData = () => {
  const userData = loggedInUserData();
  const userName = userData?.name;
  // console.log(userName); 

  const { patient } = useSelector((state) => state.patients);
  const [PatientId] = useState(patient?.PatientId);
  const [formData, setFormData] = useState({
    Complaints: [],
    PatientHOPresentIllness: [],
    PatientHOPastIllness: [
      {
        PatientId: "C52C9718-8B90-4B44-9267-000011CE53A6",
        illnessId: "0EDBC57B-B8D8-409D-BFDB-0A4A81DD7EBB",
        otherIllness: "Test Past Other illness",
        CreateUser: userName,
        UpdateUser: "",
        OrgId: "73CA453C-5F08-4BE7-A8B8-A2FDDA006A2B",
      },
    ],
    PatientHOFamilyIllness: [
      {
        PatientId: "C52C9718-8B90-4B44-9267-000011CE53A6",
        illFamilyMemberId: "DB30904B-5844-4888-B22D-0F4E1F50FB74",
        illnessId: "0EDBC57B-B8D8-409D-BFDB-0A4A81DD7EBB",
        otherIllness: "",
        Status: 1,
        CreateUser: userName,
        UpdateUser: "",
        OrgId: "73CA453C-5F08-4BE7-A8B8-A2FDDA006A2B",
      },
    ],
    SocialHistory: [
      {
        PatientId: "C52C9718-8B90-4B44-9267-000011CE53A6",
        socialBehaviorId: "C91982FF-851A-4701-BD45-6A6C490E440B",
        otherSocialBehavior: "Test SocialHistory",
        CreateUser: userName,
        UpdateUser: "Nazmul1",
        OrgId: "73CA453C-5F08-4BE7-A8B8-A2FDDA006A2B",
      },
    ],
    TBScreening: [
      {
        PatientId: "C52C9718-8B90-4B44-9267-000011CE53A6",
        AnemiaSeverityId: null,
        AnemiaSeverity: 4323,
        coughGreaterThanMonth: 5,
        LGERF: 2,
        nightSweat: 4234,
        weightLoss: 543,
        CreateUser: userName,
        UpdateUser: "Nazmul1",
        OrgId: "73CA453C-5F08-4BE7-A8B8-A2FDDA006A2B",
      },
    ],
    GeneralExamination: [
      {
        PatientId: PatientId,
        anemiaSeverity: null,
        jaundiceSeverity: null,
        edemaSeverity: null,
        isLymphNodesWithPalpable: false,
        lymphNodesWithPalpableSite: "",
        lymphNodesWithPalpable: 0,
        lymphNodesWithPalpableSize: 1,
        isHeartWithNAD: false,
        heartWithNAD: "",
        isLungsWithNAD: false,
        lungsWithNAD: "",
        otherSymptom: 0,
        cyanosis: null,
        Status: "A",
        CreateUser: userName,
        UpdateUser: "Nazmul1",
        OrgId: "73CA453C-5F08-4BE7-A8B8-A2FDDA006A2B",
      },
    ],
    SystemicExamination: [],
    CurrentMedicationTaken: [],
    PatientMentalHealth: [
      {
        PatientId: "C52C9718-8B90-4B44-9267-000011CE53A6",
        questionId: "86740456-D17A-407A-8002-01544A6ADDBB",
        answerId: "8D2A4E6E-1C00-445B-9FEB-0D272D429746",
        comment: "Test",
        Status: "A",
        CreateUser: userName,
        UpdateUser: "Nazmul1",
        OrgId: "73CA453C-5F08-4BE7-A8B8-A2FDDA006A2B",
      },
    ],
    ChildVaccination: [
      {
        PatientId: "C52C9718-8B90-4B44-9267-000011CE53A6",
        vaccineId: "F20B756E-4480-4890-AD62-12C419418DC8",
        otherVaccine: "test",
        isGivenByNirog: "",
        CreateUser: userName,
        UpdateUser: "Nazmul1",
        OrgId: "73CA453C-5F08-4BE7-A8B8-A2FDDA006A2B",
      },
    ],
    AdultVaccination: [
      {
        PatientId: "C52C9718-8B90-4B44-9267-000011CE53A6",
        vaccineId: "C008DE76-5D6C-4413-B4C2-F9B18867C7AE",
        otherVaccine: "",
        isGivenByNirog: "N",
        CreateUser: userName,
        UpdateUser: "Nazmul1",
        OrgId: "73CA453C-5F08-4BE7-A8B8-A2FDDA006A2B",
      },
    ],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_URL}/api/patient-s4-create`,
        formData
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: response.data.message,
      }).then(function () {
        window.location = "station-fourb";
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred.",
      });
    }
  };

  const handleRemoveByKey = (e, property, key) => {
    e.preventDefault();

    let myFormData = { ...formData };
    myFormData[property].splice(key, 1);

    setFormData(myFormData);
  };

  useEffect(() => {
    // console.log(formData.GeneralExamination[0]);
  }, [formData]);

  return (
    <>
      <section className="stationfoura">
        <SectionBanner
          title={`Station 4A - ${
            patient?.GivenName + " " + patient?.FamilyName
          }`}
        />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="show-data mb-4">
                <PatientShortInfo />
              </div>
            </div>
          </div>

          <form className="mt-3" onSubmit={(e) => handleSubmit(e)}>
            <div className="row d-flex justify-content-center">
              <div className="col-lg-6">
                <Accordion>
                  {/* Chief Complaints */}
                  <Accordion.Item
                    eventKey="0"
                    className="input-shadow mb-3 rounded"
                  >
                    <Accordion.Header className="rounded">
                      Chief Complaints
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="d-flex flex-column align-items-center">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Chief Complain</th>
                              <th>Duration</th>
                              <th>Other CC</th>
                              <th>Nature</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {formData.Complaints &&
                              formData.Complaints.map((item, key) => {
                                return (
                                  <tr key={key}>
                                    <td>{item.chiefComplain}</td>
                                  <td>{item.durationText}</td>
                                    <td>{item.otherCC}</td>
                                    <td>{item.nature}</td>
                                    <td>
                                      <button
                                      className="btn btn-danger btn-sm"
                                        onClick={(e) =>
                                          handleRemoveByKey(
                                            e,
                                            "Complaints",
                                            key
                                          )
                                        }
                                      >
                                        <AiOutlineClose className="fs-5"/>
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>

                        <TPuserInputModal
                          formData={formData}
                          setFormData={setFormData}
                        />
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>

                  {/* H/O Present illness */}
                  <Accordion.Item
                    eventKey="1"
                    className="input-shadow mb-3 rounded"
                  >
                    <Accordion.Header>H/O Present illness</Accordion.Header>
                    <Accordion.Body>
                      <div className="">
                        <div className="">
                          <p className="font-16 fw-semibold">
                            Do you have any of the following diseases?
                          </p>
                        </div>
                        <div className="position-relative">
                          <PatientIllness className="toggle-btn" formData={formData} setFormData={setFormData} />
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>

                  {/* H/O past illness */}
                  <Accordion.Item
                    eventKey="2"
                    className="input-shadow mb-3 rounded"
                  >
                    <Accordion.Header>H/O past illness</Accordion.Header>
                    <Accordion.Body>
                      <div className="">
                        <div className="">
                          <p className="font-16 fw-semibold">
                            Do you have any of the following diseases?
                          </p>
                        </div>
                        <div className="position-relative">
                          <PastIllness className="toggle-btn" />
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>

                  {/* Patient H/O Family Illness */}
                  <Accordion.Item
                    eventKey="3"
                    className="input-shadow mb-3 rounded"
                  >
                    <Accordion.Header>Family history</Accordion.Header>
                    <Accordion.Body>
                      <div className="">
                        <div className="">
                          <p className="font-16 fw-semibold">
                            Do you have any of the following diseases?
                          </p>
                        </div>
                        <div className="position-relative">
                          <FamilyIllness className="toggle-btn" />
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>

                  {/* Social History */}
                  <Accordion.Item
                    eventKey="4"
                    className="input-shadow mb-3 rounded"
                  >
                    <Accordion.Header>Social History</Accordion.Header>
                    <Accordion.Body>
                      <div className="">
                        <div className="">
                          <p className="font-16 fw-semibold">
                            Do you have any of the following diseases?
                          </p>
                        </div>
                        <div className="position-relative">
                          <PatientSocial className="toggle-btn" />
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>

                  {/* TB screening */}
                  <Accordion.Item
                    eventKey="5"
                    className="input-shadow mb-3 rounded"
                  >
                    <Accordion.Header>TB Screening</Accordion.Header>
                    <Accordion.Body>
                      <div className="d-flex justify-content-between">
                        <div className="">
                          <p className="font-16">Cough &gt; 2 Weeks?</p>
                        </div>
                        <div className="">
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="option1"
                              id="no1"
                              value=""
                              onDoubleClick={(e) => {
                                e.target.checked = false;
                                e.target.value = null;
                              }}
                            />
                            <label
                              className="form-check-label text-capitalize"
                              htmlFor="no1"
                            >
                              no
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="option1"
                              id="yes1"
                              value=""
                              onDoubleClick={(e) => {
                                e.target.checked = false;
                                e.target.value = null;
                              }}
                            />
                            <label
                              className="form-check-label text-capitalize"
                              htmlFor="yes1"
                            >
                              yes
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <div className="">
                          <p className="font-16">LGERF ?</p>
                        </div>
                        <div className="">
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="option2"
                              id="no2"
                              value=""
                              onDoubleClick={(e) => {
                                e.target.checked = false;
                                e.target.value = null;
                              }}
                            />
                            <label
                              className="form-check-label text-capitalize"
                              htmlFor="no2"
                            >
                              no
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="option2"
                              id="yes2"
                              value=""
                              onDoubleClick={(e) => {
                                e.target.checked = false;
                                e.target.value = null;
                              }}
                            />
                            <label
                              className="form-check-label text-capitalize"
                              htmlFor="yes2"
                            >
                              yes
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex justify-content-between">
                        <div className="">
                          <p className="font-16">Night Sweat ?</p>
                        </div>
                        <div className="">
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="option3"
                              id="no3"
                              value=""
                              onDoubleClick={(e) => {
                                e.target.checked = false;
                                e.target.value = null;
                              }}
                            />
                            <label
                              className="form-check-label text-capitalize"
                              htmlFor="no3"
                            >
                              no
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="option3"
                              id="yes3"
                              value=""
                              onDoubleClick={(e) => {
                                e.target.checked = false;
                                e.target.value = null;
                              }}
                            />
                            <label
                              className="form-check-label text-capitalize"
                              htmlFor="yes3"
                            >
                              yes
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <div className="">
                          <p className="font-16">Weight Loss ?</p>
                        </div>
                        <div className="">
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="option4"
                              id="no4"
                              value=""
                            />
                            <label
                              className="form-check-label text-capitalize"
                              htmlFor="no4"
                            >
                              no
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="option4"
                              id="yes4"
                              value=""
                            />
                            <label
                              className="form-check-label text-capitalize"
                              htmlFor="yes4"
                            >
                              yes
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <div className="">
                          <p className="font-16">Contact history ?</p>
                        </div>
                        <div className="">
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="option5"
                              id="no5"
                              value=""
                            />
                            <label
                              className="form-check-label text-capitalize"
                              htmlFor="no5"
                            >
                              no
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="option5"
                              id="yes5"
                              value=""
                            />
                            <label
                              className="form-check-label text-capitalize"
                              htmlFor="yes5"
                            >
                              yes
                            </label>
                          </div>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>

                  {/* General examintion  */}
                  <Accordion.Item
                    eventKey="6"
                    className="input-shadow mb-3 rounded"
                  >
                    <Accordion.Header>General Examination</Accordion.Header>
                    <Accordion.Body>
                      <div className="mb-0 ratingItem">
                        <p className="mb-0 font-15">Anemia</p>
                        <p className="mb-0">
                          <Anemia
                            formData={formData}
                            setFormData={setFormData}
                          />
                        </p>
                      </div>
                      <div className="mb-0 ratingItem">
                        <p className="mb-0 font-15">Jaundice</p>
                        <p className="mb-0">
                          <Jaundice
                            formData={formData}
                            setFormData={setFormData}
                          />
                        </p>
                      </div>
                      <div className="mb-0 ratingItem">
                        <p className="mb-0 font-15">Cyanosis</p>
                        <p className="mb-0">
                          <Cyanosis
                            formData={formData}
                            setFormData={setFormData}
                          />
                        </p>
                      </div>
                      <div className="mb-0 ratingItem">
                        <p className="mb-0 font-15">Edema</p>
                        <p className="mb-0">
                          <Edema
                            formData={formData}
                            setFormData={setFormData}
                          />
                        </p>
                      </div>

                      {/* Lymph Nodes with Palpable */}
                      <div className="mb-1 mt-3">
                        <p className="font-15 mb-1">
                          Lymph Nodes with Palpable
                        </p>
                        <div className="position-relative onBtn">
                          <LymphNodesWithPalpable
                            formData={formData}
                            setFormData={setFormData}
                          />
                        </div>
                      </div>

                      {/* Heart with NAD */}
                      <p className="font-15 mb-1">Heart with NAD</p>
                      <div className="position-relative onBtn">
                        <HeartWithNAD
                          formData={formData}
                          setFormData={setFormData}
                        />
                      </div>

                      {/* Lungs with NAD */}
                      <p className="font-15 mb-1">Lungs with NAD</p>
                      <div className="position-relative onBtn">
                        <LungsWithNAD
                          formData={formData}
                          setFormData={setFormData}
                        />
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>

                  {/* systemic examintion */}
                  <Accordion.Item
                    eventKey="7"
                    className="input-shadow mb-3 rounded"
                  >
                    <Accordion.Header>Systemic Examination </Accordion.Header>
                    <Accordion.Body>
                      <div className="d-flex flex-column align-items-center">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Physical Findings</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {formData.SystemicExamination &&
                              formData.SystemicExamination.map((item, key) => {
                                return (
                                  <tr key={key}>
                                    <td>{item.physicalFinding}</td>
                                    <td>{item.Status}</td>
                                    <td>
                                      <button
                                      className="btn btn-danger btn-sm"
                                        onClick={(e) =>
                                          handleRemoveByKey(
                                            e,
                                            "SystemicExamination",
                                            key
                                          )
                                        }
                                      >
                                        <AiOutlineClose className="fs-5"/>
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>

                        <PESModal
                          formData={formData}
                          setFormData={setFormData}
                        />
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>

                  {/* Current Rx taken */}
                  <Accordion.Item
                    eventKey="8"
                    className="input-shadow mb-3 rounded"
                  >
                    <Accordion.Header>
                      Current Medication Taken
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="d-flex flex-column align-items-center">
                        <table className="table table-bordered table-condensed">
                          <thead>
                            <tr>
                              <th>Medicine Name</th>
                              <th>Dose Value</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {formData.CurrentMedicationTaken &&
                              formData.CurrentMedicationTaken.map(
                                (item, key) => {
                                  return (
                                    <tr key={key}>
                                      <td>{item.medicineName}</td>
                                      <td>{item.doseValue}</td>
                                      <td>{item.Status}</td>
                                      <td>
                                        <button
                                        className="btn btn-danger btn-sm"
                                          onClick={(e) =>
                                            handleRemoveByKey(
                                              e,
                                              "CurrentMedicationTaken",
                                              key
                                            )
                                          }
                                        >
                                          <AiOutlineClose className="fs-5"/>
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                }
                              )}
                          </tbody>
                        </table>

                        <RXModal
                          formData={formData}
                          setFormData={setFormData}
                        />
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>

                  {/* Patient Mental Health */}
                  <Accordion.Item
                    eventKey="9"
                    className="input-shadow mb-3 rounded"
                  >
                    <Accordion.Header>Patient Mental Health</Accordion.Header>
                    <Accordion.Body>
                      <div className="">
                        <div className="">
                          <p className="font-16 fw-semibold">
                            Any sign of mental illness, stress or depression?
                          </p>
                        </div>
                        <div className="position-relative">
                          <PatientWellbeing className="toggle-btn" />
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>

                  {/* Child Vaccination */}
                  <Accordion.Item
                    eventKey="10"
                    className="input-shadow mb-3 rounded"
                  >
                    <Accordion.Header>Child Vaccination</Accordion.Header>
                    <Accordion.Body>
                      <div className="">
                        <div className="">
                          <p className="font-16 fw-semibold">
                            Do you have any of the following diseases?
                          </p>
                        </div>
                        <div className="position-relative">
                          <ChildVaccination className="toggle-btn"/>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                  {/* Abult Vaccination */}

                  <Accordion.Item
                    eventKey="11"
                    className="input-shadow mb-3 rounded"
                  >
                    <Accordion.Header>Adult Vaccination</Accordion.Header>
                    <Accordion.Body>
                      <div className="">
                        <div className="">
                          <p className="font-16 fw-semibold">
                            Do you have any of the following diseases?
                          </p>
                        </div>
                        <div className="position-relative">
                          <AdultVaccination className="toggle-btn" />
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>

            {/* <div className="text-center mt-3 position-relative">
              <Button className="border-0 button-color text-white py-2 px-3 text-capitalize rounded	undefined" type="submit">save & next</Button>
            </div> */}
            <div className="text-center mt-3 position-relative">
              <section>
                <div className="text-center mt-3 position-relative">
                  <Button
                    className="border-0 button-color text-white py-2 px-3 text-capitalize rounded	undefined"
                    type="submit"
                  >
                    save & next
                  </Button>
                </div>
              </section>
              <div className="previewBtn">
                <Link to="/prescription"
                  className="border-0 button-color text-white py-2 px-3 text-capitalize rounded"
                >
                  Histrory
                </Link>
            </div>
            </div>
          </form>
        </div>

        <GlobalButton />
      </section>
    </>
  );
};

export default TPuserData;
