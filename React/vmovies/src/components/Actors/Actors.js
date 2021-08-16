// core
import { Component } from "react";
// components
import Spinner from "./../Loading/Loading";

class Actors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actorID: 0,
      loading: false,
      actorData: null,
    };

    this.showData = this.showData.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  showData() {
    this.setState({ loading: true });
    let url = `https://series-movies-imdb.p.rapidapi.com/actor/details/nm${this.state.actorID}`;
    let options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "8fa65272c4mshe62c123be25d4cep14a5f6jsneabe2f881c65",
        "x-rapidapi-host": "series-movies-imdb.p.rapidapi.com",
      },
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          actorData: data,
          loading: false,
        });
      })
      .catch((e) => console.error(e));
  }

  handleInput(e) {
    this.setState({ actorID: e.target.value });
  }

  render() {
    return (
      <div className="row">
        <form>
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-3">
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control"
                    id="floatingInput"
                    placeholder="nm0000001"
                    value={this.state.actorID}
                    onChange={(e) => this.handleInput(e)}
                  />
                  <label htmlFor="floatingInput">Actor ID:</label>
                </div>
              </div>
              <div className="col-md-3 mt-2 pt-1 mb-2">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={this.showData}
                >
                  Search
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div>
                  {this.state.actorData === null ? (
                    <div className="lead">
                      <p>Type ID like 0000001</p>
                      {this.state.loading ? <Spinner /> : "No Actors found ..."}
                    </div>
                  ) : (
                    <div className="card mb-3" style={{ maxWidth: "540px" }}>
                      <div className="row g-0">
                        <div className="col-md-4 d-flex">
                          <img
                            src={this.state.actorData?.actorPhotoUrl}
                            className="img-fluid rounded-start"
                            alt="actorPic"
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="card-title">
                              {this.state.actorData?.actorName}
                            </h5>
                            <p className="card-text">
                              Born on {this.state.actorData?.actorBirthDate} in{" "}
                              {this.state.actorData?.actorBirthPlace}
                            </p>
                            <p className="card-text">
                              {this.state.actorData?.actorBiography.length > 10
                                ? this.state.actorData?.actorBiography.substring(
                                    0,
                                    100
                                  ) + "..."
                                : this.state.actorData?.actorBiography}
                            </p>
                            <p className="card-text">
                              <small className="text-muted">
                                ID: {this.state.actorData?.actorId}
                              </small>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Actors;
