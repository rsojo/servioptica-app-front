import "./style.css";
import { MainHeader } from "./main";
import { DashHeader } from "./dash";
// import { Link } from 'react-router-dom';

const Header = ({variant, img}:{variant: 'main' | 'dash' | 'faq', img?: string}) => {
  if(variant === 'dash') {
    return <DashHeader />
  }
  return (
    <MainHeader />
  );
};

export default Header;
