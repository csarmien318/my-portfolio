import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import resume from "../assets/ChristophersResume.png";

const ResumeModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Resume</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ display: "flex" }}>
          <img
            src={resume}
            alt="resume"
            style={{ minWidth: "100%", maxWidth: "760px" }}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ResumeModal;
