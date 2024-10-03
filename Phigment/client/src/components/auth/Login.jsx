import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getUserByDisplayName } from "../../managers/UserManager.jsx";

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
    <main>
      <section>
        <form onSubmit={handleLogin}>
          <h1>Phigment</h1>
          <h2>Please sign in</h2>
          <fieldset>
            <div>
              <input
                value={displayName}
                onChange={(evt) => set(evt.target.value)}
                placeholder="Username"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset>
            <div>
              <button type="submit">Sign in</button>
            </div>
          </fieldset>
        </form>
      </section>
      <section>
        <Link to="/register">Not a member yet?</Link>
      </section>
    </main>
  );
};
