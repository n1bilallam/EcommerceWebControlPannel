import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import NewModal from "../../components/UI/Modal";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import linearCategories from "../../helpers/linearCategories";
import { useSelector, useDispatch } from "react-redux";
import { createPage } from "../../actions";
/**
 * @author
 * @function Pages
 */

const Pages = (props) => {
  const [createModal, setCreateModal] = useState(false);
  const [title, setTitle] = useState("");
  const category = useSelector((state) => state.category);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page);

  useEffect(() => {
    setCategories(linearCategories(category.categories));
  }, [category]);

  const emptyData = () => {
    setType("");
    setTitle("");
    setDescription("");
    setCategoryId("");
    setBanners([]);
    setProducts([]);
  };

  useEffect(() => {
    console.log(page);
    if (!page.loading) {
      setCreateModal(false);
      emptyData();
    }
  }, [page]);

  const onChangeCategory = (e) => {
    const category = categories.find(
      (category) => category.value == e.target.value
    );
    setCategoryId(e.target.value);
    setType(category.type);
  };
  const handleBannerimages = (e) => {
    setBanners([...banners, e.target.files[0]]);
  };
  const handleProductimages = (e) => {
    setProducts([...products, e.target.files[0]]);
  };

  const handleClear = () => {
    setCreateModal(false);
    emptyData();
  };

  const submitPageForm = (e) => {
    if (title === "") {
      alert("title is required");
      handleClear();
      return;
    }
    const form = new FormData();
    form.append("title", title);
    form.append("description", description);
    form.append("category", categoryId);
    form.append("type", type);
    banners.forEach((banner, index) => {
      form.append("banners", banner);
    });
    products.forEach((product, index) => {
      form.append("products", product);
    });
    dispatch(createPage(form));
    emptyData();
  };
  const renderCreatePageModal = () => {
    return (
      <NewModal
        show={createModal}
        modalTitle="Create New Page"
        handleClose={handleClear}
        onSubmit={submitPageForm}
      >
        <Container>
          <Row>
            <Col>
              {/* <select
                className="form-group form-control form-control-sm"
                value={categoryId}
                onChange={onChangeCategory}
              >
                <option value="">select category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select> */}
              <Input
                type="select"
                value={categoryId}
                onChange={onChangeCategory}
                placeholder={"Select Category"}
                options={categories}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Input
                className="form-control-sm"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={"Page Title"}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Input
                className="form-control-sm"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={"Page Description"}
                as="textarea"
                rows="3"
              />
            </Col>
          </Row>
          {banners.length > 0
            ? banners.map((banner, index) => (
                <Row key={index}>
                  <Col>{banner.name}</Col>
                </Row>
              ))
            : null}
          <Row>
            <Col>
              <Input
                className="form-control form-control-sm"
                type="file"
                name="banners"
                onChange={handleBannerimages}
              />
            </Col>
          </Row>
          {products.length > 0
            ? banners.map((product, index) => (
                <Row key={index}>
                  <Col>{product.name}</Col>
                </Row>
              ))
            : null}
          <Row>
            <Col>
              <Input
                className="form-control form-control-sm"
                type="file"
                name="products"
                onChange={handleProductimages}
              />
            </Col>
          </Row>
        </Container>
      </NewModal>
    );
  };
  return (
    <Layout sidebar>
      {page.loading ? (
        <>
          <p>Creating Page... please wait !!</p>
        </>
      ) : (
        <>
          {renderCreatePageModal()}
          <button onClick={() => setCreateModal(true)}>show</button>
        </>
      )}
    </Layout>
  );
};
export default Pages;
