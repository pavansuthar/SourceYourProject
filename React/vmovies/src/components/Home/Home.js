// icons
import { BsFilm } from "react-icons/bs";

function Home() {
  return (
    <div className="row text-center">
      <div className="col-md-12">
        <h1>Welcome to IMDB App <BsFilm /></h1>
        <h3>
          A One-stop-shop for
          <small className="text-muted"> all movies & series</small>
        </h3>
      </div>
    </div>
  );
}

export default Home;
