import { ReactElement } from "react";
import { useCanvas } from "../CanvasContext";
import { getCanvasImage } from "../utils/canvasUtils";
import { saveAs } from "file-saver";

export const FilePanel = (): ReactElement => {
  const canvasRef = useCanvas();

  const exportToFile = async (): Promise<void> => {
    const file = await getCanvasImage(canvasRef.current);

    if (!file) {
      return;
    }

    saveAs(file, "drawing.png");
  };
  return (
    <div className="window file">
      <div className="title-bar">
        <div className="title-bar-text">File</div>
      </div>
      <div className="window-body">
        <div className="field-row">
          <button className="save-button" onClick={exportToFile}>
            Export
          </button>
        </div>
      </div>
    </div>
  );
};
