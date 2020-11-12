import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  getAllCategorys,
  updateCategories,
  deleteCategories as deleteCategoriesAction,
} from "../../actions";

import CheckboxTree from "react-checkbox-tree";
import {
  IoIosCheckboxOutline,
  IoIosCheckbox,
  IoIosArrowForward,
  IoIosArrowDown,
  IoIosTrash,
  IoIosSettings,
  IoIosAdd,
} from "react-icons/io";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import "./style.css";
import UpdateCategoriesModal from "./components/UpdateCategoriesModal";
import AddCategoryModal from "./components/AddCategoryModal";
import DeleteCategoryModal from "./components/DeleteCategoryModal";
/**
 * @author
 * @function Category
 **/

const Category = (props) => {
  const [show, setShow] = useState(false);
  const category = useSelector((state) => state.category);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [deleteCategoriesModal, setDeleteCategoriesModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!category.loading) {
      setShow(false);
    }
  }, [category.loading]);

  const emptyData = () => {
    setCategoryName("");
    setParentCategoryId("");
    setCategoryImage("");
  };

  const handleClear = () => {
    setShow(false);
    emptyData();
  };

  const handleClose = () => {
    const form = new FormData();
    if (!categoryName) {
      alert("required fields");
      handleClear();
      return;
    }
    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("categoryImage", categoryImage);
    dispatch(addCategory(form));
    handleClear();
  };

  const handleShow = () => setShow(true);

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push({
        label: category.name,
        value: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }
    return myCategories;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
        type: category.type,
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const updateCategory = () => {
    updateCheckedAndExpandedCategories();
    setUpdateCategoryModal(true);
  };
  const updateCheckedAndExpandedCategories = () => {
    const categories = createCategoryList(category.categories);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          // eslint-disable-next-line
          (category, _index) => categoryId == category.value
        );
        category && checkedArray.push(category);
      });
    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          // eslint-disable-next-line
          (category, _index) => categoryId == category.value
        );
        category && expandedArray.push(category);
      });
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
  };

  const handleCategoryInput = (key, value, index, type) => {
    // eslint-disable-next-line
    if (type == "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        // eslint-disable-next-line
        index == _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updatedCheckedArray);
      // eslint-disable-next-line
    } else if (type == "expanded") {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        // eslint-disable-next-line
        index == _index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updatedExpandedArray);
    }
  };

  const updateCategoryForm = () => {
    const form = new FormData();
    expandedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    checkedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    dispatch(updateCategories(form));
  };
  const deleteClose = () => setDeleteCategoriesModal(false);

  const deleteCtegory = () => {
    updateCheckedAndExpandedCategories();
    setDeleteCategoriesModal(true);
  };

  const deletCategories = () => {
    const checkIdsArray = checkedArray.map((item, index) => ({
      _id: item.value,
    }));
    const expandedIdsArray = expandedArray.map((item, index) => ({
      _id: item.value,
    }));
    const idsArray = expandedIdsArray.concat(checkIdsArray);

    if (checkIdsArray.length > 0) {
      dispatch(deleteCategoriesAction(checkIdsArray)).then((result) => {
        if (result) {
          dispatch(getAllCategorys());
        }
      });
      deleteClose();
    }
  };

  const buttons = [
    {
      label: "No",
      color: "primary",
      onClick: deleteClose,
    },
    {
      label: "Yes",
      color: "danger",
      onClick: deletCategories,
    },
  ];

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Category</h3>
              <div className="actionsBtnContainer">
                <span>Actions: </span>
                <button className="btn-success" onClick={handleShow}>
                  <IoIosAdd />
                  <span>Add</span>
                </button>
                <button className="btn-warning" onClick={updateCategory}>
                  <IoIosSettings />
                  <span>Edit</span>
                </button>
                <button className="btn-danger" onClick={deleteCtegory}>
                  <IoIosTrash />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <CheckboxTree
              nodes={renderCategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <IoIosCheckbox style={{ color: "#2874f0" }} />,
                uncheck: <IoIosCheckboxOutline />,
                halfCheck: <IoIosCheckboxOutline />,
                expandClose: <IoIosArrowForward />,
                expandOpen: <IoIosArrowDown />,
              }}
            />
          </Col>
        </Row>
      </Container>
      <UpdateCategoriesModal
        show={updateCategoryModal}
        handleClose={() => setUpdateCategoryModal(false)}
        onSubmit={updateCategoryForm}
        modalTitle={"Update Categories"}
        size="lg"
        expandedArray={expandedArray}
        checkedArray={checkedArray}
        handleCategoryInput={handleCategoryInput}
        categoryList={createCategoryList(category.categories)}
      />
      <AddCategoryModal
        show={show}
        handleClose={handleClear}
        onSubmit={handleClose}
        modalTitle={"Add new Category"}
        handleCategoryImage={handleCategoryImage}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        parentCategoryId={parentCategoryId}
        setParentCategoryId={setParentCategoryId}
        categoryList={createCategoryList(category.categories)}
      />
      <DeleteCategoryModal
        show={deleteCategoriesModal}
        handleClose={deleteClose}
        modalTitle={"Delete Ctegory"}
        expandedArray={expandedArray}
        checkedArray={checkedArray}
        buttons={buttons}
      />
    </Layout>
  );
};

export default Category;
