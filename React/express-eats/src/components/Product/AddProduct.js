// core
import React from "react";
// css
import "./AddProduct.scss";
import InfoCircle from "./../../assets/images/info-circle.svg";
// component
import Spinner from "../Loading/Loading";
// context
import RecipeContext from "./../../store/recipeContext";

class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      recipeNo: "",
      recipeName: "",
      description: "",
      price: 0,
      image: "",
      isActive: false,
      popular: false,
      favourite: 0,
      vegetarian: false,
      likes: 0,
      isLoading: false,
      formError: {
        isError: false,
        errorMsg: null,
      },
    };
    this.addRecipeHandler = this.addRecipeHandler.bind(this);
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
  }

  componentDidMount() {
    if (this.props?.history?.location?.pathname !== "/AddProduct") {
      const getParamsId = this.props?.match?.params?.id;
      const getRecipies = this.context?.recipes;
      const filterRecipe = getRecipies.filter(
        (recipe) => recipe.id === getParamsId
      );
      console.log(getRecipies);
      // this.setState({
      //   id: filterRecipe?.id,
      //   recipeNo: filterRecipe?.recipeNo,
      //   recipeName: filterRecipe?.recipeName,
      //   description: filterRecipe?.description,
      //   price: filterRecipe?.price,
      //   image: filterRecipe?.image,
      //   isActive: filterRecipe?.isActive,
      //   popular: filterRecipe?.popular,
      //   favourite: filterRecipe?.favourite,
      //   vegetarian: filterRecipe?.vegetarian,
      //   likes: filterRecipe?.likes,
      //   isLoading: filterRecipe?.isLoading,
      // });
    }
  }

  addRecipeHandler = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    if (!this.state.recipeNo || !this.state.image || !this.state.recipeName) {
      this.setState({
        formError: {
          isError: true,
          errorMsg: "Fill required details.",
        },
      });
      this.setState({ isLoading: false });
      return;
    }
    this.props?.history?.location?.pathname === "/AddProduct"
      ? this.context.onAddRecipe(this.state)
      : this.context.onUpdateRecipe(this.state);
    setTimeout(() => {
      this.props?.history?.push("./../ViewProduct");
    }, 3000);
  };

  componentWillUnmount() {
    this.setState({
      isLoading: false,
      formError: {
        isError: false,
        errorMsg: null,
      },
    });
  }

  inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "isActive" || name === "popular" || name === "vegetarian") {
      this.setState((prev) => {
        return {
          [name]: !prev[name],
        };
      });
    } else {
      this.setState({
        [name]: value,
      });
    }
    this.setState({
      formError: {
        isError: false,
        errorMsg: null,
      },
    });
  };

  render() {
    return (
      <div className="row addProduct">
        <h2>Add product</h2>
        <hr />
        <div className="col-md-12">
          {this.state?.formError?.isError && (
            <div className="row sub-main mb-3">
              <div className="col-md-6 card p-3">
                <div className="alert alert-danger mb-0" role="alert">
                  <img src={InfoCircle} alt="info" />{" "}
                  {this.state?.formError?.errorMsg}
                </div>
              </div>
            </div>
          )}
          <div className="row sub-main">
            <div className="col-md-6 card p-3">
              <form onSubmit={this.addRecipeHandler}>
                <div className="row">
                  <div className="col-md-4">
                    <div className="row mb-3">
                      <label
                        htmlFor="recipeNo"
                        className="col-sm-2 col-form-label"
                        disabled={false}
                      >
                        ID <span className="text-danger fw-bold">*</span>
                      </label>
                      <div className="col-sm-10">
                        <input
                          name="recipeNo"
                          type="text"
                          className="form-control"
                          value={this.state.recipeNo}
                          onChange={this.inputChangeHandler}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="row mb-3">
                      <label
                        htmlFor="recipeName"
                        className="col-sm-2 col-form-label"
                      >
                        Name <span className="text-danger fw-bold">*</span>
                      </label>
                      <div className="col-sm-10">
                        <input
                          name="recipeName"
                          type="text"
                          className="form-control"
                          value={this.state.recipeName}
                          onChange={this.inputChangeHandler}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="description"
                    className="col-sm-2 col-form-label"
                  >
                    Description
                  </label>
                  <div className="col-sm-10">
                    <textarea
                      name="description"
                      rows="2"
                      className="form-control"
                      value={this.state.description}
                      onChange={this.inputChangeHandler}
                    ></textarea>
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="image" className="col-sm-2 col-form-label">
                    Recipe Image URL{" "}
                    <span className="text-danger fw-bold">*</span>
                  </label>
                  <div className="col-sm-10">
                    <input
                      name="image"
                      type="text"
                      className="form-control"
                      value={this.state.image}
                      onChange={this.inputChangeHandler}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="row mb-3">
                      <label
                        htmlFor="price"
                        className="col-sm-2 col-form-label"
                      >
                        Price
                      </label>
                      <div className="col-sm-10">
                        <input
                          name="price"
                          type="number"
                          className="form-control"
                          value={this.state.price}
                          onChange={this.inputChangeHandler}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row mb-3">
                      <label
                        htmlFor="favourite"
                        className="col-sm-2 col-form-label"
                      >
                        Fav
                      </label>
                      <div className="col-sm-10">
                        <input
                          name="favourite"
                          type="number"
                          className="form-control"
                          value={this.state.favourite}
                          onChange={this.inputChangeHandler}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="row mb-3">
                      <label
                        htmlFor="isActive"
                        className="col-sm-2 col-form-label"
                      >
                        Active
                      </label>
                      <div className="col-sm-10">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="isActive"
                            value={this.state.isActive}
                            checked={this.state.isActive}
                            onChange={this.inputChangeHandler}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row mb-3">
                      <label
                        htmlFor="popular"
                        className="col-sm-2 col-form-label"
                      >
                        Popular
                      </label>
                      <div className="col-sm-10">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="popular"
                            value={this.state.popular}
                            checked={this.state.popular}
                            onChange={this.inputChangeHandler}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="row mb-3">
                      <label
                        htmlFor="vegetarian"
                        className="col-sm-2 col-form-label"
                      >
                        Vege
                      </label>
                      <div className="col-sm-10">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="vegetarian"
                            value={this.state.vegetarian}
                            checked={this.state.vegetarian}
                            onChange={this.inputChangeHandler}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row mb-3">
                      <label
                        htmlFor="likes"
                        className="col-sm-2 col-form-label"
                      >
                        Likes
                      </label>
                      <div className="col-sm-10">
                        <input
                          name="likes"
                          type="number"
                          className="form-control"
                          value={this.state.likes}
                          onChange={this.inputChangeHandler}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <button
                      type="submit"
                      className="btn btn-success"
                      disabled={this.state.isLoading}
                    >
                      Submit
                    </button>
                    {this.state.isLoading && <Spinner text="Adding this" />}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddProduct.contextType = RecipeContext;
export default AddProduct;
