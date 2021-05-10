import React from "react";
import { useDispatch } from "react-redux";
import GithubIcon from "../../icons/GithubIcon";
import { toggleModal } from "../../store/reducers";

interface HeaderProps {
  title: string;
  subtitle: string;
}

const Header: React.FunctionComponent<HeaderProps> = ({
  title = "",
  subtitle = "",
}) => {
  const dispatch = useDispatch();
  const handleToggle = () => {
    dispatch(toggleModal([]));
  };

  return (
    <header className="relative">
      <h2 className="pt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        {title}
      </h2>
      <h1 className="pt-3 text-gray-900 sm:text-2xl">{subtitle}</h1>
      <div className="absolute flex items-center right-5 gap-5 top-5">
        <div
          className="cursor-pointer bg-blue-100 rounded-md p-2 shadow"
          onClick={handleToggle}
        >
          How To Use
        </div>
        <a
          href="https://github.com/PrinceRajRoy/cowin-notifier"
          target="_blank"
          rel="noreferrer"
        >
          <GithubIcon />
        </a>
      </div>
    </header>
  );
};

export default Header;
