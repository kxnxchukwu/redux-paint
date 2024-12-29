import { ReactElement, useEffect } from "react";
import { hide } from "./modules/modals/slice";
import { useSelector } from "react-redux";
import {
  getProjectsList,
  projectsListSelector,
} from "./modules/projectsList/slice";
import { useAppDispatch } from "./store";
import { loadProject } from "./modules/strokes/slice";

export default function ProjectsModal(): ReactElement {
  const dispatch = useAppDispatch();
  const projectsList = useSelector(projectsListSelector);

  const onLoadProject = (projectId: string) => {
    dispatch(loadProject(projectId));
    dispatch(hide());
  };

  useEffect(() => {
    dispatch(getProjectsList());
  }, [dispatch]);

  return (
    <div className="window modal-panel">
      <div className="title-bar">
        <div className="title-bar-text">Load Project</div>
        <div className="title-bar-controls">
          <button aria-label="Close" onClick={() => dispatch(hide())} />
        </div>
      </div>
      <div className="projects-container">
        {projectsList.map((project) => {
          return (
            <div
              className="project-card"
              key={project.id}
              onClick={() => onLoadProject(project.id)}
            >
              <img src={project.image} alt="thumbnail" />
              <div>{project.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
