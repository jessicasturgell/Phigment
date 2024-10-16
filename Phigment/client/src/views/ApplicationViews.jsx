import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import PhigmentNavbar from "../components/nav/Navbar.jsx";
import { Welcome } from "../components/welcome/Welcome.jsx";
import { Explore } from "../components/explore/Explore.jsx";
import { PaletteList } from "../components/palettes/PaletteList.jsx";
import { PaletteDetails } from "../components/palettes/PaletteDetails.jsx";
import { ProjectList } from "../components/projects/ProjectList.jsx";
import { Profile } from "../components/profile/profile.jsx";
import { ProjectDetails } from "../components/projects/ProjectDetails.jsx";
import { EditProject } from "../components/forms/EditProject.jsx";

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
        <Route path="palettes/:paletteId" element={<PaletteDetails />} />
        <Route
          path="projects"
          element={<ProjectList currentUser={currentUser} />}
        />
        <Route
          path="projects/:projectId"
          element={<ProjectDetails currentUser={currentUser} />}
        />
        <Route
          path="projects/:projectId/edit"
          element={<EditProject currentUser={currentUser} />}
        />
        <Route path="profile" element={<Profile currentUser={currentUser} />} />
      </Route>
    </Routes>
  );
};
