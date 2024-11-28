import Link from "next/link";
import { IoLogInOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

const Header = () => {
  return (
    <header className="z-50 sticky top-0 bg-black px-4 shadow-md">
      <nav className="flex justify-between items-center text-white">
        <h4 className="font-semibold flex items-center">
          <CgProfile className="mr-2" /> Hi,
        </h4>
        <div>
          <Link className="text-center p-2 flex items-center" href="/login">
            <IoLogInOutline className="mr-2" />
            <span>Login</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
