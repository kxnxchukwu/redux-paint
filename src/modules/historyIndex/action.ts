export const UNDO = "UNDO";
export const REDO = "REDO";
export const END_STROKE = "END_STROKE";

export type HistoryIndexAction =
  | {
      type: typeof END_STROKE;
    }
  | {
      type: typeof UNDO;
      payload: number;
    }
  | {
      type: typeof REDO;
    };

export const undo = (undoLimit: number): HistoryIndexAction => {
  return { type: UNDO, payload: undoLimit };
};

export const redo = (): HistoryIndexAction => {
  return { type: REDO };
};
