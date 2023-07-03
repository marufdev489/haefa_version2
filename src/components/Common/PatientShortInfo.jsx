import React from "react";
import { useSelector } from "react-redux";

function PatientShortInfo() {
  const { patient } = useSelector((state) => state.patients);
  const { height_weights, glucose_hbs, bps } = patient;

  return (
    <ul>
      <li className="mb-1">
        <abbr className="me-2">Age:</abbr>
        <kbd className="me-2">{patient?.Age}</kbd>
      </li>
      <li className="mb-1">
        <abbr className="me-2">Height & Weight:</abbr>
        <kbd className="me-2">Height: {`${height_weights?.Height}cm`}</kbd>
        <kbd className="me-2">Weight: {`${height_weights?.Weight}kg`}</kbd>
        <kbd className="me-2">BMI: {`${height_weights?.BMI}`}</kbd>
        <kbd className="me-2">BMI Class: {`${height_weights?.BMIStatus}`}</kbd>
        <kbd className="me-2">MUAC: {`${height_weights?.MUAC}`}cm</kbd>
        <kbd className="me-2">
          MUAC Class: {`${height_weights?.MUACStatus}`}
        </kbd>
        <kbd className="me-2">
          Blood Group: {`${height_weights?.blood?.BloodGroupCode}`}
        </kbd>
      </li>
      <li className="mb-1">
        <abbr className="me-2">Temperature:</abbr>
        <kbd className="me-2">
          Body Temperature: {`${bps?.CurrentTemparature}`}&#8457;
        </kbd>
      </li>
      <li className="mb-1">
        <abbr className="me-2">Pulse / HR:</abbr>
        <kbd className="me-2">Heart Rate: {`${bps?.HeartRate}`}</kbd>
      </li>
      <li className="mb-1">
        <abbr className="me-2">Blood Pressure:</abbr>
        <kbd className="me-2">Systolic: {`${bps?.BPSystolic1}`}mmHg</kbd>
        <kbd className="me-2">Diastolic: {`${bps?.BPDiastolic1}`}mmHg</kbd>
      </li>
      <li className="mb-1">
        <abbr className="me-2">Repeat BP (&gt; 140/90):</abbr>
        <kbd className="me-2">Systolic: {`${bps?.BPSystolic2}`}mmHg</kbd>
        <kbd className="me-2">Diastolic: {`${bps?.BPDiastolic2}`}mmHg</kbd>
      </li>
      <li className="mb-1">
        <abbr className="me-2">Respiratory:</abbr>
        <kbd className="me-2">Respiratory Rate: {`${bps?.RespiratoryRate}`}</kbd>
      </li>
      <li className="mb-1">
        <abbr className="me-2">SpO2</abbr>
        <kbd className="me-2">SpO2: {`${bps?.SpO2Rate}`}%</kbd>
        <kbd className="me-2">
          SpO2 Rate: {`${bps?.IndicatesNormalOxygenSaturation}`}
        </kbd>
      </li>
      <li className="mb-1">
        <abbr className="me-2">Glucose & Hemoglobin:</abbr>
        <kbd className="me-2">RBG: {`${glucose_hbs?.RBG}`}mmol/L</kbd>
        <kbd className="me-2">2 Hours After Breakfast</kbd>
        <kbd className="me-2">FBG:{`${glucose_hbs?.FBG}`}mmol/L</kbd>
        <kbd className="me-2">
          Hemoglobin: {`${glucose_hbs?.Hemoglobin}`}g/dl
        </kbd>
      </li>
    </ul>
  );
}

export default PatientShortInfo;
