import React from "react";

interface HeaderProps {
  title: string;
  subtitle: string;
}

const Header: React.FunctionComponent<HeaderProps> = ({
  title = "",
  subtitle = ""
}) => {
  
  return (
    <header>
      <h2 className='pt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl'>{title}</h2>
      <h1 className='pt-3 text-gray-900 sm:text-2xl'>{subtitle}</h1>
    </header>
  );
};

export default Header;