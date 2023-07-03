import React, { useEffect, useState } from "react";
import axios from "axios";
import { GoPlus } from "react-icons/go";
import "./Prescription.css";
import SectionBanner from "../SectionBannerDemo/SectionBanner";
import GlobalButton from "../GlobalBtn/GlobalButton";
import DoubleButton from "./../Buttons/DoubleButton/DoubleButton";
import bloodpressure from "./../../assets/img/bloodpressure.png";
import Glucose from "./../../assets/img/GlucoseImage.jpg";
import Hemoglobin from "./../../assets/img/HemoglobinImage.png";
import { API_URL } from "../../helper/Constants";
import { useSelector } from "react-redux";
import { useNavigate} from "react-router-dom";
const Prescription = () => {
  const navigate = useNavigate();
  const { patient } = useSelector((state) => state.patients);
  const patientId = patient?.PatientId;

  const [prescriptionpreviewall, setPrescriptionpreviewalldata] = useState([]);

  useEffect(() => {
    prescriptionpreviewalldata();
  }, []);
  const prescriptionpreviewalldata = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/prescription-preview-all-data`,
        {
          params: {
            patientId: patientId,
          },
        }
      );
      setPrescriptionpreviewalldata(response.data);
    } catch (error) {
      console.error("Error fetching prescription preview data:", error);
    }
  };

  //console.log(prescriptionpreviewall);
  return (
    <>
      <SectionBanner title="Prescription Preview" />
      <section id="prescription">
        <div className="container bg-light py-5 px-5">
          {/*            */}

          <div className="patienStatus mb-4">
            <h3>Height and Weight</h3>
            {prescriptionpreviewall.HeightWeight?.map((item, index) => (
              <div key={index}>
                <span>{item.CreateDate} &gt;&gt;</span>
                <span>Height: {item.Height} cm</span>
                <span>Weight: {item.Weight} kg</span>
                <span>
                  BMI: {item.BMI} ({item.BMIStatus})
                </span>
              </div>
            ))}
          </div>
          <div className="patienStatus mb-4">
            <h3>Blood Pressure</h3>
            {prescriptionpreviewall.BP?.map((item, index) => (
              <div key={index}>
                <p>Blood Pressure:</p>
                <span>Create Date: {item.CreateDate}</span>
                <span>Systolic: {item.BPSystolic1} mmHgd</span>
                <span>Diastolic: {item.BPDiastolic1} mmHg</span>

                <p className="mt-4 mb-1 fs-6">Repeat BP</p>
                <span>Create Date: {item.CreateDate}</span>
                <span>Systolic: {item.BPDiastolic1} mmHg</span>
                <span>Diastolic: {item.BPDiastolic2} mmHg</span>
                <span>Heart Rate: {item.HeartRate} bpm</span>
                <span>Temperature: {item.CurrentTemparature} &#8457;</span>
              </div>
            ))}
          </div>
          <div className="patienStatus mb-4">
            <h3>Glucose</h3>
            {/* <div className="presImg text-center">
                <img className="PrescriptionImg" src={Glucose} alt="img"/>
            </div> */}
            {prescriptionpreviewall.GlucoseHb?.map((item, index) => (
              <div key={index}>
                <span>When Did You Last Eat?: 2.0 hours</span>
                <span>RBG: {item.RBG} mMol</span>
                <span>FBG: {item.FBG} mMol</span>
                <span>Hemoglobin: {item.Hemoglobin} g/dl</span>
                <p>Random Blood Glucose: {item.RBG}</p>
                <p>Fasting Blood Glucose: {item.FBG}</p>
                <p>Hemoglobin: {item.Hemoglobin}</p>
                <p>Hours From Last Eat: {item.HrsFromLastEat}</p>
                <p>Create Date: {item.CreateDate}</p>
              </div>
            ))}
          </div>
          {/* <div className="patienStatus mb-4">
            <h3>Hemoglobin</h3>
            <span>When Did You Last Eat?: 2.0 hours</span>
            <span>RBG: 9.5 mMol</span>
            <span>FBG: 0.0 mMol</span>
            <span>Hemoglobin: 11.0 g/dl</span>
          </div>  */}
          <div className="patienStatus mb-4">
            <h3>Physical (Chief) Complaints</h3>
            {prescriptionpreviewall.Complaints?.map((item, index) => (
            <div key={index}>
               <span>{item.CreateDate}: {item.ChiefComplain}</span>
            
            </div>
          ))}
           
          </div>
          {/* <div className="patienStatus mb-4">
            <h3>General Examination</h3>
            <div className="d-flex">
              <div className="d-flex align-items-center border-bottom border-secondary py-1 me-4">
                <p className="font-16 mb-0">Anemia</p>
                <p className="text-center  mb-0">
                  <strong className="label">
                    <GoPlus className="font-18 ms-1" />
                  </strong>
                  <strong className="label">
                    <GoPlus className="font-18 ms-1" />
                  </strong>
                  <strong className="label">
                    <GoPlus className="font-18 ms-1" />
                  </strong>
                </p>
              </div>
              <div className="d-flex align-items-center border-bottom border-secondary py-1 me-4">
                <p className="font-16 mb-0">Jaundice</p>
                <p className="text-center  mb-0">
                  <strong className="label">
                    <GoPlus className="font-18 ms-1" />
                  </strong>
                  <strong className="label">
                    <GoPlus className="font-18 ms-1" />
                  </strong>
                  <strong className="label">
                    <GoPlus className="font-18 ms-1" />
                  </strong>
                </p>
              </div>
              <div className="d-flex align-items-center border-bottom border-secondary py-1 me-4">
                <p className="font-16 mb-0">Cyanosis</p>
                <p className="text-center  mb-0">
                  <strong className="label">
                    <GoPlus className="font-18 ms-1" />
                  </strong>
                  <strong className="label">
                    <GoPlus className="font-18 ms-1" />
                  </strong>
                  <strong className="label">
                    <GoPlus className="font-18 ms-1" />
                  </strong>
                </p>
              </div>
              <div className="d-flex align-items-center border-bottom border-secondary py-1 me-4">
                <p className="font-16 mb-0">Edema</p>
                <p className="text-center  mb-0">
                  <strong className="label">
                    <GoPlus className="font-18 ms-1" />
                  </strong>
                  <strong className="label">
                    <GoPlus className="font-18 ms-1" />
                  </strong>
                  <strong className="label">
                    <GoPlus className="font-18 ms-1" />
                  </strong>
                </p>
              </div>
            </div>
          </div> */}
          <div className="patienStatus mb-4">
            <h3>GlucoseHb</h3>
            {prescriptionpreviewall.GlucoseHb?.map((item, index) => (
            <div key={index}>
              <span>Random Blood Glucose: {item.RBG}</span>
              <span>Fasting Blood Glucose: {item.FBG}</span>
              <span>Hemoglobin: {item.Hemoglobin}</span>
              <span>Hours From Last Eat: {item.HrsFromLastEat}</span>
              <span>Create Date: {item.CreateDate}</span>
            </div>
          ))}

          </div>
          <div className="patienStatus mb-4">
            <h3>General Findings</h3>
               {prescriptionpreviewall.GeneralFindings?.map((item, index) => (
            <div key={index}>
              <span>Anemia Severity: {item.AnemiaSeverity}</span>
              <span>Jaundice Severity: {item.JaundiceSeverity}</span>
              <span>Edema Severity: {item.EdemaSeverity}</span>
              <span>Lymph Nodes With Palpable: {item.LymphNodesWithPalpable}</span>
              <span>
                Lymph Nodes With Palpable Site:{" "}
                {item.LymphNodesWithPalpableSite}
              </span>
              <span>
                Lymph Nodes With Palpable Size:{" "}
                {item.LymphNodesWithPalpableSize}
              </span>
              <span>Heart With NAD: {item.HeartWithNAD}</span>
              <span>Lungs With NAD: {item.LungsWithNAD}</span>
              <span>Other Symptom: {item.OtherSymptom}</span>
              <span>Cyanosis: {item.Cyanosis}</span>
              <span>Create Date: {item.CreateDate}</span>
            </div>
          ))}
          </div>

          <div className="patienStatus mb-4">
            <h3>Current Medication Taken</h3>
            <span>Drug: Napa Extra</span>
            <span className="bg-danger text-decoration-none px-2">
              Allergy to medication
            </span>
            <span>Frequency Hours: 4</span>
            <span>Dos: 10mg</span>
            <span>Duration: 7 Days</span>
          </div>
        </div>

        <div className="text-center mt-4">
          {/* <DoubleButton
            btnone="Back"
            btntwo="Submit"
            link="/four-c-userinput"
            link2="/final-prescription"
          /> */}
        <button className="border-0 button-color text-white py-2 px-3 text-capitalize rounded me-3" onClick={() => navigate(-1)}> Back </button> 
        </div>
      </section>
      <GlobalButton />
    </>
  );
};

export default Prescription;
