import "./style.css";
import { MainHeader } from "./main";
import { DashHeader } from "./dash";
import { SearchHeader } from "./search";
import { LoginHeader } from "./login";
import { MainAdminHeader } from "./mainAdmin";
import { DashHeaderAdmin } from "./dashAdmin";
// import { Link } from 'react-router-dom';

const Header = ({
  variant,
  img,
}: {
  variant:
    | "main"
    | "dash"
    | "faq"
    | "search"
    | "login"
    | "main-admin"
    | "dash-admin";

  img?: string;
}) => {
  switch (variant) {
    case "login": {
      return <LoginHeader />;
    }
    case "search": {
      return <SearchHeader />;
    }
    case "dash": {
      return <DashHeader />;
    }
    case "dash-admin": {
      return <DashHeaderAdmin />;
    }
    case "main-admin": {
      return <MainAdminHeader />;
    }
    default: {
      return <MainHeader />;
    }
  }
};

export default Header;
