import React from "react";
import { MENU_ITEMS } from "@/constant";

interface MenuItem {
  name: string;
  link: string;
}

interface NavbarProps {
  menuItems: MenuItem[];
}

const Navbar = ({ menuItems }: NavbarProps) => {
  return (
    <header className="sticky top-0 bg-blue-100 p-4 shadow-md">
      <nav className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Navbar</h1>
        <ul className="flex space-x-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a href={item.link} className="text-blue-600 hover:text-blue-800">
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
