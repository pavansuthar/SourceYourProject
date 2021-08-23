// components
import AuthLoginPage from "./../../components/Login/AuthLoginPage";
// animations
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";

const BouncyDiv = styled.div`
  animation: 2s ${keyframes`${fadeIn}`};
`;

const Auth = () => {
  return <BouncyDiv><AuthLoginPage /></BouncyDiv>;
};
export default Auth;
