import React from "react";
import NewModal from "../../../components/UI/Modal";

const DeleteProductModal = (props) => {
  const { modalTitle, show, handleClose, buttons } = props;
  return (
    <NewModal
      modalTitle={modalTitle}
      show={show}
      handleClose={handleClose}
      buttons={buttons}
    >
      <p>Do you really want to delete this product!</p>
    </NewModal>
  );
};

export default DeleteProductModal;
