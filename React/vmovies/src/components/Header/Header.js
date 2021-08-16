// assets
import Logo from "./../../assets/images/Logo.png";

function Header() {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="mx-auto pt-2 pb-2">
        <a className="navbar-brand" href="/">
          <img
            src={Logo}
            alt="logo"
            width="75"
            height="40"
            className="d-inline-block"
          />
        </a>
      </div>
    </nav>
  );
}
export default Header;
