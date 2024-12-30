import { ModalState } from "../modules/modals/slice";

export interface Point {
  x: number;
  y: number;
}

export interface Stroke {
  points: Point[];
  colour: string;
}

export interface Project {
  image: string;
  name: string;
  id: string;
  strokes: Stroke[];
}

export interface ProjectList {
  error?: string;
  pending: boolean;
  projects: Project[];
}
export interface RootState {
  currentStroke: Stroke;
  strokes: Stroke[];
  historyIndex: number;
  modalVisible: ModalState;
  projectsList: ProjectList;
}
