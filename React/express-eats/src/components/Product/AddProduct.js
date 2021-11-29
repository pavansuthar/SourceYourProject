// core
import React from "react";
// css
import "./../../assets/scss/AddProduct.scss";
import InfoCircle from "./../../assets/images/info-circle.svg";
// component
import Spinner from "../Loading/Loading";
// context
import RecipeContext from "./../../store/recipe-context";

class AddProduct extends React.Component {
  static contextType = RecipeContext;

  constructor(props) {
    super(props);
    this.state = {
      recipeID: "",
      name: "",
      description: "",
      price: 0,
      imgURL: "",
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
    console.log(props);
  }

  componentDidMount() {
    if (this.props?.history?.location?.pathname !== "/AddProduct") {
      const getParamsId = this.props?.match?.params?.id;
      const getRecipies = this.context?.recipes;
      const filterRecipe = getRecipies.filter(
        (recipe) => recipe.recipeID === getParamsId
      );
      console.log(filterRecipe[0]);
      this.setState({
        recipeID: filterRecipe[0]?.recipeID,
        name: filterRecipe[0]?.name,
        description: filterRecipe[0]?.description,
        price: filterRecipe[0]?.price,
        imgURL: filterRecipe[0]?.imgURL,
        isActive: filterRecipe[0]?.isActive,
        popular: filterRecipe[0]?.popular,
        favourite: filterRecipe[0]?.favourite,
        vegetarian: filterRecipe[0]?.vegetarian,
        likes: filterRecipe[0]?.likes,
        isLoading: filterRecipe[0]?.isLoading,
      });
    }
  }

  addRecipeHandler = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    console.log(this.state);
    if (!this.state.recipeID || !this.state.imgURL || !this.state.name) {
      this.setState({
        formError: {
          isError: true,
          errorMsg: "Fill required details.",
        },
      });
      this.setState({ isLoading: false });
      return;
    }

    // this.props?.history?.location?.pathname === "/AddProduct"
    //   ? this.context.onAddRecipes(this.state)
    //   : this.context.onUpdateRecipe(this.state);

    // this.props.history.push("./ViewProduct");
    this.setState({
      formError: {
        isError: false,
        errorMsg: null,
      },
    });
  };

  componentWillUnmount() {
    this.setState({ isLoading: false });
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
          {this.state.formError.isError && (
            <div className="row sub-main mb-3">
              <div className="col-md-6 card p-3">
                <div className="alert alert-danger mb-0" role="alert">
                  <img src={InfoCircle} alt="info" />{" "}
                  {this.state.formError.errorMsg}
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
                        htmlFor="recipeID"
                        className="col-sm-2 col-form-label"
                        disabled={false}
                      >
                        ID <span class="text-danger fw-bold">*</span>
                      </label>
                      <div className="col-sm-10">
                        <input
                          name="recipeID"
                          type="text"
                          className="form-control"
                          value={this.state.recipeID}
                          onChange={this.inputChangeHandler}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="row mb-3">
                      <label htmlFor="name" className="col-sm-2 col-form-label">
                        Name <span class="text-danger fw-bold">*</span>
                      </label>
                      <div className="col-sm-10">
                        <input
                          name="name"
                          type="text"
                          className="form-control"
                          value={this.state.name}
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
                  <label htmlFor="imgURL" className="col-sm-2 col-form-label">
                    Recipe Image URL <span class="text-danger fw-bold">*</span>
                  </label>
                  <div className="col-sm-10">
                    <input
                      name="imgURL"
                      type="text"
                      className="form-control"
                      value={this.state.imgURL}
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
                    {this.state.isLoading && <Spinner text="Adding this"/>}
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

export default AddProduct;
