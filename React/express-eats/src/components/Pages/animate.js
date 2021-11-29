// animations
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";

const BouncyDiv = styled.div`
  animation: 2s ${keyframes`${fadeIn}`};
`;

const Animate = (props) => {
  return <BouncyDiv>{props.children}</BouncyDiv>;
};
export default Animate;
