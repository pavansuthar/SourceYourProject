// hooks
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// components
import Spinner from "./../Loading/Loading";
// icons
import { MdClose } from "react-icons/md";

function SeriesDetails(props) {
  const [state, setState] = useState([]);
  const [loadings, setLoadings] = useState([]);
  const history = useHistory();

  useEffect(() => {
    setLoadings(true);
    let url = `https://series-movies-imdb.p.rapidapi.com/series/details/${props?.match?.params?.SeriesId}`;
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
        setState(data);
        setLoadings(false);
      })
      .catch((e) => console.error(e));

    return null;
  }, [props?.match?.params?.SeriesId]);

  const closeSection = () => {
    history.replace("/IMDB/Series/");
  };

  return (
    <>
      {loadings ? (
        <Spinner />
      ) : (
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6">
                <h3>{state.seriesTitle}</h3>
              </div>
              <div className="col-md-6">
                <button
                  title="close"
                  type="button"
                  className="btn btn-danger"
                  aria-label="Close"
                  onClick={closeSection}
                >
                  <MdClose />
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <p className="fw-bold">
              ID: <span className="fw-normal pl-1">{state.seriesId}</span>
            </p>
            <p className="fw-bold">
              Series location: <span className="fw-normal pl-1">{state.seriesFilmingLocation}</span>
            </p>
            <p className="fw-bold">
              Series Popularity: <span className="fw-normal pl-1">{state.seriesPopularity}</span>
            </p>
            <p className="fw-bold">
              Series rating: <span className="fw-normal pl-1">{state.seriesRating}</span>
            </p>
            <p className="fw-bold">
              Series released at: <span className="fw-normal pl-1">{state.seriesReleasedAt}</span>
            </p>
            <p className="fw-bold">
              Series runtime: <span className="fw-normal pl-1">{state.seriesRunTime}</span>
            </p>
            <p className="fw-bold">
              Series trailer: <span className="fw-normal pl-1">{state.seriesTrailer}</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default SeriesDetails;
