import React from "react";
import "./Steps.css";

export default function Steps() {
  return (
    <div className="steps-wrapper">
      <h2 className="steps-title">
        Ready? 4 easy ways to book your stand
      </h2>

      <div className="steps-container">

        {/* Step 1 */}
        <div className="step-box">
          <p className="step-number">01</p>
          <p className="step-text">
            Click on the button below and whatsapp complete contact.
          </p>
        </div>

        {/* Step 2 */}
        <div className="step-box">
          <p className="step-number">02</p>
          <p className="step-text">
            A sales consultant will reach out to discuss your goals and options.
          </p>
        </div>

        {/* Step 3 */}
        <div className="step-box">
          <p className="step-number">03</p>
          <p className="step-text">
            After booking, our team will guide you on how best  to your stand.
          </p>
        </div>

        {/* Step 4 */}
        <div className="step-box">
          <p className="step-number">04</p>
          <p className="step-text">
            The  day arrives, and you're ready to make new  connections!
          </p>
        </div>

      </div>

     
    </div>
  );
}
