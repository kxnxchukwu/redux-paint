import {
  ReactElement,
  useEffect,
  MouseEvent,
  useCallback,
  CSSProperties,
} from "react";
import { WIDTH, HEIGHT } from "./constants";
import "./App.css";
import { clearCanvas, drawStroke, setCanvasSize } from "./utils/canvasUtils";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { ColourPanel } from "./shared/ColourPanel";
import { EditPanel } from "./shared/EditPanel";
import {
  beginStroke,
  currentStrokeSelector,
  updateStroke,
} from "./modules/currentStroke/slice";
import { historyIndexSelector } from "./modules/historyIndex/slice";
import { strokesSelector } from "./modules/strokes/slice";
import { endStroke } from "./modules/sharedActions";
import { useCanvas } from "./CanvasContext";
import { FilePanel } from "./shared/FilePanel";
import ModalLayer from "./ModalLayer";

const STYLE: CSSProperties = { width: "100%", height: "100%" };

function App(): ReactElement {
  const dispatch = useDispatch();
  const canvasRef = useCanvas();
  const currentStroke = useSelector(currentStrokeSelector);
  const isDrawing = !!currentStroke.points.length;
  const historyIndex = useSelector(historyIndexSelector);
  const strokes = useSelector(strokesSelector);
  const getCanvasWithContext = useCallback(
    (
      canvas: HTMLCanvasElement = canvasRef.current as HTMLCanvasElement
    ): {
      canvas: HTMLCanvasElement;
      context: CanvasRenderingContext2D | null;
    } => {
      return { canvas, context: canvas?.getContext("2d") };
    },
    [canvasRef]
  );

  useEffect(() => {
    const { canvas, context } = getCanvasWithContext();

    if (!context || !canvas) {
      return;
    }

    requestAnimationFrame(() => {
      clearCanvas(canvas);

      strokes
        .slice(0, strokes.length - historyIndex)
        .forEach((stroke) =>
          drawStroke({ context, points: stroke.points, colour: stroke.colour })
        );
    });
  }, [historyIndex, strokes, getCanvasWithContext]);

  useEffect(() => {
    const { canvas, context } = getCanvasWithContext();

    if (!canvas || !context) {
      return;
    }

    setCanvasSize({ canvas, height: HEIGHT, width: WIDTH });

    context.lineJoin = "round";
    context.lineCap = "round";
    context.lineWidth = 5;
    context.strokeStyle = "black";

    clearCanvas(canvas);
  }, [getCanvasWithContext]);

  useEffect(() => {
    const { context } = getCanvasWithContext();

    if (!context) {
      return;
    }

    requestAnimationFrame(() => {
      drawStroke({
        context,
        points: currentStroke.points,
        colour: currentStroke.colour,
      });
    });
  }, [currentStroke, getCanvasWithContext]);

  const startDrawing = ({ nativeEvent }: MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent;
    dispatch(beginStroke({ x: offsetX, y: offsetY }));
  };

  const endDrawing = () => {
    if (isDrawing) {
      dispatch(endStroke({ stroke: currentStroke, historyIndex }));
    }
  };

  const draw = ({ nativeEvent }: MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) {
      return;
    }

    const { offsetX, offsetY } = nativeEvent;

    dispatch(updateStroke({ x: offsetX, y: offsetY }));
  };

  return (
    <div className="window" style={STYLE}>
      <div className="title-bar">
        <div className="title-bar-text">Redux Paint</div>
        <div className="title-bar-controls">
          <button aria-label="Close" />
        </div>
      </div>
      <EditPanel />
      <ColourPanel />
      <FilePanel />
      <ModalLayer />
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing}
        onMouseMove={draw}
      />
    </div>
  );
}

export default App;
