import { Navbar } from "flowbite-react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Nav = () => {
  const [activeLink, setActiveLink] = useState('/');
  const location = useLocation();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  return (
    <>
      <Navbar fluid={true} rounded={true}>
        <Navbar.Brand to="/navbars">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white bg-gray-800">
            Flowbite
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link
            href="/"
            active={activeLink === "/"}
          >
            Home
          </Navbar.Link>
          <Navbar.Link href="/search" active={activeLink === "/search"}>Search</Navbar.Link>
          <Navbar.Link href="/convert" active={activeLink === "/report"}>Converter</Navbar.Link>
          <Navbar.Link href="/mix" active={activeLink === "/mix"}>mix</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Nav;
