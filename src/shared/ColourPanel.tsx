import { ReactElement } from "react";
import { useDispatch } from "react-redux";
import { setStrokeColour } from "../modules/currentStroke/slice";

const COLOURS = [
  "#000000",
  "#808080",
  "#c0c0c0",
  "#ffffff",
  "#800000",
  "#ff0000",
  "#808000",
  "#ffff00",
  "#008000",
  "#00ff00",
  "#008080",
  "#00ffff",
  "#000080",
  "#0000ff",
  "#800080",
  "#ff00ff",
  "#808040",
  "#ffff80",
  "#004040",
  "#00ff80",
  "#0080ff",
  "#80ffff",
  "#004080",
  "#8080ff",
  "#8000ff",
  "#ff0080",
  "#804000",
  "#ff8040",
];

export const ColourPanel = (): ReactElement => {
  const dispatch = useDispatch();
  const onColourChange = (colour: string): void => {
    dispatch(setStrokeColour(colour));
  };
  return (
    <div className="window colours-panel">
      <div className="title-bar">
        <div className="title-bar-text">Colours</div>
      </div>
      <div className="window-body colours">
        {COLOURS.map((colour) => (
          <div
            key={colour}
            className="colour"
            style={{ backgroundColor: colour }}
            onClick={() => onColourChange(colour)}
          />
        ))}
      </div>
    </div>
  );
};
