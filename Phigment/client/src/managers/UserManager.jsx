const apiUrl = "https://localhost:7021/api/User/";

export const getUserByDisplayName = (displayName) => {
  return fetch(`${apiUrl}GetUserByDisplayName?displayName=${displayName}`).then(
    (res) => res.json()
  );
};

export const createUser = (user) => {
  return fetch(`${apiUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());
};
