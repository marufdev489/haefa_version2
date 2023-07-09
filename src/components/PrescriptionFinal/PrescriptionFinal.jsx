import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./PrescriptionFinal.css";
import ApiLogo from "../../assets/img/apilogo.png";
import GlobalButton from "./../GlobalBtn/GlobalButton";
import Signature from "../../assets/img/signature.png";
import {
  BsFileEarmarkPdfFill,
  BsImages,
  BsFillPrinterFill,
} from "react-icons/bs";

import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { API_URL } from "../../helper/Constants";
import { useSelector } from "react-redux";
import { loggedInUserData } from "../../helper/localStorageHelper";

const PrescriptionFinal = () => {
  const { patient } = useSelector((state) => state.patients);
  const patientId = patient?.PatientId;
  const userData = loggedInUserData();
  // Declare State
  const [patientInfo, setPatientInfo] = useState([]);
  const [prescription, setPrescription] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [heightWeight, setHeightWeight] = useState([]);
  const [bp, setBp] = useState([]);
  const [glucoseHb, setGlucoseHb] = useState([]);
  const [provisionalDX, setProvisionalDX] = useState([]);
  const [labInvestigation, setLabInvestigation] = useState([]);
  const [rxDetail, setRxDetail] = useState([]);
  const [advice, setAdvice] = useState([]);
  const [referral, setReferral] = useState([]);
  const [followUpDate, setFollowUpDate] = useState([]);

  const updateDate = (followUpDate)=>{
    console.log(followUpDate);
    const updatedFollowUpDates = followUpDate.map(item => ({...item})); //copy to a new var
    const extractedDates = followUpDate.map(({ FollowUpDate }) => FollowUpDate);
    const originalDate = extractedDates;
    const dateObj = new Date(originalDate);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    const formattedDay = (day < 10 ? '0' : '') + day;
    const formattedMonth = (month < 10 ? '0' : '') + month;
    const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;

    updatedFollowUpDates.forEach(item => {
      item.FollowUpDate = formattedDate; // Replace 'new date' with the desired updated value
    });

    return updatedFollowUpDates;
  }

  // store data
  const patientInfos = patientInfo;
  const prescriptions = prescription;
  const chiefComplaints = complaints;
  const heightWeights = heightWeight;
  const bps = bp;
  const glucoseHbs = glucoseHb;
  const provisionalDXs = provisionalDX;
  const labInvestigations = labInvestigation;
  const rxDetails = rxDetail;
  const advices = advice;
  const referrals = referral;
  const followUpDates = followUpDate;
  // const followUpDates = updateDate(followUpDate);
  const updatedFollowUpDates = updateDate(followUpDates);
  console.log(updatedFollowUpDates);

  // Get the desired patient data
  // const patient = { patientId: "C52C9718-8B90-4B44-9267-000011CE53A6" };

  useEffect(() => {
    axios
      .post(`${API_URL}/api/prescription`, {
        patientId: patientId,
      })
      .then((response) => {
        // console.log(response); 
        setPatientInfo(response.data.PatientDetails);
        setPrescription(response.data.prescriptionCreation);
        setComplaints(response.data.Complaints);
        setHeightWeight(response.data.HeightWeight);
        setBp(response.data.BP);
        setGlucoseHb(response.data.GlucoseHb);
        setProvisionalDX(response.data.ProvisionalDx);
        setLabInvestigation(response.data.Investigation);
        setRxDetail(response.data.Treatment);
        setAdvice(response.data.Advice);
        setReferral(response.data.PatientReferral);
        setFollowUpDate(response.data.FollowUpDate);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); // empty dependency array to run the effect only once

  return ( 
    <>
      <section id="prescriptionFinal">
        <div className="container px-4">
          <header className="header">
            <p className="mb-0 pt-2 fs-">
              <b>Location :</b>{" "}
              {userData?.barcode_format.healthcenter.HealthCenterName} ,{" "}
              {userData?.barcode_format.barcode_prefix} ,{" "}
              {userData?.barcode_format.district.districtName} ,{" "}
              {userData?.barcode_format.union.UnionName} ,{" "}
              {userData?.barcode_format.upazila.UpazilaName}
            </p>
            {prescriptions.map((item, index) => (
              <div key={index}>
                <h3 className="text-center m-0 py-4 px-4">
                  Prescription - {item.PrescriptionId}
                </h3>
              </div>
            ))}
          </header>
          {/* {prescriptions.map((item, index) => (
            <div key={index}>
              <h3 className="text-center m-0 py-4 px-4">
                Prescription - {item.PrescriptionId}
              </h3>
            </div>
          ))} */}

          {patientInfos.map((item, index) => (
            <div
              key={index}
              className="topHead border border-start-0 border-end-0 py-2"
            >
              <span className="me-3">
                <b>Name :</b> {item.GivenName} {item.FamilyName}
              </span>
              <span className="me-3">
                <b>Age :</b> {parseInt(item.Age)}
              </span>
              <span className="me-3">
                <b>Gender :</b> {item.gender.GenderCode}
              </span>
              <span className="me-3">
                <b>PatientCode :</b> {`${patient?.PatientCode}`}
              </span>
              <span className="me-3">
                <b>Date :</b> {prescriptions[0]?.CreateDate}
              </span>
            </div>
          ))}

          <div className="d-flex">
            <aside className="aside">
              <div className="pres_item pt-3">
                <b className="d-block mb-0 py-2 border-bottom">Complaints</b>
                {chiefComplaints.map((item, index) => (
                  <p className="mb-0 mt-2 pe-2" key={index}>
                    {item.CreateDate}:{item.ChiefComplain} for{" "}
                    {item.CCDurationValue} {item.DurationInEnglish}
                  </p>
                ))}
              </div>

              <div className="pres_item pt-3">
                <b className="d-block mb-0 py-2 border-bottom">O/E</b>
                {heightWeights.map((item, index) => (
                  <div className="mb-0 mt-2 pe-2" key={index}>
                    <p className="mb-0 mt-2 pe-2">Height: {item.Height} cm</p>
                    <p className="mb-0 mt-2 pe-2">Weight: {item.Weight} kg</p>
                    <p className="mb-0 mt-2 pe-2">BMI: {item.BMI}</p>
                  </div>
                ))}

                {bps.map((item, index) => (
                  <div className="mb-0 mt-2 pe-2" key={index}>
                    <p className="mb-0 mt-2 pe-2">Pulse: {item.HeartRate}</p>
                    <p className="mb-0 mt-2 pe-2">
                      Blood Pressure: {item.BPSystolic1} / {item.BPDiastolic1}{" "}
                      mmHg
                    </p>
                  </div>
                ))}

                {glucoseHbs.map((item, index) => (
                  <div className="mb-0 mt-2 pe-2" key={index}>
                    <p className="mb-0 mt-2 pe-2">RBS: {item.RBG} mMol</p>
                    <p className="mb-0 mt-2 pe-2">FBS: {item.FBG} mMol</p>
                    <p className="mb-0 mt-2 pe-2">
                      Hemoglobin: {item.Hemoglobin} g/dL{" "}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pres_item pt-3">
                <b className="d-block mb-0 py-2 border-bottom">
                  Provisional Dx
                </b>
                {provisionalDXs.map((item, index) => (
                  <div className="mb-0 mt-2 pe-2" key={index}>
                    <b>Date: {item.CreateDate}</b>
                    <p className="mb-0 mt-2 pe-2">
                      {index + 1}:{" "}
                      {item.ProvisionalDiagnosis != ""
                        ? item.ProvisionalDiagnosis
                        : item.OtherProvisionalDiagnosis}{" "}
                      {item.DiagnosisStatus == "P"
                        ? "[Presumptive]"
                        : item.DiagnosisStatus == "C"
                        ? "[Confirmed]"
                        : "[Unspecified]"}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pres_item pt-3">
                <b className="d-block mb-0 py-2 border-bottom">
                  Lab Invenstigations
                </b>
                {labInvestigations.map((item, index) => (
                  <div className="mb-0 mt-2 pe-2" key={index}>
                    <b>Date: {item.CreateDate}</b>
                    <p className="mb-0 mt-2 pe-2">
                      {index + 1}:{" "}
                      {item.Investigation != ""
                        ? item.Investigation
                        : item.OtherInvestigation}{" "}
                      <br></br>
                      {/* {item.OtherInvestigation != ""
                      ? item.OtherInvestigation
                      : ""} */}
                    </p>
                  </div>
                ))}
              </div>
            </aside>

            <div className="rightSide position-relative w-100 py-3 px-4">
              <h2 className="mb-4">&#8478;</h2>

              {rxDetails.map((item, index) => (
                <div className="medicine mb-4" key={index}>
                  <p className="mb-0">
                    <b>{index + 1}</b>:&nbsp; {item.DrugCode}({item.DrugDose})
                    <br></br>
                    {item.Frequency} &nbsp; {item.InstructionInBangla} &nbsp; -
                    &nbsp;
                    {item.DrugDurationValue.includes("d") ||
                    item.DrugDurationValue.includes("D")
                      ? item.DrugDurationValue.replace(/d/i, " দিন")
                      : item.DrugDurationValue.includes("m") ||
                        item.DrugDurationValue.includes("M")
                      ? item.DrugDurationValue.replace(/m/i, " মাস")
                      : item.DrugDurationValue.includes("y") ||
                        item.DrugDurationValue.includes("Y")
                      ? item.DrugDurationValue.replace(/y/i, " বছর")
                      : item.DrugDurationValue.includes("c") ||
                        item.DrugDurationValue.includes("C")
                      ? item.DrugDurationValue.replace(/c/i, " চলবে")
                      : ""}
                  </p>
                </div>
              ))}

              <div className="nextinfo">
                <div className="medicine mb-4">
                  <p className="mb-0">
                    <b>Follow-up / পরবর্তী সাক্ষাৎ</b>
                  </p>

                  {updatedFollowUpDates.map((item, index) => (
                    <div key={index}>
                        {
                          item.FollowUpDate === "01-01-1900" ? (
                            null
                          ) : (
                            <p className="mb-0">
                             {item.FollowUpDate} : {" "} {item.Comment}
                            </p>
                          )
                        }
                    </div>
                  ))}
                </div>

                <div className="medicine mb-4">
                  <p className="mb-0">
                    <b>Advice / পরামর্শ</b>
                  </p>
                  {advices.map((item, index) => (
                    <div key={index}>
                      <p className="mb-0">
                        <b>{index + 1}</b>:&nbsp; {item.AdviceInBangla}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="medicine mb-4">
                  <p className="mb-0">
                    <b>Referral / রেফারেল</b>
                  </p>
                  {referrals.map((item, index) => (
                    <div key={index}>
                      <p className="mb-0">
                        <b>{index + 1}</b>:&nbsp;{item.CreateDate}:{" "}
                        {item.Description}, {item.HealthCenterName}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="signatureBox text-center">
                <img src={Signature} alt="img" className="signatureImage" />
                <p className="mb-0">{userData?.name}</p>
                <i className="my-0">{userData?.employee.FirstName}</i>
              </div>
            </div>
          </div>

          {/* <div className="signatureBox">
            {prescriptions.map((item, index) => (
              <div key={index}>
                hh
                <img
                  src={
                    item.EmployeeSignature != "" ? item.EmployeeSignature : ""
                  }
                  className="signatureImage"
                />
                <p className="mb-0">
                  {item.FirstName}
                  {item.LastName}
                </p>
                <i className="my-0">{item.Designation}</i>
              </div>
            ))}
          </div> */}

          <footer className="footer d-flex justify-content-between">
            <address className="mb-0">
              <p className="mb-0">Haefa USA</p>
              <p className="mb-0">311 Bedford St, Lexington MA 07420, USA</p>
              <p className="mb-0">Email: healthonwheels.usa@gmail.com</p>
              <p className="mb-0">Website: www.healthonwheels.usa.org</p>
            </address>
            <address className="mb-0">
              <p className="mb-0">Haefa Bangladesh</p>
              <p className="mb-0">House: 31, Road: 16 Sector: 13 Uttara</p>
              <p className="mb-0">Email: healthonwheels.usa@gmail.com</p>
              <p className="mb-0">Website: www.healthonwheels.usa.org</p>
            </address>
          </footer>
          <p className="mb-0 text-center pb-4 logoText">
            Powered By:
            <img src={ApiLogo} alt="img" className="apiLogo" />
          </p>
        </div>
      </section>

      {/* <div className="export container bg-light mt-3 p-3 d-flex justify-content-end">
        <div className="prinBtns2">
            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Instructions</Tooltip>} >
              <Button className="me-2  bg-dark border-0">
                <BsFileEarmarkPdfFill />
              </Button>
            </OverlayTrigger>
        </div>

        <div className="prinBtns">
          <OverlayTrigger
            overlay={<Tooltip id="tooltip-disabled">Print</Tooltip>}
          >
            <Button className="me-2 border-0">
              <BsFillPrinterFill />
            </Button>
          </OverlayTrigger>

          <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Download pdf</Tooltip>} >
              <Button className="me-2 border-0">
                <BsFileEarmarkPdfFill />
              </Button>
            </OverlayTrigger>

            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Download Image</Tooltip>} >
              <Button className="me-2 border-0">
                <BsImages />
              </Button>
            </OverlayTrigger>
        </div>
      </div> */}
      <GlobalButton />
    </>
  );
};

export default PrescriptionFinal;
