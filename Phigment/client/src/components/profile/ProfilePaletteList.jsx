import { useEffect, useState } from "react";
import { getProfilePaletteByUserIdWithSwatches } from "../../managers/PaletteManager.jsx";
import { ProfilePalette } from "./ProfilePalette.jsx";

export const ProfilePaletteList = ({ currentUser }) => {
  const [palettes, setPalettes] = useState([]);

  const fetchPalettes = () => {
    if (currentUser && currentUser.id) {
      getProfilePaletteByUserIdWithSwatches(currentUser).then((palettes) =>
        setPalettes(palettes)
      );
    }
  };

  useEffect(() => {
    fetchPalettes();
  }, [currentUser]);

  return (
    <>
      <div className="profile-showcase">Palettes Showcase</div>
      <div className="profile-palette-container">
        {palettes.length > 0
          ? palettes.map((p) => <ProfilePalette key={p.id} palette={p} />)
          : null}
      </div>
    </>
  );
};
