import "./Welcome.css";

export const Welcome = () => {
  return (
    <>
      <div className="welcome-container">
        <div className="welcome-container-container">
          <div className="welcome-greeting">
            <h1 className="welcome-header">
              <span className="cyan">Hello.</span> Welcome to
            </h1>
            <img src="src\assets\phigment-logo.svg" height="300" />
          </div>

          <h2 className="welcome-subheading">
            A dynamic color palette building tool.
          </h2>
        </div>
      </div>
    </>
  );
};
