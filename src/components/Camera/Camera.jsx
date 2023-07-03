import React from "react";
import Webcam from "react-webcam";
import SectionBanner from "../SectionBannerDemo/SectionBanner";
import "./Camera.css";
import { useLocation } from "react-router";

const Camera = () => {
  const webcamRef = React.useRef(null);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const PatientId = queryParams.get("PatientId");

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();

    localStorage.setItem("patientImage", imageSrc);

    window.location.href = `/user-details?PatientId=${PatientId}`;
  }, [webcamRef]);

  const videoConstraints = {
    width: 1280,
    height: 800,
    facingMode: "user",
  };

  return (
    <>
      <SectionBanner title="Patient Photo"/>
      <section id="cameraOn">
        <div className="container text-center">
          <Webcam
            mirrored={true}
            audio={false}
            // width={300}
            // height={600}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            onUserMediaError={(error) => {
              console.log(error);
            }}
          />

          <div className="text-center mt-3 position-relative">
            <button
              type="button"
              onClick={capture}
              className="border-0 button-color text-white py-2 px-3 text-capitalize rounded me-2"
            >
              Take Photo
            </button> 
            <button
              type="button"
              onClick={() => {
                window.location.href = '/user-table';
              }}
              className="border-0 bg-secondary text-white py-2 px-3 text-capitalize rounded"
            >
              Skip
            </button>
          </div>

          {/* <GlobalButton /> */}
        </div>
      </section>
    </>
  );
};

export default Camera;

{/* <section>
  <SectionBanner title="Take picture" />
  <div className="container text-center">
    <p className="my-5">
      <Camera />
    </p>
  </div>
</section>; */}
