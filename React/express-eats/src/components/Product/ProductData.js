// store
import { useSelector } from "react-redux";

const ProductData = () => {
  const data = useSelector((state) => state.recipes);
  console.log(data);

  return <h3>Product data</h3>;
};

export default ProductData;
