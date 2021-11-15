// core
import React from "react";

class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      price: 0,
      imgURL: "",
      isActive: false,
    };
    this.addRecipeHandler = this.addRecipeHandler.bind(this);
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
  }

  addRecipeHandler = (e) => {
    e.preventDefault();
    this.props.store.dispatch({ type: "add", payload: this.state });
    // this.props.history.push("/ProductData");
  };

  inputChangeHandler = (e) => {
    console.log(e);
    const name = e.target.name;
    const value = e.target.value;
    if (name === "isActive") {
      this.setState((prev) => {
        return {
          isActive: !prev.isActive,
        };
      });
    } else {
      this.setState({
        [name]: value,
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <h2>Add product</h2>
        <div className="row">
          <div className="col-md-12 card p-3">
            <form onSubmit={this.addRecipeHandler}>
              <div className="row mb-3">
                <label htmlFor="name" className="col-sm-2 col-form-label">
                  Recipe Name
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
              <div className="row mb-3">
                <label
                  htmlFor="description"
                  className="col-sm-2 col-form-label"
                >
                  Recipe Description
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
                  Recipe Image URL
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
              <div className="row mb-3">
                <label htmlFor="price" className="col-sm-2 col-form-label">
                  Recipe Price
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
              <div className="row mb-3">
                <label htmlFor="isActive" className="col-sm-2 col-form-label">
                  Mark Active
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
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AddProduct;
