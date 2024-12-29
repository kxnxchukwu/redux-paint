import { ChangeEvent, ReactElement, useState } from "react";
import { hide } from "./modules/modals/slice";
import { useCanvas } from "./CanvasContext";
import { getCanvasImage } from "./utils/canvasUtils";
import { getBase64Thumbnail } from "./utils/scaler";
import { saveProject } from "./modules/strokes/slice";
import { useAppDispatch } from "./store";

export default function ProjectSaveModal(): ReactElement {
  const [projectName, setProjectName] = useState("");
  const dispatch = useAppDispatch();
  const canvasRef = useCanvas();

  const onProjectNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  };

  const onProjectSave = async () => {
    const file = await getCanvasImage(canvasRef.current);

    if (!file) {
      return;
    }

    const thumbnail = await getBase64Thumbnail({ file, scale: 0.1 });
    dispatch(saveProject({ projectName, thumbnail }));
    setProjectName("");
    dispatch(hide());
  };

  return (
    <div className="window modal-panel">
      <div className="title-bar">
        <div className="title-bar-text">Save</div>
      </div>
      <div className="window-body">
        <div className="field-row-stacked">
          <label htmlFor="projectName">Project Name</label>
          <input id="projectName" onChange={onProjectNameChange} type="text" />
        </div>
        <div className="field-row">
          <button onClick={onProjectSave}>Save</button>
          <button onClick={() => dispatch(hide())}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
