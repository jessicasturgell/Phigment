const apiUrl = "https://localhost:7021/api/User/";

export const getUserById = (currentUser) => {
  return fetch(`${apiUrl}${currentUser.id}`).then((res) => res.json());
};

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

export const updateUser = (currentUser) => {
  return fetch(`${apiUrl}${currentUser.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(currentUser),
  });
};
