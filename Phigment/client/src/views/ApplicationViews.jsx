import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import PhigmentNavbar from "../components/nav/Navbar.jsx";
import { Welcome } from "../components/welcome/Welcome.jsx";
import { Explore } from "../components/explore/Explore.jsx";
import { PaletteList } from "../components/palettes/PaletteList.jsx";
import { PaletteDetails } from "../components/palettes/PaletteDetails.jsx";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localPhigmentUser = localStorage.getItem("phigment_user");
    const phigmentUserObject = JSON.parse(localPhigmentUser);

    setCurrentUser(phigmentUserObject);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <PhigmentNavbar />
            <Outlet />
          </>
        }
      >
        <Route index element={<Welcome />} />
        <Route path="explore" element={<Explore currentUser={currentUser} />} />
        <Route
          path="palettes"
          element={<PaletteList currentUser={currentUser} />}
        />
        <Route path="palettes/:id" element={<PaletteDetails />} />
      </Route>
    </Routes>
  );
};
