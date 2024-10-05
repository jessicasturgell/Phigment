import "./index.css";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Authorized } from "./views/Authorized.jsx";
import { ApplicationViews } from "./views/ApplicationViews.jsx";
import { Login } from "./components/auth/Login.jsx";
import { Register } from "./components/auth/Register.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="*"
        element={
          <Authorized>
            <ApplicationViews />
          </Authorized>
        }
      />
    </Routes>
  );
}

export default App;
