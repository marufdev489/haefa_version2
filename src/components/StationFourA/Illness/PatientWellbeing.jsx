import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../../helper/Constants";

const PatientIllness = () => {
  const [isShown, setIsShown] = useState(false);
  const handleClick = (event) => {
    setIsShown((current) => !current);
  };

  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/patient-mental-health`)
      .then((response) => {
        //console.log(response.data.data);
        setAnswers(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
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
          {answers.map((answer, i) => (
            <div className="mb-2">
              <div className="">
                <p className="font-16 mb-1">
                  {i + 1}. {answer.QuestionTitle}?
                </p>
                <input
                  className="form-check-input"
                  type="hidden"
                  name="inlineRadioOne"
                  value={answer.QuestionId}
                />
              </div>
              <div className="">
                {answer.get_answers.map((ans, j) => {
                  const randomNumber = Math.floor(Math.random() * 1000) + 1;
                  const uniqueId = `${ans.AnswerId}${j}${randomNumber}`;

                  return (
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        value={ans.AnswerId}
                        name={`question-${i}`} 
                        id={ans.AnswerId + uniqueId}
                        onDoubleClick={(e) => {
                          e.target.checked = false;
                          e.target.value = null;
                        }}
                        onChange={(e) => {
                          // Set the value of all other radio buttons in this question to null
                          document.querySelectorAll(`input[name="question-${i}"]`).forEach(input => {
                            if (input !== e.target) {
                              input.checked = false;
                              input.value = null;
                            }
                          });
                        }}
                      />
                      <label
                        className="form-check-label text-capitalize"
                        for={ans.AnswerId + uniqueId}
                      >
                        {ans.AnswerTitle}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* show component on click  */}
      {isShown || <div></div>}
    </>
  );
};

export default PatientIllness;
