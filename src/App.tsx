import { ReactElement, useEffect, useRef, MouseEvent } from "react";
import { WIDTH, HEIGHT } from "./constants";
import "./App.css";
import { clearCanvas, drawStroke, setCanvasSize } from "./utils/canvasUtils";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { beginStroke, endStroke, updateStroke } from "./actions";
import {
  currentStrokeSelector,
  historyIndexSelector,
  strokesSelector,
} from "./rootReducer";
import { ColourPanel } from "./shared/ColourPanel";
import { EditPanel } from "./shared/EditPanel";

function App(): ReactElement {
  const dispatch = useDispatch();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentStroke = useSelector(currentStrokeSelector);
  const isDrawing = !!currentStroke.points.length;
  const historyIndex = useSelector(historyIndexSelector);
  const strokes = useSelector(strokesSelector);
  const getCanvasWithContext = (
    canvas: HTMLCanvasElement = canvasRef.current as HTMLCanvasElement
  ): {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D | null;
  } => {
    return { canvas, context: canvas?.getContext("2d") };
  };

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
  }, [historyIndex]);

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
  }, []);

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
  }, [currentStroke]);

  const startDrawing = ({ nativeEvent }: MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent;
    dispatch(beginStroke({ x: offsetX, y: offsetY }));
  };

  const endDrawing = () => {
    if (isDrawing) {
      dispatch(endStroke());
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
    <div className="window">
      <div className="title-bar">
        <div className="title-bar-text">Redux Paint</div>
        <div className="title-bar-controls">
          <button aria-label="Close" />
        </div>
      </div>
      <EditPanel />
      <ColourPanel />
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
