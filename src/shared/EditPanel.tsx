import { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { redo, undo } from "../modules/historyIndex/slice";
import { strokesLengthSelector } from "../modules/strokes/slice";

export const EditPanel = (): ReactElement => {
  const dispatch = useDispatch();
  const undoLimit = useSelector(strokesLengthSelector);

  return (
    <div className="window edit">
      <div className="title-bar">
        <div className="title-bar-text">Edit</div>
      </div>
      <div className="window-body">
        <div className="field-row">
          <button className="button redo" onClick={() => dispatch(redo())}>
            Redo
          </button>
          <button
            className="button undo"
            onClick={() => dispatch(undo(undoLimit))}
          >
            Undo
          </button>
        </div>
      </div>
    </div>
  );
};
