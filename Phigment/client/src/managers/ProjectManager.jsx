const baseUrl = "https://localhost:7021/api/Project/";

export const getAllProjects = (currentUser) => {
  return fetch(`${baseUrl}GetAllByUserId/${currentUser.id}`).then((res) =>
    res.json()
  );
};

export const addProject = (project) => {
  return fetch(`${baseUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  }).then((res) => res.json());
};

export const deleteProject = (projectId) => {
  return fetch(`${baseUrl}${projectId}`, {
    method: "DELETE",
  });
};

export const getProjectById = (projectId) => {
  return fetch(`${baseUrl}${projectId}`).then((res) => res.json());
};

export const updateProject = (project) => {
  return fetch(`${baseUrl}${project.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  });
};

export const getProfileProjectsByUserId = (currentUser) => {
  return fetch(
    `${baseUrl}GetAllUserProfileProjectsByUserId/${currentUser.id}`
  ).then((res) => res.json());
};
