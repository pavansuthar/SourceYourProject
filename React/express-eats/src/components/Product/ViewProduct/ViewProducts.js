// core
import React, { useEffect, useState } from "react";
// router
import { useHistory } from "react-router";
// css, icons
import "./ViewProducts.scss";
import { FaSquare, FaRupeeSign, FaStar, FaThumbsUp } from "react-icons/fa";
import InfoCircle from "./../../../assets/images/info-circle.svg";
// components
import Spinner from "../../common/Spinner/Spinner";
import Alerts from "../../common/Alerts/Alerts";
// hooks
import useHttp from "./../../../hooks/use-http";

const ProductWrapper = (props) => {
  return (
    <div className="row ViewProduct">
      <h2>View Product</h2>
      <hr />
      <div className="col-md-12">
        <div className="row sub-main">{props.children}</div>
      </div>
    </div>
  );
};

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [recipeSearch, setRecipeSearch] = useState("");
  const [recpVege, setRecpVege] = useState(false);
  const [recpActive, setRecpActive] = useState(false);
  const history = useHistory();
  const { isLoading, error, sendHttpRequet: fetchProducts } = useHttp();

  useEffect(() => {
    const getAllProducts = (products) => {
      const allProducts = [];
      for (const key in products) {
        allProducts.push({
          addedOn: products[key].addedOn,
          description: products[key].description,
          favourite: products[key].favourite,
          id: products[key].id,
          image: products[key].image,
          isActive: products[key].isActive,
          likes: products[key].likes,
          popular: products[key].popular,
          price: products[key].price,
          recipeName: products[key].recipeName,
          recipeNo: products[key].recipeNo,
          recipeKey: key,
          vegetarian: products[key].vegetarian,
        });
      }
      setProducts(allProducts);
    };

    fetchProducts(
      {
        URL: "https://react-virtusa-expresseats-default-rtdb.firebaseio.com/products.json",
      },
      getAllProducts
    );
  }, [fetchProducts]);

  const goToAddProduct = () => history.push("/AddProduct");

  const vegeHandlerChange = () => {
    setRecpVege((prev) => !prev);
  };

  const activetHandlerChange = () => {
    setRecpActive((prev) => !prev);
  };

  const onEditRecipes = (id) => {
    history.push(`/EditProduct/${id}`);
  };

  if (isLoading) {
    return (
      <ProductWrapper>
        <section className="col-md-6 card p-3">
          <Spinner color="text-dark" text="Loading all products" />
        </section>
      </ProductWrapper>
    );
  }

  if (error) {
    return (
      <ProductWrapper>
        <section className="col-md-6 card p-3">
          <Alerts alertType="alert-danger" icon={InfoCircle} msg={error} />
        </section>
      </ProductWrapper>
    );
  }

  if (products.length === 0 && !error) {
    const Content = (
      <React.Fragment>
        No products are available. <p onClick={goToAddProduct}>Click here</p> to
        add new one ...
      </React.Fragment>
    );
    return (
      <ProductWrapper>
        <section className="col-md-6 card p-3">
          <Alerts alertType="alert-primary" icon={InfoCircle} msg={Content} />
        </section>
      </ProductWrapper>
    );
  }

  return (
    <ProductWrapper>
      <div className="card p-3 m-3">
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="search"
            placeholder="Type any ID"
            value={recipeSearch}
            onChange={(e) => setRecipeSearch(e.target.value)}
          />
          <label htmlFor="floatingInput">Search by Id</label>
        </div>
        <div className="form-check form-switch">
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            <div className="filterTitle">Filter by active </div>
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            value={recpActive}
            onChange={activetHandlerChange}
          />
        </div>
        <div className="form-check form-switch">
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            <div className="filterTitle">Filter by vege </div>
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            value={recpVege}
            onChange={vegeHandlerChange}
          />
        </div>
      </div>
      <section className="col-md-7 card p-3">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Image</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {products
              .filter((value) => {
                if (recipeSearch) {
                  return value.recipeNo === recipeSearch;
                }
                return value;
              })
              .filter((value) => {
                if (recpActive) {
                  return value.isActive === true;
                }
                return value;
              })
              .filter((value) => {
                if (recpVege) {
                  return value.vegetarian === true;
                }
                return value;
              })
              .map((value) => (
                <tr
                  key={value?.recipeKey}
                  onClick={() => onEditRecipes(value?.recipeKey)}
                >
                  <th scope="row">
                    {value?.recipeNo} {value?.popular ? "(popular)" : ""}
                  </th>
                  <td>
                    {value?.recipeName}{" "}
                    <FaSquare fill={value?.vegetarian ? "green" : "red"} />
                  </td>
                  <td>
                    <img src={value?.image} alt={value?.id} width="300" />
                  </td>
                  <td>
                    {value?.description}
                    <div className="ratings">
                      <div>
                        <FaStar color="orange" /> <p>{value?.favourite}</p>
                      </div>
                      <div>
                        <FaThumbsUp color="#0074d9" /> <p>{value?.likes}</p>
                      </div>
                    </div>
                  </td>
                  <td className="price">
                    <FaRupeeSign /> {value?.price}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </ProductWrapper>
  );
};

export default ViewProducts;
