// core
import { useEffect, useState } from "react";
// router
import { useHistory } from "react-router";
// css, icons
import "./ViewProducts.scss";
import { FaSquare, FaRupeeSign, FaStar, FaThumbsUp } from "react-icons/fa";
import InfoCircle from "./../../assets/images/info-circle.svg";
// components
import Spinner from "../Spinner/Spinner";

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
  const [isLoading, setIsLoading] = useState(true);
  const [isHTTPError, setIsHTTPError] = useState();
  const [recipeSearch, setRecipeSearch] = useState("");
  const [recpVege, setRecpVege] = useState(false);
  const [recpActive, setRecpActive] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchProducts = async () => {
      const productsURL =
        "https://react-virtusa-expresseats-default-rtdb.firebaseio.com/products.json";
      const response = await fetch(productsURL);
      const responseData = await response.json();
      const allProducts = [];
      for (const key in responseData) {
        allProducts.push({
          addedOn: responseData[key].addedOn,
          description: responseData[key].description,
          favourite: responseData[key].favourite,
          id: responseData[key].id,
          image: responseData[key].image,
          isActive: responseData[key].isActive,
          likes: responseData[key].likes,
          popular: responseData[key].popular,
          price: responseData[key].price,
          recipeName: responseData[key].recipeName,
          recipeNo: responseData[key].recipeNo,
          recipeKey: key,
          vegetarian: responseData[key].vegetarian,
        });
      }
      setProducts(allProducts);
      setIsLoading(false);
    };
    fetchProducts().catch((e) => {
      setIsHTTPError(e.message);
      setIsLoading(false);
    });
  }, []);

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

  if (isHTTPError) {
    return (
      <ProductWrapper>
        <section className="col-md-6 card p-3">
          <div className="alert alert-danger m-3 p-3 w-100" role="alert">
            <img src={InfoCircle} alt="info"/> {isHTTPError}
          </div>
        </section>
      </ProductWrapper>
    );
  }

  if (products.length === 0 && !isHTTPError) {
    return (
      <ProductWrapper>
        <section className="col-md-6 card p-3">
          <div className="alert alert-primary m-3 p-3 w-100" role="alert">
            <img src={InfoCircle} alt="info" /> No products are available.{" "}
            <p onClick={goToAddProduct}>Click here</p> to add new one ...
          </div>
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
                    <img src={value?.image} alt={value?.id}  width="300"/>
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
