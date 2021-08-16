// core
import { Component } from "react";
// components
import Spinner from "./../Loading/Loading";
// routes
import { Link } from "react-router-dom";

class Series extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: "",
      seriesData: [],
      loading: false,
    };
    this.handleInput = this.handleInput.bind(this);
    this.showData = this.showData.bind(this);
  }

  handleInput(e) {
    this.setState({ series: e.target.value });
  }

  showData() {
    this.setState({ loading: true });
    let url = `https://series-movies-imdb.p.rapidapi.com/series/search/${this.state.series}`;
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
          seriesData: data,
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
                    placeholder="Sherlock"
                    value={this.state.series}
                    onChange={(e) => this.handleInput(e)}
                  />
                  <label htmlFor="floatingInput">Series:</label>
                </div>
              </div>
              <div className="col-md-3 mt-2 pt-1 mb-2">
                <button type="button" className="btn btn-success" onClick={this.showData}>
                  Search
                </button>
              </div>
            </div>
          </form>
          <div className="row">
            <div className="col-md-12">
              {this.state.seriesData.length === 0 ? (
                <div className="lead">
                  <p>Type Series like Batman</p>
                  {this.state.loading ? <Spinner /> : "No Series found..."}
                </div>
              ) : (
                <div className="row mt-2">
                  {this.state.seriesData.map(function iterateSeries(item) {
                    return (
                      <div
                        className="col-md-3 mt-2 mr-2"
                        key={item.seriesTitle}
                      >
                        <div className="card">
                          <img
                            src={item.seriesPosterUrl}
                            className="card-img-top"
                            style={{ width: "100%", height: "100px" }}
                            alt="poster"
                          />
                          <div className="card-body">
                            <h5 className="card-title">{item.seriesTitle}</h5>
                            <p className="card-text">ID: {item.seriesId}</p>
                            <Link to={`/IMDB/Series/Details/${item.seriesId}`}>
                              See details
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Series;
