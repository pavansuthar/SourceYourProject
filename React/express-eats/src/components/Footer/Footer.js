// css
import "./Footer.scss";
// icons
import { IoFastFood } from "react-icons/io5";

const Footer = () => {
  return (
    <div className="row footerSection">
      <div>
        <div>
          All trademarks are properties of their respective owners.
        </div>
        <div>
          Agreed to Privacy Policy, Terms of Service, Cookie Policy, Privacy
          Policy, Content Policies.
        </div>
      </div>
      <div>
        <div className="logo">
        © 2020-21 Express <IoFastFood /> Eats Inc. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
