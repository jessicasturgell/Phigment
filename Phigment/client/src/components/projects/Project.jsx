import { useState } from "react";

export const Project = ({ project }) => {
  return (
    <>
      <div className="project">
        {project.name}{" "}
        <span className="project-mgt-text">
          <span style={{ marginRight: "25px", color: "magenta" }}>DETAILS</span>
          <span style={{ color: "yellow" }}>DELETE PROJECT</span>
        </span>
      </div>
      <p className="project-blurb">{project.blurb}</p>
      <hr className="project-list-hr" />
    </>
  );
};
