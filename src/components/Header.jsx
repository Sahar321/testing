import logo from "../img/logo/logo.svg";

export function Header() {
  return (
    <header className="header">
      <img
        id="headerLogo"
        src={logo}
        className="logo"
        alt="logo of Around the U.S."
      />
    </header>
  );
}
