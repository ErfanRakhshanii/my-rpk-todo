
import * as React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function Header() {
  const [openHamburgerMenu, setOpenHamburgerMenu] = React.useState(false);

  const linkStyles = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'text-white font-bold' : 'text-gray-300';

  const toggleMenu = () => {
    setOpenHamburgerMenu(!openHamburgerMenu);
  };

  return (
    <div className="mb-9 w-full h-20 bg-blue-600 flex items-center justify-around ">
      <span className="text-white font-bold">Rayan Pardazesh Kavosh ToDo list Task by Erfan Rakhshani</span>
      <button
        className="md:hidden text-white focus:outline-none"
        onClick={toggleMenu}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d={openHamburgerMenu ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
          />
        </svg>
      </button>
      <ul
        className={`${openHamburgerMenu ? '' : 'hidden'
          } md:flex gap-4`}
      >
        <li>
          <NavLink to="/" className={linkStyles}>
            Add Todos
          </NavLink>
        </li>
        <li>
          <NavLink to="/InProgressTodos" className={linkStyles}>
            In Progress Todos
          </NavLink>
        </li>
        <li>
          <NavLink to="/DoneTodos" className={linkStyles}>
            Done Todos
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
