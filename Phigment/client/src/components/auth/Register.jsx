import "./Login.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import {
  createUser,
  getUserByDisplayName,
} from "../../managers/UserManager.jsx";

export const Register = () => {
  const [user, setUser] = useState({
    displayName: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // sets the background image for this page
    document.body.style.backgroundImage =
      "url('/src/assets/phigment-bgelements.svg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";

    // resets when leaving page
    return () => {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundPosition = "";
      document.body.style.backgroundRepeat = "";
    };
  }, []);

  const registerNewUser = () => {
    createUser(user).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "phigment_user",
          JSON.stringify({
            id: createdUser.id,
          })
        );

        navigate("/");
      }
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    getUserByDisplayName(user.displayName)
      .then((response) => {
        // Check if a user was found
        if (response && response.id) {
          // Duplicate display name. No good.
          window.alert("Account with that username already exists");
        } else {
          // Good username, create user.
          registerNewUser();
        }
      })
      .catch((error) => {
        console.error("Error fetching user by display name:", error);
        window.alert("An error occurred. Please try again.");
      });
  };

  const updateUser = (evt) => {
    const copy = { ...user };
    copy[evt.target.id] = evt.target.value;
    setUser(copy);
  };

  return (
    <div className="login-container">
      <div className="login-containter-container">
        <div className="flex-center">
          <img src="src\assets\phigment-logo.svg" width="400px" />
        </div>
        <div className="login-form-container">
          <div className="flex-center">
            <h1 className="login-h1">Please register to get started</h1>
          </div>
          <Form onSubmit={handleRegister}>
            <FormGroup>
              <Label for="displayName" hidden>
                Username
              </Label>
              <Input
                id="displayName"
                onChange={updateUser}
                name="displayName"
                placeholder="Username"
                type="text"
                required
                autoFocus
                autoComplete="username"
              />
            </FormGroup>{" "}
            <FormGroup>
              <Label for="examplePassword" hidden>
                Password
              </Label>
              <Input
                id="examplePassword"
                name="password"
                placeholder="Password"
                type="password"
                autoComplete="current-password"
              />
            </FormGroup>{" "}
            <div className="flex-center">
              <Button color="info">Submit</Button>
            </div>
            <div className="flex-center reglink">
              <Link to="/login">Already have an account?</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};
