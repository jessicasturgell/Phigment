import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

function PhigmentNavbar(args) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar {...args} color="dark" dark>
        <NavbarBrand href="/">
          {" "}
          <img
            alt="logo"
            src="src\assets\phigment-logo-noflourish-blackbg.svg"
            style={{
              height: 50,
              width: "auto",
            }}
          />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink
                href="/"
                onClick={() => {
                  localStorage.removeItem("phigment_user");
                  navigate("/", { replace: true });
                }}
              >
                Logout
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default PhigmentNavbar;
