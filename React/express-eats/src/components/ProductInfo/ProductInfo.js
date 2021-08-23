// core
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
// icons
import { BiLike, BiHealth, BiStar } from "react-icons/bi";

const ProductInfo = () => {
  const param = useParams();
  const data = useSelector((state) => state.recipes);
  const history = useHistory();

  let filterData = data.filter(
    (recipeDetails) => recipeDetails.id === +param.id
  );
  console.log(filterData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "productItem" });
  }, [dispatch]);

  const onNavigateBack = () => history.replace("/Product");

  return (
    <div className="row">
      <div className="col-md-12">
        <button
          type="button"
          className="btn btn-primary mb-2 text-right"
          onClick={onNavigateBack}
        >
          Back
        </button>
        {filterData[0]?.details !== null && (
          <div className="card p-3">
            <h2 className="text-primary">
              {filterData[0]?.details[0]?.title} ({filterData[0]?.id}) ?{" "}
            </h2>
            <hr />
            <div className="row">
              <div className="col-md-6">
                <p>
                  Is vegetarian dish? -{" "}
                  {filterData[0]?.details[0]?.vegetarian ? "Yes" : "No"}
                </p>
                <p>
                  Very popular <BiStar /> -{" "}
                  {filterData[0]?.details[0]?.veryPopular ? "Yes" : "No"}
                </p>
                <p>
                  Very healthy -{" "}
                  {filterData[0]?.details[0]?.veryHealthy ? "Yes" : "No"}
                </p>
                <p>
                  Aggregate likes <BiLike /> -{" "}
                  {filterData[0]?.details[0]?.aggregateLikes}
                </p>
                <p>
                  Is Cheap? - {filterData[0]?.details[0]?.cheap ? "Yes" : "No"}
                </p>
                <p>Credit texts - {filterData[0]?.details[0]?.creditsText}</p>
                <p>Source - {filterData[0]?.details[0]?.sourceUrl}</p>
                <p>Diets</p>
                <div className="row">
                  <div className="col-md-6 mb-2">
                    {filterData[0]?.details[0]?.diets.map((item, index) => {
                      return (
                        <ul className="list-group" key={item}>
                          <li className="list-group-item">
                            {index + 1}. {item}
                          </li>
                        </ul>
                      );
                    })}
                  </div>
                </div>
                <p>
                  Health score <BiHealth /> -{" "}
                  {filterData[0]?.details[0]?.healthScore}
                </p>
                <p>Summary - {filterData[0]?.details[0]?.summary}</p>
              </div>
              <div className="col-md-6">
                <img
                  src={filterData[0]?.details[0]?.image}
                  alt={filterData[0]?.details[0]?.title}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;
