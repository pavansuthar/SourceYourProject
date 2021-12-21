// core
import React from "react";
// css
import "./AddProduct.scss";
import InfoCircle from "./../../../assets/images/info-circle.svg";
// component
import Spinner from "../../common/Spinner/Spinner";
import ViewPage from "../../../UI/ViewPage";
// firebase
import firebase from "firebase";
import Alerts from "../../common/Alerts/Alerts";

class AddProduct extends React.Component {
  static initialState = {};

  constructor(props) {
    super(props);
    this.state = {
      id: "",
      recipeNo: "",
      recipeName: "",
      recipeKey: "",
      description: "",
      price: 0,
      image: "",
      isActive: false,
      popular: false,
      favourite: 0,
      vegetarian: false,
      likes: 0,
      isLoading: false,
      isEditMode: false,
      formError: {
        isError: false,
        errorMsg: null,
      },
    };
    this.addRecipeHandler = this.addRecipeHandler.bind(this);
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.onAddRecipeToFirebase = this.onAddRecipeToFirebase.bind(this);
    this.onGetRecipe = this.onGetRecipe.bind(this);
    this.onUpdateRecipeIDKeyToFirebase =
      this.onUpdateRecipeIDKeyToFirebase.bind(this);
    this.onUpdateRecipeToFirebase = this.onUpdateRecipeToFirebase.bind(this);
    this.onDeleteRecipe = this.onDeleteRecipe.bind(this);
    this.onCloseAlert = this.onCloseAlert.bind(this);
    this.onPageBack = this.onPageBack.bind(this);
  }

  componentDidMount() {
    if (this.props?.history?.location?.pathname !== "/AddProduct") {
      this.setState({ isEditMode: true });
      const getParamsId = this.props?.match?.params?.id;
      this.onGetRecipe(getParamsId);
    } else {
      this.setState({ isEditMode: false });
    }
  }

  onGetRecipe(paramID) {
    firebase
      .database()
      .ref(`products/${paramID}`)
      .once("value", (snap) => {
        let filterRecipe = snap.val();
        this.setState({
          id: filterRecipe?.id,
          recipeNo: filterRecipe?.recipeNo,
          recipeName: filterRecipe?.recipeName,
          recipeKey: filterRecipe?.recipeKey,
          description: filterRecipe?.description,
          price: filterRecipe?.price,
          image: filterRecipe?.image,
          isActive: filterRecipe?.isActive,
          popular: filterRecipe?.popular,
          favourite: filterRecipe?.favourite,
          vegetarian: filterRecipe?.vegetarian,
          likes: filterRecipe?.likes,
          isLoading: filterRecipe?.isLoading,
        });
      });
  }

  onAddRecipeToFirebase() {
    this.setState({
      isLoading: true,
      formError: {
        isError: false,
        errorMsg: null,
      },
    });
    const recipe = {
      ...this.state,
      addedOn: firebase.firestore.FieldValue.serverTimestamp(),
    };
    recipe.id = +recipe?.recipeNo.substr(5);
    delete recipe.formError;
    delete recipe.isLoading;
    delete recipe.isEditMode;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    };
    const postProduct = async () => {
      const productsURL =
        "https://react-virtusa-expresseats-default-rtdb.firebaseio.com/products.json";
      const response = await fetch(productsURL, options);
      const responseData = await response.json();
      this.onUpdateRecipeIDKeyToFirebase(responseData.name);
    };
    postProduct().catch((e) => {
      this.setState({
        isLoading: false,
        formError: {
          isError: true,
          errorMsg: e.message,
        },
      });
    });
  }

  onUpdateRecipeIDKeyToFirebase(key) {
    firebase.database().ref().child(`products/${key}`).update({
      recipeKey: key,
    });
  }

  addRecipeHandler(e) {
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
    if (!this.state?.isEditMode) {
      this.onAddRecipeToFirebase();
    } else {
      this.onUpdateRecipeToFirebase();
    }
    setTimeout(() => {
      this.props?.history?.push("./../ViewProduct");
    }, 3000);
  }

  componentWillUnmount() {
    this.setState({
      isLoading: false,
      formError: {
        isError: false,
        errorMsg: null,
      },
    });
  }

  inputChangeHandler(e) {
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
  }

  onUpdateRecipeToFirebase() {
    this.setState({
      isLoading: true,
      formError: {
        isError: false,
        errorMsg: null,
      },
    });
    const recipe = {
      ...this.state,
      addedOn: firebase.firestore.FieldValue.serverTimestamp(),
    };
    delete recipe.formError;
    delete recipe.isLoading;
    delete recipe.isEditMode;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    };
    const postProduct = async () => {
      const productsURL = `https://react-virtusa-expresseats-default-rtdb.firebaseio.com/products/${this.state.recipeKey}.json`;
      const response = await fetch(productsURL, options);
      const responseData = await response.json();
      console.log(responseData);
    };
    postProduct().catch((e) => {
      this.setState({
        isLoading: false,
        formError: {
          isError: true,
          errorMsg: e.message,
        },
      });
    });
  }

  onDeleteRecipe() {
    this.setState({
      isLoading: true,
    });
    firebase.database().ref(`products/${this.state.recipeKey}`).remove();
    this.setState({
      isLoading: false,
    });
    setTimeout(() => {
      this.props?.history?.push("./../ViewProduct");
    }, 3000);
  }

  onCloseAlert() {
    this.setState({
      formError: {
        isError: false,
        errorMsg: null,
      },
    });
  }

  onPageBack() {
    this.props?.history?.push("./../ViewProduct");
  }

  render() {
    return (
      <ViewPage
        title={
          this.state?.isEditMode
            ? `Edit ${this.state?.recipeNo} product`
            : "Add new product"
        }
      >
        <div className="col-md-12">
          {this.state?.formError?.isError && (
            <div className="row sub-main mb-3">
              <div className="col-md-6 card p-3">
                <Alerts
                  alertType="alert-danger"
                  icon={InfoCircle}
                  msg={this.state?.formError?.errorMsg}
                  onClose={this.onCloseAlert}
                />
              </div>
            </div>
          )}
          <div className="row sub-main">
            <div className="col-md-6 card p-3">
              <form onSubmit={this.addRecipeHandler}>
                <div className="row mb-3">
                  <div className="col-md-4">
                    <label
                      htmlFor="recipeNo"
                      className="col-form-label"
                      disabled={false}
                    >
                      ID <span className="text-danger fw-bold">*</span>
                    </label>
                    <div className="col-md-12">
                      <input
                        name="recipeNo"
                        type="text"
                        className="form-control"
                        value={this.state.recipeNo}
                        onChange={this.inputChangeHandler}
                      />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <label htmlFor="recipeName" className="col-form-label">
                      Name <span className="text-danger fw-bold">*</span>
                    </label>
                    <div className="col-md-12">
                      <input
                        name="recipeName"
                        type="text"
                        className="form-control"
                        value={this.state.recipeName}
                        onChange={this.inputChangeHandler}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="description" className="col-form-label">
                      Description
                    </label>
                    <div className="col-md-12">
                      <textarea
                        name="description"
                        rows="2"
                        className="form-control"
                        value={this.state.description}
                        onChange={this.inputChangeHandler}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="image" className="col-form-label">
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
                <div className="row mb-3">
                  <div className="col-md-3">
                    <label htmlFor="price" className="col-form-label">
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
                  <div className="col-md-3">
                    <label htmlFor="favourite" className="col-form-label">
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
                  <div className="col-md-3">
                    <label htmlFor="isActive" className="col-form-label">
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
                  <div className="col-md-3">
                    <label htmlFor="popular" className="col-form-label">
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
                <div className="row mb-3">
                  <div className="col-md-3">
                    <label htmlFor="vegetarian" className="col-form-label">
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
                  <div className="col-md-3">
                    <label htmlFor="likes" className="col-form-label">
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
                <div className="row mb-3">
                  <div className="col-md-12 jus">
                    <button
                      type="submit"
                      className="btn btn-success"
                      disabled={this.state.isLoading}
                    >
                      {this.state?.isEditMode ? "Save" : "Add"}
                    </button>
                    {this.state?.isEditMode && (
                      <button
                        type="button"
                        className="btn btn-danger"
                        disabled={
                          !this.state.isEditMode || this.state.isLoading
                        }
                        onClick={this.onDeleteRecipe}
                      >
                        Delete
                      </button>
                    )}
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={this.onPageBack}
                    >
                      Back
                    </button>
                    {this.state.isLoading && (
                      <Spinner
                        text={
                          this.state.isEditMode ? "Saving this" : "Adding this"
                        }
                      />
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </ViewPage>
    );
  }
}

export default AddProduct;
