import { useEffect, useState } from "react";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localPhigmentUser = localStorage.getItem("phigment_user");
    const phigmentUserObject = JSON.parse(localPhigmentUser);

    setCurrentUser(phigmentUserObject);
  }, []);

  return <>Hello</>;
};
