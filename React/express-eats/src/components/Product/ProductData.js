// store
import { useState, useContext } from "react";
import { useHistory } from "react-router";
// css
import "./../../assets/scss/ProductData.scss";
import InfoCircle from "./../../assets/images/info-circle.svg";
// context
import RecipeContext from "./../../store/recipe-context";

const ProductData = () => {
  const [recpVege, setRecpVege] = useState(false);
  const [recpActive, setRecpActive] = useState(false);
  const { recipes } = useContext(RecipeContext);
  const history = useHistory();
  console.log(recipes);
  let filterRecipe = recipes;

  if (filterRecipe.length > 1) {
    filterRecipe = recipes
      .filter((recpData) => {
        if (recpActive) {
          return recpData.isActive === true;
        }
        return recpData;
      })
      .filter((recpData) => {
        if (recpVege) {
          return recpData.vegetarian === true;
        }
        return recpData;
      });
  }

  const vegeHandlerChange = () => {
    setRecpVege((prev) => !prev);
  };

  const activetHandlerChange = () => {
    setRecpActive((prev) => !prev);
  };

  const onEditRecipes = (id) => {
    history.push(`/EditProduct/${id}`);
  };

  const goToAddProduct = () => history.push("/AddProduct");

  return (
    <div className="row ViewProduct">
      <h2>View Product</h2>
      <hr />
      <div className="col-md-12">
        <div className="row sub-main">
          <div className="card p-3 m-3">
            <div className="form-check form-switch">
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                <div className="filterTitle">
                  Filter by active{" "}
                  {/* <span className="badge bg-primary">
                    {filterRecipe.length}
                  </span> */}
                </div>
              </label>
              <input
                className="form-check-input"
                type="checkbox"
                value={recpActive}
                onChange={activetHandlerChange}
              />
            </div>
            <div className="form-check form-switch">
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                <div className="filterTitle">
                  Filter by vege{" "}
                  {/* <span className="badge bg-primary">
                    {filterRecipe.length}
                  </span> */}
                </div>
              </label>
              <input
                className="form-check-input"
                type="checkbox"
                value={recpVege}
                onChange={vegeHandlerChange}
              />
            </div>
          </div>
          <div className="col-md-6 card">
            {filterRecipe.length !== 0 ? (
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
                  {filterRecipe.map((value) => (
                    <tr
                      key={value.recipeID}
                      onClick={() => onEditRecipes(value.recipeID)}
                    >
                      <th scope="row">{value.recipeID}</th>
                      <td>{value.name}</td>
                      <td>
                        <img src={value.imgURL} alt={value.recipeID} />
                      </td>
                      <td>{value.description}</td>
                      <td>{value.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="alert alert-primary m-3 p-3 w-100" role="alert">
                <img src={InfoCircle} alt="info" />
                No products are available.{" "}
                <p onClick={goToAddProduct}>Click here</p> to add new one ...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductData;
