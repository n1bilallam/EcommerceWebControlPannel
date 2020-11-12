import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Input from "../../../components/UI/Input";
import NewModal from "../../../components/UI/Modal";

const AddCategoryModal = (props) => {
  const {
    show,
    handleClose,
    modalTitle,
    categoryList,
    handleCategoryImage,
    categoryName,
    setCategoryName,
    parentCategoryId,
    setParentCategoryId,
    onSubmit,
  } = props;
  return (
    <NewModal
      show={show}
      modalTitle={modalTitle}
      handleClose={handleClose}
      onSubmit={onSubmit}
    >
      <Row>
        <Col>
          <Input
            className="form-control-sm"
            label="Name"
            value={categoryName}
            placeholder={"Category Name"}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </Col>
        <Col>
          <label>Categories</label>
          <select
            className="form-control form-control-sm"
            value={parentCategoryId}
            onChange={(e) => setParentCategoryId(e.target.value)}
          >
            <option>Select category</option>

            {categoryList.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </Col>
      </Row>

      <Row>
        <Col>
          <input
            type="file"
            name="categoryImage"
            onChange={handleCategoryImage}
          />
        </Col>
      </Row>
    </NewModal>
  );
};

export default AddCategoryModal;
