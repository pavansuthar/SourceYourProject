// core
import { Component } from "react";
// components
import Spinner from "./../Loading/Loading";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: "",
      moviesData: [],
      loading: false,
      showModal: false,
    };
    this.handleInput = this.handleInput.bind(this);
    this.showData = this.showData.bind(this);
    this.seeDetails = this.seeDetails.bind(this);
  }

  handleInput(e) {
    this.setState({ movies: e.target.value });
  }

  seeDetails() {
    this.setState({ showModal: true });
  }

  showData() {
    this.setState({ loading: true });
    let url = `https://series-movies-imdb.p.rapidapi.com/movie/details/${this.state.movies}`;
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
        console.log(data);
        this.setState({
          moviesData: data,
          loading: false,
        });
      })
      .catch((e) => console.error(e));
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <form>
            <div className="row">
              <div className="col-md-3">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="textInput"
                    placeholder="Movie ID"
                    value={this.state.movies}
                    onChange={(e) => this.handleInput(e)}
                  />
                  <label htmlFor="floatingInput">Movie ID:</label>
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
          </form>
          <div className="row">
            <div className="col-md-12">
              {this.state.moviesData.length === 0 ? (
                <div className="lead">
                  <p>Type ID like tt0325980</p>
                  {this.state.loading ? <Spinner /> : "No Movies found..."}
                </div>
              ) : (
                <div className="card mb-3" style={{ maxWidth: "540px" }}>
                  <div className="row g-0">
                    <div className="col-md-4 d-flex">
                      <img
                        src={this.state.moviesData?.moviePosterUrl}
                        className="img-fluid rounded-start"
                        alt="actorPic"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">
                          ID: {this.state.moviesData?.movieId}
                        </h5>
                        <p className="card-text">
                          Title: {this.state.moviesData?.movieTitle}
                        </p>
                        <p className="card-text">Genres: </p>
                        <ul>
                          {this.state.moviesData?.movieGenres.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
