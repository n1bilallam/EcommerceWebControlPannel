import React, { useState } from "react";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import { Container, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, deleteProductById } from "../../actions";
import NewModal from "../../components/UI/Modal";
import "./style.css";
import { generatePublicUrl } from "../../urlConfig";
import {
  IoIosAdd,
  IoIosInformationCircleOutline,
  IoIosTrash,
} from "react-icons/io";
import DeleteProductModal from "./components/DeleteProductModal";
/**
 * @author
 * @function Products
 **/

const Products = (props) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productDetails, setProduitdetails] = useState(null);
  const [productId, setProductId] = useState(null);
  const [productPictures, setProductPictures] = useState([]);
  const [productDetailsModal, setProductDetailsModal] = useState(false);
  const [deleteProductModal, setDeleteProductModal] = useState(false);
  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const handleClose = () => {
    setShow(false);
  };
  const submitProductForm = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("quantity", quantity);
    form.append("price", price);
    form.append("description", description);
    form.append("category", categoryId);
    for (let pic of productPictures) {
      form.append("productPictures", pic);
    }
    dispatch(addProduct(form)).then(() => setShow(false));
  };
  const handleShow = () => setShow(true);

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };
  const handleProductPictures = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };

  const deleteProduct = () => {
    const payload = productId;
    console.log(payload);
    dispatch(deleteProductById(payload));
  };
  const deleteClose = () => setDeleteProductModal(false);
  const deleteOpen = () => setDeleteProductModal(true);
  const buttons = [
    {
      label: "No",
      color: "primary",
      onClick: deleteClose,
    },
    {
      label: "Yes",
      color: "danger",
      onClick: deleteProduct,
    },
  ];

  const renderProducts = () => {
    return (
      <Table style={{ fontSize: 12 }} responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {product.products.length > 0
            ? product.products.map((product) => (
                <tr key={product._id}>
                  <td>2</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.category.name}</td>
                  <td>
                    <button
                      className="btn-action btn-warning"
                      onClick={() => showProductDetailsModal(product)}
                    >
                      <IoIosInformationCircleOutline />
                      &nbsp;info
                    </button>
                    <button
                      className="btn-action btn-danger"
                      onClick={() => {
                        setProductId(product._id);
                        deleteOpen();
                      }}
                    >
                      <IoIosTrash />
                      &nbsp;Delete
                    </button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    );
  };

  const renderAddProductModal = () => {
    return (
      <NewModal
        show={show}
        handleClose={handleClose}
        modalTitle={"Add new Product"}
        onSubmit={submitProductForm}
      >
        <Input
          label="Product"
          value={name}
          placeholder={"Product Name"}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Category</label>
        <select
          className="form-control"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option>Select category</option>

          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>

        <Input
          label="Price"
          value={price}
          placeholder={"99.99$"}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          label="Quantity"
          value={quantity}
          placeholder={"1,2,3..."}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <label>Description</label>
        <textarea
          className="form-control"
          value={description}
          placeholder="Discribe your project ..."
          onChange={(e) => setDescription(e.target.value)}
        />
        {productPictures.length > 0
          ? productPictures.map((pic, index) => (
              <div key={index}>{pic.name}</div>
            ))
          : null}
        <input
          type="file"
          name="productPictures"
          onChange={handleProductPictures}
        />
      </NewModal>
    );
  };
  const handleCloseProductDetails = () => {
    setProductDetailsModal(false);
  };
  const showProductDetailsModal = (product) => {
    setProduitdetails(product);
    setProductDetailsModal(true);
  };
  const renderProductDetailsModal = () => {
    if (!productDetails) {
      return null;
    }
    return (
      <NewModal
        show={productDetailsModal}
        handleClose={handleCloseProductDetails}
        modalTitle={"Product Details"}
        size="lg"
      >
        <Row>
          <Col md="6">
            <label className="key">Name</label>
            <p className="value">{productDetails.name}</p>
          </Col>
          <Col md="6">
            <label className="key">Price</label>
            <p className="value">{productDetails.price}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className="key">Quantity</label>
            <p className="value">{productDetails.quantity}</p>
          </Col>
          <Col md="6">
            <label className="key">Category</label>
            <p className="value">{productDetails.category.name}</p>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <label className="key">Description</label>
            <p className="value">{productDetails.description}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <label className="key">Product Images</label>
            <div style={{ display: "flex" }}>
              {productDetails.productPictures.map((picture) => (
                <div className="productPicContainer">
                  <img src={generatePublicUrl(picture.img)} />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </NewModal>
    );
  };
  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Products</h3>
              <button
                className="btn-action  btn-success"
                variant="primary"
                onClick={handleShow}
              >
                <IoIosAdd />
                Add Product
              </button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>{renderProducts()}</Col>
        </Row>
      </Container>
      {renderAddProductModal()}
      {renderProductDetailsModal()}
      <DeleteProductModal
        show={deleteProductModal}
        handleClose={deleteClose}
        modalTitle={"Delete Product Confirmation"}
        buttons={buttons}
      />
    </Layout>
  );
};

export default Products;
