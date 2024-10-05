import "./Login.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

export const Register = () => {
  const [displayName, set] = useState("MizMooDeng");
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
          <Form>
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
