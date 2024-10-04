import "./Login.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getUserByDisplayName } from "../../managers/UserManager.jsx";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

export const Login = () => {
  const [displayName, set] = useState("MizMooDeng");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    getUserByDisplayName(displayName).then((user) => {
      if (user && user.id) {
        localStorage.setItem(
          "phigment_user",
          JSON.stringify({
            id: user.id,
          })
        );
        navigate("/");
      } else {
        window.alert("Invalid login");
      }
    });
  };

  return (
    <div className="login-container">
      <div className="login-containter-container">
        <div className="flex-center">
          <img src="src\assets\phigment-logo.svg" width="400px" />
        </div>
        <div className="login-form-container">
          <div className="flex-center">
            <h1 className="login-h1">Please log in to get started</h1>
          </div>
          <Form onSubmit={handleLogin}>
            <FormGroup>
              <Label for="username" hidden>
                Email
              </Label>
              <Input
                id="username"
                name="username"
                placeholder="Username"
                type="text"
                value={displayName}
                onChange={(evt) => set(evt.target.value)}
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
              <Link to="/register">Not a member yet?</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};
