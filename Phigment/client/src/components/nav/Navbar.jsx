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
              <NavLink href="/explore">
                <span className="cyan">Explore</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/palettes">
                <span className="magenta">My Palettes</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/projects">
                <span className="yellow">My Projects</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/profile">
                <span className="cyan">My Profile</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="/"
                onClick={() => {
                  localStorage.removeItem("phigment_user");
                  navigate("/", { replace: true });
                }}
              >
                <span className="magenta">Logout</span>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default PhigmentNavbar;
