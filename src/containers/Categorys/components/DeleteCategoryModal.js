import React from "react";
import NewModal from "../../../components/UI/Modal";

const DeleteCategoryModal = (props) => {
  const {
    modalTitle,
    show,
    expandedArray,
    checkedArray,
    handleClose,
    buttons,
  } = props;
  return (
    <NewModal
      modalTitle={modalTitle}
      show={show}
      handleClose={handleClose}
      buttons={buttons}
    >
      <h5>Expanded</h5>
      {expandedArray.map((item, index) => (
        <span key={index}>{item.name}</span>
      ))}
      <h5>Checked</h5>
      {checkedArray.map((item, index) => (
        <span key={index}>{item.name}</span>
      ))}
    </NewModal>
  );
};

export default DeleteCategoryModal;
