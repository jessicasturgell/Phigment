const apiUrl = "https://localhost:7021/api/User/";

export const getUserByDisplayName = (displayName) => {
  return fetch(`${apiUrl}GetUserByDisplayName?displayName=${displayName}`).then(
    (res) => res.json()
  );
};
